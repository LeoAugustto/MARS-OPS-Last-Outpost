// Textos dos EVENTOS DO SOL (DONKI) nos 5 idiomas. Dono: Bruno.
// Variáveis vindas do evento real: {data} (AAAA-MM-DD), {tamanho} (classe X9.3 / velocidade km/s), {estrelas} (1/3 a 3/3).

const pt = {
  "ev.sol_clarao.title": "Clarão do Sol!",
  "ev.sol_clarao.body":
    "A NASA registrou um clarão no Sol (classe {tamanho}, força {estrelas}) em {data}. Clarões fortes atrapalham o rádio.",
  "ev.sol_clarao.reserva.label": "Ligar a antena reserva",
  "ev.sol_clarao.reserva.outcome":
    "O rádio continuou funcionando, mas a antena reserva gastou energia.",
  "ev.sol_clarao.reserva.lesson":
    "Clarões fortes causam apagões de rádio de verdade aqui na Terra. Ter uma antena reserva ajuda, mas custa energia.",
  "ev.sol_clarao.desligar.label": "Desligar a antena hoje",
  "ev.sol_clarao.desligar.outcome":
    "Vocês guardaram energia, mas hoje o laboratório só consegue enviar metade dos dados.",
  "ev.sol_clarao.desligar.lesson":
    "Sem rádio, a ciência não chega à Terra. Às vezes economizar energia significa perder informação.",

  "ev.sol_nuvem.title": "Uma nuvem do Sol vem aí!",
  "ev.sol_nuvem.body":
    "A NASA viu uma nuvem de partículas saindo do Sol a {tamanho} em {data} (força {estrelas}). Ela pode chegar a Marte em 1 a 3 sóis.",
  "ev.sol_nuvem.abrigo.label": "Preparar o abrigo",
  "ev.sol_nuvem.abrigo.outcome": "O abrigo está pronto para quando a nuvem chegar. Gastou energia.",
  "ev.sol_nuvem.abrigo.lesson":
    "Nuvens do Sol levam dias para atravessar o espaço. Esse tempo serve para se preparar.",
  "ev.sol_nuvem.trabalhar.label": "Continuar trabalhando",
  "ev.sol_nuvem.trabalhar.outcome": "Mais ciência hoje... mas a nuvem continua vindo.",
  "ev.sol_nuvem.trabalhar.lesson":
    "Ignorar um aviso pode sair caro depois. Cientistas da NASA observam o Sol todos os dias.",

  "ev.sol_nuvem_chega.title": "A nuvem do Sol chegou!",
  "ev.sol_nuvem_chega.body":
    "As partículas estão passando por Marte agora. Marte não tem um escudo magnético forte como a Terra.",
  "ev.sol_nuvem_chega.ficar.label": "Ficar no abrigo",
  "ev.sol_nuvem_chega.ficar.outcome": "Vocês ficaram seguros, mas o abrigo gastou energia.",
  "ev.sol_nuvem_chega.ficar.lesson":
    "Ficar protegido custa: ninguém trabalha lá fora e o abrigo usa energia.",
  "ev.sol_nuvem_chega.trabalhar.label": "Sair para trabalhar",
  "ev.sol_nuvem_chega.trabalhar.outcome": "Ciência feita, mas vocês tomaram mais radiação.",
  "ev.sol_nuvem_chega.trabalhar.lesson":
    "A Terra tem um campo magnético que desvia as partículas do Sol. Marte quase não tem.",

  "ev.sol_chuva.title": "Chuva de partículas AGORA!",
  "ev.sol_chuva.body":
    "Partículas muito rápidas do Sol estão chegando (evento real de {data}, força {estrelas}). Elas chegam em minutos!",
  "ev.sol_chuva.correr.label": "Correr para o abrigo",
  "ev.sol_chuva.correr.outcome": "Todos seguros! Mas o trabalho do dia parou.",
  "ev.sol_chuva.correr.lesson":
    "Algumas partículas do Sol viajam quase na velocidade da luz. Astronautas têm pouco tempo para se proteger.",
  "ev.sol_chuva.terminar.label": "Terminar o serviço lá fora",
  "ev.sol_chuva.terminar.outcome":
    "Serviço feito, mas vocês tomaram radiação. O escudo ajudou um pouco.",
  "ev.sol_chuva.terminar.lesson":
    "Quanto mais escudo de areia a base tem, menos radiação a tripulação recebe.",

  "ev.sol_terra.title": "Tempestade magnética lá na Terra",
  "ev.sol_terra.body":
    "Em {data}, uma tempestade magnética (força {estrelas}) atingiu a Terra. O Controle de Missão está com dificuldade para falar com vocês.",
  "ev.sol_terra.esperar.label": "Esperar a Terra",
  "ev.sol_terra.esperar.outcome":
    "Vocês esperaram a Terra. Hoje o laboratório só consegue enviar metade dos dados.",
  "ev.sol_terra.esperar.lesson":
    "O campo magnético da Terra protege as pessoas, mas uma tempestade forte atrapalha rádios e satélites.",
  "ev.sol_terra.sozinhos.label": "Resolver sozinhos",
  "ev.sol_terra.sozinhos.outcome":
    "Vocês resolveram tudo sozinhos! Gastou energia, mas a ciência andou.",
  "ev.sol_terra.sozinhos.lesson":
    "Marte fica muito longe. Astronautas precisam saber resolver problemas sem a ajuda da Terra.",
} as const;

