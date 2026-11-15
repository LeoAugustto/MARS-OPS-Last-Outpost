# Gera os efeitos 8-bit do jogo (onda quadrada/triangular, como o jsfxr) em public/audio/sfx/*.wav.
# Uso: python scripts/gerar-efeitos-8bit.py
# Só biblioteca padrão. Para trocar um som, mude a receita aqui e rode de novo
# (ou substitua o .wav por um feito no jsfxr com o mesmo nome).
import math
import os
import random
import struct
import wave

TAXA = 22050
PASTA = os.path.join(os.path.dirname(__file__), "..", "public", "audio", "sfx")
random.seed(7)


def onda(tipo, fase):
    f = fase % 1.0
    if tipo == "quadrada":
        return 1.0 if f < 0.5 else -1.0
    if tipo == "quadrada25":
        return 1.0 if f < 0.25 else -1.0
    if tipo == "triangular":
        return 4 * f - 1 if f < 0.5 else 3 - 4 * f
    if tipo == "ruido":
        return random.uniform(-1, 1)
    return math.sin(2 * math.pi * f)


def nota(freq, dur, tipo="quadrada", freq_fim=None, vol=0.5, ataque=0.003, decaimento=True, vibrato=0.0):
    n = int(TAXA * dur)
    out = []
    fase = 0.0
    for i in range(n):
        t = i / n
        f = freq + ((freq_fim - freq) * t if freq_fim else 0)
        if vibrato:
            f *= 1 + 0.03 * math.sin(2 * math.pi * vibrato * i / TAXA)
        fase += f / TAXA
        env = min(1.0, i / max(1, TAXA * ataque))
        if decaimento:
            env *= (1 - t) ** 1.5
        out.append(onda(tipo, fase) * env * vol)
    return out


def pausa(dur):
    return [0.0] * int(TAXA * dur)


def notas(seq, tipo="quadrada", vol=0.5, gap=0.0, decaimento=True):
    out = []
    for freq, dur in seq:
        out += nota(freq, dur, tipo, vol=vol, decaimento=decaimento) + pausa(gap)
    return out


def salva(nome, amostras):
    os.makedirs(PASTA, exist_ok=True)
    caminho = os.path.join(PASTA, nome + ".wav")
    with wave.open(caminho, "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(TAXA)
        dados = b"".join(struct.pack("<h", int(max(-1, min(1, a)) * 32767 * 0.8)) for a in amostras)
        w.writeframes(dados)
    print(nome, round(len(amostras) / TAXA, 2), "s")


# notas
C5, D5, E5, G5, A5, B5, C6, E6, G4 = 523.3, 587.3, 659.3, 784.0, 880.0, 987.8, 1046.5, 1318.5, 392.0

EFEITOS = {
    "clique": lambda: nota(1000, 0.04, "quadrada25", vol=0.35),
    "clique_agudo": lambda: nota(1400, 0.04, "quadrada25", vol=0.35),
    "clique_grave": lambda: nota(600, 0.05, "quadrada25", vol=0.4),
    "rovi_fala": lambda: nota(1800, 0.018, "quadrada25", vol=0.15),
    "confirmar": lambda: notas([(G5, 0.05), (C6, 0.09)], vol=0.4),
    "pronto": lambda: notas([(C5, 0.05), (E5, 0.05), (G5, 0.05), (C6, 0.14)], vol=0.4),
    "alerta": lambda: notas([(1200, 0.07), (1200, 0.07)], "quadrada25", vol=0.35, gap=0.05),
    "urgente": lambda: notas([(880, 0.11), (660, 0.11), (880, 0.11), (660, 0.14)], vol=0.33, decaimento=False),
    "abrir_carta": lambda: nota(400, 0.12, "quadrada25", freq_fim=1200, vol=0.3),
    "abrir_menu": lambda: nota(500, 0.08, "triangular", freq_fim=800, vol=0.45),
    "custo": lambda: [a + b for a, b in zip(nota(400, 0.16, "quadrada", freq_fim=140, vol=0.35), nota(0, 0.16, "ruido", vol=0.08))],
    "ganho": lambda: notas([(A5, 0.05), (E6, 0.1)], "quadrada25", vol=0.35),
    "ampulheta": lambda: nota(2000, 0.02, "quadrada25", vol=0.25) + pausa(0.12) + nota(1500, 0.02, "quadrada25", vol=0.25) + pausa(0.12) + nota(220, 0.25, "triangular", vol=0.6),
    "aviso_rovi": lambda: notas([(990, 0.08), (660, 0.12)], vol=0.33, gap=0.03),
    "estrela": lambda: notas([(B5, 0.05), (E6, 0.2)], "quadrada25", vol=0.35),
    "figurinha": lambda: nota(C6, 0.06, "quadrada25", vol=0.3) + nota(E6, 0.06, "quadrada25", vol=0.3) + nota(1568, 0.3, "quadrada25", vol=0.3, vibrato=12),
    "bom_dia": lambda: notas([(C5, 0.12), (E5, 0.12), (G5, 0.12), (C6, 0.3)], "triangular", vol=0.6, decaimento=False) + nota(C6, 0.2, "triangular", vol=0.4),
    "dormir": lambda: notas([(G5, 0.2), (E5, 0.2), (C5, 0.2), (G4, 0.45)], "triangular", vol=0.5),
    "sem_energia": lambda: nota(120, 0.2, "quadrada", freq_fim=90, vol=0.3, decaimento=False) + nota(90, 0.05, "quadrada", vol=0.2),
}

if __name__ == "__main__":
    for nome, receita in EFEITOS.items():
        salva(nome, receita())
