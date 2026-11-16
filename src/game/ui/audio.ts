// Som do jogo: música, efeitos, ambiente e voz. Um gerenciador só, sem dependência.
// - Nada toca antes do primeiro toque da criança (regra dos navegadores).
// - Arquivo que não existe = silêncio, sem erro.
// - Volumes e liga/desliga ficam salvos no aparelho (localStorage, com try/catch).
// - Ao esconder a aba, tudo pausa; a voz para sempre que a tela muda (pararVoz).

export type Canal = "musica" | "efeitos" | "ambiente" | "voz";

export interface PrefsSom {
  ligado: boolean;
  musica: number;
  efeitos: number;
  ambiente: number;
  voz: number;
  /** "tic" das letrinhas quando o Rovi fala */
  letras: boolean;
}

const CHAVE = "marsops:som";
const PADRAO: PrefsSom = { ligado: true, musica: 0.1, efeitos: 0.8, ambiente: 0.7, voz: 0.9, letras: true };

function lerPrefs(): PrefsSom {
  try {
    const v = JSON.parse(localStorage.getItem(CHAVE) ?? "null") as Partial<PrefsSom> | null;
    return { ...PADRAO, ...(v ?? {}) };
  } catch {
    return { ...PADRAO };
  }
}

let prefs: PrefsSom = typeof window === "undefined" ? { ...PADRAO } : lerPrefs();
let liberado = false;
const ouvintes = new Set<() => void>();

const musica: { el: HTMLAudioElement | null; nome: string | null; loop: boolean } = { el: null, nome: null, loop: true };
const ambiente: { el: HTMLAudioElement | null; nome: string | null } = { el: null, nome: null };
let voz: HTMLAudioElement | null = null;
const cacheEfeitos = new Map<string, HTMLAudioElement>();

const ok = () => typeof window !== "undefined" && typeof Audio !== "undefined";
const vol = (c: Canal) => (prefs.ligado ? prefs[c] : 0);

function novo(src: string, loop: boolean, volume: number): HTMLAudioElement {
  const a = new Audio(src);
  a.loop = loop;
  a.volume = volume;
  a.preload = "auto";
  a.addEventListener("error", () => {}); // arquivo que falta: silêncio
  return a;
}

function tocar(a: HTMLAudioElement | null) {
  if (!a || !liberado || document.hidden) return;
  a.play().catch(() => {});
}

function aplicarVolumes() {
  if (musica.el) musica.el.volume = vol("musica");
  if (ambiente.el) ambiente.el.volume = vol("ambiente");
  if (voz) voz.volume = vol("voz");
  if (!prefs.ligado) pararVoz();
}

/** Primeiro toque/tecla da criança: libera o áudio e começa o que estava esperando. */
function liberar() {
  if (liberado) return;
  liberado = true;
  tocar(musica.el);
  tocar(ambiente.el);
}

if (ok()) {
  for (const ev of ["pointerdown", "keydown", "touchstart"]) window.addEventListener(ev, liberar, { once: false, passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      musica.el?.pause();
      ambiente.el?.pause();
      pararVoz();
    } else {
      if (musica.loop) tocar(musica.el);
      tocar(ambiente.el);
    }
  });
}

export function getPrefs(): PrefsSom {
  return prefs;
}

export function setPrefs(p: Partial<PrefsSom>) {
  prefs = { ...prefs, ...p };
  try {
    localStorage.setItem(CHAVE, JSON.stringify(prefs));
  } catch {
    /* sem armazenamento: vale só nesta visita */
  }
  aplicarVolumes();
  ouvintes.forEach((f) => f());
}

export function ouvirPrefs(f: () => void): () => void {
  ouvintes.add(f);
  return () => ouvintes.delete(f);
}

/** Música de fundo (arquivo em public/audio/musica). `null` para silêncio. Troca com fade curto. */
export function tocarMusica(nome: string | null, opts: { loop?: boolean } = {}) {
  if (!ok()) return;
  const loop = opts.loop ?? true;
  if (nome === musica.nome && musica.el) return;
  const velho = musica.el;
  if (velho) {
    const passo = velho.volume / 8;
    const t = setInterval(() => {
      velho.volume = Math.max(0, velho.volume - passo);
      if (velho.volume <= 0.01) {
        clearInterval(t);
        velho.pause();
      }
    }, 50);
  }
  musica.nome = nome;
  musica.loop = loop;
  musica.el = nome ? novo(`/audio/musica/${nome}.mp3`, loop, vol("musica")) : null;
  tocar(musica.el);
}

