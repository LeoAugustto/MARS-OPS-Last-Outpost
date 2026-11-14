import { Link } from "@tanstack/react-router";
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
      className="h-6 w-8 rounded-md object-cover shadow-sm ring-1 ring-border" />
  );
}

export function LangSelector() {
  const { lang, setLang } = useLang();
  const t = useT();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="chunkySand" size="tap" className="gap-2 px-3" aria-label={`${t("chooseLanguage")}: ${LANG_NAMES[lang]}`}>
          <Flag lang={lang} />
          <span className="uppercase">{lang}</span>
          <ChevronDown aria-hidden />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48 rounded-2xl p-2">
        {LANGS.map((l) => (
          <DropdownMenuItem key={l} onSelect={() => setLang(l)} lang={l}
            className="min-h-12 gap-3 rounded-xl text-base" aria-current={l === lang}>
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
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 p-4">
      {showBack ? (
        <Button asChild variant="ghost" size="tap">
          <Link to="/" aria-label={t("backHome")}>← {t("home")}</Link>
        </Button>
      ) : (
        <span />
      )}
      <Link to="/" className="hidden flex-1 truncate text-center font-display text-lg font-bold text-secondary sm:block">
        {t("app.title")}
      </Link>
      <LangSelector />
    </header>
  );
}

export function AppFooter() {
  const t = useT();
  return (
    <footer className="mx-auto max-w-3xl px-4 py-8 text-center text-sm text-muted-foreground">
      <p className="font-display text-base font-bold text-secondary">{t("app.title")}</p>
      <p>{t("footer")}</p>
    </footer>
  );
}
