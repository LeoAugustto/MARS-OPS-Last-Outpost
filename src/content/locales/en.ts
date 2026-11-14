// English. Keep the SAME keys as pt.ts. Short sentences, kid-friendly words.
import type { Dict } from "./pt";

export const en: Dict = {
  "jogo.titulo": "MARS OPS: Last Outpost",
  "recurso.ar": "Air",
  "recurso.comida": "Food",
  "recurso.saude": "Health",
  "recurso.energia": "Energy",
  "recurso.bateria": "Battery",
  "recurso.ciencia": "Science",
  "recurso.escudo": "Shield",
  "modulo.ar": "Air maker",
  "modulo.estufa": "Greenhouse",
  "modulo.ciencia": "Lab",
  "modulo.escudo": "Sand robot",
  "nivel.cadete": "Cadet (easy)",
  "nivel.piloto": "Pilot (medium)",
  "nivel.comandante": "Commander (hard)",

  "hud.sol": "Sol {sol} of {total}",
  "hud.distribuir": "Share today's energy: {energia} ⚡",
  "hud.sobra": "Any energy left over is saved in the battery.",
  "hud.dormir": "Sleep and end the sol",
  "botao.ok": "OK!",
  "botao.porque": "Why?",
  "botao.voltar_sol": "Go back to sol {sol}",
  "botao.nova_missao": "New mission",
  "selo.ao_vivo": "📡 Live NASA data",
  "selo.real": "📚 Real event from {data}",

  "fonte.donki": "NASA DONKI — space weather",
  "fonte.osdr": "NASA OSDR — astronaut health",
  "fonte.radlab": "NASA RadLab — radiation measured in space",
  "fonte.marstrek": "NASA Mars Trek — maps of Mars",
  "fonte.csa": "Canadian Space Agency — food in space",
  "fonte.nasa-fato": "Fact from NASA missions",

  "glossario.sol": "Sol = one day on Mars. It lasts 24 hours and 40 minutes.",
  "glossario.radiacao":
    "Radiation = invisible energy from the Sun and space. Too much of it is bad for your body.",
  "glossario.tempestade":
    "Solar storm = when the Sun throws out a burst of light and super-fast particles.",

  "fim.vitoria.title": "Mission complete! 🎉",
  "fim.vitoria.body": "Your crew stayed healthy and did lots of science. NASA is proud!",
  "fim.parcial.title": "Everyone got home safe!",
  "fim.parcial.body":
    "The crew is safe, but you needed a bit more science. Want to try another plan?",
  "fim.resgate.title": "Earth sent a ship to bring the crew home",
  "fim.resgate.body":
    "Nobody got hurt: Mission Control decided to bring everyone back. Let’s find out what happened!",
  "causa.ar":
    "The air ran out. People breathe all the time, and the air maker needs energy every sol.",
  "causa.comida":
    "The food ran out. The greenhouse needs light (energy), and plants take time to grow.",
  "causa.saude": "Health got too low. Radiation, hunger and lack of air make the body tired.",
  "dica.ar": "Tip: save at least 3 ⚡ every sol for the air maker.",
  "dica.comida": "Tip: plant early! What you plant today only becomes food a few sols later.",
  "dica.saude": "Tip: build the shield early and hide in the shelter when the Sun is stormy.",
  "fato.reabastecimento":
    "Did you know? A ship from Earth can only reach Mars about every 26 months. That’s why planning is everything!",
  "fato.marte_2017":
    "In September 2017, a solar storm reached Mars, lit up its sky with auroras and raised the radiation measured by the Curiosity rover.",
  "fato.marte_2024":
    "In May 2024, a burst from the Sun reached Mars. The Curiosity rover measured radiation like about 30 X-rays at once!",

  "ev.chegada.title": "Welcome to Mars!",
  "ev.chegada.body": "You landed! The base is small and everything needs energy. What first?",
  "ev.chegada.explorar.label": "Explore the crater",
  "ev.chegada.explorar.outcome": "You found amazing rocks, but the spacesuit used up air.",
  "ev.chegada.explorar.lesson":
    "You can’t breathe outside: Mars air is almost all carbon dioxide. Every walk uses the suit’s air.",
  "ev.chegada.arrumar.label": "Cover the base with sand",
  "ev.chegada.arrumar.outcome": "The robot piled sand on the base. Now it protects you better!",
  "ev.chegada.arrumar.lesson":
    "A thick layer of sand or rock blocks part of the radiation. Scientists plan bases like this.",

  "ev.poeira_vem.title": "A dust cloud is coming",
  "ev.poeira_vem.body": "The Martian wind picked up dust. It may cover the solar panels.",
  "ev.poeira_vem.guardar.label": "Save energy in the battery",
  "ev.poeira_vem.guardar.outcome": "You saved energy for the dark days.",
  "ev.poeira_vem.guardar.lesson":
    "Batteries keep sunlight energy for when there is no sun. But energy in the battery can’t be used today.",
  "ev.poeira_vem.ignorar.label": "Keep working",
  "ev.poeira_vem.ignorar.outcome": "A little more science today.",
  "ev.poeira_vem.ignorar.lesson":
    "In 2018, a giant dust storm covered the Opportunity rover’s panels and it ran out of energy.",

  "ev.painel_sujo.title": "The panels are covered in dust",
  "ev.painel_sujo.body": "With dust on them, solar panels make much less energy.",
  "ev.painel_sujo.limpar.label": "Go out and clean them",
  "ev.painel_sujo.limpar.outcome":
    "Shiny panels again! But the walk used air and exposed you to radiation.",
  "ev.painel_sujo.limpar.lesson":
    "Every trip outside is a spacewalk: it uses suit air and exposes you to more radiation.",
  "ev.painel_sujo.esperar.label": "Wait for the wind to clean them",
  "ev.painel_sujo.esperar.outcome": "You save air, but you will have little energy for a few sols.",
  "ev.painel_sujo.esperar.lesson":
    "This really happened: gusts of wind cleaned the panels of the Spirit and Opportunity rovers!",

  "ev.vento_limpa.title": "The wind cleaned the panels!",
  "ev.vento_limpa.body": "A gust of wind blew the dust away. The energy is back!",

  "ev.broto.title": "The potatoes sprouted!",
  "ev.broto.body": "The greenhouse plants are growing, but they need light.",
  "ev.broto.luz.label": "Give them more light",
  "ev.broto.luz.outcome": "The greenhouse lamps used energy. The plants loved it!",
  "ev.broto.luz.lesson":
    "Plants need light to grow. Far from Earth, that light comes from lamps, which use energy.",
  "ev.broto.economizar.label": "Save on light",
  "ev.broto.economizar.outcome": "You saved energy today, but the plants will grow less.",
  "ev.broto.economizar.lesson":
    "Saving today can mean missing out tomorrow: a harvest needs care over many days.",

  "ev.colheita_boa.title": "Great harvest! 🥔",
  "ev.colheita_boa.body": "With plenty of light, the greenhouse grew lots of potatoes.",
  "ev.colheita_fraca.title": "Small harvest",
  "ev.colheita_fraca.body": "With little light, the plants grew only a little.",

  "ev.filtro_entupido.title": "The air filter is clogged!",
  "ev.filtro_entupido.body": "Fine Martian dust got into the air maker.",
  "ev.filtro_entupido.peca.label": "Use the spare part",
  "ev.filtro_entupido.peca.outcome": "Fixed in no time! But now there is no spare part left.",
  "ev.filtro_entupido.peca.lesson":
    "There are no stores on Mars: every part came from Earth. When it’s gone, it’s gone.",
  "ev.filtro_entupido.limpar.label": "Clean it carefully",
  "ev.filtro_entupido.limpar.outcome": "It worked, but it took all day and used energy.",
  "ev.filtro_entupido.limpar.lesson":
    "Astronauts spend lots of time fixing things. That’s less time for science.",
  "ev.filtro_entupido.deixar.label": "Leave it as it is",
  "ev.filtro_entupido.deixar.outcome": "The air maker is making less air.",
  "ev.filtro_entupido.deixar.lesson":
    "Life support keeps everyone breathing. Leaving it broken is dangerous.",

  "ev.rocha.title": "A strange rock!",
  "ev.rocha.body": "The robot spotted a rock with odd colors 2 km from the base.",
  "ev.rocha.robo.label": "Send only the robot",
  "ev.rocha.robo.outcome": "The robot went slowly and used battery, but brought back data.",
  "ev.rocha.robo.lesson":
    "Robots don’t need to breathe, but they need energy and are slower than people.",
  "ev.rocha.astronauta.label": "Go with an astronaut",
  "ev.rocha.astronauta.outcome": "What a discovery! But the trip used air and health.",
  "ev.rocha.astronauta.lesson":
    "People discover things faster, but every trip uses air and exposes them to radiation.",

  "ev.laboratorio.title": "Lab results!",
  "ev.laboratorio.body":
    "The rock had signs of water from long ago! The Perseverance rover looks for rocks like this on Mars.",

  "ev.exercicio.title": "Exercise time",
  "ev.exercicio.body":
    "On Mars your body weighs only a bit more than a third of what it weighs on Earth. With little weight, bones and muscles get weak.",
  "ev.exercicio.treinar.label": "Work out for 2 hours",
  "ev.exercicio.treinar.outcome":
    "Strong bodies! But the treadmill used energy and everyone got hungry.",
  "ev.exercicio.treinar.lesson":
    "On the Space Station, astronauts exercise about 2 hours a day so their bones don’t get weak.",
  "ev.exercicio.pular.label": "Skip the workout today",
  "ev.exercicio.pular.outcome": "More time for science, but the body felt it.",
  "ev.exercicio.pular.lesson":
    "NASA studies show that with low gravity, bones lose strength if the body doesn’t exercise.",

  "ev.contato_terra.title": "Calling Earth",
  "ev.contato_terra.body":
    "A message takes 4 to 24 minutes to travel from Mars to Earth. You can’t chat live!",
  "ev.contato_terra.conselho.label": "Ask for a greenhouse tip",
  "ev.contato_terra.conselho.outcome": "Message sent! The answer arrives tomorrow.",
  "ev.contato_terra.conselho.lesson":
    "Because of the delay, the crew on Mars has to solve many problems on their own.",
  "ev.contato_terra.fotos.label": "Send photos to the scientists",
  "ev.contato_terra.fotos.outcome":
    "The scientists loved the photos! The antenna used lots of energy.",
  "ev.contato_terra.fotos.lesson":
    "Sending data that far needs a strong antenna, and it uses lots of energy.",

  "ev.resposta_terra.title": "Earth answered!",
  "ev.resposta_terra.body":
    "The scientists sent a tip to use the greenhouse light better. It made more food!",
};
