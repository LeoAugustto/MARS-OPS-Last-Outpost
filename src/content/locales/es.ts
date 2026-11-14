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

  "ev.sol_agitado.title": "¡Alerta: el Sol está agitado!",
  "ev.sol_agitado.body":
    "La Tierra avisó: el Sol lanzó una explosión fuerte (clase {classe}, fuerza {estrelas}). ¡Puede llegar mañana!",
  "ev.sol_agitado.abrigo.label": "Preparar el refugio",
  "ev.sol_agitado.abrigo.outcome": "El refugio está listo. Usó energía, pero están protegidos.",
  "ev.sol_agitado.abrigo.lesson":
    "En la Estación Espacial, cuando el Sol se agita, los astronautas van a la parte más protegida de la estación.",
  "ev.sol_agitado.pesquisar.label": "Seguir investigando",
  "ev.sol_agitado.pesquisar.outcome": "Hicieron más ciencia hoy... pero la tormenta ya viene.",
  "ev.sol_agitado.pesquisar.lesson":
    "La luz de la explosión llega en minutos, pero las partículas peligrosas pueden tardar horas o días. Ese tiempo sirve para protegerse.",

  "ev.tempestade_chega.title": "¡Llegó la tormenta solar!",
  "ev.tempestade_chega.body":
    "Partículas del Sol están pasando por Marte. Marte no tiene un escudo magnético fuerte como la Tierra.",
  "ev.tempestade_chega.ficar.label": "Quedarse en el refugio todo el día",
  "ev.tempestade_chega.ficar.outcome":
    "Estuvieron a salvo, pero la calefacción del refugio gastó energía.",
  "ev.tempestade_chega.ficar.lesson":
    "Protegerse cuesta: no se puede trabajar afuera y el refugio usa energía.",
  "ev.tempestade_chega.trabalhar.label": "Salir a trabajar de todos modos",
  "ev.tempestade_chega.trabalhar.outcome": "Hicieron ciencia, pero recibieron más radiación.",
  "ev.tempestade_chega.trabalhar.lesson":
    "La Tierra tiene un campo magnético que desvía las partículas del Sol. Marte casi no tiene, por eso allí hay más radiación.",

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
};
