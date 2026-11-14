import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { AppHeader } from "@/components/AppHeader";
import { useI18n } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";
import { passwordScore } from "@/lib/password";

type Mode = "login" | "signup" | "forgot";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { mode?: "save" } =>
    s["mode"] === "save" ? { mode: "save" } : {},
  head: () => ({
    meta: [
      { title: "Entrar ou criar conta — MARS OPS" },
      { name: "description", content: "Conta para pais, professores ou jogadores mais velhos guardarem a base." },
      { property: "og:title", content: "Entrar — MARS OPS" },
      { property: "og:description", content: "Guarde sua base de Marte na nuvem." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AuthPage,
});

function PasswordField({ id, label, value, onChange, showStrength }: {
  id: string; label: string; value: string; onChange: (v: string) => void; showStrength?: boolean;
}) {
  const { t } = useI18n();
  const [show, setShow] = useState(false);
  const score = passwordScore(value);
  return (
    <div className="grid gap-2">
      <Label htmlFor={id} className="text-base">{label}</Label>
      <div className="flex gap-2">
        <Input id={id} type={show ? "text" : "password"} value={value} onChange={(e) => onChange(e.target.value)}
          required minLength={6} className="h-12 rounded-xl text-base" autoComplete={showStrength ? "new-password" : "current-password"} />
        <Button type="button" variant="chunkySand" size="tap" onClick={() => setShow(!show)} aria-pressed={show}>
          {show ? t.hide : t.show}
        </Button>
      </div>
      {showStrength && (
        <div aria-live="polite">
          <div className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`h-2 flex-1 rounded-full ${i < score ? (score >= 3 ? "bg-success" : "bg-primary") : "bg-muted"}`} />
            ))}
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            {value ? t.strength[score] : t.strengthHint}
          </p>
        </div>
      )}
    </div>
  );
}

function AuthPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { mode: searchMode } = Route.useSearch();
  const [mode, setMode] = useState<Mode>(searchMode === "save" ? "signup" : "login");
  const [isAnon, setIsAnon] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setIsAnon(!!data.user?.is_anonymous));
  }, []);

  async function run(fn: () => Promise<void>) {
    setBusy(true);
    try { await fn(); } catch (e) {
      toast.error(e instanceof Error && e.message ? e.message : t.errorGeneric);
    } finally { setBusy(false); }
  }

  const onLogin = (e: FormEvent) => { e.preventDefault(); run(async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    toast.success(t.welcome);
    navigate({ to: "/perfil" });
  }); };

  const onSignup = (e: FormEvent) => { e.preventDefault(); run(async () => {
    if (isAnon) {
      // Link email+password to the current guest player so their base is kept.
      const { data, error } = await supabase.auth.updateUser(
        { email, password, data: { nickname } },
        { emailRedirectTo: window.location.origin + "/play" },
      );
      if (error) throw error;
      if (nickname && data.user) await supabase.from("profiles").update({ nickname }).eq("id", data.user.id);
      toast.success(t.saveCloudDone);
      navigate({ to: "/play" });
      return;
    }
    const { error } = await supabase.auth.signUp({
      email, password, options: { emailRedirectTo: window.location.origin, data: { nickname } },
    });
    if (error) throw error;
    toast.success(t.checkEmail);
  }); };

  const onSendCode = (e: FormEvent) => { e.preventDefault(); run(async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
    setCodeSent(true);
    toast.success(t.codeSent);
  }); };

  const onReset = (e: FormEvent) => { e.preventDefault(); run(async () => {
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: "recovery" });
    if (error) throw error;
    const { error: e2 } = await supabase.auth.updateUser({ password });
    if (e2) throw e2;
    toast.success(t.passwordSaved);
    navigate({ to: "/perfil" });
  }); };

  const emailField = (
    <div className="grid gap-2">
      <Label htmlFor="email" className="text-base">{t.email}</Label>
      <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
        autoComplete="email" className="h-12 rounded-xl text-base" />
    </div>
  );

  const title = isAnon && mode === "signup" ? t.saveCloudTitle : t.authTitle;

  return (
    <main className="bg-mars min-h-screen">
      <AppHeader />
      <section className="mx-auto max-w-md px-4 pb-12">
        <div className="rounded-3xl border-4 border-border bg-card p-6">
          <h1 className="text-3xl font-bold text-secondary">{title}</h1>
          <p className="mt-2 text-muted-foreground">{isAnon && mode === "signup" ? t.saveCloudNote : t.authNote}</p>

          {mode !== "forgot" && (
            <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl bg-muted p-1">
              {(["login", "signup"] as const).map((m) => (
                <Button key={m} type="button" size="tap" variant={mode === m ? "chunkySand" : "ghost"} onClick={() => setMode(m)}>
                  {m === "login" ? t.login : t.signup}
                </Button>
              ))}
            </div>
          )}

          {mode === "login" && (
            <form onSubmit={onLogin} className="mt-5 grid gap-4">
              {emailField}
              <PasswordField id="pw" label={t.password} value={password} onChange={setPassword} />
              <Button type="submit" variant="chunky" size="tap" disabled={busy} className="mt-2">{t.login}</Button>
              <Button type="button" variant="link" size="tap" onClick={() => setMode("forgot")}>{t.forgot}</Button>
            </form>
          )}

          {mode === "signup" && (
            <form onSubmit={onSignup} className="mt-5 grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="nick" className="text-base">{t.nickname}</Label>
                <Input id="nick" value={nickname} onChange={(e) => setNickname(e.target.value)} maxLength={24}
                  className="h-12 rounded-xl text-base" />
              </div>
              {emailField}
              <PasswordField id="pw" label={t.password} value={password} onChange={setPassword} showStrength />
              <Button type="submit" variant="chunky" size="tap" disabled={busy} className="mt-2">
                {isAnon ? t.saveCloudTitle : t.signup}
              </Button>
            </form>
          )}

          {mode === "forgot" && (
            <div className="mt-5 grid gap-4">
              <h2 className="text-xl font-bold">{t.forgot}</h2>
              {!codeSent ? (
                <form onSubmit={onSendCode} className="grid gap-4">
                  {emailField}
                  <Button type="submit" variant="chunky" size="tap" disabled={busy}>{t.sendCode}</Button>
                </form>
              ) : (
                <form onSubmit={onReset} className="grid gap-4">
                  <p>{t.codeSent}</p>
                  <div className="grid gap-2">
                    <Label className="text-base">{t.code}</Label>
                    <InputOTP maxLength={6} value={code} onChange={setCode} inputMode="numeric">
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => <InputOTPSlot key={i} index={i} className="h-12 w-11 text-xl" />)}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <PasswordField id="npw" label={t.newPassword} value={password} onChange={setPassword} showStrength />
                  <Button type="submit" variant="chunky" size="tap" disabled={busy || code.length < 6}>{t.savePassword}</Button>
                </form>
              )}
              <Button type="button" variant="link" size="tap" onClick={() => { setMode("login"); setCodeSent(false); }}>
                ← {t.back}
              </Button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
