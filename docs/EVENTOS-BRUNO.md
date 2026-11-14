# Eventos por lugar da base — MARS OPS

Branch `feat/content-eventos-locais`. Números = valores de jogo (simulação), não medições reais.

## ☀️ Painéis solares

### 🌀 Um redemoinho de poeira! (`redemoinho`)

Um redemoinho de poeira está passando perto dos painéis solares. Ele pode sujar os painéis... ou soprar a poeira velha embora!

- **Cobrir os painéis** — efeito: -3 energia
  - Resultado: Os painéis ficaram protegidos, mas cobrir tudo gastou energia.
  - Por quê? Em Marte, o vento pode sujar ou limpar os painéis. Por isso é difícil saber quanta energia a base vai ter amanhã.
- **Deixar passar e filmar** — efeito: +1 ciência; depois (1 sol): O redemoinho passou → -20% luz dos painéis (se os painéis estavam sujos: +30%)
  - Resultado: Vocês filmaram o redemoinho para os cientistas. Amanhã vamos ver o que ele fez com os painéis.
  - Por quê? Em 2005, um redemoinho passou por cima do robô Spirit e limpou os painéis dele. A energia do robô subiu muito!

### 💥 Uma pedrinha rachou um painel! (`painel_rachado`)

Uma pedrinha que veio do espaço caiu na base e rachou um painel solar.

- **Sair e consertar hoje** — efeito: -2 energia, -4 ar
  - Resultado: O painel voltou a funcionar, mas o conserto gastou energia e o ar do traje.
  - Por quê? Fora da base não dá para respirar: o ar de Marte é quase todo gás carbônico. Todo conserto lá fora gasta o ar do traje.
- **Desligar só o pedaço quebrado** — efeito: -20% luz dos painéis
  - Resultado: Ninguém precisou sair, mas os painéis agora fazem menos energia.
  - Por quê? O ar de Marte é bem fino e protege pouco. Por isso pedras do espaço chegam ao chão. A sonda InSight, da NASA, sentiu várias delas batendo em Marte.

### ❄️ Chegou o inverno em Marte (`inverno`)

Marte também tem estações do ano. No inverno, o dia fica mais curto e o Sol fica mais baixo. Os painéis fazem menos energia.

- **Virar os painéis para o Sol** — efeito: -3 energia, +20% luz dos painéis
  - Resultado: Os painéis pegam mais luz de novo, mas mexer em tudo gastou energia.
  - Por quê? No inverno, o robô Opportunity parava em ladeiras viradas para o Sol. Assim os painéis dele pegavam mais luz.
- **Economizar: pausar o laboratório** — efeito: -2 ciência, +3 bateria
  - Resultado: A bateria guardou energia para os dias curtos, mas a pesquisa parou.
  - Por quê? Marte tem estações porque é inclinado, como a Terra. No inverno, cada dia tem menos horas de sol para os painéis.

## 💨 Fábrica de ar

### 🚪 A porta está chiando! (`vazamento`)

A porta da fábrica de ar está fazendo fsssss. Um pouquinho de ar está escapando!

- **Procurar o furinho com calma** — efeito: -3 energia
  - Resultado: Vocês acharam o furo e fecharam de vez. Mas isso gastou a energia de um dia de trabalho.
  - Por quê? Em 2020, astronautas da Estação Espacial soltaram folhinhas de chá no ar. Elas flutuaram até o furinho e mostraram o vazamento!
- **Colar um remendo rápido** — efeito: -1 energia; depois (2–3 sol): O remendo soltou! → -5 ar
  - Resultado: O chiado parou... por enquanto. O remendo pode soltar.
  - Por quê? Na Estação Espacial, o furo primeiro ganhou um remendo provisório. Depois, os engenheiros planejaram o conserto de verdade.

### 🔊 Barulho estranho na máquina de ar (`gerador_barulho`)

A máquina que faz o ar da base está fazendo tec, tec, tec. Isso não é normal!

- **Desligar e revisar hoje** — efeito: -6 ar
  - Resultado: A peça frouxa foi apertada. Mas, com a máquina desligada, a base fez menos ar hoje.
  - Por quê? O ar de Marte é quase todo gás carbônico. A máquina MOXIE, do robô Perseverance, conseguiu tirar oxigênio desse gás!
- **Deixar ligada e trabalhar** — efeito: +1 ciência; depois (1–2 sol): A máquina de ar parou! → -8 ar, -2 energia
  - Resultado: O ar continuou saindo e vocês trabalharam mais. Mas o barulho continua...
  - Por quê? Um barulho novo numa máquina é um aviso. Consertar cedo costuma dar menos trabalho do que consertar depois que quebra.

### 💧 Água escondida no ar (`agua_do_ar`)

