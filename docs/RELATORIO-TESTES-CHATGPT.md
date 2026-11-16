# Bateria de testes — Operação Marte: Última Base

[English testing report](QA_REPORT.md)

15/11/2026 · Base `8c1f82d` · Alterações locais em `feat/qa-bateria-missoes`

> Atualização após o commit local b6f5507. A seção 8 complementa a primeira rodada e usa uma amostra maior para as decisões de equilíbrio.

## 1. Resumo

- **Motor:** 1.260 missões analisadas, 63 combinações × 20 sementes (1 a 20). Outras 1.260 reproduziram as mesmas ações para verificar determinismo. Execução do teste temporário em 106,8 s.
- **Chrome:** 32 missões chegaram à tela de fim (27 vitórias e 5 resgates). 28 chegaram ao último sol programado. Foram concluídos 257 relatórios da noite e 249 sóis tiveram avanço visível no relógio durante as ações.
- **Matriz no navegador:** níveis cadete (14), comandante (9), piloto (9). Modos famosa (11), semana (10), surpresa (11). Idiomas en (6), es (5), fr (5), it (5), pt (11). Resoluções 1280×800 (9), 360×640 (11), 375×812 (12).
- **Tempo por partida em Chrome:** 38,1 s em média com animações e relógio acelerados pelo teste. Essa medição não representa a duração de uma partida infantil.
- **Textos:** 854 chaves do jogo por idioma. Catálogo e variáveis validados em PT, EN, ES, FR e IT.
- As partidas no navegador começam na seleção de dificuldade e usam os botões reais até chegar ao fim. O cenário de rede interceta o DONKI com registros de teste ou lista vazia para exercitar a reserva. O save é lido para observar o estado. Não foi testado o serviço externo ao vivo nem um aparelho físico.

## 2. Correções locais

| Arquivo | Problema reproduzido | Correção |
| --- | --- | --- |
| `src/game/ui/Screens.tsx` | Cartões de dificuldade ultrapassavam a área visível em 360 px. Os botões de tempestades históricas mediam 36 px de altura. | Coluna com largura limitada, título que quebra dentro do cartão e alvos da lista com pelo menos 48 px de altura. |
| `src/game/ui/ComoJogar.tsx` | Sete marcadores comprimiam cada controle da ajuda para 43 px em tela estreita. | Controles de 48×48 px, com quebra entre linhas. |
| `src/content/locales/*.ts` | O laboratório dizia que gastara exatamente 2 de energia mesmo se havia menos energia disponível. Algumas frases de ajuda e do evento da areia eram longas, e a frase inglesa sobre o escudo tinha concordância errada. | Texto da limpeza sem valor fixo, custo mostrado pelos chips quando aplicado. Frases curtas em FR/IT e instrução inglesa do escudo revisada. |
| `src/game/ui/GameApp.tsx`, `src/game/ui/Panels.tsx` | O computador da Casa tinha um botão que encerrava o sol. Tocar na cama com alertas pendentes durante o dia também podia não explicar o bloqueio. | Dormir ficou disponível pela cama. Se ainda for cedo e houver alertas, a cama abre a explicação existente com quantidade e custo. |

Regras e balanceamento preservados. As correções e a primeira rodada do relatório estão no commit local `b6f5507`.

## 3. Bugs e questões de regra pendentes

1. **Pular a chegada de uma tempestade pode evitar parte do dano.** Noite com `sol_nuvem_chega` pendente: abrir o Abrigo aplica `onOpen` com a dose imediata. Dormir sem abrir cobra apenas a pior escolha e a taxa por alerta. A simulação encontrou 18 ocorrências nessa cadeia e 71 casos em 7 eventos contando as outras notícias. Reprodução isolada no motor: prepare Cadete, sol 5, escudo zero, saúde 100, apenas esse alerta pendente com força 2. Compare abrir e escolher `ficar` antes de dormir (85 de saúde ao fim) com dormir à força sem abrir (92). A comparação da bateria usa energia ×3, saúde ×2, escudo ×3, fração solar ×10 e peso 1 para os demais recursos. Inclui perdas de abertura e opções disponíveis no estado observado. Aplicar consequências automaticamente ao dormir mexe na regra e precisa de decisão do time.
2. **Uma parte dos custos diferidos é indistinguível de um ganho ou pode deixar de chegar.** Em missões vencedoras, houve 428 escolhas com ampulheta cuja continuação observada não apresentou perda ou não foi resolvida. Dessas ocorrências, 355 são colheitas de +4 em vez de +12, custo de oportunidade. Outras 27 são o vento que limpa o painel após a escolha de esperar. Os demais casos incluem notícias de perda que ficaram pendentes, efeito positivo do redemoinho e colisões de agendas por lugar. Para reproduzir a colheita, abra `broto`, economize energia e aguarde dois sóis. Para verificar a colisão, acompanhe agendas do mesmo lugar próximas ao último sol. A contagem é um sinal de auditoria e não equivale ao número de escolhas comprovadamente gratuitas.
3. **Custo em laboratório pode valer zero.** Um apagão de rádio reduz o que o laboratório produz naquele sol. Com alocação zero, reduzir pela metade ainda produz zero. Para reproduzir, use a opção econômica no clarão e encerre o sol com ciência zerada no painel. O redemoinho também pode só limpar os painéis. A regra precisa definir como tratar custos condicionais e de oportunidade.
4. **O desenho e o código têm regras diferentes.** `docs/GAME_DESIGN.md` ainda indica 14 sóis no Comandante e diferencia vitória parcial. O código usa 10 sóis nesse nível e estrelas conforme a ciência. O relatório mede o código e deixa a revisão do documento com o time.
5. **O teste de interface amostrou alvos e texto.** O Chrome emulado cobre as telas listadas e o toque inicial do tutorial. Ainda falta repetir em celular físico, com as fontes carregadas e zoom de acessibilidade. As porcentagens do motor também não substituem teste de compreensão com crianças.

