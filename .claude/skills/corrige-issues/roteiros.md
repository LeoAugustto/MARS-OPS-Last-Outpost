# Receitas de roteiro (para `.claude/ferramentas/fotos.mjs`)

Um roteiro é um arquivo JSON com uma lista de passos. Escreva-o na pasta temporária (scratchpad), nunca no repositório.
Os textos dos botões abaixo estão em **português** (idioma padrão). Para testar outro idioma, troque antes no seletor de bandeira ou use os textos daquele idioma.

## Ajudas dentro de um passo `js`
- `__clk(/Texto/)`: clica no primeiro botão ou link cujo texto bate com o padrão.
- `__clk(/^Cama$/, 'aria-label')`: clica pelo `aria-label` (objetos do mapa e dos interiores, botões de ícone).
- `await __espera(() => condição, 8000)`: espera a condição ficar verdadeira (devolve `true`/`false`).

Clicar até dar certo (alguns botões só respondem depois da animação):
```json
["js", "for(let i=0;i<6;i++){ __clk(/Iniciar Miss/); if(await __espera(()=>!!document.querySelector('form'),2500)) return 'ok'; } return 'falhou';"]
```

## Chegar no mapa do sol 1 (mais usado)
```json
[
  ["vai", "/play"],
  ["js", "for(let i=0;i<6;i++){ __clk(/Iniciar Miss/); if(await __espera(()=>!!document.querySelector('form'),2500)) return 'ok'; } return 'falhou';"],
  ["js", "for(let i=0;i<6;i++){ __clk(/Próximo/); if(await __espera(()=>!document.querySelector('form'),2500)) return 'ok'; } return 'falhou';"],
  ["js", "for(let i=0;i<6;i++){ __clk(/^Pular$/); if(await __espera(()=>[...document.querySelectorAll('button')].some(b=>/Vamos lá/.test(b.textContent)),2500)) return 'ok'; } return 'falhou';"],
  ["js", "for(let i=0;i<6;i++){ __clk(/Vamos lá/); if(await __espera(()=>![...document.querySelectorAll('button')].some(b=>/Vamos lá/.test(b.textContent)),2500)) return 'ok'; } return 'falhou';"],
  ["js", "__clk(/Pular tutorial/); return 'ok';"],
  ["espera", 800],
  ["foto", "mapa"]
]
```
Para ver o **tutorial**, não clique em "Pular tutorial".

## Entrar num lugar e usar um objeto
- Entrar: `["js", "__clk(/^Casa$/); return await __espera(()=>[...document.querySelectorAll('button')].some(b=>/^Cama$/.test(b.getAttribute('aria-label')||'')),15000);"]`
  (lugares: Casa, Painéis solares, Antena, Fábrica de ar, Estufa, Laboratório, Abrigo, Rover)
- Objetos (pelo aria-label): `Cama`, `Computador` (ou `Computador · Alerta` quando tem alerta), `Painel de energia`, `Sair`.
- Escolher a 1ª opção de um alerta aberto: `["js", "[...document.querySelectorAll('button')].find(b=>/[−+]\\d/.test(b.textContent))?.click(); return 1;"]`
- Fechar o resultado: `["js", "__clk(/^OK!$/); return 1;"]`

## Mexer no save para pular para uma situação
O save fica no `localStorage`, numa chave que começa com `marsops:save`. Mexa nele e depois recarregue `/play` e clique em "Continuar".
```json
["js", "const k=Object.keys(localStorage).find(k=>k.startsWith('marsops:save')); const s=JSON.parse(localStorage.getItem(k)); const g=s.state.game; /* MEXA AQUI */ localStorage.setItem(k, JSON.stringify(s)); return 'ok';"]
```
Exemplos do que pôr em `/* MEXA AQUI */`:
- Noite: `s.state.relogio=0.75; s.state.phase='mapa';` (relógio: 0 = 07:00, 1 = 24:00; fim de tarde 16h00, noite a partir de 19h00 (relogio 0.71))
- Todos os alertas resolvidos: `g.alerts.forEach(a=>a.done=true);`
- Último sol com a meta batida (para ver o fim vencendo): `g.sol=g.totalSols; g.ciencia=g.metaCiencia; s.state.relogio=0.9; s.state.phase='mapa';`
- Saúde baixa (para ver o fim perdendo): `g.resources.saude=3;`

Depois: `["vai", "/play"], ["js", "for(let i=0;i<6;i++){ __clk(/Continuar/); if(await __espera(()=>!!document.querySelector('[aria-label^=\"Hora\"]'),2500)) return 'ok'; } return 'falhou';"]`

## Fim da missão e relatório
Com o save no último sol (acima), entre na Casa, use a Cama, clique em `Sim, dormir`, depois `Ver o fim` e `Ver relatório`.

## Páginas do site
`/` (início), `/sobre`, `/fontes`, `/play`, e um endereço que não existe para a 404.

## Dicas
- Tire **foto antes de cada clique importante**: mostra exatamente onde o bug aparece.
- Elementos fora da tela: `["js", "document.querySelector('SELETOR')?.scrollIntoView(); return 1;"]`
- Medir se algo vaza da tela (bug de layout): `["js", "return [...document.querySelectorAll('button,p,h1,h2,span')].filter(e=>{const r=e.getBoundingClientRect(); return r.width && (r.right>innerWidth+1 || e.scrollWidth>e.clientWidth+2);}).slice(0,10).map(e=>e.textContent.trim().slice(0,40));"]`
