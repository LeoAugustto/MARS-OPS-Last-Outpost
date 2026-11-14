import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n";
import { Button } from "@/components/ui/button";

export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="flex rounded-2xl bg-muted p-1" role="group" aria-label="Idioma / Language">
      {(["pt", "en"] as const).map((l) => (
        <Button
          key={l}
          size="tap"
          variant={lang === l ? "chunkySand" : "ghost"}
          className="min-w-12 px-3"
          aria-pressed={lang === l}
          onClick={() => setLang(l)}
        >
          {l.toUpperCase()}
        </Button>
      ))}
    </div>
  );
}

export function AppHeader({ showBack = true }: { showBack?: boolean }) {
  const { t } = useI18n();
  return (
    <header className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 p-4">
      {showBack ? (
        <Button asChild variant="ghost" size="tap">
          <Link to="/">← {t.home}</Link>
        </Button>
      ) : (
        <span />
      )}
      <LangToggle />
    </header>
  );
}
