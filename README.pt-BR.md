# Operação Marte: Última Base

[Read in English](README.md)

**Operação Marte: Última Base** é um jogo de navegador para crianças de 7 a 12 anos. A criança comanda uma base marciana, divide a energia entre quatro sistemas e investiga alertas para manter a tripulação com ar, comida e proteção. Cada decisão tem um custo.

Projeto da equipe **cavalodetroia.exe** para o desafio *Build a Junior Astronaut Mission Trainer*, do **NASA Space Apps Challenge 2026**.

[**Jogar Operação Marte**](https://mars-ops-last-outpost.vercel.app/)

## Como jogar

1. Escolha **Cadete** (7 sóis), **Piloto** (10 sóis) ou **Comandante** (10 sóis). Um sol é um dia marciano.
2. Siga os alertas, entre no prédio e abra o terminal. As escolhas mostram seus custos. O botão **Por quê?** explica a ciência do resultado.
3. Divida a energia entre a fábrica de ar, a estufa, o laboratório e o escudo de areia. O plano passa para o próximo sol.
4. Termine o sol na cama da Casa. À noite, alertas ainda pendentes podem trazer consequências.
5. Sobreviva até o último sol e ganhe até três estrelas de acordo com a ciência acumulada. Se a Terra resgatar a tripulação, o relatório explica o que aconteceu e pode oferecer a opção de voltar a um sol anterior.

Jogue por toque, mouse, setas ou WASD. O jogo tem português brasileiro, inglês, espanhol, francês e italiano. Na primeira visita, ele consulta os idiomas preferidos do navegador. O seletor do jogo permite mudar o idioma e guarda a sua escolha.

## Dados da NASA

O jogo consulta clarões solares, ejeções de massa coronal, eventos de partículas energéticas e tempestades geomagnéticas no DONKI da NASA. Os registros fornecem datas e detalhes para os alertas. Se a consulta falhar, o jogo pode usar registros históricos incluídos no repositório. As cartas mostram a data e o link da fonte.

O atraso do rádio entre a Terra e Marte é estimado com elementos orbitais da NASA/JPL. Custos, danos e intervalos dos eventos são regras da simulação. [Fontes e uso dos dados](docs/DATA_SOURCES.md)

## Privacidade

O jogo abre sem cadastro, download ou anúncios. A missão, o nome opcional, as figurinhas e as preferências ficam no armazenamento local do navegador. Limpar os dados do site apaga essas informações. As consultas ao DONKI enviam datas e filtros. O nome e o progresso do jogador ficam no dispositivo.

## Conteúdo gerado por IA (Super Intelligence)
- **Vozes:** todas as falas gravadas (Rovi, Controle de Missão, astronautas) foram geradas por IA de voz (ElevenLabs, Eleven v3), em `public/audio/voz/`.
- **Música:** a trilha 8-bit em `public/audio/musica/` foi gerada por IA (Suno).
- **Efeitos sonoros:** os efeitos 8-bit da interface em `public/audio/sfx/` foram sintetizados por código (`scripts/gerar-efeitos-8bit.py`), escrito com ajuda de IA. Os ambientes e efeitos realistas (vento, portas, rádio, rover, passos) em `public/audio/ambiente/` e `public/audio/sfx/` foram gerados por IA (ElevenLabs Sound Effects).
- **Arte:** a pixel art foi criada com ferramentas de imagem por IA e editada pela equipe. Nenhum logo ou marca da NASA é usado.
- **Código e textos:** escritos pela equipe com assistentes de IA (Claude, ChatGPT/Codex, Lovable). As regras do jogo, o uso dos dados e as decisões são da equipe.

## Rodar localmente

```bash
npm install
npm run dev
npm test
npx tsc --noEmit -p .
npm run build
```

O projeto usa TanStack Start, React, TypeScript, Vite, Tailwind CSS e Vitest. O motor está em [src/game/engine](src/game/engine). O catálogo de eventos e os textos do jogo nos cinco idiomas estão em [src/content](src/content).

O jogo está hospedado na Vercel com `NITRO_PRESET=vercel`. A branch `main` sincroniza com o Lovable. Preserve o histórico compartilhado ao trabalhar com commits publicados. [Projeto no Lovable](https://lovable.dev/projects/bedd89e3-d75e-4d30-aca6-0a37da005e2e) · [Regras de contribuição](AGENTS.md)

## Documentação

- [Design e regras do jogo](docs/GAME_DESIGN.md)
- [Fontes de dados e referências científicas](docs/DATA_SOURCES.md) e [registro de pesquisa em português](docs/DATA_SOURCES.pt-BR.md)
- [Guia de escrita e tradução](docs/STYLE_GUIDE.md)
- [Guia de arte](docs/ART.md)
- [Sons, músicas e vozes](docs/SONS-E-VOZES.md)
- [Relatório de testes em inglês](docs/QA_REPORT.md) e [registro completo em português](docs/RELATORIO-TESTES-CHATGPT.md)
- [Equipe e fluxo de Git](docs/TEAM.md)

## Equipe

- [Leonardo Augusto de Oliveira Santos](https://www.linkedin.com/in/leoaugustto/)
- [Bruno Assis Oliveira](https://www.linkedin.com/in/bruno-assis-oliveira)
- [Vinicius da Silva Lima](https://www.linkedin.com/in/viniciusdasilvalima123)
- [Felipe Souza Siqueira](https://www.linkedin.com/in/felipe-souza-siqueira/)
- [Bernardo Galvao Alvarenga Morais e Silva](https://www.linkedin.com/in/bernardo-morais-ti)
- [Yckler Ryan Duarte Tomicki](https://www.linkedin.com/in/ycklertomicki)

Operação Marte é um projeto independente do hackathon. A NASA é creditada como fonte de dados.