export type SolKey = keyof typeof pt;
type SolDict = Record<SolKey, string>;

const en: SolDict = {
  "ev.sol_clarao.title": "Solar flash!",
  "ev.sol_clarao.body":
    "NASA recorded a flash on the Sun (class {tamanho}, power {estrelas}) on {data}. Strong flashes mess up the radio.",
  "ev.sol_clarao.reserva.label": "Turn on the backup antenna",
  "ev.sol_clarao.reserva.outcome": "The radio kept working, but the backup antenna used energy.",
  "ev.sol_clarao.reserva.lesson":
    "Strong solar flashes cause real radio blackouts here on Earth. A backup antenna helps, but it costs energy.",
  "ev.sol_clarao.desligar.label": "Turn the antenna off today",
  "ev.sol_clarao.desligar.outcome":
    "You saved energy, but today the lab can only send half of its data.",
  "ev.sol_clarao.desligar.lesson":
    "Without radio, science can’t reach Earth. Sometimes saving energy means losing information.",

  "ev.sol_nuvem.title": "A cloud from the Sun is coming!",
  "ev.sol_nuvem.body":
    "NASA saw a cloud of particles leaving the Sun at {tamanho} on {data} (power {estrelas}). It may reach Mars in 1 to 3 sols.",
  "ev.sol_nuvem.abrigo.label": "Get the shelter ready",
  "ev.sol_nuvem.abrigo.outcome": "The shelter is ready for when the cloud arrives. It used energy.",
  "ev.sol_nuvem.abrigo.lesson":
    "Clouds from the Sun take days to cross space. That time is for getting ready.",
  "ev.sol_nuvem.trabalhar.label": "Keep working",
  "ev.sol_nuvem.trabalhar.outcome": "More science today... but the cloud is still coming.",
  "ev.sol_nuvem.trabalhar.lesson":
    "Ignoring a warning can cost a lot later. NASA scientists watch the Sun every day.",

  "ev.sol_nuvem_chega.title": "The cloud from the Sun is here!",
  "ev.sol_nuvem_chega.body":
    "The particles are passing Mars right now. Mars has no strong magnetic shield like Earth.",
  "ev.sol_nuvem_chega.ficar.label": "Stay in the shelter",
  "ev.sol_nuvem_chega.ficar.outcome": "You stayed safe, but the shelter used energy.",
  "ev.sol_nuvem_chega.ficar.lesson":
    "Staying safe has a cost: nobody works outside and the shelter uses energy.",
  "ev.sol_nuvem_chega.trabalhar.label": "Go out and work",
  "ev.sol_nuvem_chega.trabalhar.outcome": "Science done, but you got more radiation.",
  "ev.sol_nuvem_chega.trabalhar.lesson":
    "Earth has a magnetic field that pushes the Sun’s particles away. Mars barely has one.",

  "ev.sol_chuva.title": "Particle shower NOW!",
  "ev.sol_chuva.body":
    "Super-fast particles from the Sun are arriving (real event from {data}, power {estrelas}). They get here in minutes!",
  "ev.sol_chuva.correr.label": "Run to the shelter",
  "ev.sol_chuva.correr.outcome": "Everyone is safe! But the day’s work stopped.",
  "ev.sol_chuva.correr.lesson":
    "Some particles from the Sun travel almost at the speed of light. Astronauts have little time to get safe.",
  "ev.sol_chuva.terminar.label": "Finish the job outside",
  "ev.sol_chuva.terminar.outcome": "Job done, but you got radiation. The shield helped a little.",
  "ev.sol_chuva.terminar.lesson":
    "The more sand shield the base has, the less radiation the crew gets.",

  "ev.sol_terra.title": "Magnetic storm back on Earth",
  "ev.sol_terra.body":
    "On {data}, a magnetic storm (power {estrelas}) hit Earth. Mission Control is having trouble talking to you.",
  "ev.sol_terra.esperar.label": "Wait for Earth",
  "ev.sol_terra.esperar.outcome":
    "You waited for Earth. Today the lab can only send half of its data.",
  "ev.sol_terra.esperar.lesson":
    "Earth’s magnetic field protects people, but a strong storm disturbs radios and satellites.",
  "ev.sol_terra.sozinhos.label": "Solve it yourselves",
  "ev.sol_terra.sozinhos.outcome":
    "You solved everything on your own! It used energy, but science moved on.",
  "ev.sol_terra.sozinhos.lesson":
    "Mars is very far away. Astronauts must know how to solve problems without Earth’s help.",
};

