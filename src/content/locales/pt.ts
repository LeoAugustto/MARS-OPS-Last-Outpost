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
  "hud.distribuir": "Divida a energia de hoje: {energia}",
  "hud.sobra": "A energia que sobrar fica guardada na bateria.",
  "hud.dormir": "Dormir e terminar o sol",
  "botao.ok": "OK!",
  "botao.porque": "Por quê?",
  "botao.voltar_sol": "Voltar ao sol {sol}",
  "botao.nova_missao": "Nova missão",
  "selo.ao_vivo": "Dado ao vivo da NASA",
  "selo.real": "Evento real de {data}",

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
  "fim.vitoria.title": "Missão cumprida!",
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
  "dica.ar": "Dica: guarde pelo menos 3 de energia por sol para a fábrica de ar.",
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

  "ev.colheita_boa.title": "Colheita boa!",
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
    "A bateria guardou energia. Hoje, o laboratório só rende metade da ciência.",
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
    "A lupa mostrou menos detalhes. Hoje, o laboratório só rende metade da ciência.",
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
    "A estufa ganhou água. Sem a amostra de gelo, o laboratório só rende metade da ciência hoje.",
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
  "ev.lab_contaminado.body": "Algumas bactérias escaparam. Limpar a mesa custou 2 de energia.",

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
    "Ela acordou bem disposta! Hoje, o laboratório só rende metade da ciência.",
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

  // ================================================================ eventos por lugar (lote 2)
  // ☀️ painéis
  "ev.geada.title": "Gelo nos painéis!",
  "ev.geada.body": "A noite foi tão fria que uma camada fininha de gelo cobriu os painéis solares.",
  "ev.geada.esperar.label": "Esperar o Sol derreter",
  "ev.geada.esperar.outcome":
    "O gelo derreteu sozinho, mas os painéis fizeram menos energia de manhã.",
  "ev.geada.esperar.lesson":
    "Em 1979, a sonda Viking 2 fotografou uma camada fininha de gelo no chão de Marte.",
  "ev.geada.raspar.label": "Sair e raspar o gelo",
  "ev.geada.raspar.outcome": "Painéis limpos rapidinho! Mas o passeio gastou o ar do traje.",
  "ev.geada.raspar.lesson":
    "Lá fora, todo trabalho gasta o ar do traje. Às vezes esperar é mais seguro do que sair.",

  "ev.eclipse_fobos.title": "Uma lua passou na frente do Sol!",
  "ev.eclipse_fobos.body":
    "Fobos, uma das duas luas de Marte, vai passar na frente do Sol. Por um momento, os painéis vão receber menos luz.",
  "ev.eclipse_fobos.filmar.label": "Filmar o eclipse",
  "ev.eclipse_fobos.filmar.outcome":
    "Que vídeo incrível! A câmera e o telescópio gastaram energia.",
  "ev.eclipse_fobos.filmar.lesson":
    "Em 2022, o robô Perseverance filmou Fobos passando na frente do Sol. O eclipse durou uns 40 segundos!",
  "ev.eclipse_fobos.guardar.label": "Guardar energia na bateria",
  "ev.eclipse_fobos.guardar.outcome":
    "A bateria ficou mais cheia, mas o laboratório ficou sem energia e hoje rende só a metade.",
  "ev.eclipse_fobos.guardar.lesson":
    "Marte tem duas luas pequenas, Fobos e Deimos. Quando Fobos passa na frente do Sol, chega menos luz por um momento.",

  "ev.truque_areia.title": "Painéis empoeirados",
  "ev.truque_areia.body":
    "Os painéis estão com poeira e fazem menos energia. O vento da tarde pode ajudar... ou alguém pode sair para limpar.",
  "ev.truque_areia.areia.label": "Jogar areia no vento",
  "ev.truque_areia.areia.outcome":
    "O robô soltou areia perto dos painéis. O vento levou a areia, e ela arrastou um pouco da poeira!",
  "ev.truque_areia.areia.lesson":
    "Em 2021, a sonda InSight usou esse truque: soltou areia no vento perto dos painéis, e a areia levou parte da poeira.",
  "ev.truque_areia.escovar.label": "Sair e escovar os painéis",
  "ev.truque_areia.escovar.outcome":
    "Os painéis ficaram bem limpos! Mas o passeio gastou o ar do traje.",
  "ev.truque_areia.escovar.lesson":
    "Escovar limpa mais do que o vento, mas cada saída da base gasta ar e cansa a equipe.",

  // 💨 fábrica de ar
  "ev.filtro_co2.title": "O filtro de gás carbônico encheu",
  "ev.filtro_co2.body":
    "Quando respiramos, soltamos gás carbônico. O filtro que tira esse gás do ar da base está cheio.",
  "ev.filtro_co2.reserva.label": "Trocar pelo filtro reserva",
  "ev.filtro_co2.reserva.outcome": "Filtro novo no lugar! Mas agora não sobrou nenhum reserva.",
  "ev.filtro_co2.reserva.lesson":
    "Na Estação Espacial, máquinas tiram o gás carbônico do ar, porque muito dele faz mal ao corpo.",
  "ev.filtro_co2.improvisar.label": "Improvisar um filtro",
  "ev.filtro_co2.improvisar.outcome":
    "O filtro feito com fita e peças velhas funcionou, mas não tão bem. O ar ficou um pouco pior.",
  "ev.filtro_co2.improvisar.lesson":
    "Em 1970, a nave Apolo 13 teve um problema, e os astronautas montaram um filtro com fita adesiva e outras peças. Deu certo!",

  "ev.eletrolise.title": "Fazer ar com água?",
  "ev.eletrolise.body":
    "A máquina de ar consegue separar a água em oxigênio e outro gás, usando eletricidade. Mas essa água também rega as plantas.",
  "ev.eletrolise.fazer_ar.label": "Usar água para fazer ar",
  "ev.eletrolise.fazer_ar.outcome": "Mais oxigênio para todos! Mas a estufa ficou com menos água.",
  "ev.eletrolise.fazer_ar.lesson":
    "Na Estação Espacial, uma máquina separa a água com eletricidade e faz oxigênio para a tripulação respirar.",
  "ev.eletrolise.guardar_agua.label": "Guardar a água para as plantas",
  "ev.eletrolise.guardar_agua.outcome":
    "As plantas beberam bem e cresceram. Mas a fábrica fez menos ar hoje.",
  "ev.eletrolise.guardar_agua.lesson":
    "Numa base, a mesma água serve para beber, plantar e até fazer ar. Por isso ela é usada muitas vezes.",

  "ev.poeira_dentro.title": "Poeira entrou na base!",
  "ev.poeira_dentro.body":
    "A poeira grudou nos trajes e entrou junto com a equipe. Agora tem pó vermelho no chão todo.",
  "ev.poeira_dentro.aspirar.label": "Aspirar tudo agora",
  "ev.poeira_dentro.aspirar.outcome": "A base ficou limpinha! O aspirador gastou energia.",
  "ev.poeira_dentro.aspirar.lesson":
    "Os astronautas da Apolo contaram que a poeira da Lua grudava em tudo e tinha cheiro de pólvora.",
  "ev.poeira_dentro.depois.label": "Limpar outro dia",
  "ev.poeira_dentro.depois.outcome":
    "Nenhuma energia gasta, mas a poeira deu tosse e espirros na equipe.",
  "ev.poeira_dentro.depois.lesson":
    "A poeira de Marte é muito fina e tem sais que fazem mal ao corpo. Ela não pode ficar dentro de casa.",

  // 🌱 estufa
  "ev.luz_rosa.title": "Que luz usar nas plantas?",
  "ev.luz_rosa.body":
    "As lâmpadas da estufa podem ser vermelhas e azuis, que deixam tudo cor-de-rosa, ou brancas, como a luz do dia.",
  "ev.luz_rosa.rosa.label": "Luz vermelha e azul",
  "ev.luz_rosa.rosa.outcome":
    "A estufa ficou cor-de-rosa e as plantas cresceram bem, gastando pouca energia.",
  "ev.luz_rosa.rosa.lesson":
    "Na Estação Espacial, as plantas crescem com luzes vermelhas e azuis. Juntas, elas deixam a estufa cor-de-rosa!",
  "ev.luz_rosa.branca.label": "Luz branca, como a do dia",
  "ev.luz_rosa.branca.outcome":
    "As plantas cresceram e a equipe gostou de ver tudo verdinho. Mas a luz branca gastou mais energia.",
  "ev.luz_rosa.branca.lesson":
    "Com luz branca, as plantas aparecem com a cor de verdade. Assim fica mais fácil ver se alguma está doente.",

  "ev.pimentas.title": "As pimentas cresceram!",
  "ev.pimentas.body":
    "As pimenteiras estão cheias de pimentas verdes. Se esperar mais, elas ficam vermelhas e maiores.",
  "ev.pimentas.verdes.label": "Colher verdes agora",
  "ev.pimentas.verdes.outcome": "Hoje tem comida nova e picante! Colher deu um pouco de trabalho.",
  "ev.pimentas.verdes.lesson":
    "Em 2021, astronautas colheram pimentas na Estação Espacial e fizeram tacos com elas!",
  "ev.pimentas.vermelhas.label": "Esperar ficarem vermelhas",
  "ev.pimentas.vermelhas.outcome":
    "As pimentas continuam crescendo. Daqui a uns sóis, a colheita vai ser grande!",
  "ev.pimentas.vermelhas.lesson":
    "O experimento das pimentas na Estação Espacial durou mais de 4 meses. Plantas grandes demoram para dar frutos.",
  "ev.pimentas_vermelhas.title": "Pimentas vermelhas!",
  "ev.pimentas_vermelhas.body":
    "A espera valeu a pena: as pimentas ficaram vermelhas e deram muita comida.",

  "ev.adubo.title": "O que fazer com os restos?",
  "ev.adubo.body":
    "Sobraram cascas e folhas da cozinha. Elas podem virar lixo... ou adubo para a estufa.",
  "ev.adubo.compostar.label": "Fazer adubo",
  "ev.adubo.compostar.outcome":
    "Os restos vão virar adubo. Daqui a uns sóis, as plantas vão crescer mais!",
  "ev.adubo.compostar.lesson":
    "A Agência Espacial Europeia estuda um sistema que recicla restos para produzir comida e ar em viagens longas.",
  "ev.adubo.jogar_fora.label": "Jogar fora",
  "ev.adubo.jogar_fora.outcome":
    "A cozinha ficou com mais espaço, mas o lixo cheirou mal e deixou a equipe enjoada.",
  "ev.adubo.jogar_fora.lesson":
    "Numa base em Marte não existe caminhão de lixo. Tudo que é jogado fora continua lá dentro.",
  "ev.adubo_pronto.title": "O adubo ficou pronto!",
  "ev.adubo_pronto.body": "Os restos viraram adubo, e as plantas da estufa deram mais comida.",

  // 🔬 laboratório
  "ev.meteorito.title": "Uma pedra caiu do céu!",
  "ev.meteorito.body":
    "O robô achou uma pedra escura e brilhante perto da base. Parece um meteorito, uma pedra que veio do espaço!",
  "ev.meteorito.analisar.label": "Analisar no laboratório",
  "ev.meteorito.analisar.outcome": "Era mesmo um meteorito de ferro! A análise gastou energia.",
  "ev.meteorito.analisar.lesson":
    "Em 2005, o robô Opportunity achou um meteorito em Marte. Foi o primeiro meteorito achado em outro planeta.",
  "ev.meteorito.foto.label": "Fotografar e mandar para a Terra",
  "ev.meteorito.foto.outcome":
    "Os cientistas na Terra adoraram as fotos, mas sem análise a pesquisa rendeu menos.",
  "ev.meteorito.foto.lesson":
    "Pedras de Marte também caem na Terra como meteoritos. Cientistas estudam algumas delas há muitos anos.",

  "ev.tubo_amostra.title": "O tubo da amostra voltou vazio!",
  "ev.tubo_amostra.body":
    "A equipe furou uma rocha para guardar um pedaço num tubo. Mas o tubo voltou sem nada dentro!",
  "ev.tubo_amostra.cuidado.label": "Descobrir o que houve e tentar de novo",
  "ev.tubo_amostra.cuidado.outcome":
    "A rocha era fofa e virou pó. Na segunda vez, deu certo! Gastou energia.",
  "ev.tubo_amostra.cuidado.lesson":
    "Em 2021, o primeiro tubo de amostra do robô Perseverance voltou vazio: a rocha virou pó. A equipe estudou o que houve antes de tentar de novo.",
  "ev.tubo_amostra.rapido.label": "Tentar de novo bem rápido",
  "ev.tubo_amostra.rapido.outcome":
    "Pegaram uma amostra rapidinho! Mas ninguém conferiu se ela estava boa...",
  "ev.tubo_amostra.rapido.lesson":
    "Na ciência, a pressa pode estragar o trabalho. Conferir antes evita perder amostras.",
  "ev.amostra_vazia.title": "A amostra estragou",
  "ev.amostra_vazia.body":
    "A amostra pega com pressa estava cheia de pó e não serviu. Parte da pesquisa se perdeu.",

  "ev.nuvens.title": "Nuvens brilhando no céu!",
  "ev.nuvens.body":
    "Depois do pôr do sol, umas nuvens lá no alto continuam brilhando com as cores do arco-íris.",
  "ev.nuvens.noite.label": "Ficar acordado fotografando",
  "ev.nuvens.noite.outcome":
    "Fotos lindas para a ciência! Mas a equipe dormiu tarde e ficou cansada.",
  "ev.nuvens.noite.lesson":
    "Em 2021, o robô Curiosity fotografou nuvens brilhando depois do pôr do sol. Elas eram feitas de gelo seco.",
  "ev.nuvens.uma_foto.label": "Tirar uma foto só e dormir",
  "ev.nuvens.uma_foto.outcome":
    "Uma foto bonita e todo mundo descansado. A câmera gastou um pouco de energia.",
  "ev.nuvens.uma_foto.lesson":
    "Marte também tem nuvens, como a Terra. A maioria é feita de gelo de água.",

  // 🛡️ abrigo
  "ev.tijolos.title": "Tijolos de areia de Marte",
  "ev.tijolos.body":
    "Dá para deixar a base mais protegida com uma camada nova: tijolos impressos ou sacos de areia.",
  "ev.tijolos.imprimir.label": "Imprimir tijolos",
  "ev.tijolos.imprimir.outcome":
    "A impressora 3D fez tijolos de areia! A base ganhou mais proteção. Gastou energia.",
  "ev.tijolos.imprimir.lesson":
    "A NASA fez um concurso para casas impressas em 3D com materiais de Marte, para proteger futuras tripulações.",
  "ev.tijolos.sacos.label": "Encher sacos de areia lá fora",
  "ev.tijolos.sacos.outcome":
    "Os sacos ficaram em cima da base. Mais proteção! Mas o trabalho lá fora gastou ar e cansou.",
  "ev.tijolos.sacos.lesson":
    "Usar a areia do próprio lugar é uma ideia estudada para Marte: assim não é preciso levar tudo da Terra.",

  "ev.tremor.title": "A base tremeu!",
  "ev.tremor.body":
    "Tudo balançou um pouquinho. Foi um tremor de terra em Marte! Parece que nada quebrou... mas será?",
  "ev.tremor.conferir.label": "Conferir a base toda",
  "ev.tremor.conferir.outcome":
    "Vocês acharam um parafuso solto e consertaram. A vistoria gastou energia.",
  "ev.tremor.conferir.lesson":
    "A sonda InSight sentiu mais de mil tremores em Marte. O maior foi em 2022.",
  "ev.tremor.seguir.label": "Seguir com o trabalho",
  "ev.tremor.seguir.outcome": "Vocês fizeram mais ciência. Mas ninguém conferiu se algo soltou...",
  "ev.tremor.seguir.lesson":
    "Depois de um tremor, conferir a casa evita surpresas. Um estrago pequeno cresce se ninguém vê.",
  "ev.tremor_estrago.title": "Uma prateleira caiu!",
  "ev.tremor_estrago.body":
    "O tremor de ontem soltou uma prateleira. Arrumar tudo gastou energia e cansou a equipe.",

  // 📡 antena
  "ev.conjuncao.title": "O Sol está no meio do caminho",
  "ev.conjuncao.body":
    "Daqui a pouco, o Sol vai ficar entre Marte e a Terra. As mensagens não vão passar por uns dias.",
  "ev.conjuncao.mandar_tudo.label": "Mandar todos os dados antes",
  "ev.conjuncao.mandar_tudo.outcome":
    "Todos os dados chegaram na Terra a tempo! A antena gastou energia.",
  "ev.conjuncao.mandar_tudo.lesson":
    "Mais ou menos a cada 2 anos, o Sol fica entre a Terra e Marte. A NASA para de mandar comandos para os robôs por umas duas semanas.",
  "ev.conjuncao.silencio.label": "Desligar a antena e economizar",
  "ev.conjuncao.silencio.outcome":
    "A bateria guardou energia, mas a equipe se sentiu sozinha sem notícias da Terra.",
  "ev.conjuncao.silencio.lesson":
    "Sem falar com a Terra, a tripulação precisa resolver tudo sozinha. Isso exige preparo.",

  "ev.satelite.title": "Um satélite está passando!",
  "ev.satelite.body":
    "Um satélite que dá voltas em Marte vai passar em cima da base. Ele pode levar os dados até a Terra.",
  "ev.satelite.satelite.label": "Mandar os dados pelo satélite",
  "ev.satelite.satelite.outcome": "Os dados foram rapidinho e gastaram pouca energia!",
  "ev.satelite.satelite.lesson":
    "Os robôs em Marte mandam a maior parte das fotos por satélites que dão voltas no planeta.",
  "ev.satelite.direto.label": "Mandar direto com a antena grande",
  "ev.satelite.direto.outcome":
    "Chegou mais coisa na Terra, mas a antena grande gastou bastante energia.",
  "ev.satelite.direto.lesson":
    "Uma antena grande consegue falar direto com a Terra, mas gasta muito mais energia.",

  "ev.musica.title": "Música para acordar!",
  "ev.musica.body": "A Terra mandou uma música animada para acordar a equipe hoje.",
  "ev.musica.tocar.label": "Tocar bem alto",
  "ev.musica.tocar.outcome": "Todo mundo acordou dançando! O som gastou um pouquinho de energia.",
  "ev.musica.tocar.lesson":
    "No tempo dos ônibus espaciais, o Controle de Missão acordava os astronautas com uma música diferente a cada dia.",
  "ev.musica.dormir_mais.label": "Deixar a equipe dormir mais",
  "ev.musica.dormir_mais.outcome":
    "A equipe descansou mais, mas o laboratório começou tarde e hoje rende só a metade.",
  "ev.musica.dormir_mais.lesson":
    "Um pouco mais de sono ajuda o corpo, mas atrasa o trabalho do dia.",

  // 🛏️ casa
  "ev.cardapio.title": "Comida sem graça",
  "ev.cardapio.body":
    "A equipe está cansada de comer sempre a mesma coisa. A comida parece não ter gosto.",
  "ev.cardapio.tempero.label": "Cozinhar algo novo com tempero",
  "ev.cardapio.tempero.outcome":
    "Que jantar gostoso! Todo mundo ficou feliz, mas gastou mais comida.",
  "ev.cardapio.tempero.lesson":
    "No espaço, a comida pode parecer sem gosto. Por isso muitos astronautas gostam de molho apimentado.",
  "ev.cardapio.de_sempre.label": "Comer o de sempre",
  "ev.cardapio.de_sempre.outcome":
    "A comida durou mais, mas a equipe comeu pouco e ficou desanimada.",
  "ev.cardapio.de_sempre.lesson":
    "Comer sempre a mesma coisa cansa. A NASA estuda como manter a comida gostosa em viagens longas.",

  "ev.diario.title": "Hora do diário",
  "ev.diario.body": "Uma astronauta quer parar um pouco para escrever no diário como foi a semana.",
  "ev.diario.escrever.label": "Parar para escrever",
  "ev.diario.escrever.outcome":
    "Ela se sentiu bem melhor! Mas parou o trabalho, e o laboratório hoje rende só a metade.",
  "ev.diario.escrever.lesson":
    "Astronautas da Estação Espacial escreveram diários para uma pesquisa da NASA sobre como é viver isolado.",
  "ev.diario.trabalhar.label": "Continuar trabalhando",
  "ev.diario.trabalhar.outcome": "A pesquisa andou, mas a astronauta ficou cansada e preocupada.",
  "ev.diario.trabalhar.lesson":
    "Trabalhar sem parar parece bom, mas o cansaço aparece depois. Pausas também fazem parte do trabalho.",

  "ev.resfriado.title": "Atchim!",
  "ev.resfriado.body": "Um astronauta acordou espirrando. Parece um resfriado!",
  "ev.resfriado.isolar.label": "Descansar longe dos outros",
  "ev.resfriado.isolar.outcome":
    "Ele melhorou e ninguém mais pegou. Mas faltou alguém no trabalho, e o laboratório hoje rende só a metade.",
  "ev.resfriado.isolar.lesson":
    "Antes de ir ao espaço, astronautas ficam uns dias em quarentena, longe de outras pessoas, para não levar doenças junto.",
  "ev.resfriado.seguir.label": "Trabalhar mesmo assim",
  "ev.resfriado.seguir.outcome": "A pesquisa andou, mas o resfriado passou para mais gente.",
  "ev.resfriado.seguir.lesson":
    "Numa base pequena, uma doença passa fácil de uma pessoa para outra.",

  // 🚙 rover
  "ev.noite_gelada.title": "Noite gelada!",
  "ev.noite_gelada.body":
    "Esta noite vai ser muito fria. O frio pode deixar a bateria do rover fraca.",
  "ev.noite_gelada.aquecer.label": "Ligar o aquecedor do rover",
  "ev.noite_gelada.aquecer.outcome":
    "O rover passou a noite quentinho. O aquecedor gastou energia.",
  "ev.noite_gelada.aquecer.lesson":
    "As noites em Marte são muito geladas. Os robôs usam aquecedores para proteger as peças e as baterias.",
  "ev.noite_gelada.deixar.label": "Deixar o rover no frio",
  "ev.noite_gelada.deixar.outcome": "Vocês economizaram energia hoje. Será que a bateria aguenta?",
  "ev.noite_gelada.deixar.lesson":
    "O frio deixa as baterias mais fracas. Na Terra também: o celular descarrega mais rápido no frio.",
  "ev.rover_frio.title": "A bateria do rover congelou",
  "ev.rover_frio.body":
    "O frio deixou a bateria do rover fraca. Esquentar e recarregar gastou energia.",

  "ev.drone.title": "Mandar o drone na frente?",
  "ev.drone.body":
    "O rover vai explorar um lugar novo. Um pequeno drone pode voar antes e mostrar o caminho.",
  "ev.drone.voar.label": "Voar o drone antes",
  "ev.drone.voar.outcome": "O drone achou o melhor caminho e fotos novas! O voo gastou energia.",
  "ev.drone.voar.lesson":
    "O helicóptero Ingenuity voou 72 vezes em Marte, de 2021 a 2024. Ele foi feito para voar só 5 vezes!",
  "ev.drone.sem_olhar.label": "Ir de rover sem olhar",
  "ev.drone.sem_olhar.outcome":
    "O rover chegou mais rápido e achou pedras novas. Mas o caminho era desconhecido...",
  "ev.drone.sem_olhar.lesson":
    "Sem olhar o caminho antes, o rover pode cair numa areia fofa e ficar preso.",
} as const;

export type LocaleKey = keyof typeof pt;
export type Dict = Record<LocaleKey, string>;
