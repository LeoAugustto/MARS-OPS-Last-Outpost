// Español. Mismas claves que pt.ts. Frases cortas y palabras sencillas.
import type { Dict } from "./pt";

export const es: Dict = {
  "jogo.titulo": "Operación Marte: Última Base",
  "recurso.ar": "Aire",
  "recurso.comida": "Comida",
  "recurso.saude": "Salud",
  "recurso.energia": "Energía",
  "recurso.bateria": "Batería",
  "recurso.ciencia": "Ciencia",
  "recurso.escudo": "Escudo",
  "modulo.ar": "Fábrica de aire",
  "modulo.estufa": "Invernadero",
  "modulo.ciencia": "Laboratorio",
  "modulo.escudo": "Escudo de arena",
  "nivel.cadete": "Cadete (fácil)",
  "nivel.piloto": "Piloto (medio)",
  "nivel.comandante": "Comandante (difícil)",

  "hud.sol": "Sol {sol} de {total}",
  "hud.distribuir": "Reparte la energía de hoy: {energia}",
  "hud.sobra": "La energía que sobre se guarda en la batería.",
  "hud.dormir": "Dormir y terminar el sol",
  "botao.ok": "¡OK!",
  "botao.porque": "¿Por qué?",
  "botao.voltar_sol": "Volver al sol {sol}",
  "botao.nova_missao": "Nueva misión",
  "selo.ao_vivo": "Dato en vivo de la NASA",
  "selo.real": "Evento real del {data}",
  "selo.missao": "Misión real: {missao}",

  "fonte.donki": "NASA DONKI — clima espacial",
  "fonte.osdr": "NASA OSDR — salud de los astronautas",
  "fonte.radlab": "NASA RadLab — radiación medida en el espacio",
  "fonte.marstrek": "NASA Mars Trek — mapas de Marte",
  "fonte.csa": "Agencia Espacial Canadiense — comida en el espacio",
  "fonte.nasa-fato": "Dato de misiones de la NASA",

  "glossario.sol": "Sol = un día en Marte. Dura 24 horas y 40 minutos.",
  "glossario.radiacao":
    "Radiación = una energía invisible que viene del Sol y del espacio. Mucha radiación hace daño al cuerpo.",
  "glossario.tempestade":
    "Tormenta solar = cuando el Sol lanza una explosión de luz y partículas muy rápidas.",

  "fim.vitoria.title": "¡Misión cumplida!",
  "fim.vitoria.body": "Tu tripulación aguantó todos los soles en Marte. ¡Qué buen mando!",
  "fim.parcial.title": "¡Todos volvieron bien!",
  "fim.parcial.body":
    "La tripulación está a salvo, pero faltó un poco de ciencia. ¿Pruebas otra estrategia?",
  "fim.resgate.title": "La Tierra envió una nave a buscar a la tripulación",
  "fim.resgate.body":
    "Nadie se lastimó: el Control de Misión decidió traer a todos de vuelta. ¿Vemos qué pasó?",
  "causa.ar":
    "Se acabó el aire. Las personas respiran todo el tiempo y la fábrica de aire necesita energía cada sol.",
  "causa.comida":
    "Se acabó la comida. El invernadero necesita luz (energía) y las plantas tardan en crecer.",
  "causa.saude":
    "La salud bajó demasiado. La radiación, el hambre y la falta de aire cansan el cuerpo.",
  "dica.ar": "Consejo: cada 1 de energía en la fábrica de aire hace {ar} de aire. Dale lo suficiente para lo que respira el equipo.",
  "dica.comida": "Consejo: cada 1 de energía en el invernadero hace {comida} de comida. No dejes el invernadero sin energía.",
  "dica.saude": "Consejo: con {escudo} de energía, el robot pone una capa de escudo contra la radiación. Y duerme antes de la noche para que el equipo no se canse.",
  "fato.reabastecimento":
    "¿Sabías que una nave de la Tierra solo puede llegar a Marte más o menos cada 26 meses? ¡Por eso planear es todo!",
  "fato.marte_2017":
    "En septiembre de 2017, una tormenta solar llegó a Marte, iluminó su cielo con auroras y aumentó la radiación medida por el robot Curiosity.",
  "fato.marte_2024":
    "En mayo de 2024, una explosión del Sol llegó a Marte. ¡El robot Curiosity midió radiación como unas 30 radiografías de una vez!",

  "ev.chegada.title": "¡Bienvenidos a Marte!",
  "ev.chegada.body":
    "¡Aterrizaron! La base es pequeña y todo necesita energía. ¿Qué hacen primero?",
  "ev.chegada.explorar.label": "Explorar el cráter",
  "ev.chegada.explorar.outcome": "Encontraron rocas increíbles, pero el traje gastó aire.",
  "ev.chegada.explorar.lesson":
    "Afuera no se puede respirar: el aire de Marte es casi todo dióxido de carbono. Cada paseo gasta el aire del traje.",
  "ev.chegada.arrumar.label": "Cubrir la base con arena",
  "ev.chegada.arrumar.outcome": "El robot echó arena sobre la base. ¡Ahora protege más!",
  "ev.chegada.arrumar.lesson":
    "Una capa gruesa de arena o roca bloquea parte de la radiación. Los científicos planean bases así.",

  "ev.poeira_vem.title": "Viene una nube de polvo",
  "ev.poeira_vem.body": "El viento de Marte levantó polvo. Puede cubrir los paneles solares.",
  "ev.poeira_vem.guardar.label": "Guardar energía en la batería",
  "ev.poeira_vem.guardar.outcome": "Guardaron energía para los días oscuros.",
  "ev.poeira_vem.guardar.lesson":
    "Las baterías guardan la energía del sol para cuando no hay sol. Pero lo que va a la batería no se puede usar hoy.",
  "ev.poeira_vem.ignorar.label": "Seguir trabajando",
  "ev.poeira_vem.ignorar.outcome": "Un poquito más de ciencia hoy.",
  "ev.poeira_vem.ignorar.lesson":
    "En 2018, una tormenta de polvo enorme cubrió los paneles del robot Opportunity y se quedó sin energía.",

  "ev.painel_sujo.title": "Los paneles están cubiertos de polvo",
  "ev.painel_sujo.body": "Con polvo, los paneles solares producen mucha menos energía.",
  "ev.painel_sujo.limpar.label": "Salir a limpiarlos",
  "ev.painel_sujo.limpar.outcome":
    "¡Paneles brillantes otra vez! Pero el paseo gastó aire y los expuso a la radiación.",
  "ev.painel_sujo.limpar.lesson":
    "Cada salida es un paseo espacial: gasta aire del traje y expone más a la radiación.",
  "ev.painel_sujo.esperar.label": "Esperar a que el viento los limpie",
  "ev.painel_sujo.esperar.outcome":
    "Ahorrarán aire, pero tendrán poca energía durante algunos soles.",
  "ev.painel_sujo.esperar.lesson":
    "¡Esto pasó de verdad: ráfagas de viento limpiaron los paneles de los robots Spirit y Opportunity!",

  "ev.vento_limpa.title": "¡El viento limpió los paneles!",
  "ev.vento_limpa.body": "Una ráfaga de viento sopló el polvo. ¡Volvió la energía!",

  "ev.broto.title": "¡Brotaron las papas!",
  "ev.broto.body": "Las plantitas del invernadero están creciendo, pero necesitan luz.",
  "ev.broto.luz.label": "Darles más luz",
  "ev.broto.luz.outcome":
    "Las lámparas del invernadero gastaron energía. ¡A las plantas les encantó!",
  "ev.broto.luz.lesson":
    "Las plantas necesitan luz para crecer. Lejos de la Tierra, esa luz viene de lámparas que usan energía.",
  "ev.broto.economizar.label": "Ahorrar luz",
  "ev.broto.economizar.outcome": "Sobró energía hoy, pero las plantas crecerán poco.",
  "ev.broto.economizar.lesson":
    "Ahorrar hoy puede hacer falta mañana: la cosecha depende del cuidado de muchos días.",

  "ev.colheita_boa.title": "¡Buena cosecha!",
  "ev.colheita_boa.body": "Con mucha luz, el invernadero dio muchas papas.",
  "ev.colheita_fraca.title": "Cosecha pequeña",
  "ev.colheita_fraca.body": "Con poca luz, las plantas crecieron poco.",

  "ev.filtro_entupido.title": "¡Se tapó el filtro de aire!",
  "ev.filtro_entupido.body": "El polvo fino de Marte entró en la fábrica de aire.",
  "ev.filtro_entupido.peca.label": "Usar la pieza de repuesto",
  "ev.filtro_entupido.peca.outcome": "¡Arreglado rapidito! Pero ya no queda pieza de repuesto.",
  "ev.filtro_entupido.peca.lesson":
    "En Marte no hay tiendas: cada pieza vino de la Tierra. Cuando se acaba, se acabó.",
  "ev.filtro_entupido.limpar.label": "Limpiarlo con cuidado",
  "ev.filtro_entupido.limpar.outcome": "Funcionó, pero tomó todo el día y gastó energía.",
  "ev.filtro_entupido.limpar.lesson":
    "Los astronautas pasan mucho tiempo arreglando cosas. Es tiempo de menos para la ciencia.",
  "ev.filtro_entupido.deixar.label": "Dejarlo así",
  "ev.filtro_entupido.deixar.outcome": "La fábrica de aire está haciendo menos aire.",
  "ev.filtro_entupido.deixar.lesson":
    "El soporte vital es lo que mantiene a todos respirando. Dejarlo roto es peligroso.",

  "ev.rocha.title": "¡Una roca diferente!",
  "ev.rocha.body": "El robot vio una roca de colores raros a 2 km de la base.",
  "ev.rocha.robo.label": "Enviar solo al robot",
  "ev.rocha.robo.outcome": "El robot fue despacio y gastó batería, pero trajo datos.",
  "ev.rocha.robo.lesson":
    "Los robots no necesitan respirar, pero necesitan energía y son más lentos que las personas.",
  "ev.rocha.astronauta.label": "Ir con un astronauta",
  "ev.rocha.astronauta.outcome": "¡Qué descubrimiento! Pero el paseo gastó aire y salud.",
  "ev.rocha.astronauta.lesson":
    "Las personas descubren cosas más rápido, pero cada paseo gasta aire y expone a la radiación.",

  "ev.laboratorio.title": "¡Resultado del laboratorio!",
  "ev.laboratorio.body":
    "¡La roca tenía señales de agua de hace mucho tiempo! El robot Perseverance busca rocas así en Marte.",

  "ev.exercicio.title": "Hora del ejercicio",
  "ev.exercicio.body":
    "En Marte el cuerpo pesa solo un poco más de un tercio de lo que pesa en la Tierra. Con poco peso, los huesos y músculos se debilitan.",
  "ev.exercicio.treinar.label": "Entrenar 2 horas",
  "ev.exercicio.treinar.outcome":
    "¡Cuerpos fuertes! Pero la cinta gastó energía y todos tienen hambre.",
  "ev.exercicio.treinar.lesson":
    "En la Estación Espacial, los astronautas hacen ejercicio unas 2 horas al día para que sus huesos no se debiliten.",
  "ev.exercicio.pular.label": "Saltarse el entrenamiento hoy",
  "ev.exercicio.pular.outcome": "Más tiempo para la ciencia, pero el cuerpo lo sintió.",
  "ev.exercicio.pular.lesson":
    "Estudios de la NASA muestran que, con poca gravedad, los huesos pierden fuerza si el cuerpo no hace ejercicio.",

  "ev.contato_terra.title": "Llamada a la Tierra",
  "ev.contato_terra.body":
    "Un mensaje tarda de 4 a 24 minutos en ir de Marte a la Tierra. ¡No se puede conversar en vivo!",
  "ev.contato_terra.conselho.label": "Pedir un consejo para el invernadero",
  "ev.contato_terra.conselho.outcome": "¡Mensaje enviado! La respuesta llega mañana.",
  "ev.contato_terra.conselho.lesson":
    "Por el retraso, la tripulación en Marte tiene que resolver muchas cosas sola.",
  "ev.contato_terra.fotos.label": "Enviar fotos a los científicos",
  "ev.contato_terra.fotos.outcome":
    "¡A los científicos les encantaron las fotos! La antena gastó mucha energía.",
  "ev.contato_terra.fotos.lesson":
    "Enviar datos tan lejos necesita una antena potente, y usa mucha energía.",

  "ev.resposta_terra.title": "¡La Tierra respondió!",
  "ev.resposta_terra.body":
    "Los científicos enviaron un consejo para usar mejor la luz del invernadero. ¡Dio más comida!",

  // ================================================================ eventos por lugar de la base
  // ☀️ paneles
  "ev.redemoinho.title": "¡Un remolino de polvo!",
  "ev.redemoinho.body":
    "Un remolino de polvo pasa cerca de los paneles solares. Puede ensuciarlos... ¡o soplar el polvo viejo!",
  "ev.redemoinho.cobrir.label": "Cubrir los paneles",
  "ev.redemoinho.cobrir.outcome": "Los paneles quedaron protegidos, pero cubrirlos gastó energía.",
  "ev.redemoinho.cobrir.lesson":
    "En Marte, el viento puede ensuciar o limpiar los paneles. Por eso es difícil saber cuánta energía tendrá la base mañana.",
  "ev.redemoinho.observar.label": "Dejarlo pasar y filmarlo",
  "ev.redemoinho.observar.outcome":
    "Filmaron el remolino para los científicos. Mañana veremos qué les hizo a los paneles.",
  "ev.redemoinho.observar.lesson":
    "En 2005, un remolino pasó sobre el robot Spirit y limpió sus paneles. ¡Su energía subió mucho!",
  "ev.redemoinho_passou.title": "El remolino pasó",
  "ev.redemoinho_passou.body":
    "Si los paneles estaban sucios, el viento los limpió y la energía subió. Si estaban limpios, se ensuciaron un poco.",

  "ev.painel_rachado.title": "¡Una piedrita rajó un panel!",
  "ev.painel_rachado.body":
    "Una piedrita que vino del espacio cayó en la base y rajó un panel solar.",
  "ev.painel_rachado.consertar.label": "Salir a arreglarlo hoy",
  "ev.painel_rachado.consertar.outcome":
    "El panel volvió a funcionar, pero el arreglo gastó energía y el aire del traje.",
  "ev.painel_rachado.consertar.lesson":
    "Afuera no se puede respirar: el aire de Marte es casi todo dióxido de carbono. Cada arreglo afuera gasta el aire del traje.",
  "ev.painel_rachado.desligar.label": "Apagar solo la parte rota",
  "ev.painel_rachado.desligar.outcome":
    "Nadie tuvo que salir, pero ahora los paneles dan menos energía.",
  "ev.painel_rachado.desligar.lesson":
    "El aire de Marte es muy fino y protege poco. Por eso las piedras del espacio llegan al suelo. La sonda InSight, de la NASA, sintió varias chocando contra Marte.",

  "ev.inverno.title": "Llegó el invierno a Marte",
  "ev.inverno.body":
    "Marte también tiene estaciones. En invierno, el día es más corto y el Sol está más bajo. Los paneles dan menos energía.",
  "ev.inverno.inclinar.label": "Girar los paneles hacia el Sol",
  "ev.inverno.inclinar.outcome":
    "Los paneles reciben más luz otra vez, pero moverlos gastó energía.",
  "ev.inverno.inclinar.lesson":
    "En invierno, el robot Opportunity se estacionaba en laderas mirando al Sol. Así sus paneles recibían más luz.",
  "ev.inverno.economizar.label": "Ahorrar: pausar el laboratorio",
  "ev.inverno.economizar.outcome":
    "Guardaron energía en la batería. Hoy el laboratorio solo da la mitad de ciencia.",
  "ev.inverno.economizar.lesson":
    "Marte tiene estaciones porque está inclinado, como la Tierra. En invierno, cada día tiene menos horas de sol para los paneles.",

  // 💨 fábrica de aire
  "ev.vazamento.title": "¡La puerta está silbando!",
  "ev.vazamento.body":
    "La puerta de la fábrica de aire hace fsssss. ¡Se está escapando un poquito de aire!",
  "ev.vazamento.procurar.label": "Buscar el agujerito con calma",
  "ev.vazamento.procurar.outcome":
    "Encontraron el agujero y lo cerraron para siempre. Pero eso gastó la energía de un día de trabajo.",
  "ev.vazamento.procurar.lesson":
    "En 2020, astronautas de la Estación Espacial soltaron hojitas de té en el aire. ¡Flotaron hasta el agujero y mostraron la fuga!",
  "ev.vazamento.remendo.label": "Pegar un parche rápido",
  "ev.vazamento.remendo.outcome": "El silbido paró... por ahora. El parche se puede soltar.",
  "ev.vazamento.remendo.lesson":
    "En la Estación Espacial, primero taparon el agujero con un parche provisorio. Después, los ingenieros planearon el arreglo de verdad.",
  "ev.vazamento_volta.title": "¡El parche se soltó!",
  "ev.vazamento_volta.body":
    "El parche rápido no aguantó y se escapó un poco de aire. Ahora el agujero quedó bien cerrado.",

  "ev.gerador_barulho.title": "Ruido raro en la máquina de aire",
  "ev.gerador_barulho.body":
    "La máquina que hace el aire de la base suena tac, tac, tac. ¡Eso no es normal!",
  "ev.gerador_barulho.desligar.label": "Apagarla y revisarla hoy",
  "ev.gerador_barulho.desligar.outcome":
    "Ajustaron la pieza floja. Pero, con la máquina apagada, la base hizo menos aire hoy.",
  "ev.gerador_barulho.desligar.lesson":
    "El aire de Marte es casi todo dióxido de carbono. ¡La máquina MOXIE, del robot Perseverance, logró sacar oxígeno de ese gas!",
  "ev.gerador_barulho.continuar.label": "Dejarla encendida y trabajar",
  "ev.gerador_barulho.continuar.outcome":
    "El aire siguió saliendo y trabajaron más. Pero el ruido sigue...",
  "ev.gerador_barulho.continuar.lesson":
    "Un ruido nuevo en una máquina es un aviso. Arreglar temprano suele dar menos trabajo que arreglar después de que se rompe.",
  "ev.gerador_quebrou.title": "¡La máquina de aire se paró!",
  "ev.gerador_quebrou.body":
    "El ruido era una pieza gastada. La máquina se paró, y el arreglo gastó aire y energía.",

  "ev.agua_do_ar.title": "Agua escondida en el aire",
  "ev.agua_do_ar.body":
    "Cuando respiramos y sudamos, el aire de la base se pone húmedo. ¡Podemos recuperar esa agua!",
  "ev.agua_do_ar.coletar.label": "Encender el colector de agua",
  "ev.agua_do_ar.coletar.outcome":
    "Juntaron agua para regar el invernadero. ¡Las plantas lo agradecen! El colector gastó energía.",
  "ev.agua_do_ar.coletar.lesson":
    "En la Estación Espacial, casi toda el agua se recicla, incluso la del sudor y la respiración. Se limpia y se usa otra vez.",
  "ev.agua_do_ar.guardar.label": "Guardar la energía en la batería",
  "ev.agua_do_ar.guardar.outcome":
    "La batería quedó más llena, pero el invernadero recibió menos agua.",
  "ev.agua_do_ar.guardar.lesson":
    "Llevar agua desde la Tierra es muy difícil. En misiones largas, cada gota que no se recicla hace falta.",

  // 🌱 invernadero
  "ev.mofo.title": "¡Manchas en las hojas!",
  "ev.mofo.body":
    "Algunas hojas del invernadero tienen moho. El moho es un hongo que crece donde hay mucha humedad.",
  "ev.mofo.cortar.label": "Cortar las hojas enfermas",
  "ev.mofo.cortar.outcome": "Las plantas se salvaron, pero perdieron un poco de comida.",
  "ev.mofo.cortar.lesson":
    "En 2015, unas flores llamadas zinnias tuvieron moho en la Estación Espacial. El astronauta Scott Kelly cortó las partes enfermas y salvó algunas.",
  "ev.mofo.ventilar.label": "Encender ventiladores para secar",
  "ev.mofo.ventilar.outcome":
    "El viento secó las hojas. Los ventiladores gastaron energía y algunas hojas se marchitaron.",
  "ev.mofo.ventilar.lesson":
    "Los astronautas encendieron ventiladores para secar las zinnias. ¡Pero demasiado viento también secó las plantas! Todo necesita equilibrio.",

  "ev.rabanete.title": "¡Los rábanos están listos!",
  "ev.rabanete.body":
    "Los rábanos crecieron rápido y ya se pueden cosechar. Las papas todavía tardarán.",
  "ev.rabanete.comer.label": "Cosechar y comerlos todos",
  "ev.rabanete.comer.outcome":
    "¡Qué banquete! Ganaron mucha comida hoy, pero no quedaron semillas.",
  "ev.rabanete.comer.lesson":
    "El rábano crece rápido. ¡En la Estación Espacial, los rábanos estuvieron listos en solo 27 días!",
  "ev.rabanete.sementes.label": "Guardar algunos para plantar",
  "ev.rabanete.sementes.outcome":
    "Comieron un poco y replantaron el resto. ¡En unos soles habrá más!",
  "ev.rabanete.sementes.lesson":
    "En una base lejos de la Tierra, guardar semillas es importante: se convierten en comida nueva sin esperar una nave.",
  "ev.rabanete_de_novo.title": "¡Nueva cosecha de rábanos!",
  "ev.rabanete_de_novo.body":
    "Las semillas que guardaron se volvieron rábanos. ¡Más comida para el equipo!",

  "ev.sementes_terra.title": "¡Llegaron semillas de la Tierra!",
  "ev.sementes_terra.body":
    "Una caja de semillas salió de la Tierra hace muchos meses y por fin llegó. Solo cabe un tipo en el cantero.",
  "ev.sementes_terra.alface.label": "Plantar lechuga (rápida)",
  "ev.sementes_terra.alface.outcome": "La lechuga crece rápido, pero da poca comida.",
  "ev.sementes_terra.alface.lesson":
    "¡En 2015, astronautas de la Estación Espacial comieron lechuga plantada allí mismo, en el espacio!",
  "ev.sementes_terra.batata.label": "Plantar papas (lentas)",
  "ev.sementes_terra.batata.outcome": "Las papas van a tardar, pero darán mucha comida.",
  "ev.sementes_terra.batata.lesson":
    "Un viaje de la Tierra a Marte dura muchos meses. Las plantas que dan mucha comida ayudan a la base a depender menos de la Tierra.",
  "ev.alface_pronta.title": "¡La lechuga creció!",
  "ev.alface_pronta.body": "Hojas fresquitas para la ensalada del equipo.",
  "ev.batata_pronta.title": "¡Hora de cosechar papas!",
  "ev.batata_pronta.body": "Las papas tardaron, pero valió la pena: ¡mucha comida!",

  // 🔬 laboratorio
  "ev.microscopio.title": "¡Se rompió el microscopio!",
  "ev.microscopio.body":
    "El microscopio ya no enfoca. Se rompió una piecita, ¡y la tienda más cercana está en otro planeta!",
  "ev.microscopio.imprimir.label": "Imprimir una pieza nueva",
  "ev.microscopio.imprimir.outcome": "¡La impresora 3D hizo la pieza! Pero gastó mucha energía.",
  "ev.microscopio.imprimir.lesson":
    "En 2014, la NASA envió por mensaje el diseño de una herramienta a la Estación Espacial. ¡Allí la fabricaron con una impresora 3D!",
  "ev.microscopio.lupa.label": "Usar una lupa simple",
  "ev.microscopio.lupa.outcome":
    "Con la lupa se vieron menos detalles. Hoy el laboratorio solo da la mitad de ciencia.",
  "ev.microscopio.lupa.lesson":
    "El microscopio muestra cosas demasiado pequeñas para el ojo y la lupa. Una buena herramienta hace mucha diferencia en la ciencia.",

  "ev.gelo.title": "¡Hielo bajo el suelo!",
  "ev.gelo.body":
    "¡El robot cavó un hoyo cerca de la base y encontró hielo de agua escondido bajo la arena!",
  "ev.gelo.estudar.label": "Estudiar el hielo",
  "ev.gelo.estudar.outcome":
    "¡Un descubrimiento importante para la ciencia! El análisis gastó energía.",
  "ev.gelo.estudar.lesson":
    "En 2008, la sonda Phoenix, de la NASA, cavó el suelo de Marte y lo confirmó: ¡había hielo de agua ahí abajo!",
  "ev.gelo.derreter.label": "Derretirlo para regar las plantas",
  "ev.gelo.derreter.outcome":
    "El invernadero recibió agua. Sin la muestra de hielo, hoy el laboratorio solo da la mitad de ciencia.",
  "ev.gelo.derreter.lesson":
    "Usar lo que ya hay en Marte, como el hielo, es uno de los planes para bases del futuro. Así hay que llevar menos cosas desde la Tierra.",

  "ev.bacterias.title": "Experimento con bacterias",
  "ev.bacterias.body":
    "El equipo quiere estudiar bacterias, seres vivos tan pequeños que solo se ven con microscopio.",
  "ev.bacterias.caixa.label": "Hacerlo dentro de la caja cerrada",
  "ev.bacterias.caixa.outcome":
    "¡Todo seguro y la investigación salió bien! Pero la caja gastó mucha energía.",
  "ev.bacterias.caixa.lesson":
    "La Estación Espacial tiene una caja cerrada con guantes para experimentos. Nada de adentro se escapa a la nave.",
  "ev.bacterias.mesa.label": "Hacerlo rápido, en la mesa",
  "ev.bacterias.mesa.outcome":
    "¡Más rápido y más barato! Pero algunas bacterias pudieron escaparse...",
  "ev.bacterias.mesa.lesson":
    "La NASA limpia muy bien las naves antes de ir a Marte, para no llevar microbios de la Tierra. Esto se llama protección planetaria.",
  "ev.lab_contaminado.title": "El laboratorio se ensució",
  "ev.lab_contaminado.body": "Se escaparon algunas bacterias. Limpiar la mesa gasta energía.",

  // 🛡️ refugio
  "ev.rachadura.title": "Grieta en la capa de arena",
  "ev.rachadura.body":
    "La arena que cubre la base se agrietó en una esquina. Bloquea la radiación, una energía invisible que hace mal al cuerpo.",
  "ev.rachadura.tapar.label": "Mandar al robot a taparla",
  "ev.rachadura.tapar.outcome":
    "El robot cubrió la grieta. La protección está entera, pero gastó energía.",
  "ev.rachadura.tapar.lesson":
    "La Tierra tiene un escudo magnético y un aire grueso que protegen de la radiación. Marte no. Por eso los científicos estudian cubrir las casas con arena de Marte.",
  "ev.rachadura.depois.label": "Dejarlo para después",
  "ev.rachadura.depois.outcome":
    "No se gastó energía hoy, pero la base perdió una capa de protección.",
  "ev.rachadura.depois.lesson":
    "Una capa de arena más fina deja pasar más radiación. Cada capa extra ayuda a proteger al equipo.",

  "ev.treino.title": "¿Hora del simulacro de emergencia?",
  "ev.treino.body":
    "Hace tiempo que el equipo no practica qué hacer en una emergencia. ¿Practicar ahora o trabajar?",
  "ev.treino.treinar.label": "Practicar hoy",
  "ev.treino.treinar.outcome":
    "¡El equipo sabe de memoria qué hacer! Pero el simulacro gastó energía y tiempo de investigación.",
  "ev.treino.treinar.lesson":
    "Los astronautas de la Estación Espacial practican muchas veces qué hacer si hay fuego o una fuga de aire.",
  "ev.treino.adiar.label": "Trabajar y practicar otro día",
  "ev.treino.adiar.outcome": "Hicieron más ciencia hoy. Pero el equipo no está entrenado...",
  "ev.treino.adiar.lesson":
    "En el espacio no hay bomberos cerca. Los propios astronautas hacen el rescate, por eso tienen que practicar.",
  "ev.alarme_teste.title": "¡Sonó la alarma!",
  "ev.alarme_teste.body":
    "La Tierra hizo una prueba sorpresa de emergencia. Sin práctica, el equipo se confundió y se cansó.",

  // 📡 antena
  "ev.aniversario.title": "¡Cumpleaños en la base!",
  "ev.aniversario.body":
    "¡Hoy es el cumpleaños de un astronauta! Su familia le mandó un mensaje en video desde la Tierra.",
  "ev.aniversario.festa.label": "Hacer una fiestita",
  "ev.aniversario.festa.outcome":
    "Hubo pastel y todos vieron el video juntos. El equipo está feliz, pero la fiesta gastó comida.",
  "ev.aniversario.festa.lesson":
    "Estar lejos de casa es uno de los grandes desafíos de ir a Marte. La NASA estudia cómo mantener a los astronautas felices y unidos.",
  "ev.aniversario.depois.label": "Ver el video después del trabajo",
  "ev.aniversario.depois.outcome":
    "La investigación avanzó, pero el cumpleañero estuvo triste todo el día.",
  "ev.aniversario.depois.lesson":
    "Un mensaje tarda de 4 a 24 minutos en ir de Marte a la Tierra. Por eso la familia manda un video grabado: no se puede hablar en vivo.",

  "ev.escola.title": "¡Llamó una escuela de la Tierra!",
  "ev.escola.body": "¡Niños de una escuela en la Tierra quieren saber cómo es vivir en Marte!",
  "ev.escola.video.label": "Grabar un video para los niños",
  "ev.escola.video.outcome":
    "¡A los niños les encantó! El equipo está feliz, pero la antena gastó energía.",
  "ev.escola.video.lesson":
    "Los astronautas de la Estación Espacial hablan con escuelas por radio. ¡Más de mil escuelas ya les hicieron preguntas!",
  "ev.escola.dados.label": "Mandar solo los datos de la misión",
  "ev.escola.dados.outcome":
    "Los científicos recibieron datos nuevos, pero el equipo no tuvo pausa y se cansó.",
  "ev.escola.dados.lesson":
    "Los científicos en la Tierra estudian los datos que mandan las misiones. Así descubrimos cosas nuevas sobre Marte.",

  "ev.antena_torta.title": "¡La antena se torció!",
  "ev.antena_torta.body":
    "El viento empujó la antena. Ahora no apunta a la Tierra y los mensajes no llegan.",
  "ev.antena_torta.astronauta.label": "Un astronauta sale a arreglarla",
  "ev.antena_torta.astronauta.outcome":
    "¡La antena volvió a su lugar! Pero la salida gastó el aire del traje y cansó.",
  "ev.antena_torta.astronauta.lesson":
    "La antena tiene que apuntar directo a la Tierra. Allí, la NASA tiene antenas gigantes en tres lugares del mundo para escuchar a las naves.",
  "ev.antena_torta.robo.label": "Mandar al robot a arreglarla",
  "ev.antena_torta.robo.outcome":
    "El robot arregló la antena sin que nadie saliera, pero gastó mucha energía.",
  "ev.antena_torta.robo.lesson":
    "Los robots trabajan afuera sin gastar el aire de nadie. Por eso la NASA mandó robots a Marte antes que personas.",

  // 🛏️ cama
  "ev.sem_sono.title": "Una astronauta no puede dormir",
  "ev.sem_sono.body":
    "En Marte, el día dura unos 40 minutos más que en la Tierra. El cuerpo de una astronauta todavía no se acostumbró.",
  "ev.sem_sono.descansar.label": "Dejarla descansar hoy",
  "ev.sem_sono.descansar.outcome":
    "¡Se despertó con más ánimo! Hoy el laboratorio solo da la mitad de ciencia.",
  "ev.sem_sono.descansar.lesson":
    "Un sol, el día de Marte, dura 24 horas y 39 minutos. ¡Equipos de la NASA que manejan robots en Marte ya vivieron con ese horario!",
  "ev.sem_sono.luzes.label": "Usar luces para ajustar el sueño",
  "ev.sem_sono.luzes.outcome":
    "Las luces ayudaron a su cuerpo a acostumbrarse poco a poco. Pero gastaron energía.",
  "ev.sem_sono.luzes.lesson":
    "La luz ayuda al cuerpo a saber si es de día o de noche. Los equipos que vivieron con el horario de Marte usaban cortinas oscuras para dormir.",

  "ev.saudade.title": "Extrañar la casa",
  "ev.saudade.body": "Un astronauta extraña a su familia. No logra concentrarse en el trabajo.",
  "ev.saudade.folga.label": "Día libre con comida especial",
  "ev.saudade.folga.outcome":
    "Descansó y comió su comida favorita. Está mucho mejor, pero gastó comida.",
  "ev.saudade.folga.lesson":
    "Para la NASA, estar aislado y lejos de casa es uno de los grandes riesgos de ir a Marte. Cuidar la mente es tan importante como cuidar el cuerpo.",
  "ev.saudade.plantas.label": "Cuidar las plantas con un amigo",
  "ev.saudade.plantas.outcome":
    "¡Cuidar el invernadero juntos ayudó! Pero la luz extra gastó energía.",
  "ev.saudade.plantas.lesson":
    "La NASA está estudiando si cuidar plantas ayuda a los astronautas a sentirse mejor en el espacio. ¡A muchos les gusta!",

  // 🚙 rover
  "ev.pneu.title": "¡Agujero en la rueda del rover!",
  "ev.pneu.body": "El rover pasó por piedras puntiagudas y una rueda quedó con un agujero.",
  "ev.pneu.devagar.label": "Volver despacio por arena blanda",
  "ev.pneu.devagar.outcome": "La rueda no empeoró, pero el paseo fue corto y dio menos ciencia.",
  "ev.pneu.devagar.lesson":
    "Las ruedas del robot Curiosity se agujerearon con piedras puntiagudas. Desde entonces, el equipo elige caminos más suaves.",
  "ev.pneu.seguir.label": "Seguir por las piedras",
  "ev.pneu.seguir.outcome":
    "¡Llegaron más lejos y encontraron cosas nuevas! Pero la rueda empeoró.",
  "ev.pneu.seguir.lesson":
    "En Marte no hay taller: cada rueda tiene que durar toda la misión. Por eso cada camino se planea con cuidado.",
  "ev.roda_conserto.title": "Hora de arreglar la rueda",
  "ev.roda_conserto.body": "La rueda empeoró y el rover necesitó un arreglo. Eso gastó energía.",

  "ev.dunas.title": "Un sendero entre las dunas",
  "ev.dunas.body":
    "El rover encontró un camino nuevo entre las dunas, que son montañas de arena. ¿Adónde llevará?",
  "ev.dunas.entrar.label": "Entrar al sendero ahora",
  "ev.dunas.entrar.outcome": "¡Lugares nuevos y mucha ciencia! Pero la arena parecía blanda...",
  "ev.dunas.entrar.lesson":
    "En 2009, el robot Spirit se hundió en arena blanda escondida bajo una costrita dura. Nunca más salió de ahí.",
  "ev.dunas.estudar.label": "Estudiar el camino antes",
  "ev.dunas.estudar.outcome": "Encontraron un camino seguro. Fue más lento y gastó energía.",
  "ev.dunas.estudar.lesson":
    "Antes de mover un robot, los equipos estudian fotos del suelo. Un paso equivocado puede dejar atrapado al robot.",
  "ev.rover_atolou.title": "¡El rover se atascó!",
  "ev.rover_atolou.body": "La arena era blanda y el rover se hundió. Sacarlo gastó mucha energía.",

  "ev.fossil.title": "¡¿Eso es un fósil?!",
  "ev.fossil.body":
    "El rover encontró una piedra con un dibujo raro. Parece un fósil, un ser vivo antiguo que se volvió piedra. ¿Será?",
  "ev.fossil.analisar.label": "Llevarla al laboratorio",
  "ev.fossil.analisar.outcome":
    "La piedra fue al laboratorio. ¡El resultado sale pronto! Llevarla gastó energía.",
  "ev.fossil.analisar.lesson":
    "Los científicos no creen solo en lo que parece: lo prueban. Hasta hoy, nadie encontró un fósil en Marte.",
  "ev.fossil.foto.label": "Sacar fotos y seguir",
  "ev.fossil.foto.outcome": "Las fotos quedaron geniales, pero quizás nunca sepan qué era.",
  "ev.fossil.foto.lesson":
    "El robot Perseverance guarda piedras en tubitos. La idea es que un día se estudien en laboratorios de la Tierra.",
  "ev.fossil_resultado.title": "Era solo una roca... ¡pero es ciencia!",
  "ev.fossil_resultado.body":
    "No era un fósil, era una roca común. Pero descubrir eso también es ciencia: ¡ahora sabemos más sobre las rocas de Marte!",

  // ================================================================ eventos por lugar (lote 2)
  // ☀️ paneles
  "ev.geada.title": "¡Hielo en los paneles!",
  "ev.geada.body": "La noche fue tan fría que una capa finita de hielo cubrió los paneles solares.",
  "ev.geada.esperar.label": "Esperar que el Sol lo derrita",
  "ev.geada.esperar.outcome":
    "El hielo se derritió solo, pero los paneles dieron menos energía en la mañana.",
  "ev.geada.esperar.lesson":
    "En 1979, la sonda Viking 2 fotografió una capa finita de hielo en el suelo de Marte.",
  "ev.geada.raspar.label": "Salir a raspar el hielo",
  "ev.geada.raspar.outcome":
    "¡Paneles limpios en un momento! Pero la salida gastó el aire del traje.",
  "ev.geada.raspar.lesson":
    "Afuera, todo trabajo gasta el aire del traje. A veces esperar es más seguro que salir.",

  "ev.eclipse_fobos.title": "¡Una luna pasó delante del Sol!",
  "ev.eclipse_fobos.body":
    "Fobos, una de las dos lunas de Marte, va a pasar delante del Sol. Por un momento, los paneles recibirán menos luz.",
  "ev.eclipse_fobos.filmar.label": "Filmar el eclipse",
  "ev.eclipse_fobos.filmar.outcome":
    "¡Qué video increíble! La cámara y el telescopio gastaron energía.",
  "ev.eclipse_fobos.filmar.lesson":
    "En 2022, el robot Perseverance filmó a Fobos pasando delante del Sol. ¡El eclipse duró unos 40 segundos!",
  "ev.eclipse_fobos.guardar.label": "Guardar energía en la batería",
  "ev.eclipse_fobos.guardar.outcome":
    "La batería quedó más llena, pero el laboratorio se quedó sin energía y hoy rinde solo la mitad.",
  "ev.eclipse_fobos.guardar.lesson":
    "Marte tiene dos lunas pequeñas, Fobos y Deimos. Cuando Fobos pasa delante del Sol, llega menos luz por un momento.",

  "ev.truque_areia.title": "Paneles con polvo",
  "ev.truque_areia.body":
    "Los paneles tienen polvo y dan menos energía. El viento de la tarde puede ayudar... o alguien puede salir a limpiar.",
  "ev.truque_areia.areia.label": "Soltar arena al viento",
  "ev.truque_areia.areia.outcome":
    "El robot soltó arena cerca de los paneles. ¡El viento se llevó la arena, y ella arrastró un poco de polvo!",
  "ev.truque_areia.areia.lesson":
    "En 2021, la sonda InSight usó este truco: soltó arena al viento cerca de sus paneles, y la arena se llevó parte del polvo.",
  "ev.truque_areia.escovar.label": "Salir a cepillar los paneles",
  "ev.truque_areia.escovar.outcome":
    "¡Los paneles quedaron muy limpios! Pero la salida gastó el aire del traje.",
  "ev.truque_areia.escovar.lesson":
    "Cepillar limpia más que el viento, pero cada salida gasta aire y cansa al equipo.",

  // 💨 fábrica de aire
  "ev.filtro_co2.title": "El filtro de dióxido de carbono se llenó",
  "ev.filtro_co2.body":
    "Cuando respiramos, soltamos dióxido de carbono. El filtro que saca ese gas del aire de la base está lleno.",
  "ev.filtro_co2.reserva.label": "Cambiarlo por el de repuesto",
  "ev.filtro_co2.reserva.outcome": "¡Filtro nuevo en su lugar! Pero ya no queda ningún repuesto.",
  "ev.filtro_co2.reserva.lesson":
    "En la Estación Espacial, unas máquinas sacan el dióxido de carbono del aire, porque mucho de él hace mal al cuerpo.",
  "ev.filtro_co2.improvisar.label": "Improvisar un filtro",
  "ev.filtro_co2.improvisar.outcome":
    "El filtro hecho con cinta y piezas viejas funcionó, pero no tan bien. El aire empeoró un poco.",
  "ev.filtro_co2.improvisar.lesson":
    "En 1970, la nave Apolo 13 tuvo un problema y los astronautas armaron un filtro con cinta adhesiva y otras piezas. ¡Funcionó!",

  "ev.eletrolise.title": "¿Hacer aire con agua?",
  "ev.eletrolise.body":
    "La máquina de aire puede separar el agua en oxígeno y otro gas, usando electricidad. Pero esa agua también riega las plantas.",
  "ev.eletrolise.fazer_ar.label": "Usar agua para hacer aire",
  "ev.eletrolise.fazer_ar.outcome":
    "¡Más oxígeno para todos! Pero el invernadero recibió menos agua.",
  "ev.eletrolise.fazer_ar.lesson":
    "En la Estación Espacial, una máquina separa el agua con electricidad y hace oxígeno para que la tripulación respire.",
  "ev.eletrolise.guardar_agua.label": "Guardar el agua para las plantas",
  "ev.eletrolise.guardar_agua.outcome":
    "Las plantas tomaron agua y crecieron. Pero la fábrica hizo menos aire hoy.",
  "ev.eletrolise.guardar_agua.lesson":
    "En una base, la misma agua sirve para beber, cultivar y hasta hacer aire. Por eso se usa muchas veces.",

  "ev.poeira_dentro.title": "¡Entró polvo a la base!",
  "ev.poeira_dentro.body":
    "El polvo se pegó a los trajes y entró con el equipo. Ahora hay polvo rojo en todo el piso.",
  "ev.poeira_dentro.aspirar.label": "Aspirar todo ahora",
  "ev.poeira_dentro.aspirar.outcome": "¡La base quedó limpita! La aspiradora gastó energía.",
  "ev.poeira_dentro.aspirar.lesson":
    "Los astronautas del Apolo contaron que el polvo de la Luna se pegaba a todo y olía a pólvora.",
  "ev.poeira_dentro.depois.label": "Limpiar otro día",
  "ev.poeira_dentro.depois.outcome":
    "No se gastó energía, pero el polvo hizo toser y estornudar al equipo.",
  "ev.poeira_dentro.depois.lesson":
    "El polvo de Marte es muy fino y tiene sales que hacen mal al cuerpo. No puede quedarse dentro de casa.",

  // 🌱 invernadero
  "ev.luz_rosa.title": "¿Qué luz usar en las plantas?",
  "ev.luz_rosa.body":
    "Las lámparas del invernadero pueden ser rojas y azules, que dejan todo rosado, o blancas, como la luz del día.",
  "ev.luz_rosa.rosa.label": "Luz roja y azul",
  "ev.luz_rosa.rosa.outcome":
    "El invernadero quedó rosado y las plantas crecieron bien, gastando poca energía.",
  "ev.luz_rosa.rosa.lesson":
    "En la Estación Espacial, las plantas crecen con luces rojas y azules. ¡Juntas, dejan el invernadero rosado!",
  "ev.luz_rosa.branca.label": "Luz blanca, como la del día",
  "ev.luz_rosa.branca.outcome":
    "Las plantas crecieron y al equipo le gustó ver todo verde. Pero la luz blanca gastó más energía.",
  "ev.luz_rosa.branca.lesson":
    "Con luz blanca, las plantas muestran su color real. Así es más fácil ver si alguna está enferma.",

  "ev.pimentas.title": "¡Crecieron los chiles!",
  "ev.pimentas.body":
    "Las plantas están llenas de chiles verdes. Si esperas más, se ponen rojos y más grandes.",
  "ev.pimentas.verdes.label": "Cosecharlos verdes ahora",
  "ev.pimentas.verdes.outcome": "¡Hoy hay comida nueva y picante! Cosechar dio un poco de trabajo.",
  "ev.pimentas.verdes.lesson":
    "¡En 2021, unos astronautas cosecharon chiles en la Estación Espacial e hicieron tacos!",
  "ev.pimentas.vermelhas.label": "Esperar que se pongan rojos",
  "ev.pimentas.vermelhas.outcome":
    "Los chiles siguen creciendo. ¡En unos soles, la cosecha será grande!",
  "ev.pimentas.vermelhas.lesson":
    "El experimento de los chiles en la Estación Espacial duró más de 4 meses. Las plantas grandes tardan en dar frutos.",
  "ev.pimentas_vermelhas.title": "¡Chiles rojos!",
  "ev.pimentas_vermelhas.body":
    "La espera valió la pena: los chiles se pusieron rojos y dieron mucha comida.",

  "ev.adubo.title": "¿Qué hacer con los restos?",
  "ev.adubo.body":
    "Sobraron cáscaras y hojas de la cocina. Pueden ser basura... o abono para el invernadero.",
  "ev.adubo.compostar.label": "Hacer abono",
  "ev.adubo.compostar.outcome":
    "Los restos se van a volver abono. ¡En unos soles, las plantas crecerán más!",
  "ev.adubo.compostar.lesson":
    "La Agencia Espacial Europea estudia un sistema que recicla restos para producir comida y aire en viajes largos.",
  "ev.adubo.jogar_fora.label": "Tirarlos a la basura",
  "ev.adubo.jogar_fora.outcome":
    "La cocina quedó con más espacio, pero la basura olió mal y mareó al equipo.",
  "ev.adubo.jogar_fora.lesson":
    "En una base en Marte no hay camión de basura. Todo lo que se tira sigue ahí adentro.",
  "ev.adubo_pronto.title": "¡El abono está listo!",
  "ev.adubo_pronto.body":
    "Los restos se volvieron abono, y las plantas del invernadero dieron más comida.",

  // 🔬 laboratorio
  "ev.meteorito.title": "¡Cayó una piedra del cielo!",
  "ev.meteorito.body":
    "El robot encontró una piedra oscura y brillante cerca de la base. ¡Parece un meteorito, una piedra que vino del espacio!",
  "ev.meteorito.analisar.label": "Analizarla en el laboratorio",
  "ev.meteorito.analisar.outcome":
    "¡Era de verdad un meteorito de hierro! El análisis gastó energía.",
  "ev.meteorito.analisar.lesson":
    "En 2005, el robot Opportunity encontró un meteorito en Marte. Fue el primer meteorito hallado en otro planeta.",
  "ev.meteorito.foto.label": "Fotografiarla y mandarla a la Tierra",
  "ev.meteorito.foto.outcome":
    "A los científicos en la Tierra les encantaron las fotos, pero sin análisis la investigación rindió menos.",
  "ev.meteorito.foto.lesson":
    "Las piedras de Marte también caen en la Tierra como meteoritos. Los científicos estudian algunas desde hace muchos años.",

  "ev.tubo_amostra.title": "¡El tubo de muestra volvió vacío!",
  "ev.tubo_amostra.body":
    "El equipo perforó una roca para guardar un pedazo en un tubo. ¡Pero el tubo volvió sin nada adentro!",
  "ev.tubo_amostra.cuidado.label": "Averiguar qué pasó e intentar de nuevo",
  "ev.tubo_amostra.cuidado.outcome":
    "La roca era blanda y se hizo polvo. ¡La segunda vez funcionó! Gastó energía.",
  "ev.tubo_amostra.cuidado.lesson":
    "En 2021, el primer tubo de muestra del robot Perseverance volvió vacío: la roca se hizo polvo. El equipo estudió qué pasó antes de intentar de nuevo.",
  "ev.tubo_amostra.rapido.label": "Intentar de nuevo muy rápido",
  "ev.tubo_amostra.rapido.outcome":
    "¡Tomaron una muestra enseguida! Pero nadie revisó si estaba bien...",
  "ev.tubo_amostra.rapido.lesson":
    "En la ciencia, el apuro puede arruinar el trabajo. Revisar antes evita perder muestras.",
  "ev.amostra_vazia.title": "La muestra se arruinó",
  "ev.amostra_vazia.body":
    "La muestra tomada con apuro estaba llena de polvo y no sirvió. Se perdió parte de la investigación.",

  "ev.nuvens.title": "¡Nubes brillando en el cielo!",
  "ev.nuvens.body":
    "Después de la puesta del sol, unas nubes muy altas siguen brillando con colores del arcoíris.",
  "ev.nuvens.noite.label": "Quedarse despierto fotografiando",
  "ev.nuvens.noite.outcome":
    "¡Fotos lindas para la ciencia! Pero el equipo se durmió tarde y quedó cansado.",
  "ev.nuvens.noite.lesson":
    "En 2021, el robot Curiosity fotografió nubes brillando después de la puesta del sol. Eran de hielo seco.",
  "ev.nuvens.uma_foto.label": "Sacar una sola foto y dormir",
  "ev.nuvens.uma_foto.outcome":
    "Una foto bonita y todos descansados. La cámara gastó un poco de energía.",
  "ev.nuvens.uma_foto.lesson":
    "Marte también tiene nubes, como la Tierra. La mayoría son de hielo de agua.",

  // 🛡️ refugio
  "ev.tijolos.title": "Ladrillos de arena de Marte",
  "ev.tijolos.body":
    "Se puede proteger más la base con una capa nueva: ladrillos impresos o sacos de arena.",
  "ev.tijolos.imprimir.label": "Imprimir ladrillos",
  "ev.tijolos.imprimir.outcome":
    "¡La impresora 3D hizo ladrillos de arena! La base está más protegida. Gastó energía.",
  "ev.tijolos.imprimir.lesson":
    "La NASA hizo un concurso de casas impresas en 3D con materiales de Marte, para proteger a futuras tripulaciones.",
  "ev.tijolos.sacos.label": "Llenar sacos de arena afuera",
  "ev.tijolos.sacos.outcome":
    "Los sacos quedaron sobre la base. ¡Más protección! Pero el trabajo afuera gastó aire y cansó.",
  "ev.tijolos.sacos.lesson":
    "Usar la arena del propio lugar es una idea que se estudia para Marte: así no hay que llevar todo desde la Tierra.",

  "ev.tremor.title": "¡La base tembló!",
  "ev.tremor.body":
    "Todo se movió un poquito. ¡Fue un temblor en Marte! Parece que nada se rompió... ¿o sí?",
  "ev.tremor.conferir.label": "Revisar toda la base",
  "ev.tremor.conferir.outcome":
    "Encontraron un tornillo flojo y lo arreglaron. La revisión gastó energía.",
  "ev.tremor.conferir.lesson":
    "La sonda InSight sintió más de mil temblores en Marte. El más grande fue en 2022.",
  "ev.tremor.seguir.label": "Seguir trabajando",
  "ev.tremor.seguir.outcome": "Hicieron más ciencia. Pero nadie revisó si algo se aflojó...",
  "ev.tremor.seguir.lesson":
    "Después de un temblor, revisar la casa evita sorpresas. Un daño pequeño crece si nadie lo ve.",
  "ev.tremor_estrago.title": "¡Se cayó un estante!",
  "ev.tremor_estrago.body":
    "El temblor de ayer aflojó un estante. Ordenar todo gastó energía y cansó al equipo.",

  // 📡 antena
  "ev.conjuncao.title": "El Sol está en medio del camino",
  "ev.conjuncao.body":
    "Pronto el Sol quedará entre Marte y la Tierra. Los mensajes no pasarán por unos días.",
  "ev.conjuncao.mandar_tudo.label": "Mandar todos los datos antes",
  "ev.conjuncao.mandar_tudo.outcome":
    "¡Todos los datos llegaron a la Tierra a tiempo! La antena gastó energía.",
  "ev.conjuncao.mandar_tudo.lesson":
    "Más o menos cada 2 años, el Sol queda entre la Tierra y Marte. La NASA deja de mandar órdenes a sus robots por unas dos semanas.",
  "ev.conjuncao.silencio.label": "Apagar la antena y ahorrar",
  "ev.conjuncao.silencio.outcome":
    "La batería guardó energía, pero el equipo se sintió solo sin noticias de la Tierra.",
  "ev.conjuncao.silencio.lesson":
    "Sin hablar con la Tierra, la tripulación tiene que resolver todo sola. Eso necesita preparación.",

  "ev.satelite.title": "¡Está pasando un satélite!",
  "ev.satelite.body":
    "Un satélite que da vueltas a Marte va a pasar sobre la base. Puede llevar los datos a la Tierra.",
  "ev.satelite.satelite.label": "Mandar los datos por el satélite",
  "ev.satelite.satelite.outcome": "¡Los datos se fueron rapidito y gastaron poca energía!",
  "ev.satelite.satelite.lesson":
    "Los robots en Marte mandan la mayoría de sus fotos por satélites que dan vueltas al planeta.",
  "ev.satelite.direto.label": "Mandarlos directo con la antena grande",
  "ev.satelite.direto.outcome":
    "Llegaron más datos a la Tierra, pero la antena grande gastó mucha energía.",
  "ev.satelite.direto.lesson":
    "Una antena grande puede hablar directo con la Tierra, pero gasta mucha más energía.",

  "ev.musica.title": "¡Música para despertar!",
  "ev.musica.body": "La Tierra mandó una canción alegre para despertar al equipo hoy.",
  "ev.musica.tocar.label": "Ponerla bien fuerte",
  "ev.musica.tocar.outcome": "¡Todos despertaron bailando! El sonido gastó un poquito de energía.",
  "ev.musica.tocar.lesson":
    "En la época de los transbordadores espaciales, el Control de Misión despertaba a los astronautas con una canción distinta cada día.",
  "ev.musica.dormir_mais.label": "Dejar que el equipo duerma más",
  "ev.musica.dormir_mais.outcome":
    "El equipo descansó más, pero el laboratorio empezó tarde y hoy rinde solo la mitad.",
  "ev.musica.dormir_mais.lesson":
    "Un poco más de sueño ayuda al cuerpo, pero atrasa el trabajo del día.",

  // 🛏️ casa
  "ev.cardapio.title": "Comida aburrida",
  "ev.cardapio.body":
    "El equipo está cansado de comer siempre lo mismo. La comida parece no tener sabor.",
  "ev.cardapio.tempero.label": "Cocinar algo nuevo con especias",
  "ev.cardapio.tempero.outcome":
    "¡Qué cena tan rica! Todos quedaron felices, pero se gastó más comida.",
  "ev.cardapio.tempero.lesson":
    "En el espacio, la comida puede parecer sin sabor. Por eso a muchos astronautas les gusta la salsa picante.",
  "ev.cardapio.de_sempre.label": "Comer lo de siempre",
  "ev.cardapio.de_sempre.outcome":
    "La comida duró más, pero el equipo comió poco y quedó desanimado.",
  "ev.cardapio.de_sempre.lesson":
    "Comer siempre lo mismo cansa. La NASA estudia cómo mantener la comida rica en viajes largos.",

  "ev.diario.title": "La hora del diario",
  "ev.diario.body":
    "Una astronauta quiere parar un poco para escribir en su diario cómo fue la semana.",
  "ev.diario.escrever.label": "Parar para escribir",
  "ev.diario.escrever.outcome":
    "¡Se sintió mucho mejor! Pero dejó de trabajar, y el laboratorio hoy rinde solo la mitad.",
  "ev.diario.escrever.lesson":
    "Astronautas de la Estación Espacial escribieron diarios para una investigación de la NASA sobre cómo es vivir aislado.",
  "ev.diario.trabalhar.label": "Seguir trabajando",
  "ev.diario.trabalhar.outcome":
    "La investigación avanzó, pero la astronauta quedó cansada y preocupada.",
  "ev.diario.trabalhar.lesson":
    "Trabajar sin parar parece bueno, pero el cansancio aparece después. Las pausas también son parte del trabajo.",

  "ev.resfriado.title": "¡Achís!",
  "ev.resfriado.body": "Un astronauta se despertó estornudando. ¡Parece un resfriado!",
  "ev.resfriado.isolar.label": "Descansar lejos de los demás",
  "ev.resfriado.isolar.outcome":
    "Se mejoró y nadie más se contagió. Pero faltó alguien en el trabajo, y el laboratorio hoy rinde solo la mitad.",
  "ev.resfriado.isolar.lesson":
    "Antes de ir al espacio, los astronautas pasan unos días en cuarentena, lejos de otras personas, para no llevar enfermedades.",
  "ev.resfriado.seguir.label": "Trabajar igual",
  "ev.resfriado.seguir.outcome": "La investigación avanzó, pero el resfriado pasó a más gente.",
  "ev.resfriado.seguir.lesson":
    "En una base pequeña, una enfermedad pasa fácil de una persona a otra.",

  // 🚙 rover
  "ev.noite_gelada.title": "¡Noche helada!",
  "ev.noite_gelada.body":
    "Esta noche va a hacer mucho frío. El frío puede debilitar la batería del rover.",
  "ev.noite_gelada.aquecer.label": "Encender la calefacción del rover",
  "ev.noite_gelada.aquecer.outcome":
    "El rover pasó la noche calentito. La calefacción gastó energía.",
  "ev.noite_gelada.aquecer.lesson":
    "Las noches en Marte son muy heladas. Los robots usan calefactores para proteger sus piezas y baterías.",
  "ev.noite_gelada.deixar.label": "Dejar el rover en el frío",
  "ev.noite_gelada.deixar.outcome": "Ahorraron energía hoy. ¿Aguantará la batería?",
  "ev.noite_gelada.deixar.lesson":
    "El frío debilita las baterías. En la Tierra también: el celular se descarga más rápido con frío.",
  "ev.rover_frio.title": "La batería del rover se congeló",
  "ev.rover_frio.body":
    "El frío debilitó la batería del rover. Calentarla y recargarla gastó energía.",

  "ev.drone.title": "¿Mandar el dron adelante?",
  "ev.drone.body":
    "El rover va a explorar un lugar nuevo. Un dron pequeño puede volar antes y mostrar el camino.",
  "ev.drone.voar.label": "Volar el dron antes",
  "ev.drone.voar.outcome":
    "¡El dron encontró el mejor camino y fotos nuevas! El vuelo gastó energía.",
  "ev.drone.voar.lesson":
    "El helicóptero Ingenuity voló 72 veces en Marte, de 2021 a 2024. ¡Lo hicieron para volar solo 5 veces!",
  "ev.drone.sem_olhar.label": "Ir en rover sin mirar",
  "ev.drone.sem_olhar.outcome":
    "El rover llegó más rápido y encontró piedras nuevas. Pero el camino era desconocido...",
  "ev.drone.sem_olhar.lesson":
    "Sin mirar el camino antes, el rover puede caer en arena blanda y quedar atrapado.",
  "ev.briga.title": "Discusión en el Refugio",
  "ev.briga.body": "Dos tripulantes discutieron por el orden del Refugio. El ambiente se puso feo.",
  "ev.briga.conversar.label": "Parar y hablar juntos",
  "ev.briga.conversar.outcome": "Hicieron las paces y se repartieron las tareas. La charla quitó tiempo a la investigación.",
  "ev.briga.conversar.lesson": "La NASA estudia equipos que pasan meses aislados, como en el proyecto HERA, para aprender a convivir bien.",
  "ev.briga.separar.label": "Hoy cada uno trabaja solo",
  "ev.briga.separar.outcome": "Cada uno hizo su parte de la investigación, pero nadie quedó contento.",
  "ev.briga.separar.lesson": "Una pelea sin hablar deja a todos tristes y cansados. En una base pequeña, el equipo necesita llevarse bien.",
  "ev.dor_cabeca.title": "Dolor de cabeza",
  "ev.dor_cabeca.body": "Un compañero se despertó con dolor de cabeza. El aire del Refugio está cargado.",
  "ev.dor_cabeca.ventilar.label": "Encender la ventilación fuerte",
  "ev.dor_cabeca.ventilar.outcome": "El aire quedó fresco y el dolor se fue. Los ventiladores gastaron energía.",
  "ev.dor_cabeca.ventilar.lesson": "En la Estación Espacial, el aire con mucho dióxido de carbono (el gas que soltamos al respirar) puede dar dolor de cabeza. Ventilar ayuda.",
  "ev.dor_cabeca.seguir.label": "Tomar agua y seguir",
  "ev.dor_cabeca.seguir.outcome": "Volvió al trabajo y ayudó con la investigación. Pero el dolor no se fue del todo...",
  "ev.dor_cabeca.seguir.lesson": "Un síntoma pequeño puede empeorar. Los astronautas avisan enseguida al médico, que sigue su salud desde la Tierra.",
  "ev.dor_cabeca_piora.title": "El dolor de cabeza empeoró",
  "ev.dor_cabeca_piora.body": "¿Recuerdas el dolor de cabeza? Volvió más fuerte y el compañero tuvo que descansar todo el día.",
  "ev.esteira.title": "Hora de la cinta de correr",
  "ev.esteira.body": "Ayer el equipo no hizo ejercicio. La cinta de correr del Refugio está esperando.",
  "ev.esteira.correr.label": "Correr en la cinta",
  "ev.esteira.correr.outcome": "Todos corrieron y se pusieron más fuertes. Después les dio hambre y comieron más.",
  "ev.esteira.correr.lesson": "En Marte la gravedad (la fuerza que tira hacia el suelo) es solo un tercio de la de la Tierra. Sin ejercicio, huesos y músculos se debilitan.",
  "ev.esteira.pular.label": "Saltarse el ejercicio otra vez",
  "ev.esteira.pular.outcome": "Hubo más tiempo para investigar, pero el equipo quedó flojo y cansado.",
  "ev.esteira.pular.lesson": "En la Estación Espacial, los astronautas hacen ejercicio unas 2 horas al día para mantener los huesos fuertes.",
  "ev.janela.title": "Grieta en la ventana",
  "ev.janela.body": "Una piedrita llevada por el viento rajó el vidrio de afuera de la ventana del Refugio.",
  "ev.janela.trocar.label": "Cambiar el vidrio ahora",
  "ev.janela.trocar.outcome": "¡Vidrio nuevo en su lugar! El arreglo llevó horas y gastó energía.",
  "ev.janela.trocar.lesson": "Las ventanas de las naves tienen varias capas de vidrio. Si una se raja, las otras sujetan el aire hasta cambiarla.",
  "ev.janela.fita.label": "Tapar con cinta especial",
  "ev.janela.fita.outcome": "La cinta aguantó casi todo, pero se escapó un poquito de aire.",
  "ev.janela.fita.lesson": "Una fuga pequeña deja escapar el aire despacio. En la Estación Espacial, el equipo pasó días buscando una fuga diminuta.",
  "ev.barulho.title": "Ruido a la hora de dormir",
  "ev.barulho.body": "Un ventilador del Refugio empezó a chirriar. Anoche nadie durmió bien.",
  "ev.barulho.consertar.label": "Arreglar el ventilador",
  "ev.barulho.consertar.outcome": "¡Silencio! El ventilador quedó como nuevo, pero hacer la pieza gastó energía.",
  "ev.barulho.consertar.lesson": "La Estación Espacial es ruidosa por los ventiladores. Menos ruido ayuda al equipo a dormir y pensar mejor.",
  "ev.barulho.tampoes.label": "Dormir con tapones para los oídos",
  "ev.barulho.tampoes.outcome": "Ayudó, pero algunos se despertaron de noche por el chirrido.",
  "ev.barulho.tampoes.lesson": "Muchos astronautas duermen con tapones para los oídos. Dormir bien evita errores en el trabajo.",
};