## 4. Simulação das 63 combinações

- **Reserva:** lista `RESERVE_EVENTS` original, com as forças do jogo. **Fracos:** a mesma lista com força 1. **Vazia:** retiradas apenas as cartas DONKI do sorteio no catálogo de teste. O motor normalmente repõe lista vazia com 27 registros da reserva. Essa terceira coluna é um cenário de controle sem cartas solares.
- **Perfis:** aleatória esquece 25% dos alertas não urgentes e chega à noite em cerca de 90% dos demais sóis. Média escolhe por utilidade em 60% das vezes e ajusta se o ar ou a comida caírem abaixo de 40. Atenta e escudo escolhem por utilidade em 80% e ajustam a energia pelo estoque e consumo. O perfil escudo usa parte da sobra para se proteger. Cientista prioriza o laboratório. Ignora tudo encerra a noite sem responder e inclui urgências para testar o motor. Caos sorteia 0–20 por módulo e faz até três retornos. O comprador de ciência e as probabilidades são critérios do ensaio, não dados de crianças.
- **Vitórias** significam sobreviver. Estrelas são contagens entre vencedores, na ordem 1/2/3. Ciência inclui resgates. Coluna de resgate mostra intervalo de sóis e causa indicada pelo relatório (A = ar, C = comida, S = saúde). Alertas contam as cartas lançadas, incluindo continuações e repetições após voltar no tempo. O percentual solar conta cartas com registro real. Dano médio por missão segue **radiação / noite / ignorados / Sol / outros eventos / recursos críticos**. Danos de noite e cartas vêm do estado. Radiação, alertas perdidos e recursos críticos são os débitos calculados antes de limitar a saúde a zero.

### Cadete · reserva

| Perfil | Vitória | 1/2/3 estrelas | Ciência média/meta | Resgates · sóis · A/C/S | Cartas por missão | Cartas do Sol | Alertas por sol | Dano médio por origem |
| --- | ---: | --- | --- | --- | ---: | ---: | ---: | --- |
| aleatória | 95% | 3/12/4 | 16,7/24 | 1 · 6 · 0/1/0 | 18,3 | 16,9% | 2,6 | 10,6 / 27,0 / 9,5 / 5,2 / 3,9 / 8,2 |
| média | 100% | 1/13/6 | 19,4/24 | — | 20,0 | 16,2% | 2,9 | 8,0 / 6,0 / 0,0 / 9,9 / 5,9 / 0,2 |
| atenta | 100% | 0/1/19 | 29,0/24 | — | 20,1 | 15,7% | 2,9 | 8,1 / 4,4 / 0,0 / 8,3 / 5,8 / 0,0 |
| escudo | 100% | 0/10/10 | 22,1/24 | — | 19,9 | 15,8% | 2,9 | 7,0 / 4,4 / 0,0 / 5,8 / 6,0 / 0,5 |
| cientista | 0% | 0/0/0 | 36,4/24 | 20 · 2–3 · 20/0/0 | 5,2 | 22,9% | 2,2 | 3,5 / 1,6 / 0,0 / 0,0 / 0,8 / 6,8 |
| ignora tudo | 5% | 1/0/0 | 2,6/24 | 19 · 5–7 · 0/10/9 | 15,2 | 19,3% | 2,3 | 13,2 / 26,4 / 40,0 / 0,0 / 0,0 / 18,0 |
| caos | 15% | 3/0/0 | 5,0/24 | 17 · 3–6 · 0/17/0 | 12,1 | 17,8% | 2,4 | 7,4 / 9,8 / 4,8 / 2,7 / 2,3 / 8,2 |

### Cadete · fracos

| Perfil | Vitória | 1/2/3 estrelas | Ciência média/meta | Resgates · sóis · A/C/S | Cartas por missão | Cartas do Sol | Alertas por sol | Dano médio por origem |
| --- | ---: | --- | --- | --- | ---: | ---: | ---: | --- |
| aleatória | 95% | 3/12/4 | 16,7/24 | 1 · 6 · 0/1/0 | 18,3 | 16,9% | 2,6 | 10,6 / 27,0 / 9,5 / 2,7 / 3,9 / 8,2 |
| média | 100% | 1/13/6 | 19,4/24 | — | 20,0 | 16,2% | 2,9 | 8,0 / 6,0 / 0,0 / 5,0 / 5,9 / 0,2 |
| atenta | 100% | 0/1/19 | 29,0/24 | — | 20,1 | 15,7% | 2,9 | 8,1 / 4,4 / 0,0 / 4,5 / 5,8 / 0,0 |
| escudo | 100% | 0/10/10 | 22,3/24 | — | 19,9 | 15,8% | 2,9 | 7,0 / 4,4 / 0,0 / 4,0 / 6,0 / 0,5 |
| cientista | 0% | 0/0/0 | 36,4/24 | 20 · 2–3 · 20/0/0 | 5,2 | 22,9% | 2,2 | 3,5 / 1,6 / 0,0 / 0,0 / 0,8 / 6,8 |
| ignora tudo | 5% | 1/0/0 | 2,6/24 | 19 · 5–7 · 0/10/9 | 15,2 | 19,3% | 2,3 | 13,2 / 26,4 / 37,8 / 0,0 / 0,0 / 18,0 |
| caos | 15% | 3/0/0 | 5,0/24 | 17 · 3–6 · 0/17/0 | 12,1 | 17,8% | 2,4 | 7,4 / 9,8 / 4,8 / 1,2 / 2,3 / 8,2 |

