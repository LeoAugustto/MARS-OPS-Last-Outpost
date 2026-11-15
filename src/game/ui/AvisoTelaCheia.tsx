// Aviso ao abrir o jogo: "o jogo fica melhor em tela cheia".
// Aparece uma vez por visita (sessionStorage), só onde o navegador deixa entrar em tela cheia
// (no Safari do iPhone não dá, então o aviso não aparece) e só se ainda não estiver em tela cheia.
import { useEffect, useState } from "react";
import { BOTAO_ESCURO, BotaoHub, TituloHub } from "./hub";
import { Modal, useGT } from "./shared";
import { PixelIcon } from "./PixelIcon";

const CHAVE = "marsops:aviso-tela-cheia";

function jaViu(): boolean {
  try {
    return sessionStorage.getItem(CHAVE) === "1";
  } catch {
    return false;
  }
}

function marcarVisto() {
  try {
    sessionStorage.setItem(CHAVE, "1");
  } catch {
    // sem sessionStorage (aba anônima bloqueada etc.): o aviso só some até recarregar
  }
}

export function AvisoTelaCheia() {
  const { t } = useGT();
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (document.fullscreenEnabled && !document.fullscreenElement && !jaViu()) setAberto(true);
  }, []);

  if (!aberto) return null;

  const fechar = () => {
    marcarVisto();
    setAberto(false);
  };
  const entrar = () => {
    fechar();
    void document.documentElement.requestFullscreen().catch(() => {});
  };

  return (
    <Modal label={t("ui.telacheia.aviso.titulo")} onClose={fechar}>
      <div className="flex flex-col items-center gap-4 text-center">
        {/* o mesmo botão de tela cheia lá de cima */}
        <PixelIcon name="tela_cheia" size={64} />
        <TituloHub as="h2" className="text-[clamp(1.1rem,4.5vw,1.6rem)]">
          {t("ui.telacheia.aviso.titulo")}
        </TituloHub>
        <p className="text-lg leading-snug">{t("ui.telacheia.aviso.texto")}</p>
        <div className="grid w-full gap-2">
          <BotaoHub principal onClick={entrar}>
            {t("ui.telacheia.aviso.sim")}
          </BotaoHub>
          <button type="button" className={`${BOTAO_ESCURO} text-lg`} onClick={fechar}>
            {t("ui.telacheia.aviso.nao")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