const es: SolDict = {
  "ev.sol_clarao.title": "¡Destello del Sol!",
  "ev.sol_clarao.body":
    "La NASA registró un destello en el Sol (clase {tamanho}, fuerza {estrelas}) el {data}. Los destellos fuertes estropean la radio.",
  "ev.sol_clarao.reserva.label": "Encender la antena de reserva",
  "ev.sol_clarao.reserva.outcome":
    "La radio siguió funcionando, pero la antena de reserva gastó energía.",
  "ev.sol_clarao.reserva.lesson":
    "Los destellos fuertes causan apagones de radio de verdad aquí en la Tierra. Una antena de reserva ayuda, pero cuesta energía.",
  "ev.sol_clarao.desligar.label": "Apagar la antena hoy",
  "ev.sol_clarao.desligar.outcome":
    "Guardaron energía, pero hoy el laboratorio solo puede enviar la mitad de los datos.",
  "ev.sol_clarao.desligar.lesson":
    "Sin radio, la ciencia no llega a la Tierra. A veces ahorrar energía significa perder información.",

  "ev.sol_nuvem.title": "¡Viene una nube del Sol!",
  "ev.sol_nuvem.body":
    "La NASA vio una nube de partículas saliendo del Sol a {tamanho} el {data} (fuerza {estrelas}). Puede llegar a Marte en 1 a 3 soles.",
  "ev.sol_nuvem.abrigo.label": "Preparar el refugio",
  "ev.sol_nuvem.abrigo.outcome": "El refugio está listo para cuando llegue la nube. Gastó energía.",
  "ev.sol_nuvem.abrigo.lesson":
    "Las nubes del Sol tardan días en cruzar el espacio. Ese tiempo sirve para prepararse.",
  "ev.sol_nuvem.trabalhar.label": "Seguir trabajando",
  "ev.sol_nuvem.trabalhar.outcome": "Más ciencia hoy... pero la nube sigue viniendo.",
  "ev.sol_nuvem.trabalhar.lesson":
    "Ignorar un aviso puede salir caro después. Los científicos de la NASA observan el Sol todos los días.",

  "ev.sol_nuvem_chega.title": "¡Llegó la nube del Sol!",
  "ev.sol_nuvem_chega.body":
    "Las partículas están pasando por Marte ahora. Marte no tiene un escudo magnético fuerte como la Tierra.",
  "ev.sol_nuvem_chega.ficar.label": "Quedarse en el refugio",
  "ev.sol_nuvem_chega.ficar.outcome": "Estuvieron a salvo, pero el refugio gastó energía.",
  "ev.sol_nuvem_chega.ficar.lesson":
    "Protegerse cuesta: nadie trabaja afuera y el refugio usa energía.",
  "ev.sol_nuvem_chega.trabalhar.label": "Salir a trabajar",
  "ev.sol_nuvem_chega.trabalhar.outcome": "Ciencia hecha, pero recibieron más radiación.",
  "ev.sol_nuvem_chega.trabalhar.lesson":
    "La Tierra tiene un campo magnético que desvía las partículas del Sol. Marte casi no tiene.",

  "ev.sol_chuva.title": "¡Lluvia de partículas AHORA!",
  "ev.sol_chuva.body":
    "Partículas muy rápidas del Sol están llegando (evento real del {data}, fuerza {estrelas}). ¡Llegan en minutos!",
  "ev.sol_chuva.correr.label": "Correr al refugio",
  "ev.sol_chuva.correr.outcome": "¡Todos a salvo! Pero el trabajo del día se detuvo.",
  "ev.sol_chuva.correr.lesson":
    "Algunas partículas del Sol viajan casi a la velocidad de la luz. Los astronautas tienen poco tiempo para protegerse.",
  "ev.sol_chuva.terminar.label": "Terminar el trabajo afuera",
  "ev.sol_chuva.terminar.outcome":
    "Trabajo hecho, pero recibieron radiación. El escudo ayudó un poco.",
  "ev.sol_chuva.terminar.lesson":
    "Cuanto más escudo de arena tiene la base, menos radiación recibe la tripulación.",

  "ev.sol_terra.title": "Tormenta magnética en la Tierra",
  "ev.sol_terra.body":
    "El {data}, una tormenta magnética (fuerza {estrelas}) golpeó la Tierra. El Control de Misión tiene problemas para hablar con ustedes.",
  "ev.sol_terra.esperar.label": "Esperar a la Tierra",
  "ev.sol_terra.esperar.outcome":
    "Esperaron a la Tierra. Hoy el laboratorio solo puede enviar la mitad de los datos.",
  "ev.sol_terra.esperar.lesson":
    "El campo magnético de la Tierra protege a las personas, pero una tormenta fuerte molesta a radios y satélites.",
  "ev.sol_terra.sozinhos.label": "Resolverlo solos",
  "ev.sol_terra.sozinhos.outcome":
    "¡Lo resolvieron todo solos! Gastó energía, pero la ciencia avanzó.",
  "ev.sol_terra.sozinhos.lesson":
    "Marte está muy lejos. Los astronautas deben saber resolver problemas sin la ayuda de la Tierra.",
};

