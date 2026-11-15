import csv, os, re, sys

ROOT = sys.argv[1]
OUT = os.path.join(ROOT, "docs", "audio")
LANGS = ["pt", "en", "es", "fr", "it"]
NL = chr(10)
PAR = re.compile(r'"([a-z0-9_.]+)":\s*"((?:[^"\\]|\\.)*)"')


def blocos(path, langs_in_file):
    s = open(path, encoding="utf8").read().replace(chr(13), "")
    out = {}
    for lang in langs_in_file:
        ini = -1
        for pref in (NL + "const " + lang + " ", NL + "const " + lang + ":", NL + "export const " + lang + " ", NL + "export const " + lang + ":"):
            if pref in s:
                ini = s.index(pref)
                break
        body = ""
        if ini >= 0:
            a = s.index("{", ini) + 1
            b = s.find(NL + "}", a)
            body = s[a:b]
        out[lang] = {m.group(1): m.group(2) for m in PAR.finditer(body)}
    return out


ui = blocos(os.path.join(ROOT, "src/content/locales/ui.ts"), LANGS)
jogo = {l: blocos(os.path.join(ROOT, f"src/content/locales/{l}.ts"), [l])[l] for l in LANGS}

CONST = {"cansaco": 4, "dano": 2, "ar": 4, "comida": 3, "ciencia": 2, "escudo": 2, "pct": 40, "reducao": 20, "max": 4}


def limpa(t):
    t = re.sub(r",\s*\{nome\}", "", t)
    t = re.sub(r"\{nome\},?\s*", "", t)
    for k, v in CONST.items():
        t = t.replace("{" + k + "}", str(v))
    t = t.replace("−", "menos " if False else "-")
    return t if "{" not in t else None


# (chave, personagem, emoção/estilo para o ElevenLabs v3)
FALAS = []
for k in ["ui.abertura.1", "ui.abertura.2", "ui.abertura.3"]:
    FALAS.append((k, "rovi", "[excited]"))
TUT = {"tut.andar": "[cheerful]", "tut.porta": "[friendly]", "tut.vazio": "[friendly]", "tut.computador": "[friendly]",
       "tut.custo": "[thoughtful]", "tut.barras": "[serious]", "tut.antena": "[curious]", "tut.energia": "[helpful]",
       "tut.mais": "[helpful]", "tut.pronto": "[pleased]", "tut.relogio": "[friendly]", "tut.casa": "[friendly]",
       "tut.casa_sair": "[friendly]", "tut.cama": "[warm]"}
FALAS += [(k, "rovi", e) for k, e in TUT.items()]
ROVI = {"rovi.sol2.comida": "[helpful]", "rovi.sol2.ar": "[helpful]", "rovi.ar": "[worried]", "rovi.comida": "[worried]",
        "rovi.saude": "[worried]", "rovi.entardecer": "[slightly urgent]", "rovi.tempestade": "[urgent]",
        "rovi.bateria": "[cheerful]", "rovi.depois": "[thoughtful]", "rovi.falta": "[worried]",
        "ui.dica.energia": "[helpful]", "ui.dica.escudo": "[helpful]", "ui.entardecer.aviso": "[slightly urgent]",
        "ui.entardecer.dormir": "[calm]", "ui.noite.aviso": "[concerned]", "ui.noite.cansaco": "[sighs] [tired]",
        "ui.noite.sono": "[calm] [soft]"}
FALAS += [(k, "rovi", e) for k, e in ROVI.items()]
CONTROLE = {"fim.vitoria.title": "[proud]", "fim.vitoria.body": "[warm] [proud]", "fim.resgate.title": "[calm]",
            "fim.resgate.body": "[calm] [reassuring]", "causa.ar": "[calm] [explaining]", "causa.comida": "[calm] [explaining]",
            "causa.saude": "[calm] [explaining]", "dica.ar": "[encouraging]", "dica.comida": "[encouraging]",
            "dica.saude": "[encouraging]", "fim.estrela.1": "[happy]", "fim.estrela.2": "[excited]",
            "fim.estrela.3": "[very excited]", "fim.estrela.falta": "[encouraging]",
            "fato.reabastecimento": "[curious] [storytelling]"}
