import { Link } from "@tanstack/react-router";
import { FullscreenButton } from "@/game/ui/shared";
import { Check, ChevronDown } from "lucide-react";
import br from "flag-icons/flags/4x3/br.svg";
import us from "flag-icons/flags/4x3/us.svg";
import es from "flag-icons/flags/4x3/es.svg";
import fr from "flag-icons/flags/4x3/fr.svg";
import it from "flag-icons/flags/4x3/it.svg";
import { LANGS, LANG_NAMES, useLang, useT, type Lang } from "@/i18n";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FLAGS: Record<Lang, string> = { pt: br, en: us, es, fr, it };

function Flag({ lang }: { lang: Lang }) {
  return (
    <img src={FLAGS[lang]} alt="" aria-hidden width={32} height={24}
      className="h-6 w-8 pixelated object-cover ring-2 ring-frame-shadow" />
  );
}

export function LangSelector() {
  const { lang, setLang } = useLang();
  const t = useT();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="chunkySand" size="tap" className="gap-2 px-3 text-xl" aria-label={`${t("chooseLanguage")}: ${LANG_NAMES[lang]}`}>
          <Flag lang={lang} />
          <span className="uppercase">{lang}</span>
          <ChevronDown aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48 pixel-frame p-2">
        {LANGS.map((l) => (
          <DropdownMenuItem key={l} onSelect={() => setLang(l)} lang={l}
            className="min-h-12 gap-3 rounded-sm text-xl" aria-current={l === lang}>
            <Flag lang={l} />
            <span className="flex-1">{LANG_NAMES[l]}</span>
            {l === lang && <Check aria-hidden />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function AppHeader({ showBack = true }: { showBack?: boolean }) {
  const t = useT();
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 p-4 2xl:max-w-[1500px] 2xl:py-3">
      {showBack ? (
        <Button asChild variant="ghost" size="tap" className="text-xl text-highlight hover:bg-muted hover:text-highlight">
          <Link to="/" aria-label={t("backHome")}>← {t("home")}</Link>
        </Button>
      ) : (
        <span />
      )}
      <Link to="/" className="hidden min-h-12 min-w-0 flex-1 items-center justify-center text-center font-display text-xs leading-normal text-highlight sm:flex md:text-sm">
        <span className="truncate">{t("app.title")}</span>
      </Link>
      <div className="flex shrink-0 items-center gap-2">
        <FullscreenButton />
        <LangSelector />
      </div>
    </header>
  );
}

export function AppFooter({ compact = false }: { compact?: boolean }) {
  const t = useT();
  if (compact)
    return (
      <footer className="shrink-0 px-4 pb-2 pt-1 text-center text-base text-muted-foreground">{t("footer")}</footer>
    );
  return (
    <footer className="mx-auto max-w-3xl px-4 py-8 text-center text-lg text-muted-foreground 2xl:max-w-[1500px] 2xl:py-4">
      <p className="mb-2 font-display text-xs leading-normal text-highlight sm:text-sm">{t("app.title")}</p>
      <p>{t("footer")}</p>
    </footer>
  );
}