### Cadete · vazia

| Perfil | Vitória | 1/2/3 estrelas | Ciência média/meta | Resgates · sóis · A/C/S | Cartas por missão | Cartas do Sol | Alertas por sol | Dano médio por origem |
| --- | ---: | --- | --- | --- | ---: | ---: | ---: | --- |
| aleatória | 90% | 2/12/4 | 17,2/24 | 2 · 5–6 · 0/2/0 | 18,7 | 0,0% | 2,7 | 10,1 / 26,2 / 11,8 / 0,0 / 4,8 / 3,8 |
| média | 100% | 0/20/0 | 15,4/24 | — | 19,8 | 0,0% | 2,8 | 8,1 / 5,8 / 0,0 / 0,0 / 6,0 / 1,0 |
| atenta | 100% | 0/7/13 | 25,9/24 | — | 19,8 | 0,0% | 2,8 | 8,2 / 3,0 / 0,0 / 0,0 / 5,3 / 1,0 |
| escudo | 100% | 1/18/1 | 16,5/24 | — | 19,9 | 0,0% | 2,9 | 7,0 / 3,2 / 0,0 / 0,0 / 6,2 / 0,0 |
| cientista | 0% | 0/0/0 | 44,0/24 | 20 · 2–3 · 20/0/0 | 5,2 | 0,0% | 2,2 | 3,6 / 1,4 / 0,0 / 0,0 / 1,0 / 7,2 |
| ignora tudo | 45% | 9/0/0 | 4,2/24 | 11 · 6–7 · 0/2/9 | 15,9 | 0,0% | 2,3 | 13,9 / 27,8 / 36,1 / 0,0 / 0,0 / 20,8 |
| caos | 15% | 3/0/0 | 6,2/24 | 17 · 3–7 · 0/17/0 | 13,6 | 0,0% | 2,4 | 8,2 / 10,2 / 6,0 / 0,0 / 3,8 / 10,2 |

### Piloto · reserva

| Perfil | Vitória | 1/2/3 estrelas | Ciência média/meta | Resgates · sóis · A/C/S | Cartas por missão | Cartas do Sol | Alertas por sol | Dano médio por origem |
| --- | ---: | --- | --- | --- | ---: | ---: | ---: | --- |
| aleatória | 15% | 0/2/1 | 24,1/34 | 17 · 6–10 · 0/1/16 | 24,0 | 16,9% | 2,5 | 26,9 / 34,8 / 12,4 / 9,2 / 5,4 / 14,8 |
| média | 90% | 0/16/2 | 24,9/34 | 2 · 7–9 · 0/0/2 | 28,4 | 15,7% | 2,9 | 27,9 / 7,6 / 0,0 / 28,0 / 8,2 / 0,5 |
| atenta | 90% | 0/6/12 | 36,5/34 | 2 · 8–10 · 0/0/2 | 28,6 | 15,4% | 2,9 | 27,6 / 5,7 / 0,0 / 21,0 / 7,8 / 0,5 |
| escudo | 100% | 0/10/10 | 31,2/34 | — | 28,6 | 15,0% | 2,9 | 12,1 / 6,8 / 0,0 / 11,9 / 8,1 / 1,0 |
| cientista | 0% | 0/0/0 | 41,9/34 | 20 · 2–3 · 20/0/0 | 6,2 | 20,3% | 2,2 | 8,1 / 1,6 / 0,0 / 2,5 / 1,1 / 10,5 |
| ignora tudo | 0% | 0/0/0 | 3,0/34 | 20 · 6–7 · 0/8/12 | 14,9 | 19,1% | 2,2 | 19,5 / 26,4 / 39,0 / 0,0 / 0,0 / 19,2 |
| caos | 0% | 0/0/0 | 5,2/34 | 20 · 3–8 · 0/20/0 | 10,8 | 19,5% | 2,2 | 13,8 / 8,8 / 4,3 / 2,7 / 1,9 / 12,8 |

### Piloto · fracos

| Perfil | Vitória | 1/2/3 estrelas | Ciência média/meta | Resgates · sóis · A/C/S | Cartas por missão | Cartas do Sol | Alertas por sol | Dano médio por origem |
| --- | ---: | --- | --- | --- | ---: | ---: | ---: | --- |
| aleatória | 25% | 0/4/1 | 24,4/34 | 15 · 6–10 · 0/1/14 | 24,5 | 16,9% | 2,5 | 27,0 / 35,4 / 12,7 / 5,2 / 5,9 / 15,0 |
| média | 100% | 0/18/2 | 25,1/34 | — | 29,1 | 15,5% | 2,9 | 28,6 / 7,6 / 0,0 / 13,3 / 8,7 / 0,5 |
| atenta | 100% | 0/6/14 | 37,1/34 | — | 28,9 | 15,3% | 2,9 | 28,1 / 5,8 / 0,0 / 10,2 / 7,8 / 0,8 |
| escudo | 100% | 0/10/10 | 31,7/34 | — | 28,6 | 15,0% | 2,9 | 12,1 / 6,8 / 0,0 / 7,8 / 8,1 / 1,0 |
| cientista | 0% | 0/0/0 | 41,9/34 | 20 · 2–3 · 20/0/0 | 6,2 | 20,3% | 2,2 | 8,1 / 1,6 / 0,0 / 1,0 / 1,1 / 10,5 |
| ignora tudo | 0% | 0/0/0 | 3,0/34 | 20 · 6–7 · 0/8/12 | 15,2 | 19,1% | 2,2 | 19,9 / 26,9 / 36,9 / 0,0 / 0,0 / 20,0 |
| caos | 0% | 0/0/0 | 5,2/34 | 20 · 3–8 · 0/20/0 | 10,8 | 19,5% | 2,2 | 13,8 / 8,8 / 4,3 / 1,4 / 1,9 / 12,8 |

