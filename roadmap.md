# Roadmap

## Yckler — botões da tela "Escolha sua missão"
- [x] Mover "Continuar missão" para baixo do painel "De onde vêm os eventos do Sol?"
- [x] Adicionar botão "Iniciar Missão" à direita de "Continuar missão"
- [x] Chave `ui.iniciar` nos 5 idiomas
- [x] Conferir no navegador (PC e celular)

## Leo — corrigir link do DONKI em /fontes
- [x] Cartão "NASA DONKI" deve abrir https://ccmc.gsfc.nasa.gov/tools/DONKI/ (era https://api.nasa.gov/)
- [x] Conferir a página /fontes no navegador
- [x] Não publicar o site (nada foi publicado)

## Yckler — cena da tela inicial em vídeo
- [x] Tela inicial roda o vídeo da cena em loop
- [x] Vídeo cobre a tela inteira, sem borda, em qualquer tamanho
- [x] Título, botões e links continuam legíveis nos 5 idiomas
- [x] Conferir no navegador (celular, PC e tela bem larga)
- [x] Usar o vídeo 4K original na tela inicial e remover a arte parada public/assets/hub/cena.webp (pedido do Yckler)

## Leo — nome da equipe em /sobre
- [x] Substituir o texto provisório de `aboutTeam` por `cavalodetroia.exe` nos 5 idiomas (nome próprio, sem traduzir)
- [x] Conferir a página /sobre nos 5 idiomas no navegador
- [x] Não publicar o site (nada foi publicado)
- [ ] Sincronizar o commit do nome da equipe com o GitHub (remote ainda em 31eab2c)
- [ ] Relatar o problema preexistente da home (erro de execução "Importing a module script failed.") — fora do escopo desta tarefa, sem corrigir

## Pendente (fora do escopo desta tarefa)
- [ ] Home: tela em branco por "Importing a module script failed." — só relatar, não corrigir agora

## Leo — tipografia pixel do site + mídia estática da home
- [x] Trocar Pixelify por Press Start 2P (títulos) e VT323 (leitura/botões) em __root.tsx, styles.css, home, /sobre, /fontes, cabeçalho e rodapé
- [x] Home: medir título com Press Start 2P e botões com VT323, recalcular quando as fontes carregarem
- [x] Copiar o MP4 4K original (4240998 bytes, SHA256 304cc211…a2) e o poster para public/assets/hub/ e usar /assets/hub/... na home (funciona no Lovable e num build Vite normal)
- [x] Conferir home, /sobre, /fontes em celular e desktop, 5 idiomas e acentos; vídeo responde com mídia real e toca em loop
- [x] Não publicar

## Leo — folga do título na home (commit 5f5edd7)
- [x] Aumentar a folga superior do bloco do título (pt-[max(3vh,54px)] → pt-[max(3vh,80px)]) para a 1ª linha ficar abaixo do seletor de idioma
- [x] Preservar o cálculo responsivo e os controles do rodapé
- [x] Conferir 390x844, 360x640 e telas deitadas baixas (844x390, 640x360)
- [x] Não publicar (nada foi publicado)

## Leo — botões, vídeo e telas largas (após ce881cb)
- [x] Home: texto dos botões sempre dentro da arte com ~9% de folga nos 5 idiomas (medida no documento, com contorno e sombra)
- [x] Home: vídeo toca sozinho, mudo, em loop; 1080p para telas menores e 4K a partir de 1440px; só para com "menos movimento"
- [x] /fontes e /sobre sem rolagem em telas ≥1536px (colunas); celular continua rolando
- [x] Conferir 360x640, 390x844, 844x390, 768x1024, 1230x800, 1366x768, 1536x864, 1920x940, 1920x1080, 2560x1440
- [x] Não publicar