Quando a gente respira e sua, o ar da base fica úmido. Dá para pegar essa água de volta!

- **Ligar o coletor de água** — efeito: -2 energia, +5 comida
  - Resultado: Vocês juntaram água para regar a estufa. As plantas agradecem! O coletor gastou energia.
  - Por quê? Na Estação Espacial, quase toda a água é reciclada, até a do suor e da respiração. Ela é limpa e usada de novo.
- **Guardar a energia na bateria** — efeito: -3 comida, +2 bateria
  - Resultado: A bateria ficou mais cheia, mas a estufa recebeu menos água.
  - Por quê? Levar água da Terra é muito difícil. Em missões longas, cada gota que não é reciclada faz falta.

## 🌱 Estufa

### 🍂 Manchas nas folhas! (`mofo`)

Algumas folhas da estufa estão com mofo. Mofo é um fungo que cresce onde tem muita umidade.

- **Cortar as folhas doentes** — efeito: -4 comida
  - Resultado: As plantas ficaram salvas, mas vocês perderam um pouco de comida.
  - Por quê? Em 2015, flores chamadas zínias pegaram mofo na Estação Espacial. O astronauta Scott Kelly cortou as partes doentes e salvou algumas.
- **Ligar ventiladores para secar** — efeito: -2 energia, -1 comida
  - Resultado: O vento secou as folhas. Os ventiladores gastaram energia e algumas folhas murcharam.
  - Por quê? Os astronautas ligaram ventiladores para secar as zínias. Mas vento demais também secou as plantas! Tudo precisa de equilíbrio.

### 🌶️ Os rabanetes ficaram prontos! (`rabanete`)

Os rabanetes cresceram rápido e já podem ser colhidos. As batatas ainda vão demorar.

- **Colher e comer todos** — efeito: -1 energia, +7 comida
  - Resultado: Que banquete! Vocês ganharam bastante comida hoje, mas não sobrou semente.
  - Por quê? Rabanete cresce rápido. Na Estação Espacial, os rabanetes ficaram prontos em só 27 dias!
- **Guardar alguns para plantar** — efeito: -1 energia, +2 comida; depois (3 sol): Nova colheita de rabanetes! → +9 comida
  - Resultado: Vocês comeram um pouco e replantaram o resto. Daqui a uns sóis, tem mais!
  - Por quê? Numa base longe da Terra, guardar sementes é importante: elas viram comida nova sem esperar uma nave.

### 📦 Chegaram sementes da Terra! (`sementes_terra`)

Uma caixa de sementes saiu da Terra muitos meses atrás e finalmente chegou. Só cabe um tipo no canteiro.

- **Plantar alface (rápida)** — efeito: -1 energia; depois (2 sol): A alface cresceu! → +5 comida
  - Resultado: A alface cresce rápido, mas dá pouca comida.
  - Por quê? Em 2015, astronautas da Estação Espacial comeram uma alface plantada lá mesmo, no espaço!
- **Plantar batata (demora)** — efeito: -2 energia; depois (4 sol): Hora de colher batatas! → +12 comida
  - Resultado: A batata vai demorar, mas vai dar muita comida.
  - Por quê? Uma viagem da Terra até Marte leva muitos meses. Plantas que dão muita comida ajudam a base a depender menos da Terra.

## 🔬 Laboratório

### 🔬 O microscópio quebrou! (`microscopio`)

O microscópio parou de focar. Uma pecinha quebrou, e a loja mais perto fica em outro planeta!

- **Imprimir uma peça nova** — efeito: -3 energia
  - Resultado: A impressora 3D fez a peça! Mas gastou bastante energia.
  - Por quê? Em 2014, a NASA mandou por mensagem o desenho de uma ferramenta para a Estação Espacial. Lá, ela foi feita numa impressora 3D!
- **Usar uma lupa simples** — efeito: -2 ciência
  - Resultado: Dá para trabalhar, mas a lupa mostra bem menos detalhes. A pesquisa rendeu menos.
  - Por quê? O microscópio mostra coisas pequenas demais para o olho e para a lupa. Ferramenta boa faz muita diferença na ciência.

### 🧊 Gelo embaixo do chão! (`gelo`)

O robô cavou um buraco perto da base e achou gelo de água escondido embaixo da areia!

- **Estudar o gelo** — efeito: -2 energia, +3 ciência
  - Resultado: Uma descoberta importante para a ciência! A análise gastou energia.
  - Por quê? Em 2008, a sonda Phoenix, da NASA, cavou o chão de Marte e confirmou: havia gelo de água ali embaixo!
- **Derreter para regar as plantas** — efeito: -1 ciência, +5 comida
  - Resultado: A estufa ganhou água e vai dar mais comida. Mas a amostra para estudar se perdeu.
  - Por quê? Usar o que já existe em Marte, como o gelo, é um dos planos para bases do futuro. Assim é preciso levar menos coisas da Terra.