### Piloto · vazia

| Perfil | Vitória | 1/2/3 estrelas | Ciência média/meta | Resgates · sóis · A/C/S | Cartas por missão | Cartas do Sol | Alertas por sol | Dano médio por origem |
| --- | ---: | --- | --- | --- | ---: | ---: | ---: | --- |
| aleatória | 40% | 0/7/1 | 24,6/34 | 12 · 5–10 · 0/3/9 | 24,9 | 0,0% | 2,6 | 27,8 / 35,5 / 15,9 / 0,0 / 7,0 / 13,2 |
| média | 95% | 2/16/1 | 20,0/34 | 1 · 9 · 0/1/0 | 28,1 | 0,0% | 2,8 | 27,6 / 6,6 / 0,0 / 0,0 / 9,0 / 5,2 |
| atenta | 100% | 0/9/11 | 33,9/34 | — | 28,4 | 0,0% | 2,8 | 27,9 / 5,4 / 0,0 / 0,0 / 6,9 / 2,5 |
| escudo | 100% | 0/20/0 | 23,9/34 | — | 28,4 | 0,0% | 2,8 | 12,2 / 5,4 / 0,0 / 0,0 / 8,6 / 2,2 |
| cientista | 0% | 0/0/0 | 48,1/34 | 20 · 2–3 · 20/0/0 | 5,8 | 0,0% | 2,2 | 7,8 / 1,8 / 0,0 / 0,0 / 1,0 / 10,0 |
| ignora tudo | 0% | 0/0/0 | 4,2/34 | 20 · 5–7 · 0/4/16 | 15,7 | 0,0% | 2,3 | 20,4 / 27,2 / 35,9 / 0,0 / 0,0 / 19,2 |
| caos | 5% | 1/0/0 | 4,3/34 | 19 · 3–10 · 0/19/0 | 13,4 | 0,0% | 2,3 | 16,5 / 11,2 / 6,5 / 0,0 / 3,5 / 13,8 |

### Comandante · reserva

| Perfil | Vitória | 1/2/3 estrelas | Ciência média/meta | Resgates · sóis · A/C/S | Cartas por missão | Cartas do Sol | Alertas por sol | Dano médio por origem |
| --- | ---: | --- | --- | --- | ---: | ---: | ---: | --- |
| aleatória | 0% | 0/0/0 | 20,1/36 | 20 · 5–10 · 0/6/14 | 19,0 | 17,6% | 2,5 | 36,5 / 29,1 / 10,3 / 7,2 / 4,8 / 12,8 |
| média | 60% | 1/11/0 | 18,1/36 | 8 · 8–10 · 0/0/8 | 27,0 | 15,7% | 2,8 | 39,6 / 7,2 / 0,0 / 37,0 / 7,7 / 0,5 |
| atenta | 80% | 1/10/5 | 29,9/36 | 4 · 8–10 · 0/0/4 | 27,6 | 15,1% | 2,8 | 40,9 / 5,6 / 0,0 / 28,8 / 6,7 / 1,5 |
| escudo | 95% | 0/16/3 | 25,9/36 | 1 · 8 · 0/0/1 | 28,3 | 15,2% | 2,9 | 20,5 / 5,8 / 0,0 / 19,5 / 8,1 / 1,5 |
| cientista | 0% | 0/0/0 | 36,5/36 | 20 · 2–3 · 20/0/0 | 4,8 | 26,0% | 2,0 | 11,8 / 1,4 / 0,0 / 0,0 / 0,5 / 10,5 |
| ignora tudo | 0% | 0/0/0 | 2,5/36 | 20 · 5–6 · 0/11/9 | 12,2 | 20,4% | 2,2 | 33,0 / 22,1 / 30,9 / 0,0 / 0,0 / 16,8 |
| caos | 0% | 0/0/0 | 5,0/36 | 20 · 2–8 · 0/19/1 | 10,5 | 20,5% | 2,2 | 24,1 / 9,0 / 5,0 / 1,3 / 2,2 / 14,2 |

### Comandante · fracos

