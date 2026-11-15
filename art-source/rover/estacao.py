"""Arte da expedição do rover, montada com pedaços do mapa da base (mesmo estilo):

- viagem_chao.webp (1024x1024): chão de Marte com crateras e pedras que se REPETE sem emenda na
  horizontal (a cena da viagem rola esse chão para o lado enquanto o rover anda).
- estacao.webp (1024x1024): a estação de pesquisa onde o rover para (abrigo + antena + painéis
  solares + plataforma de pouso do rover na frente da porta).

Uso:  python art-source/rover/estacao.py public/assets/map/base_dia.webp public/assets/rover/garagem_dia.png public/assets/rover
Troque pelos desenhos do time de arte quando estiverem prontos (mesmos nomes de arquivo).
"""
import os
import sys

import cv2
import numpy as np
from PIL import Image

src, garagem, out = sys.argv[1], sys.argv[2], sys.argv[3]
base = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
N = 1024
rng = np.random.default_rng(23)

amostra = base[640:690, 20:110]
COR = np.median(amostra.reshape(-1, 3), axis=0)
grao = amostra - cv2.GaussianBlur(amostra, (0, 0), 3)


def chao():
    g = np.zeros((N, N, 3), np.float32)
    B = 8
    for y in range(0, N, B):
        for x in range(0, N, B):
            sy, sx = rng.integers(0, grao.shape[0] - B), rng.integers(0, grao.shape[1] - B)
            g[y : y + B, x : x + B] = grao[sy : sy + B, sx : sx + B]
    # manchas suaves que também se repetem na horizontal (ruído periódico)
    m = rng.normal(0, 1, (N // 32, N // 32)).astype(np.float32)
    m = np.tile(m, (1, 3))
    m = cv2.GaussianBlur(m, (0, 0), 1.2)[:, N // 32 : 2 * N // 32]
    m = cv2.resize(m, (N, N), interpolation=cv2.INTER_CUBIC)[..., None] * 6
    return np.clip(COR + g * 0.55 + m, 0, 255)


def colar(img, caixa, onde, escala=1.0, espelho=False, repetir=False, limiar=30, fundo=None):
    """cola um pedaço do mapa; só onde ele difere do chão (prédio, pedra, cratera), com borda suave.
    repetir=True: o que passar da borda direita reaparece na esquerda (chão sem emenda)."""
    x0, y0, x1, y1 = caixa
    p = (fundo if fundo is not None else base)[y0:y1, x0:x1]
    if espelho:
        p = p[:, ::-1]
    if escala != 1.0:
        p = cv2.resize(p, None, fx=escala, fy=escala, interpolation=cv2.INTER_NEAREST)
    h, w = p.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.maximum(np.abs(xx - w / 2) / (w / 2), np.abs(yy - h / 2) / (h / 2))
    alfa = np.clip((1 - d) / 0.2, 0, 1)
    dif = np.abs(p - COR).sum(axis=2)
    alfa = alfa * np.clip((dif - limiar) / 40, 0, 1)
    alfa = cv2.GaussianBlur(alfa.astype(np.float32), (0, 0), 0.8)[..., None]
    ox, oy = onde
    for dx in ((0, -N) if repetir else (0,)):
        xa, xb = max(0, ox + dx), min(N, ox + dx + w)
        ya, yb = max(0, oy), min(N, oy + h)
        if xa >= xb or ya >= yb:
            continue
        sx, sy = xa - (ox + dx), ya - oy
        a = alfa[sy : sy + yb - ya, sx : sx + xb - xa]
        img[ya:yb, xa:xb] = img[ya:yb, xa:xb] * (1 - a) + p[sy : sy + yb - ya, sx : sx + xb - xa] * a


CRATERAS = [(0, 0, 150, 80), (880, 0, 1024, 60), (0, 940, 130, 1024), (880, 930, 1024, 1024)]
PEDRAS = [(330, 25, 425, 65), (395, 110, 450, 155), (565, 165, 640, 205), (405, 255, 455, 295),
          (0, 275, 105, 325), (950, 120, 1010, 160), (955, 300, 1024, 345), (0, 575, 95, 625),
          (950, 610, 1020, 660), (385, 665, 430, 695), (570, 675, 630, 705), (260, 915, 345, 955),
          (900, 890, 980, 945), (710, 880, 760, 910)]
DUNAS = [(590, 15, 720, 60), (900, 225, 1015, 285), (720, 950, 860, 1020)]

# ---------------------------------------------------------------- chão da viagem (repete na horizontal)
v = chao()
for c, onde, esc, esp in [
    (CRATERAS[0], (60, 120), 1.7, False), (CRATERAS[1], (560, 210), 1.5, True),
    (CRATERAS[2], (820, 760), 1.6, False), (CRATERAS[3], (300, 820), 1.4, True),
    (CRATERAS[0], (930, 380), 1.1, True), (CRATERAS[1], (420, 30), 1.0, False),
]:
    colar(v, c, onde, esc, esp, repetir=True)
for i, d in enumerate(DUNAS * 2):
    colar(v, d, [(200, 470), (700, 600), (980, 90), (120, 680), (640, 900), (360, 330)][i], 1.2, i % 2 == 1, repetir=True)
lugares = [(30, 40), (260, 250), (480, 140), (700, 420), (900, 260), (150, 560), (420, 680),
           (610, 760), (860, 600), (980, 950), (60, 900), (520, 500), (300, 960), (760, 60)]
for p, onde in zip(PEDRAS, lugares):
    colar(v, p, onde, 1.0, bool(rng.integers(0, 2)), repetir=True)
# marcas de pneu do caminho (no meio, onde o rover passa)
for dy in (-16, 16):
    y = 560 + dy
    for x in range(0, N, 6):
        if (x // 6) % 3 != 2:
            v[y - 2 : y + 2, x : x + 4] *= 0.86
Image.fromarray(v.astype(np.uint8)).save(os.path.join(out, "viagem_chao.webp"), "WEBP", quality=90, method=6)

# ---------------------------------------------------------------- estação de pesquisa
e = chao()
for c, onde, esc, esp in [(CRATERAS[0], (60, 760), 1.4, False), (CRATERAS[3], (800, 880), 1.3, True)]:
    colar(e, c, onde, esc, esp)
for p, onde in zip(PEDRAS[:8], [(40, 520), (930, 520), (150, 360), (880, 330), (260, 860), (700, 960), (60, 60), (960, 60)]):
    colar(e, p, onde, 1.0, bool(rng.integers(0, 2)))
# prédios (atrás primeiro): painéis solares, antena, abrigo (a estação em si)
colar(e, (55, 90, 370, 295), (40, 150), 0.85, limiar=40)
colar(e, (688, 18, 918, 295), (720, 60), 0.95, limiar=40)
# plataforma do rover na frente da porta (recorte da garagem vazia, com o caminho em cima)
pad = np.asarray(Image.open(garagem).convert("RGB")).astype(np.float32)
PAD_X, PAD_Y = 398, 500
# a plataforma entra inteira (sem esfumar a borda); o resto do recorte é só chão
e[PAD_Y + 40 : PAD_Y + 202, PAD_X + 4 : PAD_X + 248] = pad[40:202, 4:248]
colar(e, (0, 0, pad.shape[1], 42), (PAD_X, PAD_Y), 1.0, limiar=18, fundo=pad)
colar(e, (702, 655, 1012, 875), (337, 250), 1.25, limiar=40)
Image.fromarray(e.astype(np.uint8)).save(os.path.join(out, "estacao.webp"), "WEBP", quality=90, method=6)
print("ok")
