export type Lang = "pt" | "en";

const pt = {
  appName: "MARS OPS: Última Base",
  tagline: "Mantenha sua base em Marte viva!",
  playNow: "Jogar agora",
  continueMission: "Continuar missão",
  dataSources: "De onde vêm os dados?",
  about: "Sobre o projeto",
  back: "Voltar",
  home: "Início",
  loading: "Carregando...",
  gameHere: "O jogo aparece aqui",
  sol: "Sol",
  sourcesTitle: "De onde vêm os dados?",
  sourcesIntro: "O jogo usa informações de verdade de cientistas espaciais. Veja de onde elas vêm:",
  visit: "Visitar",
  aboutTitle: "Sobre o projeto",
  aboutIntro:
    'MARS OPS: Última Base é um jogo para crianças de 7 a 12 anos, feito para o NASA Space Apps Challenge 2026 (desafio "Build a Junior Astronaut Mission Trainer").',
  aboutLearnTitle: "O que o jogo ensina",
  aboutLearn: [
    "Como dividir energia entre ar, comida, escudo e ciência.",
    "Que o Sol tem tempestades de verdade, e como os astronautas se protegem.",
    "Como plantar comida e cuidar da vida longe da Terra.",
    "A pensar antes de agir: cada sol (dia em Marte) traz uma escolha.",
  ],
  aboutTeamTitle: "Equipe",
  aboutTeam: "Nome da equipe (em breve)",
  aboutPrivacyTitle: "Sem conta, sem download",
  aboutPrivacy: "Não pedimos nenhum dado. O progresso fica guardado só neste aparelho.",
};

export type Dict = typeof pt;

const en: Dict = {
  appName: "MARS OPS: Last Outpost",
  tagline: "Keep your Mars base alive!",
  playNow: "Play now",
  continueMission: "Continue mission",
  dataSources: "Where does the data come from?",
  about: "About the project",
  back: "Back",
  home: "Home",
  loading: "Loading...",
  gameHere: "The game shows up here",
  sol: "Sol",
  sourcesTitle: "Where does the data come from?",
  sourcesIntro: "The game uses real information from space scientists. See where it comes from:",
  visit: "Visit",
  aboutTitle: "About the project",
  aboutIntro:
    'MARS OPS: Last Outpost is a game for kids aged 7 to 12, made for the NASA Space Apps Challenge 2026 (challenge "Build a Junior Astronaut Mission Trainer").',
  aboutLearnTitle: "What the game teaches",
  aboutLearn: [
    "How to split energy between air, food, shield and science.",
    "That the Sun has real storms, and how astronauts stay safe.",
    "How to grow food and care for life far from Earth.",
    "To think before acting: every sol (Mars day) brings a choice.",
  ],
  aboutTeamTitle: "Team",
  aboutTeam: "Team name (coming soon)",
  aboutPrivacyTitle: "No account, no download",
  aboutPrivacy: "We ask for no data. Progress is kept only on this device.",
};

export const dictionaries: Record<Lang, Dict> = { pt, en };
