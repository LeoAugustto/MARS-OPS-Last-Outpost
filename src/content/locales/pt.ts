// Português (idioma de referência). Dono dos textos: Bruno.
// Regras de escrita: docs/STYLE_GUIDE.md — frases curtas, palavras simples, termo científico sempre explicado.
// Ao adicionar uma chave aqui, adicione nos 5 idiomas (o TypeScript e os testes acusam se faltar).

export const pt = {
  // ---------------------------------------------------------------- recursos e módulos
  "jogo.titulo": "Operação Marte: Última Base",
  "recurso.ar": "Ar",
  "recurso.comida": "Comida",
  "recurso.saude": "Saúde",
  "recurso.energia": "Energia",
  "recurso.bateria": "Bateria",
  "recurso.ciencia": "Ciência",
  "recurso.escudo": "Escudo",
  "modulo.ar": "Fábrica de ar",
  "modulo.estufa": "Estufa",
  "modulo.ciencia": "Laboratório",
  "modulo.escudo": "Robô de areia",
  "nivel.cadete": "Cadete (fácil)",
  "nivel.piloto": "Piloto (médio)",
  "nivel.comandante": "Comandante (difícil)",

  // ---------------------------------------------------------------- HUD e botões
  "hud.sol": "Sol {sol} de {total}",
  "hud.distribuir": "Divida a energia de hoje: {energia} ⚡",
  "hud.sobra": "A energia que sobrar fica guardada na bateria.",
  "hud.dormir": "Dormir e terminar o sol",
  "botao.ok": "OK!",
  "botao.porque": "Por quê?",
  "botao.voltar_sol": "Voltar ao sol {sol}",
  "botao.nova_missao": "Nova missão",
  "selo.ao_vivo": "📡 Dado ao vivo da NASA",
  "selo.real": "📚 Evento real de {data}",

  // ---------------------------------------------------------------- fontes
  "fonte.donki": "NASA DONKI — clima espacial",
  "fonte.osdr": "NASA OSDR — saúde de astronautas",
  "fonte.radlab": "NASA RadLab — radiação medida no espaço",
  "fonte.marstrek": "NASA Mars Trek — mapas de Marte",
  "fonte.csa": "Agência Espacial Canadense — comida no espaço",
  "fonte.nasa-fato": "Fato de missões da NASA",

  // ---------------------------------------------------------------- glossário
  "glossario.sol": "Sol = um dia em Marte. Dura 24 horas e 40 minutos.",
  "glossario.radiacao":
    "Radiação = uma energia invisível que vem do Sol e do espaço. Muita radiação faz mal ao corpo.",
  "glossario.tempestade":
    "Tempestade solar = quando o Sol solta uma explosão de luz e partículas muito rápidas.",

  // ---------------------------------------------------------------- fim da missão (nunca "game over")
  "fim.vitoria.title": "Missão cumprida! 🎉",
  "fim.vitoria.body": "Sua tripulação ficou bem e fez muita ciência. A NASA está orgulhosa!",
  "fim.parcial.title": "Todos voltaram bem!",
  "fim.parcial.body":
    "A tripulação está segura, mas faltou um pouco de ciência. Que tal tentar outra estratégia?",
  "fim.resgate.title": "A Terra mandou buscar a tripulação",
  "fim.resgate.body":
    "Ninguém se machucou: o Controle de Missão decidiu trazer todos de volta. Vamos entender o que aconteceu?",
  "causa.ar":
    "O ar acabou. Cada pessoa respira o tempo todo, e a fábrica de ar precisa de energia todo sol.",
  "causa.comida":
    "A comida acabou. A estufa precisa de luz (energia) e as plantas demoram para crescer.",
  "causa.saude": "A saúde ficou baixa demais. Radiação, fome e falta de ar cansam o corpo.",
  "dica.ar": "Dica: guarde pelo menos 3 ⚡ por sol para a fábrica de ar.",
  "dica.comida": "Dica: plante cedo! O que você planta hoje só vira comida daqui a alguns sóis.",
  "dica.saude": "Dica: construa o escudo cedo e se esconda no abrigo quando o Sol estiver agitado.",
  "fato.reabastecimento":
    "Você sabia? Uma nave da Terra só consegue chegar a Marte mais ou menos a cada 26 meses. Por isso planejar é tudo!",
  "fato.marte_2017":
    "Em setembro de 2017, uma tempestade solar chegou a Marte, fez o céu brilhar com auroras e aumentou a radiação medida pelo robô Curiosity.",
  "fato.marte_2024":
    "Em maio de 2024, uma explosão do Sol chegou a Marte. O robô Curiosity mediu radiação parecida com uns 30 raios-X de uma vez!",

  // ---------------------------------------------------------------- eventos
  "ev.chegada.title": "Bem-vindos a Marte!",
  "ev.chegada.body":
    "Vocês pousaram! A base é pequena, e cada coisa precisa de energia. O que fazer primeiro?",
  "ev.chegada.explorar.label": "Explorar a cratera",
  "ev.chegada.explorar.outcome": "Vocês acharam pedras incríveis, mas o traje gastou ar.",
  "ev.chegada.explorar.lesson":
    "Fora da base não dá para respirar: o ar de Marte é quase todo gás carbônico. Todo passeio gasta o ar do traje.",
  "ev.chegada.arrumar.label": "Cobrir a base com areia",
  "ev.chegada.arrumar.outcome": "O robô jogou areia em cima da base. Agora ela protege mais!",
  "ev.chegada.arrumar.lesson":
    "Uma camada grossa de areia ou rocha bloqueia parte da radiação. Cientistas planejam bases assim.",

  "ev.sol_agitado.title": "Alerta: o Sol está agitado!",
  "ev.sol_agitado.body":
    "A Terra avisou: o Sol soltou uma explosão forte (classe {classe}, força {estrelas}). Ela pode chegar amanhã!",
  "ev.sol_agitado.abrigo.label": "Preparar o abrigo",
  "ev.sol_agitado.abrigo.outcome":
    "O abrigo está pronto. Usou energia, mas vocês estão protegidos.",
  "ev.sol_agitado.abrigo.lesson":
    "Na Estação Espacial, quando o Sol fica agitado, os astronautas vão para a parte mais protegida da nave.",
  "ev.sol_agitado.pesquisar.label": "Continuar a pesquisa",
  "ev.sol_agitado.pesquisar.outcome": "Vocês fizeram mais ciência hoje... mas a tempestade vem aí.",
  "ev.sol_agitado.pesquisar.lesson":
    "A luz da explosão chega em minutos, mas as partículas perigosas podem levar horas ou dias. Esse tempo serve para se proteger.",

  "ev.tempestade_chega.title": "A tempestade solar chegou!",
  "ev.tempestade_chega.body":
    "Partículas do Sol estão passando por Marte. Marte não tem um escudo magnético forte como a Terra.",
  "ev.tempestade_chega.ficar.label": "Ficar no abrigo o dia todo",
  "ev.tempestade_chega.ficar.outcome":
    "Vocês ficaram seguros, mas o aquecedor do abrigo gastou energia.",
  "ev.tempestade_chega.ficar.lesson":
    "Ficar protegido custa: não dá para trabalhar lá fora e o abrigo usa energia.",
  "ev.tempestade_chega.trabalhar.label": "Sair para trabalhar mesmo assim",
  "ev.tempestade_chega.trabalhar.outcome": "Vocês fizeram ciência, mas tomaram mais radiação.",
  "ev.tempestade_chega.trabalhar.lesson":
    "A Terra tem um campo magnético que desvia as partículas do Sol. Marte quase não tem, por isso a radiação lá é maior.",

  "ev.poeira_vem.title": "Uma nuvem de poeira vem aí",
  "ev.poeira_vem.body": "O vento de Marte levantou poeira. Ela pode cobrir os painéis solares.",
  "ev.poeira_vem.guardar.label": "Guardar energia na bateria",
  "ev.poeira_vem.guardar.outcome": "Vocês guardaram energia para os dias escuros.",
  "ev.poeira_vem.guardar.lesson":
    "Baterias guardam energia do sol para quando não tem sol. Mas o que vai para a bateria não pode ser usado hoje.",
  "ev.poeira_vem.ignorar.label": "Continuar trabalhando",
  "ev.poeira_vem.ignorar.outcome": "Mais um pouquinho de ciência hoje.",
  "ev.poeira_vem.ignorar.lesson":
    "Em 2018, uma tempestade de poeira enorme cobriu os painéis do robô Opportunity e ele ficou sem energia.",

  "ev.painel_sujo.title": "Os painéis estão cobertos de poeira",
  "ev.painel_sujo.body": "Com poeira, os painéis solares fazem bem menos energia.",
  "ev.painel_sujo.limpar.label": "Sair para limpar",
  "ev.painel_sujo.limpar.outcome":
    "Painéis brilhando de novo! Mas o passeio gastou ar e expôs vocês à radiação.",
  "ev.painel_sujo.limpar.lesson":
    "Cada saída da base é um passeio espacial: gasta ar do traje e deixa a pessoa mais exposta à radiação.",
  "ev.painel_sujo.esperar.label": "Esperar o vento limpar",
  "ev.painel_sujo.esperar.outcome":
    "Vocês vão economizar ar, mas terão pouca energia por alguns sóis.",
  "ev.painel_sujo.esperar.lesson":
    "Isso aconteceu de verdade: rajadas de vento limparam os painéis dos robôs Spirit e Opportunity!",

  "ev.vento_limpa.title": "O vento limpou os painéis!",
  "ev.vento_limpa.body": "Uma rajada de vento soprou a poeira. A energia voltou!",

  "ev.broto.title": "As batatas brotaram!",
  "ev.broto.body": "As plantinhas da estufa estão crescendo, mas precisam de luz.",
  "ev.broto.luz.label": "Dar mais luz",
  "ev.broto.luz.outcome": "As lâmpadas da estufa gastaram energia. As plantas adoraram!",
  "ev.broto.luz.lesson":
    "Plantas precisam de luz para crescer. Longe da Terra, essa luz vem de lâmpadas, que usam energia.",
  "ev.broto.economizar.label": "Economizar luz",
  "ev.broto.economizar.outcome": "Sobrou energia hoje, mas as plantas vão crescer pouco.",
  "ev.broto.economizar.lesson":
    "Economizar hoje pode faltar amanhã: a colheita depende do cuidado de vários dias.",

  "ev.colheita_boa.title": "Colheita boa! 🥔",
  "ev.colheita_boa.body": "Com bastante luz, a estufa deu muitas batatas.",
  "ev.colheita_fraca.title": "Colheita pequena",
  "ev.colheita_fraca.body": "Com pouca luz, as plantas cresceram pouco.",

  "ev.filtro_entupido.title": "O filtro de ar entupiu!",
  "ev.filtro_entupido.body": "A poeira fina de Marte entrou na fábrica de ar.",
  "ev.filtro_entupido.peca.label": "Usar a peça reserva",
  "ev.filtro_entupido.peca.outcome": "Consertado rapidinho! Mas agora não tem mais peça reserva.",
  "ev.filtro_entupido.peca.lesson":
    "Em Marte não tem loja: cada peça veio da Terra. Quando acaba, acabou.",
  "ev.filtro_entupido.limpar.label": "Limpar com cuidado",
  "ev.filtro_entupido.limpar.outcome": "Deu certo, mas levou o dia todo e gastou energia.",
  "ev.filtro_entupido.limpar.lesson":
    "Astronautas passam muito tempo fazendo manutenção. Isso é tempo a menos para a ciência.",
  "ev.filtro_entupido.deixar.label": "Deixar como está",
  "ev.filtro_entupido.deixar.outcome": "A fábrica de ar está fazendo menos ar.",
  "ev.filtro_entupido.deixar.lesson":
    "O suporte à vida é o que mantém todos respirando. Deixar quebrado é perigoso.",

  "ev.rocha.title": "Uma rocha diferente!",
  "ev.rocha.body": "O robô viu uma rocha com cores estranhas a 2 km da base.",
  "ev.rocha.robo.label": "Mandar só o robô",
  "ev.rocha.robo.outcome": "O robô foi devagar e gastou bateria, mas trouxe dados.",
  "ev.rocha.robo.lesson":
    "Robôs não precisam respirar, mas precisam de energia e são mais lentos que pessoas.",
  "ev.rocha.astronauta.label": "Ir com um astronauta",
  "ev.rocha.astronauta.outcome": "Que descoberta! Mas o passeio gastou ar e saúde.",
  "ev.rocha.astronauta.lesson":
    "Pessoas descobrem coisas mais rápido, mas cada passeio gasta ar e expõe à radiação.",

  "ev.laboratorio.title": "Resultado do laboratório!",
  "ev.laboratorio.body":
    "A rocha tinha sinais de água de muito tempo atrás! O robô Perseverance procura rochas assim em Marte.",

  "ev.exercicio.title": "Hora do exercício",
  "ev.exercicio.body":
    "Em Marte o corpo pesa só um pouco mais de um terço do que pesa na Terra. Com pouco peso, ossos e músculos ficam fracos.",
  "ev.exercicio.treinar.label": "Treinar 2 horas",
  "ev.exercicio.treinar.outcome":
    "Corpo forte! Mas a esteira gastou energia e todo mundo ficou com fome.",
  "ev.exercicio.treinar.lesson":
    "Na Estação Espacial, astronautas se exercitam umas 2 horas por dia para os ossos não enfraquecerem.",
  "ev.exercicio.pular.label": "Pular o treino hoje",
  "ev.exercicio.pular.outcome": "Sobrou tempo para a ciência, mas o corpo sentiu.",
  "ev.exercicio.pular.lesson":
    "Estudos da NASA mostram que, com pouca gravidade, os ossos perdem força se o corpo não se exercitar.",

  "ev.contato_terra.title": "Ligação para a Terra",
  "ev.contato_terra.body":
    "Uma mensagem leva de 4 a 24 minutos para ir de Marte à Terra. Não dá para conversar ao vivo!",
  "ev.contato_terra.conselho.label": "Pedir uma dica para a estufa",
  "ev.contato_terra.conselho.outcome": "Mensagem enviada! A resposta chega amanhã.",
  "ev.contato_terra.conselho.lesson":
    "Por causa do atraso, a tripulação em Marte precisa resolver muita coisa sozinha.",
  "ev.contato_terra.fotos.label": "Mandar fotos para os cientistas",
  "ev.contato_terra.fotos.outcome":
    "Os cientistas adoraram as fotos! A antena gastou bastante energia.",
  "ev.contato_terra.fotos.lesson":
    "Mandar dados para tão longe precisa de uma antena forte, e ela usa muita energia.",

  "ev.resposta_terra.title": "A Terra respondeu!",
  "ev.resposta_terra.body":
    "Os cientistas mandaram uma dica para usar melhor a luz da estufa. Ela rendeu mais comida!",

  // ================================================================ eventos por lugar da base
  // ☀️ painéis
  "ev.redemoinho.title": "Um redemoinho de poeira!",
  "ev.redemoinho.body":
    "Um redemoinho de poeira está passando perto dos painéis solares. Ele pode sujar os painéis... ou soprar a poeira velha embora!",
  "ev.redemoinho.cobrir.label": "Cobrir os painéis",
  "ev.redemoinho.cobrir.outcome": "Os painéis ficaram protegidos, mas cobrir tudo gastou energia.",
  "ev.redemoinho.cobrir.lesson":
    "Em Marte, o vento pode sujar ou limpar os painéis. Por isso é difícil saber quanta energia a base vai ter amanhã.",
  "ev.redemoinho.observar.label": "Deixar passar e filmar",
  "ev.redemoinho.observar.outcome":
    "Vocês filmaram o redemoinho para os cientistas. Amanhã vamos ver o que ele fez com os painéis.",
  "ev.redemoinho.observar.lesson":
    "Em 2005, um redemoinho passou por cima do robô Spirit e limpou os painéis dele. A energia do robô subiu muito!",
  "ev.redemoinho_passou.title": "O redemoinho passou",
  "ev.redemoinho_passou.body":
    "Se os painéis estavam sujos, o vento limpou e a energia subiu. Se estavam limpos, ganharam um pouco de poeira.",

  "ev.painel_rachado.title": "Uma pedrinha rachou um painel!",
  "ev.painel_rachado.body":
    "Uma pedrinha que veio do espaço caiu na base e rachou um painel solar.",
  "ev.painel_rachado.consertar.label": "Sair e consertar hoje",
  "ev.painel_rachado.consertar.outcome":
    "O painel voltou a funcionar, mas o conserto gastou energia e o ar do traje.",
  "ev.painel_rachado.consertar.lesson":
    "Fora da base não dá para respirar: o ar de Marte é quase todo gás carbônico. Todo conserto lá fora gasta o ar do traje.",
  "ev.painel_rachado.desligar.label": "Desligar só o pedaço quebrado",
  "ev.painel_rachado.desligar.outcome":
    "Ninguém precisou sair, mas os painéis agora fazem menos energia.",
  "ev.painel_rachado.desligar.lesson":
    "O ar de Marte é bem fino e protege pouco. Por isso pedras do espaço chegam ao chão. A sonda InSight, da NASA, sentiu várias delas batendo em Marte.",

  "ev.inverno.title": "Chegou o inverno em Marte",
  "ev.inverno.body":
    "Marte também tem estações do ano. No inverno, o dia fica mais curto e o Sol fica mais baixo. Os painéis fazem menos energia.",
  "ev.inverno.inclinar.label": "Virar os painéis para o Sol",
  "ev.inverno.inclinar.outcome":
    "Os painéis pegam mais luz de novo, mas mexer em tudo gastou energia.",
  "ev.inverno.inclinar.lesson":
    "No inverno, o robô Opportunity parava em ladeiras viradas para o Sol. Assim os painéis dele pegavam mais luz.",
  "ev.inverno.economizar.label": "Economizar: pausar o laboratório",
  "ev.inverno.economizar.outcome":
    "A bateria guardou energia para os dias curtos, mas a pesquisa parou.",
  "ev.inverno.economizar.lesson":
    "Marte tem estações porque é inclinado, como a Terra. No inverno, cada dia tem menos horas de sol para os painéis.",

  // 💨 fábrica de ar
  "ev.vazamento.title": "A porta está chiando!",
  "ev.vazamento.body":
    "A porta da fábrica de ar está fazendo fsssss. Um pouquinho de ar está escapando!",
  "ev.vazamento.procurar.label": "Procurar o furinho com calma",
  "ev.vazamento.procurar.outcome":
    "Vocês acharam o furo e fecharam de vez. Mas isso gastou a energia de um dia de trabalho.",
  "ev.vazamento.procurar.lesson":
    "Em 2020, astronautas da Estação Espacial soltaram folhinhas de chá no ar. Elas flutuaram até o furinho e mostraram o vazamento!",
  "ev.vazamento.remendo.label": "Colar um remendo rápido",
  "ev.vazamento.remendo.outcome": "O chiado parou... por enquanto. O remendo pode soltar.",
  "ev.vazamento.remendo.lesson":
    "Na Estação Espacial, o furo primeiro ganhou um remendo provisório. Depois, os engenheiros planejaram o conserto de verdade.",
  "ev.vazamento_volta.title": "O remendo soltou!",
  "ev.vazamento_volta.body":
    "O remendo rápido não aguentou e um pouco de ar escapou. Agora o furo foi fechado de vez.",

  "ev.gerador_barulho.title": "Barulho estranho na máquina de ar",
  "ev.gerador_barulho.body":
    "A máquina que faz o ar da base está fazendo tec, tec, tec. Isso não é normal!",
  "ev.gerador_barulho.desligar.label": "Desligar e revisar hoje",
  "ev.gerador_barulho.desligar.outcome":
    "A peça frouxa foi apertada. Mas, com a máquina desligada, a base fez menos ar hoje.",
  "ev.gerador_barulho.desligar.lesson":
    "O ar de Marte é quase todo gás carbônico. A máquina MOXIE, do robô Perseverance, conseguiu tirar oxigênio desse gás!",
  "ev.gerador_barulho.continuar.label": "Deixar ligada e trabalhar",
  "ev.gerador_barulho.continuar.outcome":
    "O ar continuou saindo e vocês trabalharam mais. Mas o barulho continua...",
  "ev.gerador_barulho.continuar.lesson":
    "Um barulho novo numa máquina é um aviso. Consertar cedo costuma dar menos trabalho do que consertar depois que quebra.",
  "ev.gerador_quebrou.title": "A máquina de ar parou!",
  "ev.gerador_quebrou.body":
    "O barulho era uma peça gasta. A máquina parou, e o conserto gastou ar e energia.",

  "ev.agua_do_ar.title": "Água escondida no ar",
  "ev.agua_do_ar.body":
    "Quando a gente respira e sua, o ar da base fica úmido. Dá para pegar essa água de volta!",
  "ev.agua_do_ar.coletar.label": "Ligar o coletor de água",
  "ev.agua_do_ar.coletar.outcome":
    "Vocês juntaram água para regar a estufa. As plantas agradecem! O coletor gastou energia.",
  "ev.agua_do_ar.coletar.lesson":
    "Na Estação Espacial, quase toda a água é reciclada, até a do suor e da respiração. Ela é limpa e usada de novo.",
  "ev.agua_do_ar.guardar.label": "Guardar a energia na bateria",
  "ev.agua_do_ar.guardar.outcome": "A bateria ficou mais cheia, mas a estufa recebeu menos água.",
  "ev.agua_do_ar.guardar.lesson":
    "Levar água da Terra é muito difícil. Em missões longas, cada gota que não é reciclada faz falta.",

  // 🌱 estufa
  "ev.mofo.title": "Manchas nas folhas!",
  "ev.mofo.body":
    "Algumas folhas da estufa estão com mofo. Mofo é um fungo que cresce onde tem muita umidade.",
  "ev.mofo.cortar.label": "Cortar as folhas doentes",
  "ev.mofo.cortar.outcome": "As plantas ficaram salvas, mas vocês perderam um pouco de comida.",
  "ev.mofo.cortar.lesson":
    "Em 2015, flores chamadas zínias pegaram mofo na Estação Espacial. O astronauta Scott Kelly cortou as partes doentes e salvou algumas.",
  "ev.mofo.ventilar.label": "Ligar ventiladores para secar",
  "ev.mofo.ventilar.outcome":
    "O vento secou as folhas. Os ventiladores gastaram energia e algumas folhas murcharam.",
  "ev.mofo.ventilar.lesson":
    "Os astronautas ligaram ventiladores para secar as zínias. Mas vento demais também secou as plantas! Tudo precisa de equilíbrio.",

  "ev.rabanete.title": "Os rabanetes ficaram prontos!",
  "ev.rabanete.body":
    "Os rabanetes cresceram rápido e já podem ser colhidos. As batatas ainda vão demorar.",
  "ev.rabanete.comer.label": "Colher e comer todos",
  "ev.rabanete.comer.outcome":
    "Que banquete! Vocês ganharam bastante comida hoje, mas não sobrou semente.",
  "ev.rabanete.comer.lesson":
    "Rabanete cresce rápido. Na Estação Espacial, os rabanetes ficaram prontos em só 27 dias!",
  "ev.rabanete.sementes.label": "Guardar alguns para plantar",
  "ev.rabanete.sementes.outcome":
    "Vocês comeram um pouco e replantaram o resto. Daqui a uns sóis, tem mais!",
  "ev.rabanete.sementes.lesson":
    "Numa base longe da Terra, guardar sementes é importante: elas viram comida nova sem esperar uma nave.",
  "ev.rabanete_de_novo.title": "Nova colheita de rabanetes!",
  "ev.rabanete_de_novo.body":
    "As sementes que vocês guardaram viraram rabanetes. Mais comida para a equipe!",

  "ev.sementes_terra.title": "Chegaram sementes da Terra!",
  "ev.sementes_terra.body":
    "Uma caixa de sementes saiu da Terra muitos meses atrás e finalmente chegou. Só cabe um tipo no canteiro.",
  "ev.sementes_terra.alface.label": "Plantar alface (rápida)",
  "ev.sementes_terra.alface.outcome": "A alface cresce rápido, mas dá pouca comida.",
  "ev.sementes_terra.alface.lesson":
    "Em 2015, astronautas da Estação Espacial comeram uma alface plantada lá mesmo, no espaço!",
  "ev.sementes_terra.batata.label": "Plantar batata (demora)",
  "ev.sementes_terra.batata.outcome": "A batata vai demorar, mas vai dar muita comida.",
  "ev.sementes_terra.batata.lesson":
    "Uma viagem da Terra até Marte leva muitos meses. Plantas que dão muita comida ajudam a base a depender menos da Terra.",
  "ev.alface_pronta.title": "A alface cresceu!",
  "ev.alface_pronta.body": "Folhas fresquinhas para a salada da equipe.",
  "ev.batata_pronta.title": "Hora de colher batatas!",
  "ev.batata_pronta.body": "As batatas demoraram, mas valeu a pena: muita comida!",

  // 🔬 laboratório
  "ev.microscopio.title": "O microscópio quebrou!",
  "ev.microscopio.body":
    "O microscópio parou de focar. Uma pecinha quebrou, e a loja mais perto fica em outro planeta!",
  "ev.microscopio.imprimir.label": "Imprimir uma peça nova",
  "ev.microscopio.imprimir.outcome": "A impressora 3D fez a peça! Mas gastou bastante energia.",
  "ev.microscopio.imprimir.lesson":
    "Em 2014, a NASA mandou por mensagem o desenho de uma ferramenta para a Estação Espacial. Lá, ela foi feita numa impressora 3D!",
  "ev.microscopio.lupa.label": "Usar uma lupa simples",
  "ev.microscopio.lupa.outcome":
    "Dá para trabalhar, mas a lupa mostra bem menos detalhes. A pesquisa rendeu menos.",
  "ev.microscopio.lupa.lesson":
    "O microscópio mostra coisas pequenas demais para o olho e para a lupa. Ferramenta boa faz muita diferença na ciência.",

  "ev.gelo.title": "Gelo embaixo do chão!",
  "ev.gelo.body":
    "O robô cavou um buraco perto da base e achou gelo de água escondido embaixo da areia!",
  "ev.gelo.estudar.label": "Estudar o gelo",
  "ev.gelo.estudar.outcome": "Uma descoberta importante para a ciência! A análise gastou energia.",
  "ev.gelo.estudar.lesson":
    "Em 2008, a sonda Phoenix, da NASA, cavou o chão de Marte e confirmou: havia gelo de água ali embaixo!",
  "ev.gelo.derreter.label": "Derreter para regar as plantas",
  "ev.gelo.derreter.outcome":
    "A estufa ganhou água e vai dar mais comida. Mas a amostra para estudar se perdeu.",
  "ev.gelo.derreter.lesson":
    "Usar o que já existe em Marte, como o gelo, é um dos planos para bases do futuro. Assim é preciso levar menos coisas da Terra.",

  "ev.bacterias.title": "Experimento com bactérias",
  "ev.bacterias.body":
    "A equipe quer estudar bactérias, seres vivos tão pequenos que só aparecem no microscópio.",
  "ev.bacterias.caixa.label": "Fazer dentro da caixa fechada",
  "ev.bacterias.caixa.outcome":
    "Tudo seguro, e a pesquisa deu certo! Mas a caixa gastou bastante energia.",
  "ev.bacterias.caixa.lesson":
    "A Estação Espacial tem uma caixa fechada com luvas para experimentos. Nada lá de dentro escapa para a nave.",
  "ev.bacterias.mesa.label": "Fazer rápido, na mesa",
  "ev.bacterias.mesa.outcome":
    "Mais rápido e mais barato! Mas algumas bactérias podem ter escapado...",
  "ev.bacterias.mesa.lesson":
    "A NASA limpa muito bem as naves antes de ir para Marte, para não levar micróbios da Terra. Isso se chama proteção planetária.",
  "ev.lab_contaminado.title": "O laboratório ficou sujo",
  "ev.lab_contaminado.body":
    "Algumas bactérias escaparam e estragaram outros experimentos. Foi preciso refazer parte da pesquisa.",

  // 🛡️ abrigo
  "ev.rachadura.title": "Rachadura na camada de areia",
  "ev.rachadura.body":
    "A areia que cobre a base rachou num canto. Ela bloqueia a radiação, uma energia invisível que faz mal ao corpo.",
  "ev.rachadura.tapar.label": "Mandar o robô tapar",
  "ev.rachadura.tapar.outcome":
    "O robô cobriu a rachadura. A proteção está inteira, mas gastou energia.",
  "ev.rachadura.tapar.lesson":
    "A Terra tem um escudo magnético e um ar grosso que protegem da radiação. Marte não tem. Por isso, cientistas estudam cobrir as casas com areia de Marte.",
  "ev.rachadura.depois.label": "Deixar para depois",
  "ev.rachadura.depois.outcome":
    "Nenhuma energia gasta hoje, mas a base perdeu uma camada de proteção.",
  "ev.rachadura.depois.lesson":
    "Uma camada de areia mais fina deixa passar mais radiação. Cada camada a mais ajuda a proteger a equipe.",

  "ev.treino.title": "Hora do treino de emergência?",
  "ev.treino.body":
    "Faz tempo que a equipe não treina o que fazer numa emergência. Treinar agora ou trabalhar?",
  "ev.treino.treinar.label": "Treinar hoje",
  "ev.treino.treinar.outcome":
    "A equipe sabe de cor o que fazer! Mas o treino gastou energia e tempo de pesquisa.",
  "ev.treino.treinar.lesson":
    "Os astronautas da Estação Espacial treinam muitas vezes o que fazer em caso de fogo ou vazamento de ar.",
  "ev.treino.adiar.label": "Trabalhar e treinar outro dia",
  "ev.treino.adiar.outcome": "Vocês fizeram mais ciência hoje. Mas a equipe está sem treino...",
  "ev.treino.adiar.lesson":
    "No espaço não tem bombeiro por perto. Os próprios astronautas fazem o socorro, por isso precisam treinar.",
  "ev.alarme_teste.title": "O alarme tocou!",
  "ev.alarme_teste.body":
    "A Terra fez um teste surpresa de emergência. Sem treino, a equipe se atrapalhou e se cansou.",

  // 📡 antena
  "ev.aniversario.title": "Aniversário na base!",
  "ev.aniversario.body":
    "Hoje é aniversário de um astronauta! A família dele mandou uma mensagem em vídeo lá da Terra.",
  "ev.aniversario.festa.label": "Fazer uma festinha",
  "ev.aniversario.festa.outcome":
    "Teve bolo, e todos viram o vídeo juntos. A equipe ficou feliz, mas a festa gastou comida.",
  "ev.aniversario.festa.lesson":
    "Ficar longe de casa é um dos grandes desafios de ir a Marte. A NASA estuda como manter os astronautas felizes e unidos.",
  "ev.aniversario.depois.label": "Ver o vídeo depois do trabalho",
  "ev.aniversario.depois.outcome":
    "A pesquisa andou, mas o aniversariante ficou triste o dia todo.",
  "ev.aniversario.depois.lesson":
    "Uma mensagem leva de 4 a 24 minutos para ir de Marte à Terra. Por isso a família manda vídeo gravado: não dá para conversar ao vivo.",

  "ev.escola.title": "Uma escola da Terra chamou!",
  "ev.escola.body": "Crianças de uma escola na Terra querem saber como é viver em Marte!",
  "ev.escola.video.label": "Gravar um vídeo para as crianças",
  "ev.escola.video.outcome":
    "As crianças adoraram! A equipe ficou feliz, mas a antena gastou energia.",
  "ev.escola.video.lesson":
    "Astronautas da Estação Espacial conversam com escolas pelo rádio. Mais de mil escolas já fizeram perguntas para eles!",
  "ev.escola.dados.label": "Mandar só os dados da missão",
  "ev.escola.dados.outcome":
    "Os cientistas ganharam dados novos, mas a equipe não teve pausa e ficou cansada.",
  "ev.escola.dados.lesson":
    "Os cientistas na Terra estudam os dados que as missões mandam. É assim que a gente descobre coisas novas sobre Marte.",

  "ev.antena_torta.title": "A antena entortou!",
  "ev.antena_torta.body":
    "O vento empurrou a antena. Agora ela não aponta para a Terra, e as mensagens não chegam.",
  "ev.antena_torta.astronauta.label": "Um astronauta sai para arrumar",
  "ev.antena_torta.astronauta.outcome":
    "A antena voltou ao lugar! Mas o passeio gastou o ar do traje e cansou.",
  "ev.antena_torta.astronauta.lesson":
    "A antena precisa apontar direto para a Terra. Lá, a NASA tem antenas gigantes em três lugares do mundo para ouvir as naves.",
  "ev.antena_torta.robo.label": "Mandar o robô arrumar",
  "ev.antena_torta.robo.outcome":
    "O robô arrumou a antena sem ninguém sair, mas gastou bastante energia.",
  "ev.antena_torta.robo.lesson":
    "Robôs trabalham lá fora sem gastar o ar de ninguém. Por isso, a NASA mandou robôs para Marte antes das pessoas.",

  // 🛏️ cama
  "ev.sem_sono.title": "Uma astronauta não consegue dormir",
  "ev.sem_sono.body":
    "Em Marte, o dia tem uns 40 minutos a mais que na Terra. O corpo de uma astronauta ainda não se acostumou.",
  "ev.sem_sono.descansar.label": "Deixar ela descansar hoje",
  "ev.sem_sono.descansar.outcome":
    "Ela acordou bem disposta! Mas um dia sem trabalho atrasou a pesquisa.",
  "ev.sem_sono.descansar.lesson":
    "Um sol, o dia de Marte, dura 24 horas e 39 minutos. Equipes da NASA que guiam robôs em Marte já viveram nesse horário!",
  "ev.sem_sono.luzes.label": "Usar luzes para acertar o sono",
  "ev.sem_sono.luzes.outcome":
    "As luzes ajudaram o corpo dela a se acostumar aos poucos. Mas gastaram energia.",
  "ev.sem_sono.luzes.lesson":
    "A luz ajuda o corpo a saber se é dia ou noite. As equipes que viveram no horário de Marte usavam cortinas escuras para dormir.",

  "ev.saudade.title": "Saudade de casa",
  "ev.saudade.body":
    "Um astronauta está com saudade da família. Ele não consegue prestar atenção no trabalho.",
  "ev.saudade.folga.label": "Dia de folga com comida especial",
  "ev.saudade.folga.outcome":
    "Ele descansou e comeu sua comida preferida. Ficou bem melhor, mas gastou comida.",
  "ev.saudade.folga.lesson":
    "Para a NASA, ficar isolado e longe de casa é um dos grandes riscos de ir a Marte. Cuidar da cabeça é tão importante quanto cuidar do corpo.",
  "ev.saudade.plantas.label": "Cuidar das plantas com um amigo",
  "ev.saudade.plantas.outcome": "Cuidar da estufa juntos ajudou! Mas a luz extra gastou energia.",
  "ev.saudade.plantas.lesson":
    "A NASA está estudando se cuidar de plantas ajuda os astronautas a se sentirem melhor no espaço. Muitos gostam!",

  // 🚙 rover
  "ev.pneu.title": "Furo na roda do rover!",
  "ev.pneu.body": "O rover passou por pedras pontudas, e uma roda ganhou um furo.",
  "ev.pneu.devagar.label": "Voltar devagar pela areia macia",
  "ev.pneu.devagar.outcome": "A roda não piorou, mas o passeio foi curto e rendeu menos ciência.",
  "ev.pneu.devagar.lesson":
    "As rodas do robô Curiosity ganharam furos em pedras pontudas. Desde então, a equipe escolhe caminhos mais macios.",
  "ev.pneu.seguir.label": "Seguir pelas pedras",
  "ev.pneu.seguir.outcome": "Vocês foram mais longe e acharam coisas novas! Mas a roda piorou.",
  "ev.pneu.seguir.lesson":
    "Em Marte não tem oficina: cada roda precisa durar a missão inteira. Por isso cada caminho é planejado com cuidado.",
  "ev.roda_conserto.title": "Hora de consertar a roda",
  "ev.roda_conserto.body": "A roda piorou e o rover precisou de conserto. Isso gastou energia.",

  "ev.dunas.title": "Uma trilha entre as dunas",
  "ev.dunas.body":
    "O rover achou um caminho novo entre as dunas, que são montes de areia. Onde será que ele vai dar?",
  "ev.dunas.entrar.label": "Entrar na trilha agora",
  "ev.dunas.entrar.outcome": "Lugares novos e muita ciência! Mas a areia parecia fofa...",
  "ev.dunas.entrar.lesson":
    "Em 2009, o robô Spirit afundou numa areia fofa escondida embaixo de uma casquinha dura. Ele nunca mais saiu de lá.",
  "ev.dunas.estudar.label": "Estudar o caminho antes",
  "ev.dunas.estudar.outcome": "Vocês acharam um caminho seguro. Foi mais devagar e gastou energia.",
  "ev.dunas.estudar.lesson":
    "Antes de mandar um robô andar, as equipes estudam fotos do chão. Um passo errado pode prender o robô.",
  "ev.rover_atolou.title": "O rover atolou!",
  "ev.rover_atolou.body":
    "A areia era fofa, e o rover afundou. Tirar ele de lá gastou bastante energia.",

  "ev.fossil.title": "Isso é um fóssil?!",
  "ev.fossil.body":
    "O rover achou uma pedra com um desenho estranho. Parece um fóssil, um ser vivo antigo que virou pedra! Será?",
  "ev.fossil.analisar.label": "Levar para o laboratório",
  "ev.fossil.analisar.outcome":
    "A pedra foi para o laboratório. O resultado sai logo! O transporte gastou energia.",
  "ev.fossil.analisar.lesson":
    "Cientistas não acreditam só no que parece: eles testam. Até hoje, ninguém achou um fóssil em Marte.",
  "ev.fossil.foto.label": "Tirar fotos e seguir",
  "ev.fossil.foto.outcome": "As fotos ficaram ótimas, mas talvez vocês nunca saibam o que era.",
  "ev.fossil.foto.lesson":
    "O robô Perseverance guarda pedras em tubinhos. A ideia é que um dia elas sejam estudadas em laboratórios na Terra.",
  "ev.fossil_resultado.title": "Era só uma rocha... mas é ciência!",
  "ev.fossil_resultado.body":
    "Não era um fóssil, era uma rocha comum. Mas descobrir isso também é ciência: agora sabemos mais sobre as rochas de Marte!",
} as const;

export type LocaleKey = keyof typeof pt;
export type Dict = Record<LocaleKey, string>;
