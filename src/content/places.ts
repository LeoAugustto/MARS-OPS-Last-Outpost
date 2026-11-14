// Em que lugar da base cada evento aparece (mapa do docs/GAME_DESIGN.md). Dono: Bruno.
// O motor não usa isto; serve para a tela do jogo pôr o alerta ❗ no lugar certo do mapa.
// Evento sem lugar aqui (ex.: os do Sol/DONKI) fica a critério da tela (ex.: antena ou "urgente").

export type Place =
  "habitat" | "paineis" | "antena" | "ar" | "estufa" | "laboratorio" | "abrigo" | "rover";

export const EVENT_PLACE: Record<string, Place> = {
  // eventos que já existiam
  chegada: "habitat",
  poeira_vem: "paineis",
  painel_sujo: "paineis",
  vento_limpa: "paineis",
  broto: "estufa",
  colheita_boa: "estufa",
  colheita_fraca: "estufa",
  filtro_entupido: "ar",
  rocha: "rover",
  laboratorio: "laboratorio",
  exercicio: "habitat",
  contato_terra: "antena",
  resposta_terra: "antena",

  // ☀️ painéis
  redemoinho: "paineis",
  redemoinho_passou: "paineis",
  painel_rachado: "paineis",
  inverno: "paineis",
  // 💨 fábrica de ar
  vazamento: "ar",
  vazamento_volta: "ar",
  gerador_barulho: "ar",
  gerador_quebrou: "ar",
  agua_do_ar: "ar",
  // 🌱 estufa
  mofo: "estufa",
  rabanete: "estufa",
  rabanete_de_novo: "estufa",
  sementes_terra: "estufa",
  alface_pronta: "estufa",
  batata_pronta: "estufa",
  // 🔬 laboratório
  microscopio: "laboratorio",
  gelo: "laboratorio",
  bacterias: "laboratorio",
  lab_contaminado: "laboratorio",
  // 🛡️ abrigo
  rachadura: "abrigo",
  treino: "abrigo",
  alarme_teste: "abrigo",
  // 📡 antena
  aniversario: "antena",
  escola: "antena",
  antena_torta: "antena",
  // 🛏️ cama (dentro do habitat)
  sem_sono: "habitat",
  saudade: "habitat",
  // 🚙 rover
  pneu: "rover",
  roda_conserto: "rover",
  dunas: "rover",
  rover_atolou: "rover",
  fossil: "rover",
  fossil_resultado: "rover",
};
