"""Mapa PROVISÓRIO do lugar da expedição (1024x1024), montado com pedaços do mapa da base:
o chão de terra, crateras e pedras. Troque pelo desenho do time de arte quando ficar pronto
(public/assets/rover/expedicao.webp).

Uso:  python art-source/rover/expedicao_provisoria.py public/assets/map/base_dia.webp public/assets/rover/expedicao.webp
"""
import sys

import cv2
import numpy as np
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
base = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
N = 1024
rng = np.random.default_rng(11)

# chão: cor da terra + granulado tirado de um pedaço limpo do mapa
amostra = base[640:690, 20:110]
cor = np.median(amostra.reshape(-1, 3), axis=0)
grao = amostra - cv2.GaussianBlur(amostra, (0, 0), 3)
chao = np.zeros((N, N, 3), np.float32)
B = 8
for y in range(0, N, B):
    for x in range(0, N, B):
        sy, sx = rng.integers(0, grao.shape[0] - B), rng.integers(0, grao.shape[1] - B)
        chao[y : y + B, x : x + B] = grao[sy : sy + B, sx : sx + B]
# leve variação de luz (manchas grandes e suaves, como no mapa)
manchas = cv2.GaussianBlur(rng.normal(0, 1, (N // 32, N // 32)).astype(np.float32), (0, 0), 1.2)
manchas = cv2.resize(manchas, (N, N), interpolation=cv2.INTER_CUBIC)[..., None] * 6
img = np.clip(cor + chao * 0.55 + manchas, 0, 255)


def colar(caixa, onde, escala=1.0, espelho=False):
    """cola um pedaço do mapa (x0, y0, x1, y1) com as bordas esfumadas"""
    x0, y0, x1, y1 = caixa
    p = base[y0:y1, x0:x1]
    if espelho:
        p = p[:, ::-1]
    if escala != 1.0:
        p = cv2.resize(p, None, fx=escala, fy=escala, interpolation=cv2.INTER_NEAREST)
    h, w = p.shape[:2]
    yy, xx = np.mgrid[0:h, 0:w]
    d = np.maximum(np.abs(xx - w / 2) / (w / 2), np.abs(yy - h / 2) / (h / 2))
    alfa = np.clip((1 - d) / 0.35, 0, 1)[..., None]
    # só onde o pedaço é diferente do chão (pedra/cratera), para não marcar quadrados
    dif = np.abs(p - cor).sum(axis=2, keepdims=True)
    alfa *= np.clip((dif - 30) / 40, 0, 1)
    alfa = cv2.GaussianBlur(alfa, (0, 0), 1.0)[..., None] if alfa.ndim == 3 else alfa
    ox, oy = onde
    alvo = img[oy : oy + h, ox : ox + w]
    hh, ww = alvo.shape[:2]
    a = alfa[:hh, :ww]
    if a.ndim == 2:
        a = a[..., None]
    img[oy : oy + hh, ox : ox + ww] = alvo * (1 - a) + p[:hh, :ww] * a


CRATERAS = [(0, 0, 150, 80), (880, 0, 1024, 60), (0, 940, 130, 1024), (880, 930, 1024, 1024)]
PEDRAS = [(330, 25, 425, 65), (395, 110, 450, 155), (565, 165, 640, 205), (405, 255, 455, 295),
          (0, 275, 105, 325), (950, 120, 1010, 160), (955, 300, 1024, 345), (0, 575, 95, 625),
          (950, 610, 1020, 660), (385, 665, 430, 695), (570, 675, 630, 705), (260, 915, 345, 955),
          (900, 890, 980, 945), (710, 880, 760, 910)]
DUNAS = [(590, 15, 720, 60), (900, 225, 1015, 285), (720, 950, 860, 1020)]
for c, onde, esc, esp in [
    (CRATERAS[0], (120, 140), 1.6, False), (CRATERAS[1], (700, 90), 1.4, True),
    (CRATERAS[2], (760, 760), 1.5, True), (CRATERAS[3], (80, 820), 1.3, False),
    (CRATERAS[0], (620, 380), 1.0, True),
]:
    colar(c, onde, esc, esp)
for i, d in enumerate(DUNAS):
    colar(d, [(80, 420), (760, 560), (330, 120)][i], 1.2, i % 2 == 1)
lugares = [(60, 60), (300, 300), (840, 300), (500, 140), (900, 470), (240, 660), (560, 880),
           (380, 960), (930, 700), (40, 520), (700, 230), (220, 470), (480, 780), (860, 980)]
for p, onde in zip(PEDRAS, lugares):
    colar(p, onde, 1.0, bool(rng.integers(0, 2)))

# marcas de pneu chegando pela esquerda até o meio (onde o rover para)
for dy in (-14, 14):
    y = 600 + dy
    for x in range(0, 470, 6):
        if (x // 6) % 3 != 2:
            img[y - 2 : y + 2, x : x + 4] *= 0.86
Image.fromarray(img.astype(np.uint8)).save(dst, "WEBP", quality=90, method=6)
print("ok")