/** Som ambiente em loop (public/audio/ambiente). `null` para parar. */
export function tocarAmbiente(nome: string | null) {
  if (!ok() || nome === ambiente.nome) return;
  ambiente.el?.pause();
  ambiente.nome = nome;
  ambiente.el = nome ? novo(`/audio/ambiente/${nome}.mp3`, true, vol("ambiente")) : null;
  tocar(ambiente.el);
}

/** volume relativo de alguns efeitos (os do ElevenLabs vêm mais altos que os 8-bit) */
const GANHO: Record<string, number> = {
  porta_abre: 0.35,
  porta_fecha: 0.35,
  radio_chiado: 0.4,
  tempestade_chegando: 0.6,
  estacao_bipe: 0.5,
  // passos baixinhos para não cansar
  passo_terra_1: 0.4,
  passo_terra_2: 0.4,
  passo_piso_1: 0.6,
  passo_piso_2: 0.6,
};

/** Efeito curto (public/audio/sfx). Pode tocar vários ao mesmo tempo. */
export function tocarEfeito(nome: string, opts: { tom?: number } = {}) {
  if (!ok() || !liberado || !prefs.ligado || prefs.efeitos <= 0) return;
  let base = cacheEfeitos.get(nome);
  if (!base) {
    // efeitos 8-bit gerados são .wav; os do ElevenLabs/Suno são .mp3
    const b = novo(`/audio/sfx/${nome}.wav`, false, 1);
    b.addEventListener("error", () => {
      if (b.src.endsWith(".wav")) b.src = `/audio/sfx/${nome}.mp3`;
    });
    base = b;
    cacheEfeitos.set(nome, base);
  }
  const a = base.cloneNode(true) as HTMLAudioElement;
  a.volume = vol("efeitos") * (GANHO[nome] ?? 1);
  if (opts.tom) a.playbackRate = opts.tom;
  a.play().catch(() => {});
}

/** Fala gravada (public/audio/voz/<idioma>/<personagem>/<chave>.mp3). Só uma voz por vez.
 * `espera`: se alguém já está falando, entra depois (não corta o Rovi no meio da frase). */
export function falar(
  lang: string,
  personagem: string,
  chave: string,
  opts: { espera?: boolean } = {},
): HTMLAudioElement | null {
  if (!ok()) return null;
  const src = `/audio/voz/${lang}/${personagem}/${chave}.mp3`;
  if (opts.espera && voz && !voz.paused && !voz.ended) {
    const atual = voz;
    atual.addEventListener("ended", () => {
      if (voz === atual) falar(lang, personagem, chave);
    });
    return null;
  }
  pararVoz();
  if (!liberado || !prefs.ligado || prefs.voz <= 0) return null;
  const el = novo(src, false, vol("voz"));
  voz = el;
  // música mais baixa enquanto alguém fala
  const volta = () => {
    if (musica.el) musica.el.volume = vol("musica");
  };
  el.addEventListener("play", () => {
    if (musica.el) musica.el.volume = vol("musica") * 0.4;
  });
  el.addEventListener("ended", volta);
  el.addEventListener("pause", volta);
  el.addEventListener("error", volta);
  tocar(el);
  return el;
}

/** Para a voz. Com `so`, só para se ainda for aquela fala (uma caixa que fecha não corta a de outra). */
export function pararVoz(so?: HTMLAudioElement | null) {
  if (so !== undefined && so !== voz) return;
  if (voz) {
    voz.pause();
    voz = null;
  }
}

/** Sai do jogo: para música, ambiente e voz. */
export function pararTudo() {
  pararVoz();
  tocarMusica(null);
  tocarAmbiente(null);
}

// só em desenvolvimento: deixa ver o estado do som pelo console
if (ok() && import.meta.env?.DEV) (window as unknown as { __som: unknown }).__som = { musica, ambiente, getPrefs };