| Perfil | Vitória | 1/2/3 estrelas | Ciência média/meta | Resgates · sóis · A/C/S | Cartas por missão | Cartas do Sol | Alertas por sol | Dano médio por origem |
| --- | ---: | --- | --- | --- | ---: | ---: | ---: | --- |
| aleatória | 0% | 0/0/0 | 20,6/36 | 20 · 5–10 · 0/6/14 | 19,3 | 17,6% | 2,5 | 37,6 / 29,8 / 10,9 / 3,8 / 4,8 / 13,8 |
| média | 95% | 1/18/0 | 19,2/36 | 1 · 10 · 0/0/1 | 28,5 | 15,4% | 2,9 | 42,5 / 8,0 / 0,0 / 18,3 / 8,2 / 0,8 |
| atenta | 95% | 0/12/7 | 32,4/36 | 1 · 10 · 0/0/1 | 28,4 | 15,5% | 2,8 | 42,5 / 5,4 / 0,0 / 15,9 / 7,8 / 2,2 |
| escudo | 100% | 0/17/3 | 26,9/36 | — | 28,6 | 15,2% | 2,9 | 20,9 / 6,0 / 0,0 / 10,5 / 8,3 / 1,8 |
| cientista | 0% | 0/0/0 | 36,5/36 | 20 · 2–3 · 20/0/0 | 4,8 | 26,0% | 2,0 | 11,8 / 1,4 / 0,0 / 0,0 / 0,5 / 10,5 |
| ignora tudo | 0% | 0/0/0 | 2,5/36 | 20 · 5–6 · 0/12/8 | 12,6 | 19,9% | 2,2 | 33,3 / 22,7 / 29,6 / 0,0 / 0,0 / 17,0 |
| caos | 0% | 0/0/0 | 5,0/36 | 20 · 2–8 · 0/19/1 | 10,5 | 20,5% | 2,2 | 24,1 / 9,0 / 5,0 / 0,7 / 2,2 / 14,2 |

### Comandante · vazia

| Perfil | Vitória | 1/2/3 estrelas | Ciência média/meta | Resgates · sóis · A/C/S | Cartas por missão | Cartas do Sol | Alertas por sol | Dano médio por origem |
| --- | ---: | --- | --- | --- | ---: | ---: | ---: | --- |
| aleatória | 5% | 0/1/0 | 23,2/36 | 19 · 6–10 · 0/4/15 | 20,9 | 0,0% | 2,4 | 39,9 / 31,8 / 11,8 / 0,0 / 6,2 / 17,0 |
| média | 80% | 5/11/0 | 16,9/36 | 4 · 8–9 · 0/4/0 | 26,6 | 0,0% | 2,7 | 40,5 / 7,2 / 0,0 / 0,0 / 8,8 / 6,2 |
| atenta | 100% | 1/17/2 | 26,4/36 | — | 28,2 | 0,0% | 2,8 | 41,8 / 5,2 / 0,0 / 0,0 / 7,3 / 3,5 |
| escudo | 100% | 4/16/0 | 19,3/36 | — | 28,4 | 0,0% | 2,8 | 22,1 / 5,4 / 0,0 / 0,0 / 8,5 / 2,0 |
| cientista | 0% | 0/0/0 | 45,3/36 | 20 · 2–3 · 20/0/0 | 4,9 | 0,0% | 2,0 | 11,8 / 1,4 / 0,0 / 0,0 / 0,9 / 11,0 |
| ignora tudo | 0% | 0/0/0 | 3,4/36 | 20 · 6 · 0/6/14 | 13,4 | 0,0% | 2,2 | 36,0 / 24,0 / 30,9 / 0,0 / 0,0 / 18,5 |
| caos | 0% | 0/0/0 | 4,0/36 | 20 · 2–10 · 0/20/0 | 12,8 | 0,0% | 2,3 | 28,1 / 10,6 / 5,8 / 0,0 / 2,6 / 13,8 |

**Robustez.** 64,926 estados verificados com recursos nos limites, números finitos e JSON válido, 8,772 restaurações com os mesmos alertas, 3,825 verificações do cansaço uma vez por sol e 1,260 replays iguais. Os 84 eventos apareceram pelo menos uma vez. O validador não apontou escolhas sem um custo declarado. Não apareceram escolhas executadas sem perda cuja opção também não estivesse marcada com custo adiado.

## 5. Equilíbrio e recomendações

| Meta de referência | Reserva | Fracos | Vazia | Leitura |
| --- | ---: | ---: | ---: | --- |
| Atenta no Cadete, perto de 100% | 100% | 100% | 100% | Dentro |
| Atenta no Piloto, 70–85% | 90% | 100% | 100% | Acima |
| Atenta no Comandante, 40–55% | 80% | 95% | 100% | Acima |
| Aleatória no Cadete, quase nunca resgatada | 5% resgate | 5% resgate | 10% resgate | Próximo; cenário sem Sol tem 2 em 20 |
| Ignora tudo no Cadete, perde quase sempre | 95% resgate | 95% resgate | 55% resgate | Falha no cenário sem Sol |
| Ignora tudo no Piloto e Comandante | 100% resgate | 100% resgate | 100% resgate | Dentro |

Com 20 sementes por célula, uma missão altera a taxa em **5 pontos percentuais**. O Piloto com reserva está a uma vitória da faixa. O Comandante com reserva está a **cinco vitórias** do limite superior. Antes de alterar valores, repetir as três estratégias de referência com pelo menos 200 sementes por cenário. A primeira comparação sugerida é dose base do Comandante de **2,8× → 3,2×** e **3,5×**, mantendo os outros parâmetros. Para o Piloto, medir uma alternativa de **−2 de comida inicial** separadamente. Não foram simulados contrafactuais com esses números, e nenhuma proposta foi aplicada. O perfil escudo superou o atento no ensaio com reserva de Piloto (100% × 90%) e Comandante (95% × 80%), o que indica benefício nos parâmetros do ensaio.