const fr: SolDict = {
  "ev.sol_clarao.title": "Éclair du Soleil !",
  "ev.sol_clarao.body":
    "La NASA a enregistré un éclair sur le Soleil (classe {tamanho}, force {estrelas}) le {data}. Les éclairs forts brouillent la radio.",
  "ev.sol_clarao.reserva.label": "Allumer l’antenne de secours",
  "ev.sol_clarao.reserva.outcome":
    "La radio a continué de marcher, mais l’antenne de secours a utilisé de l’énergie.",
  "ev.sol_clarao.reserva.lesson":
    "Les éclairs forts provoquent de vraies coupures de radio ici sur Terre. Une antenne de secours aide, mais coûte de l’énergie.",
  "ev.sol_clarao.desligar.label": "Éteindre l’antenne aujourd’hui",
  "ev.sol_clarao.desligar.outcome":
    "Vous avez gardé de l’énergie, mais aujourd’hui le laboratoire ne peut envoyer que la moitié des données.",
  "ev.sol_clarao.desligar.lesson":
    "Sans radio, la science n’arrive pas sur Terre. Parfois, économiser de l’énergie veut dire perdre des informations.",

  "ev.sol_nuvem.title": "Un nuage du Soleil arrive !",
  "ev.sol_nuvem.body":
    "La NASA a vu un nuage de particules quitter le Soleil à {tamanho} le {data} (force {estrelas}). Il peut atteindre Mars dans 1 à 3 sols.",
  "ev.sol_nuvem.abrigo.label": "Préparer l’abri",
  "ev.sol_nuvem.abrigo.outcome":
    "L’abri est prêt pour l’arrivée du nuage. Ça a utilisé de l’énergie.",
  "ev.sol_nuvem.abrigo.lesson":
    "Les nuages du Soleil mettent des jours à traverser l’espace. Ce temps sert à se préparer.",
  "ev.sol_nuvem.trabalhar.label": "Continuer à travailler",
  "ev.sol_nuvem.trabalhar.outcome": "Plus de science aujourd’hui... mais le nuage arrive toujours.",
  "ev.sol_nuvem.trabalhar.lesson":
    "Ignorer une alerte peut coûter cher plus tard. Les scientifiques de la NASA observent le Soleil tous les jours.",

  "ev.sol_nuvem_chega.title": "Le nuage du Soleil est là !",
  "ev.sol_nuvem_chega.body":
    "Les particules passent sur Mars en ce moment. Mars n’a pas de bouclier magnétique fort comme la Terre.",
  "ev.sol_nuvem_chega.ficar.label": "Rester dans l’abri",
  "ev.sol_nuvem_chega.ficar.outcome":
    "Vous êtes restés en sécurité, mais l’abri a utilisé de l’énergie.",
  "ev.sol_nuvem_chega.ficar.lesson":
    "Se protéger a un prix : personne ne travaille dehors et l’abri utilise de l’énergie.",
  "ev.sol_nuvem_chega.trabalhar.label": "Sortir travailler",
  "ev.sol_nuvem_chega.trabalhar.outcome": "Science faite, mais vous avez reçu plus de radiations.",
  "ev.sol_nuvem_chega.trabalhar.lesson":
    "La Terre a un champ magnétique qui dévie les particules du Soleil. Mars n’en a presque pas.",

  "ev.sol_chuva.title": "Pluie de particules MAINTENANT !",
  "ev.sol_chuva.body":
    "Des particules très rapides du Soleil arrivent (événement réel du {data}, force {estrelas}). Elles arrivent en quelques minutes !",
  "ev.sol_chuva.correr.label": "Courir à l’abri",
  "ev.sol_chuva.correr.outcome":
    "Tout le monde est à l’abri ! Mais le travail du jour s’est arrêté.",
  "ev.sol_chuva.correr.lesson":
    "Certaines particules du Soleil voyagent presque à la vitesse de la lumière. Les astronautes ont peu de temps pour se protéger.",
  "ev.sol_chuva.terminar.label": "Finir le travail dehors",
  "ev.sol_chuva.terminar.outcome":
    "Travail fini, mais vous avez reçu des radiations. Le bouclier a un peu aidé.",
  "ev.sol_chuva.terminar.lesson":
    "Plus la base a de bouclier de sable, moins l’équipage reçoit de radiations.",

  "ev.sol_terra.title": "Tempête magnétique sur Terre",
  "ev.sol_terra.body":
    "Le {data}, une tempête magnétique (force {estrelas}) a frappé la Terre. Le Contrôle de mission a du mal à vous parler.",
  "ev.sol_terra.esperar.label": "Attendre la Terre",
  "ev.sol_terra.esperar.outcome":
    "Vous avez attendu la Terre. Aujourd’hui le laboratoire ne peut envoyer que la moitié des données.",
  "ev.sol_terra.esperar.lesson":
    "Le champ magnétique de la Terre protège les gens, mais une forte tempête perturbe les radios et les satellites.",
  "ev.sol_terra.sozinhos.label": "Se débrouiller seuls",
  "ev.sol_terra.sozinhos.outcome":
    "Vous avez tout réglé seuls ! Ça a utilisé de l’énergie, mais la science a avancé.",
  "ev.sol_terra.sozinhos.lesson":
    "Mars est très loin. Les astronautes doivent savoir résoudre des problèmes sans l’aide de la Terre.",
};

