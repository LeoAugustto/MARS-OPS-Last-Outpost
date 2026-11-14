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
};