## 6. Navegador, textos e experiência da criança

- **Save e resgate:** 5 recargas com semente, sol e alertas preservados. Voltar ao sol verificou o mesmo quadro de alertas após resgate em cadete (2), comandante (2), piloto (1).
- **Relógio:** pausas confirmadas em carta (30), menu (2), tutorial (32). Houve 11 relatórios noturnos com a marca de cansaço e 10 idas à cama após anoitecer. 0 divergências no teste de pausa.
- **Finais:** estrelas observadas nas vitórias, 1 (1), 2 (10), 3 (16). Cada final foi aberto pelo fluxo normal, com relatório. O teste compara a quantidade de estrelas do DOM com a calculada pelo motor.
- **Rovi:** avisos observados por chave, rovi.ar (32), rovi.bateria (2), rovi.comida (32), rovi.depois (29), rovi.entardecer (4), rovi.sol2.ar (1), rovi.sol2.comida (31), rovi.tempestade (25). O caso 32 guarda a energia para encher a bateria. Os resgates intencionais atrasam a hora de dormir e deixam alertas pendentes. Também foi verificada a falta de energia no painel ao pedir mais que o disponível. A variante de ar no sol 2 também foi confirmada.
- **Fonte solar:** 112 cartas reais com selo conferido, 0 divergências. 0 rótulos técnicos reincidentes detectados nas cartas. O cenário histórico é conferido como histórico. O selo ao vivo foi exercitado com resposta DONKI controlada, sem chamar a Internet.
- **Erros do navegador:** 0 exceções JavaScript e 0 entradas de erro do navegador nas partidas concluídas. 0 cenários incompletos na matriz registrada.
- **Tutorial e ajuda:** setas comparadas com as posições dos alvos em tela. Pular e rever pelo menu foram testados. As sete páginas da ajuda foram percorridas. PT → EN → PT em partida preservou a semente e os alertas.
- **Cama:** cenário de regressão verificou a explicação durante o dia com alertas pendentes, o botão removido do computador e o encerramento normal pela cama. A matriz principal foi executada após as correções de leiaute e texto. Depois da correção da Casa, foram repetidas rotas de vitória e resgate, incluindo a noite com alertas pendentes.
- **Textos:** as chaves iguais entre idiomas foram revisadas (nomes como Rovi, Rover e termos compartilhados, como *menu*). Sem texto vazio, emoji visível nos dicionários ou variável divergente no validador. As três frases acima de 25 palavras da leitura automática foram revisadas. Permanecem desejáveis leitura por nativos em ES/FR/IT e teste com crianças. Nos textos revisados a NASA aparece como fonte ou nome do desafio, sem indicação de apoio oficial.
- **Pontos em que a criança pode se perder:** a produção de ciência e a proteção da saúde competem pela mesma energia. Os avisos do Rovi de manhã e na tempestade ajudam a explicar essa troca. O custo de oportunidade da colheita fraca ainda depende de comparar cartas vistas em sóis diferentes.

## 7. Antes da entrega

- Decidir como cobrar consequências de notícias ignoradas e opções com custo condicional. Repetir as sementes dos casos críticos depois.
- Revalidar equilíbrio com amostra maior no Piloto e no Comandante.
- Conferir em aparelho físico o toque, fontes e carregamento da versão que for publicada. Validar o DONKI real e as referências pendentes de OSDR/RadLab com o time de dados.
- Atualizar as regras divergentes no documento de design e fazer a revisão editorial final.
- Confirmar a versão publicada e a submissão com o time.

**Verificação final local:** `npm test` (45 testes em 7 arquivos), `npx tsc --noEmit -p .`, `npm run build` e `git diff --check` passaram. A simulação usou um teste temporário, removido após a execução.

### Partidas no navegador