const it: SolDict = {
  "ev.sol_clarao.title": "Lampo del Sole!",
  "ev.sol_clarao.body":
    "La NASA ha registrato un lampo sul Sole (classe {tamanho}, forza {estrelas}) il {data}. I lampi forti disturbano la radio.",
  "ev.sol_clarao.reserva.label": "Accendere l’antenna di riserva",
  "ev.sol_clarao.reserva.outcome":
    "La radio ha continuato a funzionare, ma l’antenna di riserva ha usato energia.",
  "ev.sol_clarao.reserva.lesson":
    "I lampi forti causano veri blackout radio qui sulla Terra. Un’antenna di riserva aiuta, ma costa energia.",
  "ev.sol_clarao.desligar.label": "Spegnere l’antenna oggi",
  "ev.sol_clarao.desligar.outcome":
    "Avete risparmiato energia, ma oggi il laboratorio può inviare solo metà dei dati.",
  "ev.sol_clarao.desligar.lesson":
    "Senza radio, la scienza non arriva sulla Terra. A volte risparmiare energia vuol dire perdere informazioni.",

  "ev.sol_nuvem.title": "Arriva una nube dal Sole!",
  "ev.sol_nuvem.body":
    "La NASA ha visto una nube di particelle lasciare il Sole a {tamanho} il {data} (forza {estrelas}). Può arrivare su Marte in 1-3 sol.",
  "ev.sol_nuvem.abrigo.label": "Preparare il rifugio",
  "ev.sol_nuvem.abrigo.outcome":
    "Il rifugio è pronto per quando arriverà la nube. Ha usato energia.",
  "ev.sol_nuvem.abrigo.lesson":
    "Le nubi del Sole impiegano giorni ad attraversare lo spazio. Quel tempo serve per prepararsi.",
  "ev.sol_nuvem.trabalhar.label": "Continuare a lavorare",
  "ev.sol_nuvem.trabalhar.outcome": "Più scienza oggi... ma la nube continua ad arrivare.",
  "ev.sol_nuvem.trabalhar.lesson":
    "Ignorare un avviso può costare caro dopo. Gli scienziati della NASA osservano il Sole ogni giorno.",

  "ev.sol_nuvem_chega.title": "È arrivata la nube del Sole!",
  "ev.sol_nuvem_chega.body":
    "Le particelle stanno passando su Marte proprio ora. Marte non ha uno scudo magnetico forte come la Terra.",
  "ev.sol_nuvem_chega.ficar.label": "Restare nel rifugio",
  "ev.sol_nuvem_chega.ficar.outcome": "Siete rimasti al sicuro, ma il rifugio ha usato energia.",
  "ev.sol_nuvem_chega.ficar.lesson":
    "Proteggersi ha un costo: nessuno lavora fuori e il rifugio usa energia.",
  "ev.sol_nuvem_chega.trabalhar.label": "Uscire a lavorare",
  "ev.sol_nuvem_chega.trabalhar.outcome": "Scienza fatta, ma avete preso più radiazioni.",
  "ev.sol_nuvem_chega.trabalhar.lesson":
    "La Terra ha un campo magnetico che devia le particelle del Sole. Marte quasi non ce l’ha.",

  "ev.sol_chuva.title": "Pioggia di particelle ADESSO!",
  "ev.sol_chuva.body":
    "Particelle velocissime del Sole stanno arrivando (evento reale del {data}, forza {estrelas}). Arrivano in pochi minuti!",
  "ev.sol_chuva.correr.label": "Correre al rifugio",
  "ev.sol_chuva.correr.outcome": "Tutti al sicuro! Ma il lavoro del giorno si è fermato.",
  "ev.sol_chuva.correr.lesson":
    "Alcune particelle del Sole viaggiano quasi alla velocità della luce. Gli astronauti hanno poco tempo per proteggersi.",
  "ev.sol_chuva.terminar.label": "Finire il lavoro fuori",
  "ev.sol_chuva.terminar.outcome":
    "Lavoro finito, ma avete preso radiazioni. Lo scudo ha aiutato un po’.",
  "ev.sol_chuva.terminar.lesson":
    "Più scudo di sabbia ha la base, meno radiazioni riceve l’equipaggio.",

  "ev.sol_terra.title": "Tempesta magnetica sulla Terra",
  "ev.sol_terra.body":
    "Il {data}, una tempesta magnetica (forza {estrelas}) ha colpito la Terra. Il Controllo Missione fa fatica a parlare con voi.",
  "ev.sol_terra.esperar.label": "Aspettare la Terra",
  "ev.sol_terra.esperar.outcome":
    "Avete aspettato la Terra. Oggi il laboratorio può inviare solo metà dei dati.",
  "ev.sol_terra.esperar.lesson":
    "Il campo magnetico della Terra protegge le persone, ma una tempesta forte disturba radio e satelliti.",
  "ev.sol_terra.sozinhos.label": "Risolvere da soli",
  "ev.sol_terra.sozinhos.outcome":
    "Avete risolto tutto da soli! Ha usato energia, ma la scienza è andata avanti.",
  "ev.sol_terra.sozinhos.lesson":
    "Marte è lontanissimo. Gli astronauti devono saper risolvere problemi senza l’aiuto della Terra.",
};

export const SOL_TEXTS = { pt, en, es, fr, it };
