# Operação Marte: Última Base · MARS OPS: Last Outpost 🚀🔴

Jogo de navegador para crianças de **7 a 12 anos**: comande uma base em Marte, um **sol** (dia marciano) de cada vez.
Divida a energia entre **ar, comida, ciência e escudo**, e enfrente **tempestades solares reais** registradas pela NASA (DONKI).
Nenhuma escolha é de graça e, quando algo dá errado, o Controle de Missão explica por quê.

**NASA Space Apps Challenge 2026** · Desafio: *Build a Junior Astronaut Mission Trainer*

**Jogar agora:** https://mars-ops-last-outpost.vercel.app

> Projeto independente feito para o hackathon. Usa dados públicos da NASA como fonte; não tem apoio nem endosso oficial da NASA.

- 🎮 Sem cadastro, sem download: abre e joga (celular ou PC)
- 🌍 5 idiomas: Português, English, Español, Français, Italiano
- 🔁 Histórias aleatórias, mas sempre encadeadas: cada missão é diferente
- 📚 Dados reais da NASA citados dentro do jogo ([docs/DATA_SOURCES.md](docs/DATA_SOURCES.md))

## Rodar localmente
```bash
npm install
npm run dev     # abre o site
npm test        # testes do motor, validador de eventos/traduções e telas
npm run build   # confere se publica
```

## Como jogar (resumo)
- Escolha o nível: **Cadete** (7 sóis), **Piloto** (10) ou **Comandante** (10).
- Ande pela base, entre nos prédios com alerta e use o computador. Toda escolha custa algo; não escolher também custa.
- Divida a energia em **Energia**: ar, estufa (comida), laboratório (ciência) e escudo.
- Resolva os alertas e durma na cama da Casa antes da noite.
- Sobreviveu até o último sol? Vitória, com **1 a 3 estrelas** de ciência. Se algo acabar, a Terra resgata a tripulação e o relatório mostra o que mudar.

## Privacidade
- Sem conta, sem login, sem coleta de dados de crianças, sem anúncios e sem rastreadores.
- O progresso fica só no navegador (`localStorage`: save da missão, figurinhas, nome escolhido e eventos recentes). Apagar os dados do site apaga tudo.
- O jogo busca eventos do Sol direto no DONKI (CCMC/NASA), sem chave e sem enviar dados pessoais.
- O nome digitado pela criança fica só no aparelho e nunca é enviado.

## Publicação
Vercel, com deploy automático a cada envio para a `main` (variável `NITRO_PRESET=vercel` no projeto).

## Lovable
As telas do site são feitas no [editor do Lovable](https://lovable.dev/projects/bedd89e3-d75e-4d30-aca6-0a37da005e2e), que sincroniza com este repositório (branch `main`) nos dois sentidos.
Nunca force push / rebase / amend em commits já enviados. Regras completas no [AGENTS.md](AGENTS.md).

## Documentação
- [AGENTS.md](AGENTS.md): regras do projeto (para pessoas e IAs)
- [docs/GAME_DESIGN.md](docs/GAME_DESIGN.md): como o jogo funciona
- [docs/DATA_SOURCES.md](docs/DATA_SOURCES.md): o que é dado real e o que é simplificação
- [docs/STYLE_GUIDE.md](docs/STYLE_GUIDE.md): como escrever para crianças
- [docs/TEAM.md](docs/TEAM.md): time, tarefas e fluxo de Git
- [docs/SONS-E-VOZES.md](docs/SONS-E-VOZES.md): plano de música, efeitos e vozes
- [docs/RELATORIO-TESTES-CHATGPT.md](docs/RELATORIO-TESTES-CHATGPT.md): bateria de testes

## Time
Leo · Vinicius · Yckler · Felipe · Bruno · (6º integrante)
