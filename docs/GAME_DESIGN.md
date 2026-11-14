# Game Design — MARS OPS: Last Outpost

## Ideia
Um "jogo de fazenda em Marte" por turnos. Cada **sol** (dia marciano):

1. ☀️ **Manhã**: os painéis solares geram energia (menos se tiver poeira) + o que estava na bateria.
2. 🃏 **Carta do dia**: um evento acontece e a criança escolhe o que fazer (2 ou 3 opções, todas com custo).
3. ⚡ **Dividir energia**: a criança distribui a energia entre os módulos (no celular: tocar/arrastar baterias).
4. 🌙 **Dormir**: o motor calcula o dia, mostra o resumo e começa o próximo sol.

Missão: sobreviver todos os sóis **e** bater a meta de ciência.

| Nível | Idade sugerida | Sóis | Meta de ciência | Radiação |
|---|---|---|---|---|
| Cadete | 7–9 | 7 | 12 | ×0,7 |
| Piloto | 9–11 | 10 | 20 | ×1 |
| Comandante | 11–12+, pais, sala de aula | 14 | 32 | ×1,3 |

## Recursos (poucos, de propósito)
- **3 barras**: 💨 Ar · 🥔 Comida · ❤️ Saúde (0–100). Se uma chega a 0 → resgate (não é game over).
- **⚡ Energia**: a "moeda" do dia. O que sobra vai para a 🔋 bateria (máx. 10).
- **🔬 Ciência**: pontuação da missão.
- **🛡️ Escudo**: nível 0–4 da camada de areia sobre a base. Cada nível corta 15% da radiação diária e das tempestades.

| Módulo | 1 ⚡ rende | Por que importa |
|---|---|---|
| Fábrica de ar | +4 ar | a tripulação consome 10 de ar por sol |
| Estufa | +3 comida | a tripulação consome 8 de comida por sol |
| Laboratório | +1 ciência | é como se vence |
| Robô de areia | 3 ⚡ = +1 nível de escudo | investimento: custa caro agora, protege para sempre |

Equilíbrio básico: com 10 ⚡ por sol, ~3 para ar e ~3 para estufa mantêm tudo estável; sobram ~4 para ciência, escudo ou bateria. **Todo evento mexe nesse equilíbrio.**

## Aleatório, mas sempre com sentido (o pedido do time)
O jogo não sorteia cartas soltas. Ele conta **histórias curtas encadeadas**:

```
sol_agitado (DONKI) ──► escolha ──► tempestade_chega (1 sol depois)
   │ "Preparar abrigo"  → flag abrigo_pronto → a tempestade machuca 70% menos
   │ "Continuar pesquisa" → +ciência agora, dano cheio amanhã
poeira_vem ──► painel_sujo ──► (limpar agora | esperar) ──► vento_limpa (2–3 sóis)
broto ──► (luz | economizar) ──► colheita_boa | colheita_fraca (2 sóis)
rocha ──► (robô | astronauta) ──► laboratorio (1–2 sóis, só se foi com astronauta)
contato_terra ──► (conselho) ──► resposta_terra (1 sol: atraso de comunicação!)
filtro_entupido ──► "peça reserva" só aparece se ainda existe peça (flag sem_reserva)
```

Regras do **diretor** (`pickRandomEvent`):
1. Primeiro entram as continuações agendadas para hoje (no máximo 2 cartas por sol).
2. Se não há continuação, sorteia uma **abertura**: só eventos cujo `canHappen()` é verdade agora (ex.: poeira só se o painel está limpo; broto só se a comida não está cheia).
3. Nunca abre uma história que já está rolando, e respeita o `cooldown` (não repete a mesma carta seguida).
4. `weight` pode depender do estado: com pouca comida, o broto aparece mais (o jogo "ajuda" sem dar nada de graça).
5. Tudo com **semente**: a mesma missão pode ser rejogada igual (para "voltar ao sol" e para a turma comparar estratégias), e uma nova semente gera outra combinação.

## Sem game over: o Relatório do Controle de Missão
Se ar, comida ou saúde zera, a Terra "manda buscar a tripulação" (ninguém se machuca). O relatório mostra:
- **o que acabou** e por quê (`causa.*`);
- **as 2 decisões que mais pesaram**, com o "Por quê?" de cada uma;
- **uma dica** (`dica.*`) e um **fato real** (ex.: naves de reabastecimento só a cada ~26 meses);
- botões **[Voltar ao sol X]** (mesma missão, decisão diferente) e **[Nova missão]**.

## Ideias para depois (só se sobrar tempo)
- Mapa 2D andável (Phaser): o astronauta anda até o módulo para tocar nele.
- Escolher local de pouso com foto/mapa real do Mars Trek (cratera Jezero, Gale…).
- Tempestade "ao vivo": se o DONKI tiver um flare M/X nos últimos dias, usar no jogo com selo 📡.
- Modo sala de aula: mesma semente para a turma toda, comparar resultados.
- Evento de radiação comparando com a dose real medida na ISS (RadLab).
