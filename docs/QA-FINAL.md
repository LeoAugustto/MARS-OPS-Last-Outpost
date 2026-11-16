# QA final de interface e jogabilidade

15/11/2026 · Base da `main` em `e77bd36` · Chrome via Playwright, com `npm run dev`.

## O que foi exercitado

- Matriz de português, inglês e espanhol em 360×640, 375×812, 768×1024 e 1366×650. A cobertura inclui Cadete, Piloto e Comandante, os dois personagens e entrada por toque e teclado.
- Da home até o sol 2: dificuldade, perfil, três quadros da abertura, tutorial do sol 1, prédios, alertas com escolhas e explicação, expedição do rover, cama e resumo da noite.
- No sol 2: abrir o menu, diminuir e aumentar o volume dos quatro canais, desligar e ligar o som, ler as sete páginas de **Como jogar** e abrir o glossário.
- Na Vercel em 375×812, o link direto para `/play` e o F5 voltaram à home. **Continuar missão** retomou o save criado pela interface. As oito consultas DONKI observadas no percurso público retornaram HTTP 200. A matriz local usou respostas vazias controladas para exercitar a reserva histórica.

## Correções de interface

- **Teclado no mapa.** Enter e Espaço respeitam o controle em foco. Depois de sair da antena, Enter no Rover deixava a porta anterior consumir o comando.
- **Confirmação da cama.** O toque que abre o diálogo conclui a última dica do tutorial. O balão deixava o botão de confirmação encoberto em telas estreitas.
- **Texto em telas estreitas.** O botão de voltar do perfil pode quebrar linha. Ajustei a fonte de confirmação do tutorial e dos botões do menu para caber o texto, inclusive o rótulo espanhol para rever o tutorial.
- **Rover.** A animação limita o tempo inicial a zero. Um timestamp ligeiramente anterior ao início podia pedir `/assets/rover/undefined_-1.png?v=2`.

## Áudio e pendências

O Chrome foi silenciado sem interromper a reprodução. Foram monitorados os eventos dos elementos de áudio, inclusive os criados fora do DOM, e os status de rede. GET sem pedido parcial retornou HTTP 200 na amostra de carta, porta, passos, dormir e rover tanto na prévia quanto na Vercel. O Chrome usou HTTP 206 para carregar trechos dessas mídias durante a reprodução.

- **404 em efeitos.** Foram observadas tentativas de WAV para `passo_terra_1/2`, `passo_piso_1/2`, `porta_abre`, `porta_fecha` e `radio_chiado`. Há versões MP3. Vale conferir a primeira reprodução de cada efeito, porque a tentativa em WAV acontece antes do fallback.
- **Fala da noite.** Ao despertar cerca de 1,2 s após abrir o resumo, `astro.dormir.mp3` ainda pode tocar na manhã seguinte. Foi registrada como pendência de áudio.

Não houve avaliação auditiva nem teste em aparelho físico.
