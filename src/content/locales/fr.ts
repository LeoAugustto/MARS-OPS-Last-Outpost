// Français. Mêmes clés que pt.ts. Phrases courtes, mots simples.
import type { Dict } from "./pt";

export const fr: Dict = {
  "jogo.titulo": "Opération Mars : Dernière Base",
  "recurso.ar": "Air",
  "recurso.comida": "Nourriture",
  "recurso.saude": "Santé",
  "recurso.energia": "Énergie",
  "recurso.bateria": "Batterie",
  "recurso.ciencia": "Science",
  "recurso.escudo": "Bouclier",
  "modulo.ar": "Fabrique d'air",
  "modulo.estufa": "Serre",
  "modulo.ciencia": "Laboratoire",
  "modulo.escudo": "Robot à sable",
  "nivel.cadete": "Cadet (facile)",
  "nivel.piloto": "Pilote (moyen)",
  "nivel.comandante": "Commandant (difficile)",

  "hud.sol": "Sol {sol} sur {total}",
  "hud.distribuir": "Partage l'énergie du jour : {energia} ⚡",
  "hud.sobra": "L'énergie qui reste est gardée dans la batterie.",
  "hud.dormir": "Dormir et finir le sol",
  "botao.ok": "OK !",
  "botao.porque": "Pourquoi ?",
  "botao.voltar_sol": "Revenir au sol {sol}",
  "botao.nova_missao": "Nouvelle mission",
  "selo.ao_vivo": "📡 Donnée de la NASA en direct",
  "selo.real": "📚 Événement réel du {data}",

  "fonte.donki": "NASA DONKI — météo de l’espace",
  "fonte.osdr": "NASA OSDR — santé des astronautes",
  "fonte.radlab": "NASA RadLab — radiations mesurées dans l’espace",
  "fonte.marstrek": "NASA Mars Trek — cartes de Mars",
  "fonte.csa": "Agence spatiale canadienne — nourriture dans l’espace",
  "fonte.nasa-fato": "Fait tiré des missions de la NASA",

  "glossario.sol": "Sol = un jour sur Mars. Il dure 24 heures et 40 minutes.",
  "glossario.radiacao":
    "Radiation = une énergie invisible qui vient du Soleil et de l’espace. Trop de radiations, c’est mauvais pour le corps.",
  "glossario.tempestade":
    "Tempête solaire = quand le Soleil lance une explosion de lumière et de particules très rapides.",

  "fim.vitoria.title": "Mission accomplie ! 🎉",
  "fim.vitoria.body": "Ton équipage va bien et a fait beaucoup de science. La NASA est fière !",
  "fim.parcial.title": "Tout le monde est rentré !",
  "fim.parcial.body":
    "L'équipage est en sécurité, mais il manquait un peu de science. Tu essaies une autre stratégie ?",
  "fim.resgate.title": "La Terre a envoyé chercher l'équipage",
  "fim.resgate.body":
    "Personne n'est blessé : le Contrôle de mission a décidé de ramener tout le monde. On regarde ce qui s'est passé ?",
  "causa.ar":
    "L'air s'est épuisé. On respire tout le temps, et la fabrique d'air a besoin d'énergie à chaque sol.",
  "causa.comida":
    "La nourriture s’est épuisée. La serre a besoin de lumière (énergie) et les plantes mettent du temps à pousser.",
  "causa.saude":
    "La santé est trop basse. Les radiations, la faim et le manque d’air fatiguent le corps.",
  "dica.ar": "Astuce : garde au moins 3 ⚡ à chaque sol pour la fabrique d'air.",
  "dica.comida":
    "Astuce : plante tôt ! Ce que tu plantes aujourd’hui ne devient de la nourriture que quelques sols plus tard.",
  "dica.saude":
    "Astuce : construis le bouclier tôt et cache-toi dans l’abri quand le Soleil est agité.",
  "fato.reabastecimento":
    "Le savais-tu ? Un vaisseau venu de la Terre ne peut arriver sur Mars qu’environ tous les 26 mois. Voilà pourquoi bien prévoir est essentiel !",
  "fato.marte_2017":
    "En septembre 2017, une tempête solaire a atteint Mars, a fait briller son ciel d’aurores et a augmenté les radiations mesurées par le robot Curiosity.",
  "fato.marte_2024":
    "En mai 2024, une explosion du Soleil a atteint Mars. Le robot Curiosity a mesuré autant de radiations qu’environ 30 radios d’un coup !",

  "ev.chegada.title": "Bienvenue sur Mars !",
  "ev.chegada.body":
    "Vous avez atterri ! La base est petite et tout a besoin d’énergie. Que faire en premier ?",
  "ev.chegada.explorar.label": "Explorer le cratère",
  "ev.chegada.explorar.outcome":
    "Vous avez trouvé des roches incroyables, mais la combinaison a utilisé de l’air.",
  "ev.chegada.explorar.lesson":
    "Dehors, on ne peut pas respirer : l’air de Mars est presque tout du dioxyde de carbone. Chaque sortie utilise l’air de la combinaison.",
  "ev.chegada.arrumar.label": "Couvrir la base de sable",
  "ev.chegada.arrumar.outcome":
    "Le robot a mis du sable sur la base. Elle protège mieux maintenant !",
  "ev.chegada.arrumar.lesson":
    "Une épaisse couche de sable ou de roche bloque une partie des radiations. Les scientifiques prévoient des bases comme ça.",

  "ev.poeira_vem.title": "Un nuage de poussière arrive",
  "ev.poeira_vem.body":
    "Le vent de Mars a soulevé de la poussière. Elle peut couvrir les panneaux solaires.",
  "ev.poeira_vem.guardar.label": "Garder de l’énergie dans la batterie",
  "ev.poeira_vem.guardar.outcome": "Vous avez gardé de l’énergie pour les jours sombres.",
  "ev.poeira_vem.guardar.lesson":
    "Les batteries gardent l’énergie du soleil pour quand il n’y en a pas. Mais ce qui va dans la batterie ne sert pas aujourd’hui.",
  "ev.poeira_vem.ignorar.label": "Continuer à travailler",
  "ev.poeira_vem.ignorar.outcome": "Un petit peu plus de science aujourd’hui.",
  "ev.poeira_vem.ignorar.lesson":
    "En 2018, une énorme tempête de poussière a couvert les panneaux du robot Opportunity et il n’a plus eu d’énergie.",

  "ev.painel_sujo.title": "Les panneaux sont couverts de poussière",
  "ev.painel_sujo.body":
    "Avec de la poussière, les panneaux solaires produisent beaucoup moins d’énergie.",
  "ev.painel_sujo.limpar.label": "Sortir les nettoyer",
  "ev.painel_sujo.limpar.outcome":
    "Les panneaux brillent à nouveau ! Mais la sortie a utilisé de l’air et vous a exposés aux radiations.",
  "ev.painel_sujo.limpar.lesson":
    "Chaque sortie est une sortie dans l’espace : elle utilise l’air de la combinaison et expose davantage aux radiations.",
  "ev.painel_sujo.esperar.label": "Attendre que le vent les nettoie",
  "ev.painel_sujo.esperar.outcome":
    "Vous économisez de l’air, mais vous aurez peu d’énergie pendant quelques sols.",
  "ev.painel_sujo.esperar.lesson":
    "C’est vraiment arrivé : des coups de vent ont nettoyé les panneaux des robots Spirit et Opportunity !",

  "ev.vento_limpa.title": "Le vent a nettoyé les panneaux !",
  "ev.vento_limpa.body": "Un coup de vent a soufflé la poussière. L’énergie est revenue !",

  "ev.broto.title": "Les pommes de terre ont germé !",
  "ev.broto.body": "Les petites plantes de la serre poussent, mais elles ont besoin de lumière.",
  "ev.broto.luz.label": "Donner plus de lumière",
  "ev.broto.luz.outcome":
    "Les lampes de la serre ont utilisé de l’énergie. Les plantes ont adoré !",
  "ev.broto.luz.lesson":
    "Les plantes ont besoin de lumière pour pousser. Loin de la Terre, cette lumière vient de lampes qui utilisent de l’énergie.",
  "ev.broto.economizar.label": "Économiser la lumière",
  "ev.broto.economizar.outcome":
    "Il reste de l’énergie aujourd’hui, mais les plantes pousseront peu.",
  "ev.broto.economizar.lesson":
    "Économiser aujourd’hui peut manquer demain : une récolte dépend des soins de plusieurs jours.",

  "ev.colheita_boa.title": "Belle récolte ! 🥔",
  "ev.colheita_boa.body": "Avec beaucoup de lumière, la serre a donné plein de pommes de terre.",
  "ev.colheita_fraca.title": "Petite récolte",
  "ev.colheita_fraca.body": "Avec peu de lumière, les plantes ont peu poussé.",

  "ev.filtro_entupido.title": "Le filtre à air est bouché !",
  "ev.filtro_entupido.body": "La fine poussière de Mars est entrée dans la fabrique d'air.",
  "ev.filtro_entupido.peca.label": "Utiliser la pièce de rechange",
  "ev.filtro_entupido.peca.outcome":
    "Réparé en un clin d’œil ! Mais il n’y a plus de pièce de rechange.",
  "ev.filtro_entupido.peca.lesson":
    "Il n’y a pas de magasin sur Mars : chaque pièce vient de la Terre. Quand il n’y en a plus, c’est fini.",
  "ev.filtro_entupido.limpar.label": "Le nettoyer avec soin",
  "ev.filtro_entupido.limpar.outcome":
    "Ça a marché, mais ça a pris toute la journée et de l’énergie.",
  "ev.filtro_entupido.limpar.lesson":
    "Les astronautes passent beaucoup de temps à réparer. C’est du temps en moins pour la science.",
  "ev.filtro_entupido.deixar.label": "Le laisser comme ça",
  "ev.filtro_entupido.deixar.outcome": "La fabrique d'air fait moins d'air.",
  "ev.filtro_entupido.deixar.lesson":
    "Le système de survie permet à tout le monde de respirer. Le laisser cassé est dangereux.",

  "ev.rocha.title": "Une roche bizarre !",
  "ev.rocha.body": "Le robot a vu une roche aux couleurs étranges à 2 km de la base.",
  "ev.rocha.robo.label": "Envoyer seulement le robot",
  "ev.rocha.robo.outcome":
    "Le robot est allé lentement et a utilisé sa batterie, mais il a rapporté des données.",
  "ev.rocha.robo.lesson":
    "Les robots n’ont pas besoin de respirer, mais ils ont besoin d’énergie et sont plus lents que les humains.",
  "ev.rocha.astronauta.label": "Y aller avec un astronaute",
  "ev.rocha.astronauta.outcome":
    "Quelle découverte ! Mais la sortie a coûté de l’air et de la santé.",
  "ev.rocha.astronauta.lesson":
    "Les humains découvrent plus vite, mais chaque sortie utilise de l’air et expose aux radiations.",

  "ev.laboratorio.title": "Résultats du laboratoire !",
  "ev.laboratorio.body":
    "La roche avait des traces d’eau d’il y a très longtemps ! Le robot Perseverance cherche ce genre de roches sur Mars.",

  "ev.exercicio.title": "L’heure du sport",
  "ev.exercicio.body":
    "Sur Mars, le corps pèse seulement un peu plus d’un tiers de son poids sur Terre. Avec peu de poids, les os et les muscles s’affaiblissent.",
  "ev.exercicio.treinar.label": "S’entraîner 2 heures",
  "ev.exercicio.treinar.outcome":
    "Des corps forts ! Mais le tapis de course a utilisé de l’énergie et tout le monde a faim.",
  "ev.exercicio.treinar.lesson":
    "Sur la Station spatiale, les astronautes font environ 2 heures de sport par jour pour que leurs os ne s’affaiblissent pas.",
  "ev.exercicio.pular.label": "Sauter l’entraînement aujourd’hui",
  "ev.exercicio.pular.outcome": "Plus de temps pour la science, mais le corps l’a senti.",
  "ev.exercicio.pular.lesson":
    "Des études de la NASA montrent qu’avec peu de gravité, les os perdent de la force si le corps ne fait pas de sport.",

  "ev.contato_terra.title": "Appel vers la Terre",
  "ev.contato_terra.body":
    "Un message met de 4 à 24 minutes pour aller de Mars à la Terre. Impossible de discuter en direct !",
  "ev.contato_terra.conselho.label": "Demander un conseil pour la serre",
  "ev.contato_terra.conselho.outcome": "Message envoyé ! La réponse arrive demain.",
  "ev.contato_terra.conselho.lesson":
    "À cause du délai, l’équipage sur Mars doit résoudre beaucoup de problèmes tout seul.",
  "ev.contato_terra.fotos.label": "Envoyer des photos aux scientifiques",
  "ev.contato_terra.fotos.outcome":
    "Les scientifiques ont adoré les photos ! L’antenne a utilisé beaucoup d’énergie.",
  "ev.contato_terra.fotos.lesson":
    "Envoyer des données si loin demande une antenne puissante, qui utilise beaucoup d’énergie.",

  "ev.resposta_terra.title": "La Terre a répondu !",
  "ev.resposta_terra.body":
    "Les scientifiques ont envoyé un conseil pour mieux utiliser la lumière de la serre. Elle a donné plus de nourriture !",

  // ================================================================ événements par lieu de la base
  // ☀️ panneaux
  "ev.redemoinho.title": "Un tourbillon de poussière !",
  "ev.redemoinho.body":
    "Un tourbillon de poussière passe près des panneaux solaires. Il peut les salir... ou souffler la vieille poussière !",
  "ev.redemoinho.cobrir.label": "Couvrir les panneaux",
  "ev.redemoinho.cobrir.outcome":
    "Les panneaux sont protégés, mais les couvrir a coûté de l'énergie.",
  "ev.redemoinho.cobrir.lesson":
    "Sur Mars, le vent peut salir ou nettoyer les panneaux. C'est pour ça qu'on ne sait pas bien combien d'énergie la base aura demain.",
  "ev.redemoinho.observar.label": "Le laisser passer et le filmer",
  "ev.redemoinho.observar.outcome":
    "Vous avez filmé le tourbillon pour les scientifiques. Demain, on verra ce qu'il a fait aux panneaux.",
  "ev.redemoinho.observar.lesson":
    "En 2005, un tourbillon est passé sur le robot Spirit et a nettoyé ses panneaux. Son énergie a beaucoup augmenté !",
  "ev.redemoinho_passou.title": "Le tourbillon est passé",
  "ev.redemoinho_passou.body":
    "Si les panneaux étaient sales, le vent les a nettoyés et l'énergie a augmenté. S'ils étaient propres, ils ont pris un peu de poussière.",

  "ev.painel_rachado.title": "Un caillou a fendu un panneau !",
  "ev.painel_rachado.body":
    "Un petit caillou venu de l'espace est tombé sur la base et a fendu un panneau solaire.",
  "ev.painel_rachado.consertar.label": "Sortir le réparer aujourd'hui",
  "ev.painel_rachado.consertar.outcome":
    "Le panneau remarche, mais la réparation a coûté de l'énergie et l'air de la combinaison.",
  "ev.painel_rachado.consertar.lesson":
    "Dehors, on ne peut pas respirer : l'air de Mars est presque tout du gaz carbonique. Chaque réparation dehors utilise l'air de la combinaison.",
  "ev.painel_rachado.desligar.label": "Éteindre juste la partie cassée",
  "ev.painel_rachado.desligar.outcome":
    "Personne n'a dû sortir, mais les panneaux font maintenant moins d'énergie.",
  "ev.painel_rachado.desligar.lesson":
    "L'air de Mars est très fin et protège peu. Alors les cailloux de l'espace touchent le sol. L'atterrisseur InSight de la NASA en a senti plusieurs frapper Mars.",

  "ev.inverno.title": "L'hiver est arrivé sur Mars",
  "ev.inverno.body":
    "Mars a aussi des saisons. En hiver, les jours sont plus courts et le Soleil est plus bas. Les panneaux font moins d'énergie.",
  "ev.inverno.inclinar.label": "Tourner les panneaux vers le Soleil",
  "ev.inverno.inclinar.outcome":
    "Les panneaux captent plus de lumière, mais tout bouger a coûté de l'énergie.",
  "ev.inverno.inclinar.lesson":
    "En hiver, le robot Opportunity se garait sur des pentes tournées vers le Soleil. Ainsi ses panneaux captaient plus de lumière.",
  "ev.inverno.economizar.label": "Économiser : mettre le labo en pause",
  "ev.inverno.economizar.outcome":
    "La batterie a gardé de l'énergie pour les jours courts, mais la recherche s'est arrêtée.",
  "ev.inverno.economizar.lesson":
    "Mars a des saisons parce qu'elle est penchée, comme la Terre. En hiver, chaque jour a moins d'heures de soleil pour les panneaux.",

  // 💨 usine à air
  "ev.vazamento.title": "La porte siffle !",
  "ev.vazamento.body": "La porte de l'usine à air fait fsssss. Un tout petit peu d'air s'échappe !",
  "ev.vazamento.procurar.label": "Chercher le petit trou calmement",
  "ev.vazamento.procurar.outcome":
    "Vous avez trouvé le trou et l'avez bouché pour de bon. Mais ça a pris l'énergie d'une journée de travail.",
  "ev.vazamento.procurar.lesson":
    "En 2020, des astronautes de la Station spatiale ont lâché des feuilles de thé dans l'air. Elles ont flotté jusqu'au trou et montré la fuite !",
  "ev.vazamento.remendo.label": "Coller une rustine rapide",
  "ev.vazamento.remendo.outcome":
    "Le sifflement s'est arrêté... pour l'instant. La rustine peut se décoller.",
  "ev.vazamento.remendo.lesson":
    "Sur la Station spatiale, le trou a d'abord reçu une rustine provisoire. Ensuite, les ingénieurs ont prévu la vraie réparation.",
  "ev.vazamento_volta.title": "La rustine s'est décollée !",
  "ev.vazamento_volta.body":
    "La rustine rapide n'a pas tenu et un peu d'air s'est échappé. Maintenant, le trou est bouché pour de bon.",

  "ev.gerador_barulho.title": "Bruit bizarre dans la machine à air",
  "ev.gerador_barulho.body":
    "La machine qui fait l'air de la base fait tac, tac, tac. Ce n'est pas normal !",
  "ev.gerador_barulho.desligar.label": "L'éteindre et la vérifier aujourd'hui",
  "ev.gerador_barulho.desligar.outcome":
    "La pièce desserrée a été resserrée. Mais, machine éteinte, la base a fait moins d'air aujourd'hui.",
  "ev.gerador_barulho.desligar.lesson":
    "L'air de Mars est presque tout du gaz carbonique. La machine MOXIE, sur le robot Perseverance, a réussi à en tirer de l'oxygène !",
  "ev.gerador_barulho.continuar.label": "La laisser allumée et travailler",
  "ev.gerador_barulho.continuar.outcome":
    "L'air a continué à sortir et vous avez travaillé plus. Mais le bruit est toujours là...",
  "ev.gerador_barulho.continuar.lesson":
    "Un nouveau bruit dans une machine est un avertissement. Réparer tôt demande souvent moins de travail que réparer après la panne.",
  "ev.gerador_quebrou.title": "La machine à air s'est arrêtée !",
  "ev.gerador_quebrou.body":
    "Le bruit venait d'une pièce usée. La machine s'est arrêtée, et la réparation a coûté de l'air et de l'énergie.",

  "ev.agua_do_ar.title": "De l'eau cachée dans l'air",
  "ev.agua_do_ar.body":
    "Quand on respire et qu'on transpire, l'air de la base devient humide. On peut récupérer cette eau !",
  "ev.agua_do_ar.coletar.label": "Allumer le collecteur d'eau",
  "ev.agua_do_ar.coletar.outcome":
    "Vous avez récupéré de l'eau pour arroser la serre. Les plantes disent merci ! Le collecteur a coûté de l'énergie.",
  "ev.agua_do_ar.coletar.lesson":
    "Sur la Station spatiale, presque toute l'eau est recyclée, même celle de la sueur et du souffle. Elle est nettoyée et réutilisée.",
  "ev.agua_do_ar.guardar.label": "Garder l'énergie dans la batterie",
  "ev.agua_do_ar.guardar.outcome": "La batterie est plus pleine, mais la serre a reçu moins d'eau.",
  "ev.agua_do_ar.guardar.lesson":
    "Apporter de l'eau depuis la Terre est très difficile. Dans les longues missions, chaque goutte non recyclée manque.",

  // 🌱 serre
  "ev.mofo.title": "Des taches sur les feuilles !",
  "ev.mofo.body":
    "Des feuilles de la serre ont de la moisissure. La moisissure est un champignon qui pousse là où c'est très humide.",
  "ev.mofo.cortar.label": "Couper les feuilles malades",
  "ev.mofo.cortar.outcome": "Les plantes sont sauvées, mais vous avez perdu un peu de nourriture.",
  "ev.mofo.cortar.lesson":
    "En 2015, des fleurs appelées zinnias ont moisi sur la Station spatiale. L'astronaute Scott Kelly a coupé les parties malades et en a sauvé quelques-unes.",
  "ev.mofo.ventilar.label": "Allumer des ventilateurs pour sécher",
  "ev.mofo.ventilar.outcome":
    "Le vent a séché les feuilles. Les ventilateurs ont coûté de l'énergie et quelques feuilles ont fané.",
  "ev.mofo.ventilar.lesson":
    "Les astronautes ont allumé des ventilateurs pour sécher les zinnias. Mais trop de vent a aussi desséché les plantes ! Tout est une question d'équilibre.",

  "ev.rabanete.title": "Les radis sont prêts !",
  "ev.rabanete.body":
    "Les radis ont poussé vite et on peut déjà les cueillir. Les pommes de terre vont encore tarder.",
  "ev.rabanete.comer.label": "Les cueillir et tous les manger",
  "ev.rabanete.comer.outcome":
    "Quel festin ! Beaucoup de nourriture aujourd'hui, mais il ne reste aucune graine.",
  "ev.rabanete.comer.lesson":
    "Le radis pousse vite. Sur la Station spatiale, les radis étaient prêts en seulement 27 jours !",
  "ev.rabanete.sementes.label": "En garder pour replanter",
  "ev.rabanete.sementes.outcome":
    "Vous en avez mangé un peu et replanté le reste. Dans quelques sols, il y en aura encore !",
  "ev.rabanete.sementes.lesson":
    "Dans une base loin de la Terre, garder des graines est important : elles deviennent de la nourriture sans attendre un vaisseau.",
  "ev.rabanete_de_novo.title": "Nouvelle récolte de radis !",
  "ev.rabanete_de_novo.body":
    "Les graines que vous avez gardées sont devenues des radis. Plus de nourriture pour l'équipe !",

  "ev.sementes_terra.title": "Des graines sont arrivées de la Terre !",
  "ev.sementes_terra.body":
    "Une boîte de graines est partie de la Terre il y a de nombreux mois et vient d'arriver. Une seule sorte tient dans le bac.",
  "ev.sementes_terra.alface.label": "Planter de la laitue (rapide)",
  "ev.sementes_terra.alface.outcome": "La laitue pousse vite, mais donne peu de nourriture.",
  "ev.sementes_terra.alface.lesson":
    "En 2015, des astronautes de la Station spatiale ont mangé une laitue cultivée là-haut, dans l'espace !",
  "ev.sementes_terra.batata.label": "Planter des pommes de terre (lentes)",
  "ev.sementes_terra.batata.outcome":
    "Les pommes de terre vont prendre du temps, mais donneront beaucoup de nourriture.",
  "ev.sementes_terra.batata.lesson":
    "Un voyage de la Terre à Mars dure de nombreux mois. Les plantes qui nourrissent beaucoup aident la base à moins dépendre de la Terre.",
  "ev.alface_pronta.title": "La laitue a poussé !",
  "ev.alface_pronta.body": "Des feuilles bien fraîches pour la salade de l'équipe.",
  "ev.batata_pronta.title": "C'est l'heure de récolter les pommes de terre !",
  "ev.batata_pronta.body":
    "Elles ont mis du temps, mais ça valait le coup : beaucoup de nourriture !",

  // 🔬 laboratoire
  "ev.microscopio.title": "Le microscope est cassé !",
  "ev.microscopio.body":
    "Le microscope ne fait plus la mise au point. Une petite pièce a cassé, et le magasin le plus proche est sur une autre planète !",
  "ev.microscopio.imprimir.label": "Imprimer une nouvelle pièce",
  "ev.microscopio.imprimir.outcome":
    "L'imprimante 3D a fait la pièce ! Mais elle a coûté beaucoup d'énergie.",
  "ev.microscopio.imprimir.lesson":
    "En 2014, la NASA a envoyé par message le plan d'un outil à la Station spatiale. Là-haut, il a été fabriqué avec une imprimante 3D !",
  "ev.microscopio.lupa.label": "Utiliser une simple loupe",
  "ev.microscopio.lupa.outcome":
    "On peut travailler, mais la loupe montre bien moins de détails. La recherche a moins avancé.",
  "ev.microscopio.lupa.lesson":
    "Le microscope montre des choses trop petites pour l'œil et la loupe. Un bon outil change beaucoup de choses en science.",

  "ev.gelo.title": "De la glace sous le sol !",
  "ev.gelo.body":
    "Le robot a creusé un trou près de la base et trouvé de la glace d'eau cachée sous le sable !",
  "ev.gelo.estudar.label": "Étudier la glace",
  "ev.gelo.estudar.outcome":
    "Une découverte importante pour la science ! L'analyse a coûté de l'énergie.",
  "ev.gelo.estudar.lesson":
    "En 2008, l'atterrisseur Phoenix de la NASA a creusé le sol de Mars et l'a confirmé : il y avait de la glace d'eau dessous !",
  "ev.gelo.derreter.label": "La faire fondre pour arroser",
  "ev.gelo.derreter.outcome":
    "La serre a reçu de l'eau et donnera plus de nourriture. Mais l'échantillon à étudier est perdu.",
  "ev.gelo.derreter.lesson":
    "Utiliser ce qui existe déjà sur Mars, comme la glace, fait partie des plans pour les bases du futur. Ainsi, il faut apporter moins de choses de la Terre.",

  "ev.bacterias.title": "Expérience avec des bactéries",
  "ev.bacterias.body":
    "L'équipe veut étudier des bactéries, des êtres vivants si petits qu'on ne les voit qu'au microscope.",
  "ev.bacterias.caixa.label": "La faire dans la boîte fermée",
  "ev.bacterias.caixa.outcome":
    "Tout est sûr et la recherche a marché ! Mais la boîte a coûté beaucoup d'énergie.",
  "ev.bacterias.caixa.lesson":
    "La Station spatiale a une boîte fermée avec des gants pour les expériences. Rien de l'intérieur ne s'échappe dans la station.",
  "ev.bacterias.mesa.label": "La faire vite, sur la table",
  "ev.bacterias.mesa.outcome":
    "Plus rapide et moins cher ! Mais des bactéries se sont peut-être échappées...",
  "ev.bacterias.mesa.lesson":
    "La NASA nettoie très bien les vaisseaux avant d'aller sur Mars, pour ne pas apporter de microbes de la Terre. On appelle ça la protection planétaire.",
  "ev.lab_contaminado.title": "Le labo est contaminé",
  "ev.lab_contaminado.body":
    "Des bactéries se sont échappées et ont abîmé d'autres expériences. Il a fallu refaire une partie de la recherche.",

  // 🛡️ abri
  "ev.rachadura.title": "Une fissure dans la couche de sable",
  "ev.rachadura.body":
    "Le sable qui couvre la base s'est fissuré dans un coin. Il bloque les radiations, une énergie invisible mauvaise pour le corps.",
  "ev.rachadura.tapar.label": "Envoyer le robot la boucher",
  "ev.rachadura.tapar.outcome":
    "Le robot a couvert la fissure. La protection est complète, mais ça a coûté de l'énergie.",
  "ev.rachadura.tapar.lesson":
    "La Terre a un bouclier magnétique et un air épais qui protègent des radiations. Mars non. C'est pourquoi des scientifiques étudient comment couvrir les maisons avec du sable martien.",
  "ev.rachadura.depois.label": "Laisser pour plus tard",
  "ev.rachadura.depois.outcome":
    "Aucune énergie dépensée aujourd'hui, mais la base a perdu une couche de protection.",
  "ev.rachadura.depois.lesson":
    "Une couche de sable plus fine laisse passer plus de radiations. Chaque couche en plus aide à protéger l'équipe.",

  "ev.treino.title": "C'est l'heure de l'exercice d'urgence ?",
  "ev.treino.body":
    "Ça fait longtemps que l'équipe ne s'est pas entraînée pour une urgence. S'entraîner maintenant ou travailler ?",
  "ev.treino.treinar.label": "S'entraîner aujourd'hui",
  "ev.treino.treinar.outcome":
    "L'équipe sait par cœur quoi faire ! Mais l'exercice a coûté de l'énergie et du temps de recherche.",
  "ev.treino.treinar.lesson":
    "Les astronautes de la Station spatiale s'entraînent souvent à réagir à un feu ou à une fuite d'air.",
  "ev.treino.adiar.label": "Travailler et s'entraîner un autre jour",
  "ev.treino.adiar.outcome":
    "Vous avez fait plus de science aujourd'hui. Mais l'équipe n'est pas entraînée...",
  "ev.treino.adiar.lesson":
    "Dans l'espace, il n'y a pas de pompiers à côté. Les astronautes sont leurs propres secouristes, alors ils doivent s'entraîner.",
  "ev.alarme_teste.title": "L'alarme a sonné !",
  "ev.alarme_teste.body":
    "La Terre a fait un test d'urgence surprise. Sans entraînement, l'équipe s'est embrouillée et s'est fatiguée.",

  // 📡 antenne
  "ev.aniversario.title": "Anniversaire à la base !",
  "ev.aniversario.body":
    "Aujourd'hui, c'est l'anniversaire d'un astronaute ! Sa famille a envoyé un message vidéo depuis la Terre.",
  "ev.aniversario.festa.label": "Faire une petite fête",
  "ev.aniversario.festa.outcome":
    "Il y a eu un gâteau, et tout le monde a regardé la vidéo ensemble. L'équipe est contente, mais la fête a coûté de la nourriture.",
  "ev.aniversario.festa.lesson":
    "Être loin de chez soi est un des grands défis d'un voyage vers Mars. La NASA étudie comment garder les astronautes heureux et unis.",
  "ev.aniversario.depois.label": "Regarder la vidéo après le travail",
  "ev.aniversario.depois.outcome":
    "La recherche a avancé, mais l'astronaute a été triste toute la journée.",
  "ev.aniversario.depois.lesson":
    "Un message met de 4 à 24 minutes pour aller de Mars à la Terre. C'est pour ça que la famille envoie une vidéo enregistrée : on ne peut pas parler en direct.",

  "ev.escola.title": "Une école de la Terre a appelé !",
  "ev.escola.body": "Des enfants d'une école sur Terre veulent savoir comment on vit sur Mars !",
  "ev.escola.video.label": "Enregistrer une vidéo pour les enfants",
  "ev.escola.video.outcome":
    "Les enfants ont adoré ! L'équipe est contente, mais l'antenne a coûté de l'énergie.",
  "ev.escola.video.lesson":
    "Les astronautes de la Station spatiale parlent avec des écoles par radio. Plus de mille écoles leur ont déjà posé des questions !",
  "ev.escola.dados.label": "Envoyer seulement les données de la mission",
  "ev.escola.dados.outcome":
    "Les scientifiques ont reçu de nouvelles données, mais l'équipe n'a pas eu de pause et s'est fatiguée.",
  "ev.escola.dados.lesson":
    "Sur Terre, les scientifiques étudient les données envoyées par les missions. C'est comme ça qu'on découvre de nouvelles choses sur Mars.",

  "ev.antena_torta.title": "L'antenne est tordue !",
  "ev.antena_torta.body":
    "Le vent a poussé l'antenne. Elle ne vise plus la Terre, et les messages n'arrivent plus.",
  "ev.antena_torta.astronauta.label": "Un astronaute sort la réparer",
  "ev.antena_torta.astronauta.outcome":
    "L'antenne est de retour en place ! Mais la sortie a utilisé l'air de la combinaison et a fatigué.",
  "ev.antena_torta.astronauta.lesson":
    "L'antenne doit viser droit vers la Terre. Là-bas, la NASA a des antennes géantes à trois endroits du monde pour écouter les vaisseaux.",
  "ev.antena_torta.robo.label": "Envoyer le robot la réparer",
  "ev.antena_torta.robo.outcome":
    "Le robot a réparé l'antenne sans que personne sorte, mais il a coûté beaucoup d'énergie.",
  "ev.antena_torta.robo.lesson":
    "Les robots travaillent dehors sans utiliser l'air de personne. C'est pour ça que la NASA a envoyé des robots sur Mars avant les humains.",

  // 🛏️ lit
  "ev.sem_sono.title": "Une astronaute n'arrive pas à dormir",
  "ev.sem_sono.body":
    "Sur Mars, la journée dure environ 40 minutes de plus que sur Terre. Le corps d'une astronaute n'est pas encore habitué.",
  "ev.sem_sono.descansar.label": "La laisser se reposer aujourd'hui",
  "ev.sem_sono.descansar.outcome":
    "Elle s'est réveillée en pleine forme ! Mais une journée sans travail a retardé la recherche.",
  "ev.sem_sono.descansar.lesson":
    "Un sol, la journée martienne, dure 24 heures et 39 minutes. Des équipes de la NASA qui pilotent des robots sur Mars ont déjà vécu à cet horaire !",
  "ev.sem_sono.luzes.label": "Utiliser des lumières pour régler son sommeil",
  "ev.sem_sono.luzes.outcome":
    "Les lumières ont aidé son corps à s'habituer petit à petit. Mais elles ont coûté de l'énergie.",
  "ev.sem_sono.luzes.lesson":
    "La lumière aide le corps à savoir s'il fait jour ou nuit. Les équipes qui vivaient à l'heure de Mars utilisaient des rideaux sombres pour dormir.",

  "ev.saudade.title": "Le mal du pays",
  "ev.saudade.body":
    "Un astronaute s'ennuie de sa famille. Il n'arrive pas à se concentrer sur son travail.",
  "ev.saudade.folga.label": "Jour de repos avec un repas spécial",
  "ev.saudade.folga.outcome":
    "Il s'est reposé et a mangé son plat préféré. Il va bien mieux, mais ça a coûté de la nourriture.",
  "ev.saudade.folga.lesson":
    "Pour la NASA, être isolé et loin de chez soi est un des grands risques d'un voyage vers Mars. Prendre soin de sa tête est aussi important que prendre soin de son corps.",
  "ev.saudade.plantas.label": "S'occuper des plantes avec un ami",
  "ev.saudade.plantas.outcome":
    "S'occuper de la serre ensemble a aidé ! Mais la lumière en plus a coûté de l'énergie.",
  "ev.saudade.plantas.lesson":
    "La NASA étudie si s'occuper de plantes aide les astronautes à se sentir mieux dans l'espace. Beaucoup aiment ça !",

  // 🚙 rover
  "ev.pneu.title": "Un trou dans la roue du rover !",
  "ev.pneu.body": "Le rover est passé sur des pierres pointues, et une roue a un trou.",
  "ev.pneu.devagar.label": "Rentrer doucement par le sable mou",
  "ev.pneu.devagar.outcome":
    "La roue ne s'est pas abîmée plus, mais la sortie a été courte et a donné moins de science.",
  "ev.pneu.devagar.lesson":
    "Les roues du robot Curiosity se sont trouées sur des pierres pointues. Depuis, l'équipe choisit des chemins plus doux.",
  "ev.pneu.seguir.label": "Continuer sur les pierres",
  "ev.pneu.seguir.outcome":
    "Vous êtes allés plus loin et avez trouvé du nouveau ! Mais la roue s'est abîmée.",
  "ev.pneu.seguir.lesson":
    "Sur Mars, il n'y a pas de garage : chaque roue doit durer toute la mission. C'est pourquoi chaque chemin est préparé avec soin.",
  "ev.roda_conserto.title": "Il faut réparer la roue",
  "ev.roda_conserto.body":
    "La roue s'est abîmée et le rover a dû être réparé. Ça a coûté de l'énergie.",

  "ev.dunas.title": "Un sentier entre les dunes",
  "ev.dunas.body":
    "Le rover a trouvé un nouveau chemin entre les dunes, des collines de sable. Où mène-t-il ?",
  "ev.dunas.entrar.label": "Prendre le sentier maintenant",
  "ev.dunas.entrar.outcome":
    "De nouveaux endroits et beaucoup de science ! Mais le sable avait l'air mou...",
  "ev.dunas.entrar.lesson":
    "En 2009, le robot Spirit s'est enfoncé dans du sable mou caché sous une fine croûte dure. Il n'en est jamais ressorti.",
  "ev.dunas.estudar.label": "Étudier le chemin d'abord",
  "ev.dunas.estudar.outcome":
    "Vous avez trouvé un chemin sûr. C'était plus lent et ça a coûté de l'énergie.",
  "ev.dunas.estudar.lesson":
    "Avant de faire rouler un robot, les équipes étudient des photos du sol. Un mauvais pas peut bloquer le robot.",
  "ev.rover_atolou.title": "Le rover est ensablé !",
  "ev.rover_atolou.body":
    "Le sable était mou, et le rover s'est enfoncé. Le sortir de là a coûté beaucoup d'énergie.",

  "ev.fossil.title": "C'est un fossile ?!",
  "ev.fossil.body":
    "Le rover a trouvé une pierre avec un dessin bizarre. On dirait un fossile, un être vivant ancien devenu pierre ! Vraiment ?",
  "ev.fossil.analisar.label": "L'apporter au labo",
  "ev.fossil.analisar.outcome":
    "La pierre est partie au labo. Le résultat arrive bientôt ! Le transport a coûté de l'énergie.",
  "ev.fossil.analisar.lesson":
    "Les scientifiques ne croient pas seulement ce qu'ils voient : ils vérifient. Jusqu'à aujourd'hui, personne n'a trouvé de fossile sur Mars.",
  "ev.fossil.foto.label": "Prendre des photos et repartir",
  "ev.fossil.foto.outcome":
    "Les photos sont superbes, mais vous ne saurez peut-être jamais ce que c'était.",
  "ev.fossil.foto.lesson":
    "Le robot Perseverance garde des pierres dans de petits tubes. L'idée est qu'un jour elles soient étudiées dans des labos sur Terre.",
  "ev.fossil_resultado.title": "Juste une roche... mais c'est de la science !",
  "ev.fossil_resultado.body":
    "Ce n'était pas un fossile, juste une roche ordinaire. Mais le découvrir, c'est aussi de la science : on en sait plus sur les roches de Mars !",
};
