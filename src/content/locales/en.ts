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
  "hud.distribuir": "Share today's energy: {energia}",
  "hud.sobra": "Any energy left over is saved in the battery.",
  "hud.dormir": "Sleep and end the sol",
  "botao.ok": "OK!",
  "botao.porque": "Why?",
  "botao.voltar_sol": "Go back to sol {sol}",
  "botao.nova_missao": "New mission",
  "selo.ao_vivo": "Live NASA data",
  "selo.real": "Real event from {data}",
  "selo.missao": "Real mission: {missao}",

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

  "fim.vitoria.title": "Mission complete!",
  "fim.vitoria.body": "Your crew made it through every sol on Mars. Great command!",
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
  "dica.ar": "Tip: each 1 energy in the air maker makes {ar} air. Give it enough for what the crew breathes.",
  "dica.comida": "Tip: each 1 energy in the greenhouse makes {comida} food. Don’t leave the greenhouse without energy.",
  "dica.saude": "Tip: with {escudo} energy, the robot adds a shield layer against radiation. And sleep before night so the crew doesn’t get tired.",
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

  "ev.colheita_boa.title": "Great harvest!",
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

  // ================================================================ events by base location
  // ☀️ solar panels
  "ev.redemoinho.title": "A dust devil!",
  "ev.redemoinho.body":
    "A dust devil, a little whirlwind of dust, is passing near the solar panels. It could make them dirty... or blow the old dust away!",
  "ev.redemoinho.cobrir.label": "Cover the panels",
  "ev.redemoinho.cobrir.outcome": "The panels are safe, but covering them used energy.",
  "ev.redemoinho.cobrir.lesson":
    "On Mars, wind can make panels dirty or clean them. That's why it's hard to know how much energy the base will have tomorrow.",
  "ev.redemoinho.observar.label": "Let it pass and film it",
  "ev.redemoinho.observar.outcome":
    "You filmed the dust devil for the scientists. Tomorrow we'll see what it did to the panels.",
  "ev.redemoinho.observar.lesson":
    "In 2005, a dust devil passed over the Spirit rover and cleaned its panels. The rover's energy went way up!",
  "ev.redemoinho_passou.title": "The dust devil passed",
  "ev.redemoinho_passou.body":
    "If the panels were dirty, the wind cleaned them and energy went up. If they were clean, they got a little dusty.",

  "ev.painel_rachado.title": "A pebble cracked a panel!",
  "ev.painel_rachado.body": "A tiny rock from space fell on the base and cracked a solar panel.",
  "ev.painel_rachado.consertar.label": "Go out and fix it today",
  "ev.painel_rachado.consertar.outcome":
    "The panel works again, but the repair used energy and air from the spacesuit.",
  "ev.painel_rachado.consertar.lesson":
    "You can't breathe outside: the air on Mars is almost all carbon dioxide. Every repair outside uses spacesuit air.",
  "ev.painel_rachado.desligar.label": "Switch off just the broken part",
  "ev.painel_rachado.desligar.outcome":
    "Nobody had to go out, but the panels now make less energy.",
  "ev.painel_rachado.desligar.lesson":
    "The air on Mars is very thin and protects little. So rocks from space reach the ground. NASA's InSight lander felt several of them hit Mars.",

  "ev.inverno.title": "Winter has come to Mars",
  "ev.inverno.body":
    "Mars has seasons too. In winter, days are shorter and the Sun stays low. The panels make less energy.",
  "ev.inverno.inclinar.label": "Tilt the panels toward the Sun",
  "ev.inverno.inclinar.outcome": "The panels catch more light again, but moving them used energy.",
  "ev.inverno.inclinar.lesson":
    "In winter, the Opportunity rover parked on slopes facing the Sun. That way its panels caught more light.",
  "ev.inverno.economizar.label": "Save energy: pause the lab",
  "ev.inverno.economizar.outcome":
    "You saved power in the battery. The lab earns half its usual science today.",
  "ev.inverno.economizar.lesson":
    "Mars has seasons because it is tilted, like Earth. In winter, each day has fewer hours of sunlight for the panels.",

  // 💨 air factory
  "ev.vazamento.title": "The door is hissing!",
  "ev.vazamento.body": "The air factory door is going fsssss. A little air is escaping!",
  "ev.vazamento.procurar.label": "Look for the tiny hole carefully",
  "ev.vazamento.procurar.outcome":
    "You found the hole and sealed it for good. But it took a whole day's energy.",
  "ev.vazamento.procurar.lesson":
    "In 2020, Space Station astronauts let tiny tea leaves float in the air. They drifted to the hole and showed where the leak was!",
  "ev.vazamento.remendo.label": "Stick on a quick patch",
  "ev.vazamento.remendo.outcome": "The hissing stopped... for now. The patch might come loose.",
  "ev.vazamento.remendo.lesson":
    "On the Space Station, the hole first got a temporary patch. Later, engineers planned the real repair.",
  "ev.vazamento_volta.title": "The patch came loose!",
  "ev.vazamento_volta.body":
    "The quick patch didn't hold and some air escaped. Now the hole is sealed for good.",

  "ev.gerador_barulho.title": "Strange noise in the air machine",
  "ev.gerador_barulho.body":
    "The machine that makes the base's air is going clack, clack, clack. That's not normal!",
  "ev.gerador_barulho.desligar.label": "Turn it off and check it today",
  "ev.gerador_barulho.desligar.outcome":
    "The loose part was tightened. But with the machine off, the base made less air today.",
  "ev.gerador_barulho.desligar.lesson":
    "The air on Mars is almost all carbon dioxide. The MOXIE machine on the Perseverance rover managed to make oxygen from it!",
  "ev.gerador_barulho.continuar.label": "Leave it on and keep working",
  "ev.gerador_barulho.continuar.outcome":
    "The air kept flowing and you got more work done. But the noise is still there...",
  "ev.gerador_barulho.continuar.lesson":
    "A new noise in a machine is a warning. Fixing things early is usually less work than fixing them after they break.",
  "ev.gerador_quebrou.title": "The air machine stopped!",
  "ev.gerador_quebrou.body":
    "The noise was a worn-out part. The machine stopped, and the repair used air and energy.",

  "ev.agua_do_ar.title": "Water hidden in the air",
  "ev.agua_do_ar.body":
    "When we breathe and sweat, the air in the base gets damp. We can get that water back!",
  "ev.agua_do_ar.coletar.label": "Turn on the water collector",
  "ev.agua_do_ar.coletar.outcome":
    "You collected water for the greenhouse. The plants say thanks! The collector used energy.",
  "ev.agua_do_ar.coletar.lesson":
    "On the Space Station, almost all water is recycled, even from sweat and breath. It gets cleaned and used again.",
  "ev.agua_do_ar.guardar.label": "Save the energy in the battery",
  "ev.agua_do_ar.guardar.outcome": "The battery is fuller, but the greenhouse got less water.",
  "ev.agua_do_ar.guardar.lesson":
    "Bringing water from Earth is very hard. On long missions, every drop that isn't recycled is missed.",

  // 🌱 greenhouse
  "ev.mofo.title": "Spots on the leaves!",
  "ev.mofo.body":
    "Some greenhouse leaves have mold. Mold is a fungus that grows where it's very damp.",
  "ev.mofo.cortar.label": "Cut off the sick leaves",
  "ev.mofo.cortar.outcome": "The plants are saved, but you lost a little food.",
  "ev.mofo.cortar.lesson":
    "In 2015, flowers called zinnias got moldy on the Space Station. Astronaut Scott Kelly cut away the sick parts and saved some of them.",
  "ev.mofo.ventilar.label": "Turn on fans to dry them",
  "ev.mofo.ventilar.outcome":
    "The wind dried the leaves. The fans used energy, and some leaves wilted.",
  "ev.mofo.ventilar.lesson":
    "The astronauts turned on fans to dry the zinnias. But too much wind dried the plants out too! Everything needs balance.",

  "ev.rabanete.title": "The radishes are ready!",
  "ev.rabanete.body":
    "The radishes grew fast and can be picked now. The potatoes still need more time.",
  "ev.rabanete.comer.label": "Pick and eat them all",
  "ev.rabanete.comer.outcome": "What a feast! You got lots of food today, but no seeds are left.",
  "ev.rabanete.comer.lesson":
    "Radishes grow fast. On the Space Station, radishes were ready in just 27 days!",
  "ev.rabanete.sementes.label": "Save some for planting",
  "ev.rabanete.sementes.outcome":
    "You ate a few and replanted the rest. In a few sols there will be more!",
  "ev.rabanete.sementes.lesson":
    "On a base far from Earth, saving seeds matters: they turn into new food without waiting for a ship.",
  "ev.rabanete_de_novo.title": "A new radish harvest!",
  "ev.rabanete_de_novo.body": "The seeds you saved grew into radishes. More food for the crew!",

  "ev.sementes_terra.title": "Seeds arrived from Earth!",
  "ev.sementes_terra.body":
    "A box of seeds left Earth many months ago and has finally arrived. Only one kind fits in the garden bed.",
  "ev.sementes_terra.alface.label": "Plant lettuce (fast)",
  "ev.sementes_terra.alface.outcome": "Lettuce grows fast, but it gives little food.",
  "ev.sementes_terra.alface.lesson":
    "In 2015, Space Station astronauts ate lettuce that was grown right there, in space!",
  "ev.sementes_terra.batata.label": "Plant potatoes (slow)",
  "ev.sementes_terra.batata.outcome": "Potatoes take a while, but they'll give lots of food.",
  "ev.sementes_terra.batata.lesson":
    "A trip from Earth to Mars takes many months. Plants that give lots of food help the base depend less on Earth.",
  "ev.alface_pronta.title": "The lettuce grew!",
  "ev.alface_pronta.body": "Fresh leaves for the crew's salad.",
  "ev.batata_pronta.title": "Time to dig up potatoes!",
  "ev.batata_pronta.body": "The potatoes took a while, but it was worth it: lots of food!",

  // 🔬 lab
  "ev.microscopio.title": "The microscope broke!",
  "ev.microscopio.body":
    "The microscope won't focus. A tiny part broke, and the nearest store is on another planet!",
  "ev.microscopio.imprimir.label": "Print a new part",
  "ev.microscopio.imprimir.outcome": "The 3D printer made the part! But it used lots of energy.",
  "ev.microscopio.imprimir.lesson":
    "In 2014, NASA sent the design of a tool to the Space Station as a message. Up there, it was made on a 3D printer!",
  "ev.microscopio.lupa.label": "Use a simple magnifying glass",
  "ev.microscopio.lupa.outcome":
    "The magnifying glass showed fewer details. The lab earns half its usual science today.",
  "ev.microscopio.lupa.lesson":
    "A microscope shows things too small for your eyes or a magnifier. Good tools make a big difference in science.",

  "ev.gelo.title": "Ice under the ground!",
  "ev.gelo.body": "The robot dug a hole near the base and found water ice hidden under the sand!",
  "ev.gelo.estudar.label": "Study the ice",
  "ev.gelo.estudar.outcome": "An important discovery for science! The tests used energy.",
  "ev.gelo.estudar.lesson":
    "In 2008, NASA's Phoenix lander dug into the ground on Mars and confirmed it: there was water ice down there!",
  "ev.gelo.derreter.label": "Melt it to water the plants",
  "ev.gelo.derreter.outcome":
    "The greenhouse got water. Without the ice sample, the lab earns half its usual science today.",
  "ev.gelo.derreter.lesson":
    "Using what is already on Mars, like ice, is one of the plans for future bases. That way less has to be brought from Earth.",

  "ev.bacterias.title": "Experiment with bacteria",
  "ev.bacterias.body":
    "The crew wants to study bacteria, living things so small you can only see them with a microscope.",
  "ev.bacterias.caixa.label": "Do it inside the sealed box",
  "ev.bacterias.caixa.outcome":
    "Everything stayed safe and the research worked! But the box used lots of energy.",
  "ev.bacterias.caixa.lesson":
    "The Space Station has a sealed box with gloves for experiments. Nothing inside escapes into the station.",
  "ev.bacterias.mesa.label": "Do it fast, on the table",
  "ev.bacterias.mesa.outcome": "Faster and cheaper! But some bacteria may have escaped...",
  "ev.bacterias.mesa.lesson":
    "NASA cleans spacecraft very carefully before going to Mars, so they don't carry germs from Earth. This is called planetary protection.",
  "ev.lab_contaminado.title": "The lab got dirty",
  "ev.lab_contaminado.body": "Some bacteria escaped. Cleaning the table cost 2 energy.",

  // 🛡️ shelter
  "ev.rachadura.title": "A crack in the sand layer",
  "ev.rachadura.body":
    "The sand covering the base cracked in one corner. It blocks radiation, an invisible energy that is bad for the body.",
  "ev.rachadura.tapar.label": "Send the robot to fill it",
  "ev.rachadura.tapar.outcome":
    "The robot covered the crack. The protection is whole, but it used energy.",
  "ev.rachadura.tapar.lesson":
    "Earth has a magnetic shield and thick air that protect us from radiation. Mars doesn't. That's why scientists study covering homes with Mars sand.",
  "ev.rachadura.depois.label": "Leave it for later",
  "ev.rachadura.depois.outcome": "No energy used today, but the base lost one layer of protection.",
  "ev.rachadura.depois.lesson":
    "A thinner layer of sand lets more radiation through. Every extra layer helps protect the crew.",

  "ev.treino.title": "Time for an emergency drill?",
  "ev.treino.body":
    "The crew hasn't practiced what to do in an emergency for a while. Practice now or work?",
  "ev.treino.treinar.label": "Practice today",
  "ev.treino.treinar.outcome":
    "The crew knows exactly what to do! But the drill used energy and research time.",
  "ev.treino.treinar.lesson":
    "Space Station astronauts practice many times what to do if there's a fire or an air leak.",
  "ev.treino.adiar.label": "Work now, practice another day",
  "ev.treino.adiar.outcome": "You did more science today. But the crew isn't trained...",
  "ev.treino.adiar.lesson":
    "In space there are no firefighters nearby. The astronauts are their own rescuers, so they need to practice.",
  "ev.alarme_teste.title": "The alarm went off!",
  "ev.alarme_teste.body":
    "Earth ran a surprise emergency test. Without practice, the crew got mixed up and tired.",

  // 📡 antenna
  "ev.aniversario.title": "Birthday at the base!",
  "ev.aniversario.body":
    "Today is an astronaut's birthday! His family sent a video message from Earth.",
  "ev.aniversario.festa.label": "Throw a little party",
  "ev.aniversario.festa.outcome":
    "There was cake, and everyone watched the video together. The crew is happy, but the party used food.",
  "ev.aniversario.festa.lesson":
    "Being far from home is one of the big challenges of going to Mars. NASA studies how to keep astronauts happy and close as a team.",
  "ev.aniversario.depois.label": "Watch the video after work",
  "ev.aniversario.depois.outcome":
    "The research moved on, but the birthday astronaut was sad all day.",
  "ev.aniversario.depois.lesson":
    "A message takes 4 to 24 minutes to go from Mars to Earth. That's why the family sends a recorded video: you can't talk live.",

  "ev.escola.title": "A school on Earth called!",
  "ev.escola.body": "Kids at a school on Earth want to know what living on Mars is like!",
  "ev.escola.video.label": "Record a video for the kids",
  "ev.escola.video.outcome": "The kids loved it! The crew is happy, but the antenna used energy.",
  "ev.escola.video.lesson":
    "Space Station astronauts talk with schools by radio. More than a thousand schools have already asked them questions!",
  "ev.escola.dados.label": "Send only the mission data",
  "ev.escola.dados.outcome":
    "The scientists got new data, but the crew had no break and got tired.",
  "ev.escola.dados.lesson":
    "Scientists on Earth study the data that missions send. That's how we discover new things about Mars.",

  "ev.antena_torta.title": "The antenna got bent!",
  "ev.antena_torta.body":
    "The wind pushed the antenna. Now it doesn't point at Earth, and messages don't get through.",
  "ev.antena_torta.astronauta.label": "An astronaut goes out to fix it",
  "ev.antena_torta.astronauta.outcome":
    "The antenna is back in place! But the trip used spacesuit air and was tiring.",
  "ev.antena_torta.astronauta.lesson":
    "The antenna must point straight at Earth. There, NASA has giant antennas in three places around the world to listen to spacecraft.",
  "ev.antena_torta.robo.label": "Send the robot to fix it",
  "ev.antena_torta.robo.outcome":
    "The robot fixed the antenna with nobody going out, but it used lots of energy.",
  "ev.antena_torta.robo.lesson":
    "Robots work outside without using anyone's air. That's why NASA sent robots to Mars before people.",

  // 🛏️ bed
  "ev.sem_sono.title": "An astronaut can't sleep",
  "ev.sem_sono.body":
    "On Mars, the day is about 40 minutes longer than on Earth. One astronaut's body isn't used to it yet.",
  "ev.sem_sono.descansar.label": "Let her rest today",
  "ev.sem_sono.descansar.outcome":
    "She woke up feeling better! The lab earns half its usual science today.",
  "ev.sem_sono.descansar.lesson":
    "A sol, a day on Mars, lasts 24 hours and 39 minutes. NASA teams that drive rovers on Mars have lived on that schedule!",
  "ev.sem_sono.luzes.label": "Use lights to fix her sleep",
  "ev.sem_sono.luzes.outcome":
    "The lights helped her body adjust little by little. But they used energy.",
  "ev.sem_sono.luzes.lesson":
    "Light helps the body know if it's day or night. Teams living on Mars time used dark curtains to sleep.",

  "ev.saudade.title": "Missing home",
  "ev.saudade.body": "An astronaut misses his family. He can't focus on his work.",
  "ev.saudade.folga.label": "Day off with special food",
  "ev.saudade.folga.outcome":
    "He rested and ate his favorite food. He feels much better, but it used food.",
  "ev.saudade.folga.lesson":
    "For NASA, being isolated and far from home is one of the big risks of going to Mars. Caring for the mind is as important as caring for the body.",
  "ev.saudade.plantas.label": "Tend the plants with a friend",
  "ev.saudade.plantas.outcome":
    "Caring for the greenhouse together helped! But the extra light used energy.",
  "ev.saudade.plantas.lesson":
    "NASA is studying whether caring for plants helps astronauts feel better in space. Many of them enjoy it!",

  // 🚙 rover
  "ev.pneu.title": "A hole in the rover's wheel!",
  "ev.pneu.body": "The rover drove over sharp rocks, and one wheel got a hole.",
  "ev.pneu.devagar.label": "Drive back slowly on soft sand",
  "ev.pneu.devagar.outcome":
    "The wheel didn't get worse, but the trip was short and gave less science.",
  "ev.pneu.devagar.lesson":
    "The Curiosity rover's wheels got holes from sharp rocks. Since then, the team picks smoother paths.",
  "ev.pneu.seguir.label": "Keep going over the rocks",
  "ev.pneu.seguir.outcome": "You went farther and found new things! But the wheel got worse.",
  "ev.pneu.seguir.lesson":
    "There's no repair shop on Mars: each wheel has to last the whole mission. That's why every path is planned carefully.",
  "ev.roda_conserto.title": "Time to fix the wheel",
  "ev.roda_conserto.body": "The wheel got worse and the rover needed a repair. That used energy.",

  "ev.dunas.title": "A trail between the dunes",
  "ev.dunas.body":
    "The rover found a new path between the dunes, which are hills of sand. Where does it go?",
  "ev.dunas.entrar.label": "Take the trail now",
  "ev.dunas.entrar.outcome": "New places and lots of science! But the sand looked soft...",
  "ev.dunas.entrar.lesson":
    "In 2009, the Spirit rover sank into soft sand hidden under a thin hard crust. It never got out again.",
  "ev.dunas.estudar.label": "Study the path first",
  "ev.dunas.estudar.outcome": "You found a safe path. It was slower and used energy.",
  "ev.dunas.estudar.lesson":
    "Before a rover moves, teams study pictures of the ground. One wrong step can trap a rover.",
  "ev.rover_atolou.title": "The rover got stuck!",
  "ev.rover_atolou.body":
    "The sand was soft, and the rover sank. Getting it out used lots of energy.",

  "ev.fossil.title": "Is that a fossil?!",
  "ev.fossil.body":
    "The rover found a rock with a strange pattern. It looks like a fossil, an ancient living thing that turned to stone! Is it?",
  "ev.fossil.analisar.label": "Take it to the lab",
  "ev.fossil.analisar.outcome":
    "The rock went to the lab. The result is coming soon! Carrying it used energy.",
  "ev.fossil.analisar.lesson":
    "Scientists don't just trust how things look: they test them. So far, no one has found a fossil on Mars.",
  "ev.fossil.foto.label": "Take photos and move on",
  "ev.fossil.foto.outcome": "The photos look great, but you may never know what it was.",
  "ev.fossil.foto.lesson":
    "The Perseverance rover keeps rocks in little tubes. The idea is that one day they'll be studied in labs on Earth.",
  "ev.fossil_resultado.title": "Just a rock... but that's science!",
  "ev.fossil_resultado.body":
    "It wasn't a fossil, just an ordinary rock. But finding that out is science too: now we know more about Mars rocks!",

  // ================================================================ events by place (batch 2)
  // ☀️ solar panels
  "ev.geada.title": "Ice on the panels!",
  "ev.geada.body": "The night was so cold that a very thin layer of ice covered the solar panels.",
  "ev.geada.esperar.label": "Wait for the Sun to melt it",
  "ev.geada.esperar.outcome":
    "The ice melted by itself, but the panels made less energy in the morning.",
  "ev.geada.esperar.lesson":
    "In 1979, the Viking 2 lander photographed a very thin layer of ice on the ground on Mars.",
  "ev.geada.raspar.label": "Go out and scrape the ice",
  "ev.geada.raspar.outcome": "Clean panels in no time! But the trip used spacesuit air.",
  "ev.geada.raspar.lesson":
    "Outside, every job uses spacesuit air. Sometimes waiting is safer than going out.",

  "ev.eclipse_fobos.title": "A moon passed in front of the Sun!",
  "ev.eclipse_fobos.body":
    "Phobos, one of the two moons of Mars, will pass in front of the Sun. For a moment, the panels will get less light.",
  "ev.eclipse_fobos.filmar.label": "Film the eclipse",
  "ev.eclipse_fobos.filmar.outcome": "What an amazing video! The camera and telescope used energy.",
  "ev.eclipse_fobos.filmar.lesson":
    "In 2022, the Perseverance rover filmed Phobos passing in front of the Sun. The eclipse lasted about 40 seconds!",
  "ev.eclipse_fobos.guardar.label": "Save energy in the battery",
  "ev.eclipse_fobos.guardar.outcome":
    "The battery is fuller, but the lab had no energy and only works at half today.",
  "ev.eclipse_fobos.guardar.lesson":
    "Mars has two small moons, Phobos and Deimos. When Phobos passes in front of the Sun, less light arrives for a moment.",

  "ev.truque_areia.title": "Dusty panels",
  "ev.truque_areia.body":
    "The panels are dusty and make less energy. The afternoon wind could help... or someone could go out to clean them.",
  "ev.truque_areia.areia.label": "Drop sand into the wind",
  "ev.truque_areia.areia.outcome":
    "The robot dropped sand near the panels. The wind carried the sand, and it swept away some dust!",
  "ev.truque_areia.areia.lesson":
    "In 2021, the InSight lander used this trick: it dropped sand into the wind near its panels, and the sand carried away some dust.",
  "ev.truque_areia.escovar.label": "Go out and brush the panels",
  "ev.truque_areia.escovar.outcome":
    "The panels are really clean! But the trip used spacesuit air.",
  "ev.truque_areia.escovar.lesson":
    "Brushing cleans better than the wind, but every trip outside uses air and tires the crew.",

  // 💨 air factory
  "ev.filtro_co2.title": "The carbon dioxide filter is full",
  "ev.filtro_co2.body":
    "When we breathe, we let out carbon dioxide. The filter that takes this gas out of the base's air is full.",
  "ev.filtro_co2.reserva.label": "Put in the spare filter",
  "ev.filtro_co2.reserva.outcome": "New filter in place! But now there are no spares left.",
  "ev.filtro_co2.reserva.lesson":
    "On the Space Station, machines take carbon dioxide out of the air, because too much of it is bad for the body.",
  "ev.filtro_co2.improvisar.label": "Make a homemade filter",
  "ev.filtro_co2.improvisar.outcome":
    "The filter made with tape and old parts worked, but not as well. The air got a little worse.",
  "ev.filtro_co2.improvisar.lesson":
    "In 1970, the Apollo 13 spacecraft had a problem, and the astronauts built a filter with duct tape and other parts. It worked!",

  "ev.eletrolise.title": "Make air from water?",
  "ev.eletrolise.body":
    "The air machine can split water into oxygen and another gas, using electricity. But this water also waters the plants.",
  "ev.eletrolise.fazer_ar.label": "Use water to make air",
  "ev.eletrolise.fazer_ar.outcome": "More oxygen for everyone! But the greenhouse got less water.",
  "ev.eletrolise.fazer_ar.lesson":
    "On the Space Station, a machine splits water with electricity and makes oxygen for the crew to breathe.",
  "ev.eletrolise.guardar_agua.label": "Keep the water for the plants",
  "ev.eletrolise.guardar_agua.outcome":
    "The plants drank well and grew. But the factory made less air today.",
  "ev.eletrolise.guardar_agua.lesson":
    "In a base, the same water is used for drinking, growing plants, and even making air. That's why it's used many times.",

  "ev.poeira_dentro.title": "Dust got into the base!",
  "ev.poeira_dentro.body":
    "Dust stuck to the spacesuits and came in with the crew. Now there's red powder all over the floor.",
  "ev.poeira_dentro.aspirar.label": "Vacuum everything now",
  "ev.poeira_dentro.aspirar.outcome": "The base is spotless! The vacuum used energy.",
  "ev.poeira_dentro.aspirar.lesson":
    "Apollo astronauts said Moon dust stuck to everything and smelled like gunpowder.",
  "ev.poeira_dentro.depois.label": "Clean another day",
  "ev.poeira_dentro.depois.outcome": "No energy used, but the dust made the crew cough and sneeze.",
  "ev.poeira_dentro.depois.lesson":
    "Mars dust is very fine and has salts that are bad for the body. It can't stay inside the house.",

  // 🌱 greenhouse
  "ev.luz_rosa.title": "Which light for the plants?",
  "ev.luz_rosa.body":
    "The greenhouse lamps can be red and blue, which make everything pink, or white, like daylight.",
  "ev.luz_rosa.rosa.label": "Red and blue light",
  "ev.luz_rosa.rosa.outcome":
    "The greenhouse turned pink and the plants grew well, using little energy.",
  "ev.luz_rosa.rosa.lesson":
    "On the Space Station, plants grow under red and blue lights. Together, they make the greenhouse glow pink!",
  "ev.luz_rosa.branca.label": "White light, like daylight",
  "ev.luz_rosa.branca.outcome":
    "The plants grew and the crew liked seeing everything green. But white light used more energy.",
  "ev.luz_rosa.branca.lesson":
    "With white light, plants show their real color. That makes it easier to see if one is sick.",

  "ev.pimentas.title": "The peppers grew!",
  "ev.pimentas.body":
    "The pepper plants are full of green peppers. If you wait longer, they turn red and get bigger.",
  "ev.pimentas.verdes.label": "Pick them green now",
  "ev.pimentas.verdes.outcome": "New, spicy food today! Picking them was a bit of work.",
  "ev.pimentas.verdes.lesson":
    "In 2021, astronauts picked peppers on the Space Station and made tacos with them!",
  "ev.pimentas.vermelhas.label": "Wait for them to turn red",
  "ev.pimentas.vermelhas.outcome":
    "The peppers keep growing. In a few sols, the harvest will be big!",
  "ev.pimentas.vermelhas.lesson":
    "The pepper experiment on the Space Station lasted more than 4 months. Big plants take time to make fruit.",
  "ev.pimentas_vermelhas.title": "Red peppers!",
  "ev.pimentas_vermelhas.body": "Waiting paid off: the peppers turned red and gave lots of food.",

  "ev.adubo.title": "What to do with the leftovers?",
  "ev.adubo.body":
    "There are peels and leaves left from the kitchen. They can become trash... or compost for the greenhouse.",
  "ev.adubo.compostar.label": "Make compost",
  "ev.adubo.compostar.outcome":
    "The leftovers will turn into compost. In a few sols, the plants will grow more!",
  "ev.adubo.compostar.lesson":
    "The European Space Agency is studying a system that recycles leftovers to make food and air on long trips.",
  "ev.adubo.jogar_fora.label": "Throw them away",
  "ev.adubo.jogar_fora.outcome":
    "The kitchen has more space, but the trash smelled bad and made the crew queasy.",
  "ev.adubo.jogar_fora.lesson":
    "There's no garbage truck on a Mars base. Everything you throw away stays inside.",
  "ev.adubo_pronto.title": "The compost is ready!",
  "ev.adubo_pronto.body":
    "The leftovers turned into compost, and the greenhouse plants gave more food.",

  // 🔬 lab
  "ev.meteorito.title": "A rock fell from the sky!",
  "ev.meteorito.body":
    "The robot found a dark, shiny rock near the base. It looks like a meteorite, a rock that came from space!",
  "ev.meteorito.analisar.label": "Study it in the lab",
  "ev.meteorito.analisar.outcome": "It really was an iron meteorite! The tests used energy.",
  "ev.meteorito.analisar.lesson":
    "In 2005, the Opportunity rover found a meteorite on Mars. It was the first meteorite found on another planet.",
  "ev.meteorito.foto.label": "Take a photo and send it to Earth",
  "ev.meteorito.foto.outcome":
    "Scientists on Earth loved the photos, but without tests the research gave less.",
  "ev.meteorito.foto.lesson":
    "Rocks from Mars also fall on Earth as meteorites. Scientists have studied some of them for many years.",

  "ev.tubo_amostra.title": "The sample tube came back empty!",
  "ev.tubo_amostra.body":
    "The crew drilled a rock to keep a piece in a tube. But the tube came back with nothing inside!",
  "ev.tubo_amostra.cuidado.label": "Find out what happened and try again",
  "ev.tubo_amostra.cuidado.outcome":
    "The rock was crumbly and turned to powder. The second try worked! It used energy.",
  "ev.tubo_amostra.cuidado.lesson":
    "In 2021, the Perseverance rover's first sample tube came back empty: the rock turned to powder. The team studied what happened before trying again.",
  "ev.tubo_amostra.rapido.label": "Try again really fast",
  "ev.tubo_amostra.rapido.outcome":
    "You got a sample right away! But nobody checked if it was good...",
  "ev.tubo_amostra.rapido.lesson":
    "In science, rushing can ruin the work. Checking first avoids losing samples.",
  "ev.amostra_vazia.title": "The sample was ruined",
  "ev.amostra_vazia.body":
    "The rushed sample was full of dust and wasn't useful. Part of the research was lost.",

  "ev.nuvens.title": "Clouds shining in the sky!",
  "ev.nuvens.body": "After sunset, some clouds high up keep shining with rainbow colors.",
  "ev.nuvens.noite.label": "Stay up taking photos",
  "ev.nuvens.noite.outcome":
    "Beautiful photos for science! But the crew went to bed late and got tired.",
  "ev.nuvens.noite.lesson":
    "In 2021, the Curiosity rover photographed clouds shining after sunset. They were made of dry ice.",
  "ev.nuvens.uma_foto.label": "Take just one photo and sleep",
  "ev.nuvens.uma_foto.outcome":
    "One pretty photo and a well-rested crew. The camera used a little energy.",
  "ev.nuvens.uma_foto.lesson":
    "Mars has clouds too, like Earth. Most of them are made of water ice.",

  // 🛡️ shelter
  "ev.tijolos.title": "Bricks made of Mars sand",
  "ev.tijolos.body": "You can make the base safer with a new layer: printed bricks or sandbags.",
  "ev.tijolos.imprimir.label": "Print bricks",
  "ev.tijolos.imprimir.outcome":
    "The 3D printer made sand bricks! The base is better protected. It used energy.",
  "ev.tijolos.imprimir.lesson":
    "NASA held a contest for 3D-printed homes made with materials from Mars, to protect future crews.",
  "ev.tijolos.sacos.label": "Fill sandbags outside",
  "ev.tijolos.sacos.outcome":
    "The bags are on top of the base. More protection! But the work outside used air and was tiring.",
  "ev.tijolos.sacos.lesson":
    "Using local sand is an idea being studied for Mars: that way you don't have to bring everything from Earth.",

  "ev.tremor.title": "The base shook!",
  "ev.tremor.body":
    "Everything shook a little. It was a marsquake! It looks like nothing broke... or did it?",
  "ev.tremor.conferir.label": "Check the whole base",
  "ev.tremor.conferir.outcome": "You found a loose screw and fixed it. The check used energy.",
  "ev.tremor.conferir.lesson":
    "The InSight lander felt more than a thousand quakes on Mars. The biggest one was in 2022.",
  "ev.tremor.seguir.label": "Keep working",
  "ev.tremor.seguir.outcome": "You did more science. But nobody checked if anything came loose...",
  "ev.tremor.seguir.lesson":
    "After a quake, checking the house avoids surprises. Small damage grows if nobody sees it.",
  "ev.tremor_estrago.title": "A shelf fell down!",
  "ev.tremor_estrago.body":
    "Yesterday's quake loosened a shelf. Cleaning up used energy and tired the crew.",

  // 📡 antenna
  "ev.conjuncao.title": "The Sun is in the way",
  "ev.conjuncao.body":
    "Soon the Sun will be between Mars and Earth. Messages won't get through for a few days.",
  "ev.conjuncao.mandar_tudo.label": "Send all the data first",
  "ev.conjuncao.mandar_tudo.outcome":
    "All the data reached Earth in time! The antenna used energy.",
  "ev.conjuncao.mandar_tudo.lesson":
    "About every 2 years, the Sun gets between Earth and Mars. NASA stops sending commands to its rovers for about two weeks.",
  "ev.conjuncao.silencio.label": "Turn off the antenna and save energy",
  "ev.conjuncao.silencio.outcome":
    "The battery saved energy, but the crew felt lonely without news from Earth.",
  "ev.conjuncao.silencio.lesson":
    "Without talking to Earth, the crew must solve everything alone. That takes preparation.",

  "ev.satelite.title": "A satellite is passing by!",
  "ev.satelite.body":
    "A satellite that circles Mars will pass over the base. It can carry the data to Earth.",
  "ev.satelite.satelite.label": "Send the data through the satellite",
  "ev.satelite.satelite.outcome": "The data went quickly and used little energy!",
  "ev.satelite.satelite.lesson":
    "Rovers on Mars send most of their photos through satellites that circle the planet.",
  "ev.satelite.direto.label": "Send it straight with the big antenna",
  "ev.satelite.direto.outcome": "More data reached Earth, but the big antenna used lots of energy.",
  "ev.satelite.direto.lesson":
    "A big antenna can talk straight to Earth, but it uses much more energy.",

  "ev.musica.title": "Wake-up music!",
  "ev.musica.body": "Earth sent a fun song to wake up the crew today.",
  "ev.musica.tocar.label": "Play it loud",
  "ev.musica.tocar.outcome": "Everyone woke up dancing! The speakers used a little energy.",
  "ev.musica.tocar.lesson":
    "Back in the Space Shuttle days, Mission Control woke the astronauts with a different song each day.",
  "ev.musica.dormir_mais.label": "Let the crew sleep longer",
  "ev.musica.dormir_mais.outcome":
    "The crew rested more, but the lab started late and only works at half today.",
  "ev.musica.dormir_mais.lesson": "A bit more sleep helps the body, but it delays the day's work.",

  // 🛏️ home
  "ev.cardapio.title": "Boring food",
  "ev.cardapio.body":
    "The crew is tired of eating the same thing. The food seems to have no taste.",
  "ev.cardapio.tempero.label": "Cook something new with spices",
  "ev.cardapio.tempero.outcome": "What a tasty dinner! Everyone is happy, but it used more food.",
  "ev.cardapio.tempero.lesson":
    "In space, food can seem tasteless. That's why many astronauts like hot sauce.",
  "ev.cardapio.de_sempre.label": "Eat the usual",
  "ev.cardapio.de_sempre.outcome": "The food lasted longer, but the crew ate little and felt down.",
  "ev.cardapio.de_sempre.lesson":
    "Eating the same thing every day gets tiring. NASA studies how to keep food tasty on long trips.",

  "ev.diario.title": "Diary time",
  "ev.diario.body": "An astronaut wants to stop for a bit to write in her diary about the week.",
  "ev.diario.escrever.label": "Stop to write",
  "ev.diario.escrever.outcome":
    "She felt much better! But she stopped working, and the lab only works at half today.",
  "ev.diario.escrever.lesson":
    "Space Station astronauts wrote diaries for a NASA study about what it's like to live isolated.",
  "ev.diario.trabalhar.label": "Keep working",
  "ev.diario.trabalhar.outcome": "The research moved on, but the astronaut got tired and worried.",
  "ev.diario.trabalhar.lesson":
    "Working nonstop seems good, but tiredness shows up later. Breaks are part of the job too.",

  "ev.resfriado.title": "Achoo!",
  "ev.resfriado.body": "An astronaut woke up sneezing. It looks like a cold!",
  "ev.resfriado.isolar.label": "Rest away from the others",
  "ev.resfriado.isolar.outcome":
    "He got better and nobody else caught it. But someone was missing at work, and the lab only works at half today.",
  "ev.resfriado.isolar.lesson":
    "Before going to space, astronauts stay in quarantine for some days, away from other people, so they don't bring illnesses along.",
  "ev.resfriado.seguir.label": "Work anyway",
  "ev.resfriado.seguir.outcome": "The research moved on, but the cold spread to more people.",
  "ev.resfriado.seguir.lesson":
    "In a small base, an illness spreads easily from one person to another.",

  // 🚙 rover
  "ev.noite_gelada.title": "Freezing night!",
  "ev.noite_gelada.body": "Tonight will be very cold. The cold can make the rover's battery weak.",
  "ev.noite_gelada.aquecer.label": "Turn on the rover's heater",
  "ev.noite_gelada.aquecer.outcome": "The rover spent a warm night. The heater used energy.",
  "ev.noite_gelada.aquecer.lesson":
    "Nights on Mars are very cold. Robots use heaters to protect their parts and batteries.",
  "ev.noite_gelada.deixar.label": "Leave the rover in the cold",
  "ev.noite_gelada.deixar.outcome": "You saved energy today. Will the battery hold up?",
  "ev.noite_gelada.deixar.lesson":
    "Cold makes batteries weaker. On Earth too: a phone runs out faster in the cold.",
  "ev.rover_frio.title": "The rover's battery froze",
  "ev.rover_frio.body":
    "The cold made the rover's battery weak. Warming it up and recharging used energy.",

  "ev.drone.title": "Send the drone ahead?",
  "ev.drone.body":
    "The rover will explore a new place. A small drone could fly first and show the way.",
  "ev.drone.voar.label": "Fly the drone first",
  "ev.drone.voar.outcome": "The drone found the best path and new photos! The flight used energy.",
  "ev.drone.voar.lesson":
    "The Ingenuity helicopter flew 72 times on Mars, from 2021 to 2024. It was built to fly only 5 times!",
  "ev.drone.sem_olhar.label": "Go by rover without looking",
  "ev.drone.sem_olhar.outcome":
    "The rover got there faster and found new rocks. But the path was unknown...",
  "ev.drone.sem_olhar.lesson":
    "Without checking the path first, the rover may fall into soft sand and get stuck.",
  "ev.briga.title": "An argument in the Shelter",
  "ev.briga.body": "Two crew members argued about tidying the Shelter. The mood got bad.",
  "ev.briga.conversar.label": "Stop and talk together",
  "ev.briga.conversar.outcome": "They made up and shared the chores. The talk took time away from research.",
  "ev.briga.conversar.lesson": "NASA studies crews that stay isolated for months, like in the HERA project, to learn how to get along.",
  "ev.briga.separar.label": "Everyone works alone today",
  "ev.briga.separar.outcome": "Each one did their part of the research, but nobody was happy.",
  "ev.briga.separar.lesson": "An argument without talking leaves everyone sad and tired. In a small base, the crew must get along.",
  "ev.dor_cabeca.title": "Headache",
  "ev.dor_cabeca.body": "A crewmate woke up with a headache. The air in the Shelter feels stuffy.",
  "ev.dor_cabeca.ventilar.label": "Turn the fans up",
  "ev.dor_cabeca.ventilar.outcome": "The air got fresh and the headache went away. The fans used energy.",
  "ev.dor_cabeca.ventilar.lesson": "On the Space Station, air with too much carbon dioxide (the gas we breathe out) can cause headaches. Moving the air helps.",
  "ev.dor_cabeca.seguir.label": "Drink water and keep going",
  "ev.dor_cabeca.seguir.outcome": "He went back to work and helped with research. But the headache didn’t fully go away...",
  "ev.dor_cabeca.seguir.lesson": "A small symptom can get worse. Astronauts tell the doctor right away, who follows their health from Earth.",
  "ev.dor_cabeca_piora.title": "The headache got worse",
  "ev.dor_cabeca_piora.body": "Remember the headache? It came back stronger and your crewmate had to rest all day.",
  "ev.esteira.title": "Treadmill time",
  "ev.esteira.body": "The crew skipped exercise yesterday. The treadmill in the Shelter is waiting.",
  "ev.esteira.correr.label": "Run on the treadmill",
  "ev.esteira.correr.outcome": "Everyone ran and got stronger. Then they got hungry and ate more.",
  "ev.esteira.correr.lesson": "On Mars, gravity (the pull toward the ground) is only a third of Earth’s. Without exercise, bones and muscles get weaker.",
  "ev.esteira.pular.label": "Skip exercise again",
  "ev.esteira.pular.outcome": "There was more time for research, but the crew felt weak and tired.",
  "ev.esteira.pular.lesson": "On the Space Station, astronauts exercise about 2 hours a day to keep their bones strong.",
  "ev.janela.title": "Crack in the window",
  "ev.janela.body": "A small stone blown by the wind cracked the outer glass of the Shelter window.",
  "ev.janela.trocar.label": "Replace the glass now",
  "ev.janela.trocar.outcome": "New glass in place! The repair took hours and used energy.",
  "ev.janela.trocar.lesson": "Spaceship windows have several layers of glass. If one cracks, the others hold the air in until it’s replaced.",
  "ev.janela.fita.label": "Cover it with special tape",
  "ev.janela.fita.outcome": "The tape held almost everything, but a little air leaked out.",
  "ev.janela.fita.lesson": "A small leak lets air escape slowly. On the Space Station, the crew once spent days looking for a tiny leak.",
  "ev.barulho.title": "Noise at bedtime",
  "ev.barulho.body": "A fan in the Shelter started squeaking. Nobody slept well last night.",
  "ev.barulho.consertar.label": "Fix the fan",
  "ev.barulho.consertar.outcome": "Quiet! The fan works like new, but making the part used energy.",
  "ev.barulho.consertar.lesson": "The Space Station is noisy because of its fans. Less noise helps the crew sleep and think better.",
  "ev.barulho.tampoes.label": "Sleep with earplugs",
  "ev.barulho.tampoes.outcome": "It helped, but some woke up in the night because of the squeak.",
  "ev.barulho.tampoes.lesson": "Many astronauts sleep with earplugs. Sleeping well helps avoid mistakes at work.",
};