| Caso | Nível | Modo | Idioma | Tela | Final | Sol | Estrelas | Ciência/meta |
| ---: | --- | --- | --- | --- | --- | ---: | ---: | --- |
| 1 | cadete | surpresa | pt | 360×640 | Vitória | 7 | 3 | 34/24 |
| 2 | piloto | surpresa | en | 375×812 | Vitória | 10 | 3 | 41/34 |
| 3 | comandante | surpresa | es | 1280×800 | Vitória | 10 | 2 | 27/36 |
| 4 | cadete | semana | fr | 375×812 | Vitória | 7 | 3 | 34/24 |
| 5 | piloto | semana | it | 1280×800 | Vitória | 10 | 3 | 45/34 |
| 6 | comandante | semana | pt | 360×640 | Resgate | 7 | 0 | 30/36 |
| 7 | cadete | famosa | en | 1280×800 | Vitória | 7 | 3 | 43/24 |
| 8 | piloto | famosa | es | 360×640 | Vitória | 10 | 2 | 29/34 |
| 9 | comandante | famosa | fr | 375×812 | Vitória | 10 | 3 | 48/36 |
| 10 | cadete | surpresa | it | 360×640 | Resgate | 7 | 0 | 35/24 |
| 11 | piloto | surpresa | pt | 375×812 | Vitória | 10 | 3 | 37/34 |
| 12 | comandante | surpresa | en | 1280×800 | Vitória | 10 | 2 | 33/36 |
| 13 | cadete | semana | es | 375×812 | Vitória | 7 | 3 | 27/24 |
| 14 | piloto | semana | fr | 1280×800 | Vitória | 10 | 2 | 24/34 |
| 15 | comandante | semana | it | 360×640 | Vitória | 10 | 2 | 30/36 |
| 16 | cadete | famosa | pt | 1280×800 | Vitória | 7 | 3 | 35/24 |
| 17 | piloto | famosa | en | 360×640 | Vitória | 10 | 2 | 29/34 |
| 18 | comandante | famosa | es | 375×812 | Vitória | 10 | 2 | 34/36 |
| 19 | cadete | surpresa | fr | 360×640 | Vitória | 7 | 3 | 40/24 |
| 20 | piloto | surpresa | it | 375×812 | Vitória | 10 | 2 | 19/34 |
| 21 | comandante | surpresa | pt | 1280×800 | Vitória | 10 | 3 | 51/36 |
| 22 | cadete | semana | en | 375×812 | Vitória | 7 | 3 | 39/24 |
| 23 | piloto | semana | es | 1280×800 | Vitória | 10 | 3 | 35/34 |
| 24 | comandante | semana | fr | 360×640 | Vitória | 10 | 2 | 26/36 |
| 25 | cadete | famosa | it | 1280×800 | Resgate intencional | 3 | 0 | 44/24 |
| 26 | piloto | famosa | pt | 360×640 | Resgate intencional | 3 | 0 | 46/34 |
| 27 | comandante | famosa | en | 375×812 | Resgate intencional | 3 | 0 | 50/36 |
| 31 | cadete | famosa | pt | 375×812 | Vitória | 7 | 3 | 34/24 |
| 32 | cadete | semana | pt | 360×640 | Vitória | 7 | 3 | 33/24 |
| 33 | cadete | surpresa | pt | 360×640 | Vitória | 7 | 1 | 1/24 |
| 34 | cadete | famosa | pt | 375×812 | Vitória | 7 | 2 | 22/24 |
| 35 | cadete | surpresa | pt | 375×812 | Vitória | 7 | 3 | 37/24 |

## 8. Quatro baterias complementares · 15/11/2026

Base `b6f5507`. Nesta rodada foram 8.640 simulações com as regras atuais, 2.160 com alternativas em memória, 10 cenários de recuperação e 17 perfis de leiaute no Chrome. O objetivo foi ampliar a cobertura e reproduzir os problemas prioritários. O código do jogo permaneceu no mesmo commit.

### A. Equilíbrio com uma amostra maior

Sementes 1001–1240, diferentes da primeira rodada. Cada célula abaixo resume 240 partidas. O cenário sem Sol retira as cartas DONKI do catálogo apenas durante o ensaio. Os perfis seguem as heurísticas da seção 4.

| Nível | Perfil | Reserva | Força 1 | Sem eventos do Sol |
| --- | --- | ---: | ---: | ---: |
| Cadete | aleatória | 96,3% (231/240) | 96,7% (232/240) | 98,3% (236/240) |
| Cadete | média | 100,0% (240/240) | 100,0% (240/240) | 98,8% (237/240) |
| Cadete | atenta | 100,0% (240/240) | 100,0% (240/240) | 100,0% (240/240) |
| Cadete | escudo | 100,0% (240/240) | 100,0% (240/240) | 100,0% (240/240) |
| Piloto | aleatória | 20,8% (50/240) | 26,7% (64/240) | 43,3% (104/240) |
| Piloto | média | 90,4% (217/240) | 92,9% (223/240) | 92,5% (222/240) |
| Piloto | atenta | 95,4% (229/240) | 98,8% (237/240) | 98,3% (236/240) |
| Piloto | escudo | 99,2% (238/240) | 99,6% (239/240) | 98,8% (237/240) |
| Comandante | aleatória | 1,7% (4/240) | 1,7% (4/240) | 5,8% (14/240) |
| Comandante | média | 55,4% (133/240) | 84,6% (203/240) | 88,3% (212/240) |
| Comandante | atenta | 56,3% (135/240) | 91,7% (220/240) | 96,7% (232/240) |
| Comandante | escudo | 95,0% (228/240) | 98,8% (237/240) | 96,3% (231/240) |

**Experimentos pareados com o perfil atento.** Cada comparação usa as mesmas 240 sementes. Os parâmetros alternativos só foram aplicados no processo de teste.

| Nível | Cenário | Ajuste experimental | Atual | Alternativa | Virou derrota / vitória |
| --- | --- | --- | ---: | ---: | ---: |
| Piloto | reserva | comida inicial 28 | 95,4% (229/240) | 95,0% (228/240) | 2 / 1 |
| Piloto | fracos | comida inicial 28 | 98,8% (237/240) | 99,2% (238/240) | 0 / 1 |
| Piloto | sem-sol | comida inicial 28 | 98,3% (236/240) | 98,8% (237/240) | 0 / 1 |
| Comandante | reserva | radiação ×3,2 | 56,3% (135/240) | 47,1% (113/240) | 23 / 1 |
| Comandante | fracos | radiação ×3,2 | 91,7% (220/240) | 83,8% (201/240) | 19 / 0 |
| Comandante | sem-sol | radiação ×3,2 | 96,7% (232/240) | 96,3% (231/240) | 1 / 0 |
| Comandante | reserva | radiação ×3,5 | 56,3% (135/240) | 35,8% (86/240) | 50 / 1 |
| Comandante | fracos | radiação ×3,5 | 91,7% (220/240) | 69,6% (167/240) | 53 / 0 |
| Comandante | sem-sol | radiação ×3,5 | 96,7% (232/240) | 94,2% (226/240) | 6 / 0 |

