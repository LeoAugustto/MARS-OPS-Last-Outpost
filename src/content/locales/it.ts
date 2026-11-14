// Italiano. Stesse chiavi di pt.ts. Frasi brevi, parole semplici.
import type { Dict } from "./pt";

export const it: Dict = {
  "jogo.titulo": "Operazione Marte: Ultima Base",
  "recurso.ar": "Aria",
  "recurso.comida": "Cibo",
  "recurso.saude": "Salute",
  "recurso.energia": "Energia",
  "recurso.bateria": "Batteria",
  "recurso.ciencia": "Scienza",
  "recurso.escudo": "Scudo",
  "modulo.ar": "Fabbrica d'aria",
  "modulo.estufa": "Serra",
  "modulo.ciencia": "Laboratorio",
  "modulo.escudo": "Robot della sabbia",
  "nivel.cadete": "Cadetto (facile)",
  "nivel.piloto": "Pilota (medio)",
  "nivel.comandante": "Comandante (difficile)",

  "hud.sol": "Sol {sol} di {total}",
  "hud.distribuir": "Dividi l'energia di oggi: {energia} ⚡",
  "hud.sobra": "L'energia che avanza resta nella batteria.",
  "hud.dormir": "Dormi e finisci il sol",
  "botao.ok": "OK!",
  "botao.porque": "Perché?",
  "botao.voltar_sol": "Torna al sol {sol}",
  "botao.nova_missao": "Nuova missione",
  "selo.ao_vivo": "📡 Dato NASA in diretta",
  "selo.real": "📚 Evento reale del {data}",

  "fonte.donki": "NASA DONKI — meteo spaziale",
  "fonte.osdr": "NASA OSDR — salute degli astronauti",
  "fonte.radlab": "NASA RadLab — radiazioni misurate nello spazio",
  "fonte.marstrek": "NASA Mars Trek — mappe di Marte",
  "fonte.csa": "Agenzia Spaziale Canadese — cibo nello spazio",
  "fonte.nasa-fato": "Fatto dalle missioni NASA",

  "glossario.sol": "Sol = un giorno su Marte. Dura 24 ore e 40 minuti.",
  "glossario.radiacao":
    "Radiazione = energia invisibile che arriva dal Sole e dallo spazio. Troppa radiazione fa male al corpo.",
  "glossario.tempestade":
    "Tempesta solare = quando il Sole lancia un’esplosione di luce e di particelle velocissime.",

  "fim.vitoria.title": "Missione compiuta! 🎉",
  "fim.vitoria.body": "Il tuo equipaggio sta bene e ha fatto tanta scienza. La NASA è fiera di te!",
  "fim.parcial.title": "Tutti sono tornati sani e salvi!",
  "fim.parcial.body":
    "L’equipaggio è al sicuro, ma è mancata un po’ di scienza. Provi un’altra strategia?",
  "fim.resgate.title": "La Terra ha mandato a prendere l’equipaggio",
  "fim.resgate.body":
    "Nessuno si è fatto male: il Controllo Missione ha deciso di riportare tutti a casa. Vediamo cosa è successo?",
  "causa.ar":
    "L'aria è finita. Le persone respirano sempre, e la fabbrica d'aria ha bisogno di energia ogni sol.",
  "causa.comida":
    "Il cibo è finito. La serra ha bisogno di luce (energia) e le piante ci mettono tempo a crescere.",
  "causa.saude": "La salute è scesa troppo. Radiazioni, fame e poca aria stancano il corpo.",
  "dica.ar": "Consiglio: tieni almeno 3 ⚡ ogni sol per la fabbrica d'aria.",
  "dica.comida":
    "Consiglio: pianta presto! Quello che pianti oggi diventa cibo solo qualche sol dopo.",
  "dica.saude":
    "Consiglio: costruisci lo scudo presto e nasconditi nel rifugio quando il Sole è agitato.",
  "fato.reabastecimento":
    "Lo sapevi? Una nave dalla Terra può arrivare su Marte più o meno ogni 26 mesi. Per questo pianificare è tutto!",
  "fato.marte_2017":
    "A settembre 2017, una tempesta solare è arrivata su Marte, ha acceso il cielo di aurore e ha aumentato le radiazioni misurate dal robot Curiosity.",
  "fato.marte_2024":
    "A maggio 2024, un’esplosione del Sole è arrivata su Marte. Il robot Curiosity ha misurato radiazioni come circa 30 radiografie in una volta!",

  "ev.chegada.title": "Benvenuti su Marte!",
  "ev.chegada.body":
    "Siete atterrati! La base è piccola e tutto ha bisogno di energia. Cosa fate per primo?",
  "ev.chegada.explorar.label": "Esplorare il cratere",
  "ev.chegada.explorar.outcome": "Avete trovato rocce incredibili, ma la tuta ha consumato aria.",
  "ev.chegada.explorar.lesson":
    "Fuori non si può respirare: l’aria di Marte è quasi tutta anidride carbonica. Ogni uscita consuma l’aria della tuta.",
  "ev.chegada.arrumar.label": "Coprire la base di sabbia",
  "ev.chegada.arrumar.outcome": "Il robot ha messo sabbia sopra la base. Ora protegge di più!",
  "ev.chegada.arrumar.lesson":
    "Uno strato spesso di sabbia o roccia blocca una parte delle radiazioni. Gli scienziati progettano basi così.",

  "ev.poeira_vem.title": "Arriva una nuvola di polvere",
  "ev.poeira_vem.body": "Il vento di Marte ha sollevato polvere. Può coprire i pannelli solari.",
  "ev.poeira_vem.guardar.label": "Mettere energia nella batteria",
  "ev.poeira_vem.guardar.outcome": "Avete messo da parte energia per i giorni bui.",
  "ev.poeira_vem.guardar.lesson":
    "Le batterie conservano l’energia del sole per quando il sole non c’è. Ma quella nella batteria non si può usare oggi.",
  "ev.poeira_vem.ignorar.label": "Continuare a lavorare",
  "ev.poeira_vem.ignorar.outcome": "Un pochino di scienza in più oggi.",
  "ev.poeira_vem.ignorar.lesson":
    "Nel 2018, un’enorme tempesta di polvere ha coperto i pannelli del robot Opportunity, che è rimasto senza energia.",

  "ev.painel_sujo.title": "I pannelli sono coperti di polvere",
  "ev.painel_sujo.body": "Con la polvere, i pannelli solari producono molta meno energia.",
  "ev.painel_sujo.limpar.label": "Uscire a pulirli",
  "ev.painel_sujo.limpar.outcome":
    "Pannelli di nuovo brillanti! Ma l’uscita ha consumato aria e vi ha esposti alle radiazioni.",
  "ev.painel_sujo.limpar.lesson":
    "Ogni uscita è una passeggiata spaziale: consuma l’aria della tuta ed espone di più alle radiazioni.",
  "ev.painel_sujo.esperar.label": "Aspettare che il vento li pulisca",
  "ev.painel_sujo.esperar.outcome": "Risparmiate aria, ma avrete poca energia per qualche sol.",
  "ev.painel_sujo.esperar.lesson":
    "È successo davvero: raffiche di vento hanno pulito i pannelli dei robot Spirit e Opportunity!",

  "ev.vento_limpa.title": "Il vento ha pulito i pannelli!",
  "ev.vento_limpa.body": "Una raffica di vento ha soffiato via la polvere. L’energia è tornata!",

  "ev.broto.title": "Le patate sono spuntate!",
  "ev.broto.body": "Le piantine della serra crescono, ma hanno bisogno di luce.",
  "ev.broto.luz.label": "Dare più luce",
  "ev.broto.luz.outcome": "Le lampade della serra hanno usato energia. Le piante sono felici!",
  "ev.broto.luz.lesson":
    "Le piante hanno bisogno di luce per crescere. Lontano dalla Terra, quella luce arriva da lampade che usano energia.",
  "ev.broto.economizar.label": "Risparmiare luce",
  "ev.broto.economizar.outcome": "Oggi avanza energia, ma le piante cresceranno poco.",
  "ev.broto.economizar.lesson":
    "Risparmiare oggi può far mancare qualcosa domani: il raccolto dipende dalle cure di tanti giorni.",

  "ev.colheita_boa.title": "Bel raccolto! 🥔",
  "ev.colheita_boa.body": "Con tanta luce, la serra ha dato tantissime patate.",
  "ev.colheita_fraca.title": "Raccolto piccolo",
  "ev.colheita_fraca.body": "Con poca luce, le piante sono cresciute poco.",

  "ev.filtro_entupido.title": "Il filtro dell’aria è intasato!",
  "ev.filtro_entupido.body": "La polvere fine di Marte è entrata nella fabbrica d'aria.",
  "ev.filtro_entupido.peca.label": "Usare il pezzo di ricambio",
  "ev.filtro_entupido.peca.outcome": "Riparato in un attimo! Ma ora non c’è più nessun ricambio.",
  "ev.filtro_entupido.peca.lesson":
    "Su Marte non ci sono negozi: ogni pezzo è arrivato dalla Terra. Quando finisce, è finito.",
  "ev.filtro_entupido.limpar.label": "Pulirlo con cura",
  "ev.filtro_entupido.limpar.outcome":
    "Ha funzionato, ma ci è voluto tutto il giorno e ha usato energia.",
  "ev.filtro_entupido.limpar.lesson":
    "Gli astronauti passano tanto tempo a riparare cose. È tempo in meno per la scienza.",
  "ev.filtro_entupido.deixar.label": "Lasciarlo così",
  "ev.filtro_entupido.deixar.outcome": "La fabbrica d'aria sta facendo meno aria.",
  "ev.filtro_entupido.deixar.lesson":
    "Il supporto vitale è ciò che fa respirare tutti. Lasciarlo rotto è pericoloso.",

  "ev.rocha.title": "Una roccia strana!",
  "ev.rocha.body": "Il robot ha visto una roccia dai colori strani a 2 km dalla base.",
  "ev.rocha.robo.label": "Mandare solo il robot",
  "ev.rocha.robo.outcome": "Il robot è andato piano e ha usato la batteria, ma ha portato dati.",
  "ev.rocha.robo.lesson":
    "I robot non devono respirare, ma hanno bisogno di energia e sono più lenti delle persone.",
  "ev.rocha.astronauta.label": "Andare con un astronauta",
  "ev.rocha.astronauta.outcome": "Che scoperta! Ma l’uscita è costata aria e salute.",
  "ev.rocha.astronauta.lesson":
    "Le persone scoprono le cose più in fretta, ma ogni uscita consuma aria ed espone alle radiazioni.",

  "ev.laboratorio.title": "Risultati del laboratorio!",
  "ev.laboratorio.body":
    "La roccia aveva segni di acqua di tanto tempo fa! Il robot Perseverance cerca rocce così su Marte.",

  "ev.exercicio.title": "Ora di fare ginnastica",
  "ev.exercicio.body":
    "Su Marte il corpo pesa solo poco più di un terzo di quanto pesa sulla Terra. Con poco peso, ossa e muscoli si indeboliscono.",
  "ev.exercicio.treinar.label": "Allenarsi 2 ore",
  "ev.exercicio.treinar.outcome":
    "Corpi forti! Ma il tapis roulant ha usato energia e tutti hanno fame.",
  "ev.exercicio.treinar.lesson":
    "Sulla Stazione Spaziale, gli astronauti si allenano circa 2 ore al giorno perché le ossa non si indeboliscano.",
  "ev.exercicio.pular.label": "Saltare l’allenamento oggi",
  "ev.exercicio.pular.outcome": "Più tempo per la scienza, ma il corpo lo ha sentito.",
  "ev.exercicio.pular.lesson":
    "Studi della NASA mostrano che, con poca gravità, le ossa perdono forza se il corpo non si allena.",

  "ev.contato_terra.title": "Chiamata verso la Terra",
  "ev.contato_terra.body":
    "Un messaggio ci mette da 4 a 24 minuti per andare da Marte alla Terra. Non si può parlare in diretta!",
  "ev.contato_terra.conselho.label": "Chiedere un consiglio per la serra",
  "ev.contato_terra.conselho.outcome": "Messaggio inviato! La risposta arriva domani.",
  "ev.contato_terra.conselho.lesson":
    "Per colpa del ritardo, l’equipaggio su Marte deve risolvere molte cose da solo.",
  "ev.contato_terra.fotos.label": "Mandare foto agli scienziati",
  "ev.contato_terra.fotos.outcome":
    "Gli scienziati hanno adorato le foto! L’antenna ha usato tanta energia.",
  "ev.contato_terra.fotos.lesson":
    "Mandare dati così lontano richiede un’antenna potente, che usa tanta energia.",

  "ev.resposta_terra.title": "La Terra ha risposto!",
  "ev.resposta_terra.body":
    "Gli scienziati hanno mandato un consiglio per usare meglio la luce della serra. Ha dato più cibo!",

  // ================================================================ eventi per luogo della base
  // ☀️ pannelli
  "ev.redemoinho.title": "Un mulinello di polvere!",
  "ev.redemoinho.body":
    "Un mulinello di polvere passa vicino ai pannelli solari. Può sporcarli... o soffiare via la polvere vecchia!",
  "ev.redemoinho.cobrir.label": "Coprire i pannelli",
  "ev.redemoinho.cobrir.outcome": "I pannelli sono protetti, ma coprirli ha consumato energia.",
  "ev.redemoinho.cobrir.lesson":
    "Su Marte il vento può sporcare o pulire i pannelli. Per questo è difficile sapere quanta energia avrà la base domani.",
  "ev.redemoinho.observar.label": "Lasciarlo passare e filmarlo",
  "ev.redemoinho.observar.outcome":
    "Avete filmato il mulinello per gli scienziati. Domani vedremo cosa ha fatto ai pannelli.",
  "ev.redemoinho.observar.lesson":
    "Nel 2005, un mulinello è passato sopra il robot Spirit e ha pulito i suoi pannelli. La sua energia è salita tantissimo!",
  "ev.redemoinho_passou.title": "Il mulinello è passato",
  "ev.redemoinho_passou.body":
    "Se i pannelli erano sporchi, il vento li ha puliti e l'energia è salita. Se erano puliti, si sono sporcati un po'.",

  "ev.painel_rachado.title": "Un sassolino ha crepato un pannello!",
  "ev.painel_rachado.body":
    "Un sassolino arrivato dallo spazio è caduto sulla base e ha crepato un pannello solare.",
  "ev.painel_rachado.consertar.label": "Uscire a ripararlo oggi",
  "ev.painel_rachado.consertar.outcome":
    "Il pannello funziona di nuovo, ma la riparazione ha consumato energia e l'aria della tuta.",
  "ev.painel_rachado.consertar.lesson":
    "Fuori non si può respirare: l'aria di Marte è quasi tutta anidride carbonica. Ogni riparazione fuori consuma l'aria della tuta.",
  "ev.painel_rachado.desligar.label": "Spegnere solo la parte rotta",
  "ev.painel_rachado.desligar.outcome":
    "Nessuno è dovuto uscire, ma ora i pannelli fanno meno energia.",
  "ev.painel_rachado.desligar.lesson":
    "L'aria di Marte è molto sottile e protegge poco. Così i sassi dallo spazio arrivano al suolo. La sonda InSight della NASA ne ha sentiti diversi colpire Marte.",

  "ev.inverno.title": "È arrivato l'inverno su Marte",
  "ev.inverno.body":
    "Anche Marte ha le stagioni. In inverno le giornate sono più corte e il Sole è più basso. I pannelli fanno meno energia.",
  "ev.inverno.inclinar.label": "Girare i pannelli verso il Sole",
  "ev.inverno.inclinar.outcome":
    "I pannelli prendono di nuovo più luce, ma spostarli ha consumato energia.",
  "ev.inverno.inclinar.lesson":
    "In inverno il robot Opportunity si fermava su pendii rivolti verso il Sole. Così i suoi pannelli prendevano più luce.",
  "ev.inverno.economizar.label": "Risparmiare: fermare il laboratorio",
  "ev.inverno.economizar.outcome":
    "La batteria ha fatto scorta di energia. Oggi il laboratorio dà solo metà dei punti scienza.",
  "ev.inverno.economizar.lesson":
    "Marte ha le stagioni perché è inclinato, come la Terra. In inverno ogni giorno ha meno ore di sole per i pannelli.",

  // 💨 fabbrica dell'aria
  "ev.vazamento.title": "La porta fischia!",
  "ev.vazamento.body":
    "La porta della fabbrica dell'aria fa fsssss. Sta uscendo un pochino d'aria!",
  "ev.vazamento.procurar.label": "Cercare il buchino con calma",
  "ev.vazamento.procurar.outcome":
    "Avete trovato il buco e l'avete chiuso per sempre. Ma ci è voluta l'energia di una giornata di lavoro.",
  "ev.vazamento.procurar.lesson":
    "Nel 2020, gli astronauti della Stazione Spaziale hanno lasciato fluttuare foglioline di tè nell'aria. Sono arrivate fino al buco e hanno mostrato la perdita!",
  "ev.vazamento.remendo.label": "Mettere una toppa veloce",
  "ev.vazamento.remendo.outcome":
    "Il fischio si è fermato... per ora. La toppa potrebbe staccarsi.",
  "ev.vazamento.remendo.lesson":
    "Sulla Stazione Spaziale, il buco è stato prima chiuso con una toppa provvisoria. Poi gli ingegneri hanno preparato la vera riparazione.",
  "ev.vazamento_volta.title": "La toppa si è staccata!",
  "ev.vazamento_volta.body":
    "La toppa veloce non ha tenuto ed è uscita un po' d'aria. Ora il buco è chiuso per sempre.",

  "ev.gerador_barulho.title": "Rumore strano nella macchina dell'aria",
  "ev.gerador_barulho.body":
    "La macchina che fa l'aria della base fa tac, tac, tac. Non è normale!",
  "ev.gerador_barulho.desligar.label": "Spegnerla e controllarla oggi",
  "ev.gerador_barulho.desligar.outcome":
    "Il pezzo allentato è stato stretto. Ma, con la macchina spenta, oggi la base ha fatto meno aria.",
  "ev.gerador_barulho.desligar.lesson":
    "L'aria di Marte è quasi tutta anidride carbonica. La macchina MOXIE, sul robot Perseverance, è riuscita a ricavarne ossigeno!",
  "ev.gerador_barulho.continuar.label": "Lasciarla accesa e lavorare",
  "ev.gerador_barulho.continuar.outcome":
    "L'aria ha continuato a uscire e avete lavorato di più. Ma il rumore c'è ancora...",
  "ev.gerador_barulho.continuar.lesson":
    "Un rumore nuovo in una macchina è un avviso. Riparare presto di solito costa meno fatica che riparare dopo il guasto.",
  "ev.gerador_quebrou.title": "La macchina dell'aria si è fermata!",
  "ev.gerador_quebrou.body":
    "Il rumore era un pezzo consumato. La macchina si è fermata, e la riparazione ha consumato aria ed energia.",

  "ev.agua_do_ar.title": "Acqua nascosta nell'aria",
  "ev.agua_do_ar.body":
    "Quando respiriamo e sudiamo, l'aria della base diventa umida. Possiamo recuperare quell'acqua!",
  "ev.agua_do_ar.coletar.label": "Accendere il raccoglitore d'acqua",
  "ev.agua_do_ar.coletar.outcome":
    "Avete raccolto acqua per annaffiare la serra. Le piante ringraziano! Il raccoglitore ha consumato energia.",
  "ev.agua_do_ar.coletar.lesson":
    "Sulla Stazione Spaziale quasi tutta l'acqua viene riciclata, anche quella del sudore e del respiro. Viene pulita e riusata.",
  "ev.agua_do_ar.guardar.label": "Tenere l'energia nella batteria",
  "ev.agua_do_ar.guardar.outcome": "La batteria è più carica, ma la serra ha ricevuto meno acqua.",
  "ev.agua_do_ar.guardar.lesson":
    "Portare acqua dalla Terra è molto difficile. Nelle missioni lunghe, ogni goccia non riciclata manca.",

  // 🌱 serra
  "ev.mofo.title": "Macchie sulle foglie!",
  "ev.mofo.body":
    "Alcune foglie della serra hanno la muffa. La muffa è un fungo che cresce dove c'è molta umidità.",
  "ev.mofo.cortar.label": "Tagliare le foglie malate",
  "ev.mofo.cortar.outcome": "Le piante sono salve, ma avete perso un po' di cibo.",
  "ev.mofo.cortar.lesson":
    "Nel 2015, dei fiori chiamati zinnie hanno preso la muffa sulla Stazione Spaziale. L'astronauta Scott Kelly ha tagliato le parti malate e ne ha salvate alcune.",
  "ev.mofo.ventilar.label": "Accendere i ventilatori per asciugare",
  "ev.mofo.ventilar.outcome":
    "Il vento ha asciugato le foglie. I ventilatori hanno consumato energia e alcune foglie sono appassite.",
  "ev.mofo.ventilar.lesson":
    "Gli astronauti hanno acceso i ventilatori per asciugare le zinnie. Ma troppo vento ha seccato anche le piante! Ci vuole equilibrio.",

  "ev.rabanete.title": "I ravanelli sono pronti!",
  "ev.rabanete.body":
    "I ravanelli sono cresciuti in fretta e si possono già raccogliere. Le patate ci metteranno ancora un po'.",
  "ev.rabanete.comer.label": "Raccoglierli e mangiarli tutti",
  "ev.rabanete.comer.outcome": "Che banchetto! Oggi tanto cibo, ma non sono rimasti semi.",
  "ev.rabanete.comer.lesson":
    "Il ravanello cresce in fretta. Sulla Stazione Spaziale i ravanelli erano pronti in soli 27 giorni!",
  "ev.rabanete.sementes.label": "Tenerne alcuni da piantare",
  "ev.rabanete.sementes.outcome":
    "Ne avete mangiati un po' e ripiantato il resto. Tra qualche sol ce ne saranno altri!",
  "ev.rabanete.sementes.lesson":
    "In una base lontana dalla Terra, conservare i semi è importante: diventano cibo nuovo senza aspettare una nave.",
  "ev.rabanete_de_novo.title": "Nuovo raccolto di ravanelli!",
  "ev.rabanete_de_novo.body":
    "I semi che avete conservato sono diventati ravanelli. Più cibo per la squadra!",

  "ev.sementes_terra.title": "Sono arrivati semi dalla Terra!",
  "ev.sementes_terra.body":
    "Una scatola di semi è partita dalla Terra molti mesi fa ed è finalmente arrivata. Nell'aiuola c'è posto per un solo tipo.",
  "ev.sementes_terra.alface.label": "Piantare lattuga (veloce)",
  "ev.sementes_terra.alface.outcome": "La lattuga cresce in fretta, ma dà poco cibo.",
  "ev.sementes_terra.alface.lesson":
    "Nel 2015, gli astronauti della Stazione Spaziale hanno mangiato una lattuga coltivata proprio lì, nello spazio!",
  "ev.sementes_terra.batata.label": "Piantare patate (lente)",
  "ev.sementes_terra.batata.outcome": "Le patate ci metteranno un po', ma daranno tanto cibo.",
  "ev.sementes_terra.batata.lesson":
    "Un viaggio dalla Terra a Marte dura molti mesi. Le piante che danno tanto cibo aiutano la base a dipendere meno dalla Terra.",
  "ev.alface_pronta.title": "La lattuga è cresciuta!",
  "ev.alface_pronta.body": "Foglie freschissime per l'insalata della squadra.",
  "ev.batata_pronta.title": "È ora di raccogliere le patate!",
  "ev.batata_pronta.body": "Le patate ci hanno messo un po', ma ne è valsa la pena: tanto cibo!",

  // 🔬 laboratorio
  "ev.microscopio.title": "Il microscopio si è rotto!",
  "ev.microscopio.body":
    "Il microscopio non mette più a fuoco. Si è rotto un pezzettino, e il negozio più vicino è su un altro pianeta!",
  "ev.microscopio.imprimir.label": "Stampare un pezzo nuovo",
  "ev.microscopio.imprimir.outcome":
    "La stampante 3D ha fatto il pezzo! Ma ha consumato molta energia.",
  "ev.microscopio.imprimir.lesson":
    "Nel 2014, la NASA ha inviato con un messaggio il disegno di un attrezzo alla Stazione Spaziale. Lassù è stato fatto con una stampante 3D!",
  "ev.microscopio.lupa.label": "Usare una semplice lente",
  "ev.microscopio.lupa.outcome":
    "Con la lente si vedono meno dettagli. Oggi il laboratorio dà solo metà dei punti scienza.",
  "ev.microscopio.lupa.lesson":
    "Il microscopio mostra cose troppo piccole per l'occhio e per la lente. Un buon attrezzo fa una grande differenza nella scienza.",

  "ev.gelo.title": "Ghiaccio sotto il suolo!",
  "ev.gelo.body":
    "Il robot ha scavato una buca vicino alla base e ha trovato ghiaccio d'acqua nascosto sotto la sabbia!",
  "ev.gelo.estudar.label": "Studiare il ghiaccio",
  "ev.gelo.estudar.outcome":
    "Una scoperta importante per la scienza! L'analisi ha consumato energia.",
  "ev.gelo.estudar.lesson":
    "Nel 2008, la sonda Phoenix della NASA ha scavato il suolo di Marte e l'ha confermato: lì sotto c'era ghiaccio d'acqua!",
  "ev.gelo.derreter.label": "Scioglierlo per annaffiare",
  "ev.gelo.derreter.outcome":
    "La serra ha ricevuto acqua. Senza il ghiaccio da studiare, oggi il laboratorio dà solo metà dei punti scienza.",
  "ev.gelo.derreter.lesson":
    "Usare quello che c'è già su Marte, come il ghiaccio, è uno dei piani per le basi del futuro. Così bisogna portare meno cose dalla Terra.",

  "ev.bacterias.title": "Esperimento con i batteri",
  "ev.bacterias.body":
    "La squadra vuole studiare i batteri, esseri viventi così piccoli che si vedono solo al microscopio.",
  "ev.bacterias.caixa.label": "Farlo dentro la scatola chiusa",
  "ev.bacterias.caixa.outcome":
    "Tutto sicuro e la ricerca è riuscita! Ma la scatola ha consumato molta energia.",
  "ev.bacterias.caixa.lesson":
    "La Stazione Spaziale ha una scatola chiusa con guanti per gli esperimenti. Niente di quello che c'è dentro esce nella stazione.",
  "ev.bacterias.mesa.label": "Farlo in fretta, sul tavolo",
  "ev.bacterias.mesa.outcome":
    "Più veloce e più economico! Ma forse qualche batterio è scappato...",
  "ev.bacterias.mesa.lesson":
    "La NASA pulisce benissimo le navicelle prima di andare su Marte, per non portare microbi dalla Terra. Si chiama protezione planetaria.",
  "ev.lab_contaminado.title": "Il laboratorio si è sporcato",
  "ev.lab_contaminado.body":
    "Alcuni batteri sono scappati. Pulire il tavolo è costato 2 punti energia.",

  // 🛡️ rifugio
  "ev.rachadura.title": "Una crepa nello strato di sabbia",
  "ev.rachadura.body":
    "La sabbia che copre la base si è crepata in un angolo. Blocca le radiazioni, un'energia invisibile che fa male al corpo.",
  "ev.rachadura.tapar.label": "Mandare il robot a chiuderla",
  "ev.rachadura.tapar.outcome":
    "Il robot ha coperto la crepa. La protezione è intera, ma ha consumato energia.",
  "ev.rachadura.tapar.lesson":
    "La Terra ha uno scudo magnetico e un'aria spessa che proteggono dalle radiazioni. Marte no. Per questo gli scienziati studiano come coprire le case con la sabbia di Marte.",
  "ev.rachadura.depois.label": "Lasciarla per dopo",
  "ev.rachadura.depois.outcome":
    "Nessuna energia spesa oggi, ma la base ha perso uno strato di protezione.",
  "ev.rachadura.depois.lesson":
    "Uno strato di sabbia più sottile lascia passare più radiazioni. Ogni strato in più aiuta a proteggere la squadra.",

  "ev.treino.title": "È ora dell'esercitazione di emergenza?",
  "ev.treino.body":
    "È da tanto che la squadra non si esercita su cosa fare in un'emergenza. Esercitarsi ora o lavorare?",
  "ev.treino.treinar.label": "Esercitarsi oggi",
  "ev.treino.treinar.outcome":
    "La squadra sa a memoria cosa fare! Ma l'esercitazione ha consumato energia e tempo di ricerca.",
  "ev.treino.treinar.lesson":
    "Gli astronauti della Stazione Spaziale si esercitano molte volte su cosa fare in caso di incendio o di perdita d'aria.",
  "ev.treino.adiar.label": "Lavorare ed esercitarsi un altro giorno",
  "ev.treino.adiar.outcome": "Oggi avete fatto più scienza. Ma la squadra non è allenata...",
  "ev.treino.adiar.lesson":
    "Nello spazio non ci sono pompieri vicini. Gli astronauti sono i loro stessi soccorritori, per questo devono esercitarsi.",
  "ev.alarme_teste.title": "È suonato l'allarme!",
  "ev.alarme_teste.body":
    "La Terra ha fatto una prova di emergenza a sorpresa. Senza allenamento, la squadra si è confusa e si è stancata.",

  // 📡 antenna
  "ev.aniversario.title": "Compleanno alla base!",
  "ev.aniversario.body":
    "Oggi è il compleanno di un astronauta! La sua famiglia ha mandato un videomessaggio dalla Terra.",
  "ev.aniversario.festa.label": "Fare una festicciola",
  "ev.aniversario.festa.outcome":
    "C'era la torta, e tutti hanno guardato il video insieme. La squadra è felice, ma la festa ha consumato cibo.",
  "ev.aniversario.festa.lesson":
    "Stare lontani da casa è una delle grandi sfide di un viaggio su Marte. La NASA studia come mantenere gli astronauti felici e uniti.",
  "ev.aniversario.depois.label": "Guardare il video dopo il lavoro",
  "ev.aniversario.depois.outcome":
    "La ricerca è andata avanti, ma il festeggiato è stato triste tutto il giorno.",
  "ev.aniversario.depois.lesson":
    "Un messaggio impiega da 4 a 24 minuti per andare da Marte alla Terra. Per questo la famiglia manda un video registrato: non si può parlare in diretta.",

  "ev.escola.title": "Ha chiamato una scuola della Terra!",
  "ev.escola.body": "I bambini di una scuola sulla Terra vogliono sapere com'è vivere su Marte!",
  "ev.escola.video.label": "Registrare un video per i bambini",
  "ev.escola.video.outcome":
    "Ai bambini è piaciuto tantissimo! La squadra è felice, ma l'antenna ha consumato energia.",
  "ev.escola.video.lesson":
    "Gli astronauti della Stazione Spaziale parlano con le scuole via radio. Più di mille scuole hanno già fatto loro domande!",
  "ev.escola.dados.label": "Mandare solo i dati della missione",
  "ev.escola.dados.outcome":
    "Gli scienziati hanno ricevuto dati nuovi, ma la squadra non ha fatto pause e si è stancata.",
  "ev.escola.dados.lesson":
    "Sulla Terra, gli scienziati studiano i dati che le missioni inviano. È così che scopriamo cose nuove su Marte.",

  "ev.antena_torta.title": "L'antenna si è storta!",
  "ev.antena_torta.body":
    "Il vento ha spinto l'antenna. Ora non punta più verso la Terra, e i messaggi non arrivano.",
  "ev.antena_torta.astronauta.label": "Un astronauta esce a sistemarla",
  "ev.antena_torta.astronauta.outcome":
    "L'antenna è tornata al suo posto! Ma l'uscita ha consumato l'aria della tuta e ha stancato.",
  "ev.antena_torta.astronauta.lesson":
    "L'antenna deve puntare dritta verso la Terra. Laggiù, la NASA ha antenne giganti in tre luoghi del mondo per ascoltare le navicelle.",
  "ev.antena_torta.robo.label": "Mandare il robot a sistemarla",
  "ev.antena_torta.robo.outcome":
    "Il robot ha sistemato l'antenna senza che nessuno uscisse, ma ha consumato molta energia.",
  "ev.antena_torta.robo.lesson":
    "I robot lavorano fuori senza consumare l'aria di nessuno. Per questo la NASA ha mandato robot su Marte prima delle persone.",

  // 🛏️ letto
  "ev.sem_sono.title": "Un'astronauta non riesce a dormire",
  "ev.sem_sono.body":
    "Su Marte la giornata dura circa 40 minuti in più che sulla Terra. Il corpo di un'astronauta non si è ancora abituato.",
  "ev.sem_sono.descansar.label": "Lasciarla riposare oggi",
  "ev.sem_sono.descansar.outcome":
    "Si è svegliata piena di energia! Oggi il laboratorio dà solo metà dei punti scienza.",
  "ev.sem_sono.descansar.lesson":
    "Un sol, il giorno di Marte, dura 24 ore e 39 minuti. Squadre della NASA che guidano robot su Marte hanno già vissuto con quest'orario!",
  "ev.sem_sono.luzes.label": "Usare le luci per sistemare il sonno",
  "ev.sem_sono.luzes.outcome":
    "Le luci hanno aiutato il suo corpo ad abituarsi poco a poco. Ma hanno consumato energia.",
  "ev.sem_sono.luzes.lesson":
    "La luce aiuta il corpo a capire se è giorno o notte. Le squadre che vivevano con l'orario di Marte usavano tende scure per dormire.",

  "ev.saudade.title": "Nostalgia di casa",
  "ev.saudade.body":
    "Un astronauta sente la mancanza della famiglia. Non riesce a concentrarsi sul lavoro.",
  "ev.saudade.folga.label": "Giorno libero con cibo speciale",
  "ev.saudade.folga.outcome":
    "Si è riposato e ha mangiato il suo piatto preferito. Sta molto meglio, ma ha consumato cibo.",
  "ev.saudade.folga.lesson":
    "Per la NASA, essere isolati e lontani da casa è uno dei grandi rischi di un viaggio su Marte. Prendersi cura della mente è importante quanto prendersi cura del corpo.",
  "ev.saudade.plantas.label": "Curare le piante con un amico",
  "ev.saudade.plantas.outcome":
    "Curare la serra insieme ha aiutato! Ma la luce in più ha consumato energia.",
  "ev.saudade.plantas.lesson":
    "La NASA sta studiando se curare le piante aiuta gli astronauti a sentirsi meglio nello spazio. A molti piace!",

  // 🚙 rover
  "ev.pneu.title": "Un buco nella ruota del rover!",
  "ev.pneu.body": "Il rover è passato su sassi appuntiti e una ruota si è bucata.",
  "ev.pneu.devagar.label": "Tornare piano sulla sabbia morbida",
  "ev.pneu.devagar.outcome":
    "La ruota non è peggiorata, ma il giro è stato corto e ha dato meno scienza.",
  "ev.pneu.devagar.lesson":
    "Le ruote del robot Curiosity si sono bucate sui sassi appuntiti. Da allora la squadra sceglie strade più lisce.",
  "ev.pneu.seguir.label": "Continuare sui sassi",
  "ev.pneu.seguir.outcome":
    "Siete andati più lontano e avete trovato cose nuove! Ma la ruota è peggiorata.",
  "ev.pneu.seguir.lesson":
    "Su Marte non c'è un'officina: ogni ruota deve durare tutta la missione. Per questo ogni percorso è pianificato con cura.",
  "ev.roda_conserto.title": "È ora di riparare la ruota",
  "ev.roda_conserto.body":
    "La ruota è peggiorata e il rover ha avuto bisogno di una riparazione. Questo ha consumato energia.",

  "ev.dunas.title": "Un sentiero tra le dune",
  "ev.dunas.body":
    "Il rover ha trovato una strada nuova tra le dune, che sono colline di sabbia. Dove porterà?",
  "ev.dunas.entrar.label": "Prendere il sentiero ora",
  "ev.dunas.entrar.outcome": "Posti nuovi e tanta scienza! Ma la sabbia sembrava morbida...",
  "ev.dunas.entrar.lesson":
    "Nel 2009, il robot Spirit è sprofondato nella sabbia morbida nascosta sotto una sottile crosta dura. Non ne è più uscito.",
  "ev.dunas.estudar.label": "Studiare prima la strada",
  "ev.dunas.estudar.outcome":
    "Avete trovato una strada sicura. È stato più lento e ha consumato energia.",
  "ev.dunas.estudar.lesson":
    "Prima di far muovere un robot, le squadre studiano le foto del suolo. Un passo sbagliato può bloccare il robot.",
  "ev.rover_atolou.title": "Il rover si è insabbiato!",
  "ev.rover_atolou.body":
    "La sabbia era morbida e il rover è sprofondato. Tirarlo fuori ha consumato molta energia.",

  "ev.fossil.title": "È un fossile?!",
  "ev.fossil.body":
    "Il rover ha trovato una pietra con un disegno strano. Sembra un fossile, un essere vivente antico diventato pietra! Sarà vero?",
  "ev.fossil.analisar.label": "Portarla in laboratorio",
  "ev.fossil.analisar.outcome":
    "La pietra è andata in laboratorio. Il risultato arriva presto! Il trasporto ha consumato energia.",
  "ev.fossil.analisar.lesson":
    "Gli scienziati non credono solo a quello che sembra: fanno delle prove. Fino a oggi nessuno ha trovato un fossile su Marte.",
  "ev.fossil.foto.label": "Fare foto e proseguire",
  "ev.fossil.foto.outcome": "Le foto sono bellissime, ma forse non saprete mai cos'era.",
  "ev.fossil.foto.lesson":
    "Il robot Perseverance conserva pietre in piccoli tubi. L'idea è che un giorno vengano studiate nei laboratori sulla Terra.",
  "ev.fossil_resultado.title": "Era solo una roccia... ma è scienza!",
  "ev.fossil_resultado.body":
    "Non era un fossile, ma una roccia normale. Ma scoprirlo è comunque scienza: ora sappiamo di più sulle rocce di Marte!",
};