FALAS += [(k, "controle", e) for k, e in CONTROLE.items()]

# frases curtas novas do astronauta (reação), menina e menino
BARKS = {
    "astro.ok": ("[confident]", ["Entendido!", "Got it!", "¡Entendido!", "Compris !", "Ricevuto!"]),
    "astro.vamos": ("[excited]", ["Vamos lá!", "Let's go!", "¡Vamos!", "C'est parti !", "Andiamo!"]),
    "astro.alerta": ("[surprised]", ["Opa, um alerta!", "Uh-oh, an alert!", "¡Ups, una alerta!", "Oh, une alerte !", "Oh, un allarme!"]),
    "astro.ufa": ("[sighs] [relieved]", ["Ufa... essa foi por pouco.", "Phew... that was close.", "Uf... por poco.", "Ouf... c'était juste.", "Uff... c'è mancato poco."]),
    "astro.bomdia": ("[cheerful]", ["Bom dia, base!", "Good morning, base!", "¡Buenos días, base!", "Bonjour, la base !", "Buongiorno, base!"]),
    "astro.dormir": ("[yawns] [sleepy]", ["Hora de dormir...", "Time to sleep...", "Hora de dormir...", "C'est l'heure de dormir...", "È ora di dormire..."]),
    "astro.vitoria": ("[very excited]", ["Missão cumprida!", "Mission complete!", "¡Misión cumplida!", "Mission accomplie !", "Missione compiuta!"]),
    "astro.resgate": ("[calm] [hopeful]", ["Tudo bem... vamos tentar de novo.", "It's okay... let's try again.", "Está bien... intentémoslo otra vez.", "Ce n'est pas grave... on réessaie.", "Va bene... riproviamo."]),
    "astro.tempestade": ("[worried]", ["Tempestade chegando! Todos para o abrigo!", "Storm coming! Everyone to the shelter!", "¡Tormenta en camino! ¡Todos al refugio!", "Tempête en approche ! Tous à l'abri !", "Tempesta in arrivo! Tutti al rifugio!"]),
    "astro.figurinha": ("[happy]", ["Uau, uma figurinha nova!", "Wow, a new sticker!", "¡Guau, una figurita nueva!", "Waouh, un nouvel autocollant !", "Wow, un adesivo nuovo!"]),
}

os.makedirs(os.path.join(OUT, "vozes"), exist_ok=True)
total = {}
for i, lang in enumerate(LANGS):
    rows = []
    for k, quem, emo in FALAS:
        txt = ui[lang].get(k) or jogo[lang].get(k)
        if not txt:
            continue
        t = limpa(txt)
        if not t:
            continue
        rows.append([f"{lang}/{quem}/{k}.mp3", quem, emo, f"{emo} {t}", t])
    for k, (emo, frases) in BARKS.items():
        for quem in ["astronauta_menina", "astronauta_menino"]:
            rows.append([f"{lang}/{quem}/{k}.mp3", quem, emo, f"{emo} {frases[i]}", frases[i]])
    with open(os.path.join(OUT, "vozes", f"falas_{lang}.csv"), "w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["arquivo", "personagem", "emocao", "texto_para_colar_v3", "texto_sem_tags"])
        w.writerows(rows)
    total[lang] = (len(rows), sum(len(r[4]) for r in rows))

# fase 2 (opcional): falas do astronauta nas cartas (resultado de cada escolha)
for lang in LANGS:
    rows = []
    for k, v in jogo[lang].items():
        if k.startswith("ev.") and k.endswith(".outcome"):
            t = limpa(v)
            if t:
                rows.append([f"{lang}/astronauta_X/{k}.mp3", "astronauta (gravar menina e menino)", "[natural]", t])
    with open(os.path.join(OUT, "vozes", f"fase2_cartas_{lang}.csv"), "w", encoding="utf-8-sig", newline="") as f:
        w = csv.writer(f, delimiter=";")
        w.writerow(["arquivo", "personagem", "emocao", "texto"])
        w.writerows(rows)
    total[lang + "_fase2"] = (len(rows), sum(len(r[3]) for r in rows))
print(total)