### 🦠 Experimento com bactérias (`bacterias`)

A equipe quer estudar bactérias, seres vivos tão pequenos que só aparecem no microscópio.

- **Fazer dentro da caixa fechada** — efeito: -3 energia, +4 ciência
  - Resultado: Tudo seguro, e a pesquisa deu certo! Mas a caixa gastou bastante energia.
  - Por quê? A Estação Espacial tem uma caixa fechada com luvas para experimentos. Nada lá de dentro escapa para a nave.
- **Fazer rápido, na mesa** — efeito: -1 energia, +3 ciência; depois (1–2 sol): O laboratório ficou sujo → -2 ciência
  - Resultado: Mais rápido e mais barato! Mas algumas bactérias podem ter escapado...
  - Por quê? A NASA limpa muito bem as naves antes de ir para Marte, para não levar micróbios da Terra. Isso se chama proteção planetária.

## 🛡️ Abrigo

### 🧱 Rachadura na camada de areia (`rachadura`)

A areia que cobre a base rachou num canto. Ela bloqueia a radiação, uma energia invisível que faz mal ao corpo.

- **Mandar o robô tapar** — efeito: -3 energia
  - Resultado: O robô cobriu a rachadura. A proteção está inteira, mas gastou energia.
  - Por quê? A Terra tem um escudo magnético e um ar grosso que protegem da radiação. Marte não tem. Por isso, cientistas estudam cobrir as casas com areia de Marte.
- **Deixar para depois** — efeito: -1 escudo
  - Resultado: Nenhuma energia gasta hoje, mas a base perdeu uma camada de proteção.
  - Por quê? Uma camada de areia mais fina deixa passar mais radiação. Cada camada a mais ajuda a proteger a equipe.

### 🚨 Hora do treino de emergência? (`treino`)

Faz tempo que a equipe não treina o que fazer numa emergência. Treinar agora ou trabalhar?

- **Treinar hoje** — efeito: -2 energia, -1 ciência
  - Resultado: A equipe sabe de cor o que fazer! Mas o treino gastou energia e tempo de pesquisa.
  - Por quê? Os astronautas da Estação Espacial treinam muitas vezes o que fazer em caso de fogo ou vazamento de ar.
- **Trabalhar e treinar outro dia** — efeito: +2 ciência; depois (1–2 sol): O alarme tocou! → -3 energia, -2 saúde
  - Resultado: Vocês fizeram mais ciência hoje. Mas a equipe está sem treino...
  - Por quê? No espaço não tem bombeiro por perto. Os próprios astronautas fazem o socorro, por isso precisam treinar.

## 📡 Antena

### 🎂 Aniversário na base! (`aniversario`)

Hoje é aniversário de um astronauta! A família dele mandou uma mensagem em vídeo lá da Terra.

- **Fazer uma festinha** — efeito: -4 comida, +4 saúde
  - Resultado: Teve bolo, e todos viram o vídeo juntos. A equipe ficou feliz, mas a festa gastou comida.
  - Por quê? Ficar longe de casa é um dos grandes desafios de ir a Marte. A NASA estuda como manter os astronautas felizes e unidos.
- **Ver o vídeo depois do trabalho** — efeito: -2 saúde, +2 ciência
  - Resultado: A pesquisa andou, mas o aniversariante ficou triste o dia todo.
  - Por quê? Uma mensagem leva de 4 a 24 minutos para ir de Marte à Terra. Por isso a família manda vídeo gravado: não dá para conversar ao vivo.

### 🏫 Uma escola da Terra chamou! (`escola`)

Crianças de uma escola na Terra querem saber como é viver em Marte!

- **Gravar um vídeo para as crianças** — efeito: -2 energia, +2 saúde
  - Resultado: As crianças adoraram! A equipe ficou feliz, mas a antena gastou energia.
  - Por quê? Astronautas da Estação Espacial conversam com escolas pelo rádio. Mais de mil escolas já fizeram perguntas para eles!
- **Mandar só os dados da missão** — efeito: -2 saúde, +2 ciência
  - Resultado: Os cientistas ganharam dados novos, mas a equipe não teve pausa e ficou cansada.
  - Por quê? Os cientistas na Terra estudam os dados que as missões mandam. É assim que a gente descobre coisas novas sobre Marte.

### 📡 A antena entortou! (`antena_torta`)

O vento empurrou a antena. Agora ela não aponta para a Terra, e as mensagens não chegam.

- **Um astronauta sai para arrumar** — efeito: -5 ar, -1 saúde
  - Resultado: A antena voltou ao lugar! Mas o passeio gastou o ar do traje e cansou.
  - Por quê? A antena precisa apontar direto para a Terra. Lá, a NASA tem antenas gigantes em três lugares do mundo para ouvir as naves.
