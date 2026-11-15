// Peças visuais do "estilo hub" (o mesmo do menu inicial): arte da base ao fundo, moldura
// marrom escura, título amarelo pixel e o botão laranja de fliperama (public/assets/hub/botao.png).
// Usadas pelo menu do jogo, pela tela de escolher o astronauta e pela abertura com o Rovi.
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

/** Fundo com a arte do hub, escurecida embaixo para o texto ler bem. */
export const FUNDO_HUB: CSSProperties = {
  background:
    "linear-gradient(to bottom, rgba(28,4,8,0.35), rgba(28,4,8,0.7) 40%, rgba(28,4,8,0.88)), #2a0508 url(/assets/hub/cena_poster_4k.webp) 50% 60% / cover no-repeat",
};

/** Moldura do painel (borda escura + filete laranja por dentro). */
export const MOLDURA_HUB =
  "pixelated border-[6px] border-[#2a0508] shadow-[0_8px_0_#1c0703,inset_0_0_0_3px_#a8400f]";

/** Título amarelo com contorno e sombra, igual ao do menu inicial. */
export function TituloHub({
  children,
  className = "",
  as: Tag = "h1",
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag
      className={`font-display font-bold leading-tight text-[#f3c916] ${className}`}
      style={{
        WebkitTextStroke: "1px #f3c916",
        paintOrder: "stroke fill",
        textShadow: "0 3px 0 #a86a00, 3px 5px 0 #2a0508",
      }}
    >
      {children}
    </Tag>
  );
}

const TEXTO_BOTAO: CSSProperties = {
  WebkitTextStroke: "0.5px #f6e38c",
  paintOrder: "stroke fill",
  textShadow: "2px 2px 0 #5a1d07",
  backgroundImage: "url(/assets/hub/botao.png)",
};

/** Tamanho único de letra para os botões do hub (cabe em 1 linha no celular). */
export const TEXTO_MENU = "text-[clamp(0.72rem,3.4vw,1.1rem)]";

const BASE_BOTAO =
  "pixelated flex w-full items-center justify-center gap-3 whitespace-nowrap bg-[length:100%_100%] bg-center bg-no-repeat font-display font-bold text-[#f6e38c] transition hover:brightness-110 active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-highlight disabled:opacity-60";

/**
 * Botão laranja do hub. Todos têm o mesmo tamanho e a mesma letra (para a lista ficar
 * uniforme); `principal` só deixa o botão mais aceso que as opções secundárias.
 */
export function BotaoHub({
  principal = false,
  className = "",
  style,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { principal?: boolean }) {
  const tamanho = `aspect-[605/102] px-[8%] ${TEXTO_MENU} ${
    principal ? "" : "brightness-[0.88] saturate-[0.9] hover:brightness-100"
  }`;
  return (
    <button
      type="button"
      {...props}
      className={`${BASE_BOTAO} ${tamanho} ${className}`}
      style={{ ...TEXTO_BOTAO, ...style }}
    />
  );
}

/** Botão escuro e discreto (Sair, Pular, Voltar). */
export const BOTAO_ESCURO =
  "flex min-h-12 items-center justify-center gap-2 border-4 border-[#5a1d07] bg-[#2a0508]/80 px-4 whitespace-nowrap font-display font-bold text-[#fbe6c8] shadow-[0_4px_0_#1c0703] transition [text-shadow:2px_2px_0_#1c0703] hover:bg-[#3b1206] active:translate-y-[2px] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-highlight";