- **Piloto com reserva:** 95,4% de vitórias no perfil atento, acima da faixa de 70–85%. Tirar dois pontos de comida inicial trocou o resultado líquido de uma partida. O ajuste isolado teve pouco efeito.
- **Comandante com reserva:** 56,3%, perto da faixa de 40–55%. A taxa de 80% da amostra de 20 sementes caiu com a amostra maior. Radiação ×3,2 resultou em 47,1% com reserva e em 83,8% com eventos de força 1. Radiação ×3,5 levou a reserva a 35,8%. A mistura solar escolhida muda a interpretação da meta.
- **Escudo:** em Comandante com reserva, o perfil que reserva energia para o escudo chegou a 95,0%. O perfil atento sem essa estratégia ficou em 56,3%. A facilidade de entender e usar o escudo importa para a dificuldade percebida.

### B. Custos e continuações no último sol

- **Limite de agenda:** 25/25 continuações disponíveis no penúltimo sol apareceram no último, quando estavam sozinhas. Guardar sementes de rabanete e plantar batata ficaram indisponíveis.
- **Conflito de lugar:** 24 casos em que o teste colocou uma notícia concorrente na frente, no mesmo local. A segunda foi adiada para depois do fim. Exemplo controlado: no Piloto, coloque `alarme_teste` antes de `sol_nuvem_chega` no Abrigo no sol 10. Essa contagem mede a reprodução em estados preparados. A frequência natural permanece por medir.
- **Perdas evitáveis:** 10 eventos custaram menos ao serem ignorados no ensaio isolado, pelo critério ponderado da seção 3. No Piloto, escudo zero e força 2, abrir `sol_nuvem_chega` tira 26 de saúde antes da escolha. Ignorá-la tira 4 pela pior opção e 2 pelo alerta pendente, além da radiação comum às duas rotas.
- **Laboratório desligado:** em 5 opções testadas, `radio_mudo` foi aplicado com alocação zero no laboratório. As escolhas registraram zero de perda imediata e a noite continuou rendendo zero de ciência.

| Evento | Perda ao abrir no estado de teste |
| --- | --- |
| `sol_nuvem_chega` | saude -26 |
| `vazamento_volta` | ar -5 |
| `gerador_quebrou` | ar -8, energia -2 |
| `lab_contaminado` | energia -2 |
| `alarme_teste` | saude -2, energia -3 |
| `roda_conserto` | energia -3 |
| `rover_atolou` | energia -3 |
| `tremor_estrago` | saude -1, energia -2 |
| `dor_cabeca_piora` | saude -4, ciencia -1 |
| `rover_frio` | energia -3 |

### C. Saves e falhas do DONKI

9/10 cenários passaram. As respostas do DONKI foram controladas no Chrome. O jogo usou seu caminho normal de carregamento, reserva e retomada.

| Cenário | Rede simulada | Resultado |
| --- | --- | --- |
| donki-fixture | fixture | Processou resposta válida e marcou um registro simulado como ao vivo. |
| donki-timeout | timeout | 16 requisições abortadas pelo cliente. Nova missão abriu com a reserva. |
| gravacao-bloqueada | http503 | Chegou à manhã com leitura e gravação negadas no slot do jogo. |
| json-quebrado | malformado | Descartou o JSON inválido e iniciou nova missão com a reserva. |
| resgate-salvo | vazio | Abriu o relatório e voltou ao checkpoint com os mesmos alertas. |
| save-alerta-aberto | fixture | Preservou o alerta já aberto e os recursos após o efeito da tempestade. |
| save-manha | timeout | Restaurou semente, recursos e alertas da manhã. |
| save-noite | erro | Restaurou o resumo da noite e permitiu avançar à manhã. |
| v2-incompleto | vazio | Falhou. A tela mostrou: Algo deu errado na base. |
| versao-antiga | erro | Descartou a versão antiga e iniciou nova missão com a reserva. |

**Reprodução do save incompleto:** grave JSON válido no slot `marsops:save:1` com `state.v = 2`, `game.version = 2` e `phase = mapa`, sem os campos `game.alerts` e `game.resources`. Abra `/play?mode=continue`. O leitor aceita a versão e a tela cai no tratamento de erro. Validar a estrutura mínima e voltar à seleção permitiria recuperar a sessão.

### D. Leiaute em telas menores e build Vercel

17/17 perfis concluídos e 187 leituras. Os cinco idiomas foram exercitados em 320×568, 390×844 e 1280×720. FR e IT também foram testados em paisagem, a 740×390 e 667×375. O Chrome visitou Início, as sete telas da ajuda, Fontes, Sobre e Seleção de missão.

| Medida no conjunto observado | Capturas com ocorrência |
| --- | ---: |
| Rolagem horizontal | 0 |
| Título ou controle fora da largura | 0 |
| Alvo interativo menor que 44 px | 0 |
| Variável sem substituição | 0 |
| Imagem carregada sem dados | 0 |

**Build local direcionado à Vercel:** `NITRO_PRESET=vercel npm run build` retornou código 0. Preset registrado: `vercel`. Manifesto `.vercel/output/config.json`: presente. Ainda falta conferir o deploy, o domínio, o DONKI ao vivo e o celular físico.

**Ordem sugerida para o Claude:** tratar o save v2 incompleto, decidir a cobrança das notícias ignoradas e das duas continuações do mesmo prédio, depois revisar a dificuldade de Piloto e os cenários solares. As alternativas de balanceamento acima são resultados de teste.
