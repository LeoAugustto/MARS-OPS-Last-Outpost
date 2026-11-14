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
  "modulo.escudo": "Robot de arena",
  "nivel.cadete": "Cadete (fácil)",
  "nivel.piloto": "Piloto (medio)",
  "nivel.comandante": "Comandante (difícil)",

  "hud.sol": "Sol {sol} de {total}",
  "hud.distribuir": "Reparte la energía de hoy: {energia} ⚡",
  "hud.sobra": "La energía que sobre se guarda en la batería.",
  "hud.dormir": "Dormir y terminar el sol",
  "botao.ok": "¡OK!",
  "botao.porque": "¿Por qué?",
  "botao.voltar_sol": "Volver al sol {sol}",
  "botao.nova_missao": "Nueva misión",
  "selo.ao_vivo": "📡 Dato en vivo de la NASA",
  "selo.real": "📚 Evento real del {data}",

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

  "fim.vitoria.title": "¡Misión cumplida! 🎉",
  "fim.vitoria.body": "Tu tripulación está bien e hizo mucha ciencia. ¡La NASA está orgullosa!",
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
  "dica.ar": "Consejo: guarda al menos 3 ⚡ cada sol para la fábrica de aire.",
  "dica.comida": "Consejo: ¡planta pronto! Lo que plantas hoy se vuelve comida unos soles después.",
  "dica.saude":
    "Consejo: construye el escudo pronto y escóndete en el refugio cuando el Sol esté agitado.",
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

  "ev.colheita_boa.title": "¡Buena cosecha! 🥔",
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
  "ev.lab_contaminado.body": "Se escaparon algunas bacterias. Limpiar la mesa costó 2 de energía.",

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
};