- **Mandar o robô arrumar** — efeito: -3 energia
  - Resultado: O robô arrumou a antena sem ninguém sair, mas gastou bastante energia.
  - Por quê? Robôs trabalham lá fora sem gastar o ar de ninguém. Por isso, a NASA mandou robôs para Marte antes das pessoas.

## 🛏️ Cama

### 😴 Uma astronauta não consegue dormir (`sem_sono`)

Em Marte, o dia tem uns 40 minutos a mais que na Terra. O corpo de uma astronauta ainda não se acostumou.

- **Deixar ela descansar hoje** — efeito: -2 ciência, +4 saúde
  - Resultado: Ela acordou bem disposta! Mas um dia sem trabalho atrasou a pesquisa.
  - Por quê? Um sol, o dia de Marte, dura 24 horas e 39 minutos. Equipes da NASA que guiam robôs em Marte já viveram nesse horário!
- **Usar luzes para acertar o sono** — efeito: -2 energia, +2 saúde
  - Resultado: As luzes ajudaram o corpo dela a se acostumar aos poucos. Mas gastaram energia.
  - Por quê? A luz ajuda o corpo a saber se é dia ou noite. As equipes que viveram no horário de Marte usavam cortinas escuras para dormir.

### 🏠 Saudade de casa (`saudade`)

Um astronauta está com saudade da família. Ele não consegue prestar atenção no trabalho.

- **Dia de folga com comida especial** — efeito: -4 comida, +4 saúde
  - Resultado: Ele descansou e comeu sua comida preferida. Ficou bem melhor, mas gastou comida.
  - Por quê? Para a NASA, ficar isolado e longe de casa é um dos grandes riscos de ir a Marte. Cuidar da cabeça é tão importante quanto cuidar do corpo.
- **Cuidar das plantas com um amigo** — efeito: -2 energia, +3 saúde
  - Resultado: Cuidar da estufa juntos ajudou! Mas a luz extra gastou energia.
  - Por quê? A NASA está estudando se cuidar de plantas ajuda os astronautas a se sentirem melhor no espaço. Muitos gostam!

## 🚙 Rover

### 🛞 Furo na roda do rover! (`pneu`)

O rover passou por pedras pontudas, e uma roda ganhou um furo.

- **Voltar devagar pela areia macia** — efeito: -2 energia, -1 ciência
  - Resultado: A roda não piorou, mas o passeio foi curto e rendeu menos ciência.
  - Por quê? As rodas do robô Curiosity ganharam furos em pedras pontudas. Desde então, a equipe escolhe caminhos mais macios.
- **Seguir pelas pedras** — efeito: +2 ciência; depois (1–2 sol): Hora de consertar a roda → -3 energia
  - Resultado: Vocês foram mais longe e acharam coisas novas! Mas a roda piorou.
  - Por quê? Em Marte não tem oficina: cada roda precisa durar a missão inteira. Por isso cada caminho é planejado com cuidado.

### 🏜️ Uma trilha entre as dunas (`dunas`)

O rover achou um caminho novo entre as dunas, que são montes de areia. Onde será que ele vai dar?

- **Entrar na trilha agora** — efeito: +3 ciência; depois (1 sol): O rover atolou! → -3 energia
  - Resultado: Lugares novos e muita ciência! Mas a areia parecia fofa...
  - Por quê? Em 2009, o robô Spirit afundou numa areia fofa escondida embaixo de uma casquinha dura. Ele nunca mais saiu de lá.
- **Estudar o caminho antes** — efeito: -2 energia, +1 ciência
  - Resultado: Vocês acharam um caminho seguro. Foi mais devagar e gastou energia.
  - Por quê? Antes de mandar um robô andar, as equipes estudam fotos do chão. Um passo errado pode prender o robô.

### 🐚 Isso é um fóssil?! (`fossil`)

O rover achou uma pedra com um desenho estranho. Parece um fóssil, um ser vivo antigo que virou pedra! Será?

- **Levar para o laboratório** — efeito: -3 energia; depois (1–2 sol): Era só uma rocha... mas é ciência! → +4 ciência
  - Resultado: A pedra foi para o laboratório. O resultado sai logo! O transporte gastou energia.
  - Por quê? Cientistas não acreditam só no que parece: eles testam. Até hoje, ninguém achou um fóssil em Marte.
- **Tirar fotos e seguir** — efeito: -1 energia, +1 ciência
  - Resultado: As fotos ficaram ótimas, mas talvez vocês nunca saibam o que era.
  - Por quê? O robô Perseverance guarda pedras em tubinhos. A ideia é que um dia elas sejam estudadas em laboratórios na Terra.

