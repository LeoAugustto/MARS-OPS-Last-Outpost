"""Arte da expedição do rover, montada com pedaços do mapa da base (mesmo estilo):

- viagem_chao.webp (1024x1024): chão de Marte com crateras e pedras que se REPETE sem emenda na
  horizontal (a cena da viagem rola esse chão para o lado enquanto o rover anda).
- estacao.webp (1024x1024): a estação de pesquisa onde o rover para. O laboratório da base no meio,
  painéis solares e antena dos lados, caixas, postes de luz e caminhos de piso iguais aos da base,
  e a plataforma do rover na frente da porta. Tudo dentro da área que a câmera mostra (zoom 1.36
  centrado em x 51%, y 58% -> de x 14% a 87% e de y 15% a 89%).

Uso:  python art-source/rover/estacao.py public/assets/map/base_dia.webp public/assets/rover/garagem_dia.png public/assets/rover [--so-estacao]
Troque pelos desenhos do time de arte quando estiverem prontos (mesmos nomes de arquivo).
"""
import os
import sys

import cv2
import numpy as np
from PIL import Image

src, garagem, out = sys.argv[1], sys.argv[2], sys.argv[3]  # --so-estacao: não refaz o chão da viagem
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

if "--so-estacao" not in sys.argv:
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
# Prédios recortados INTEIROS do mapa (máscara sólida, sem transparência no meio) e colados
# com sombra. Caixas no mapa da base (1024x1024): [x0, y0, x1, y1].
LAB = (30, 650, 316, 868)  # laboratório (vira a estação de pesquisa)
CAIXAS = (44, 843, 166, 919)  # caixotes da frente do laboratório
PAINEIS = (58, 98, 368, 293)
ANTENA = (684, 14, 884, 292)
CHAO_COR = COR


def sprite(caixa, escala, limiar=46, tirar=(), fonte=None):
    """recorte sólido: o que difere do chão vira prédio; buracos dentro são preenchidos."""
    x0, y0, x1, y1 = caixa
    p = (base if fonte is None else fonte)[y0:y1, x0:x1].copy()
    dif = np.abs(p - CHAO_COR).sum(axis=2)
    # sombra do mapa (chão mais escuro, mesma cor) não é prédio: a sombra nova vem de sombra()
    k = (p @ CHAO_COR) / (CHAO_COR @ CHAO_COR)
    resto = np.abs(p - k[..., None] * CHAO_COR).sum(axis=2)
    m = ((dif > limiar) & ~((resto < 95) & (k < 1.02))).astype(np.uint8)
    for zx0, zy0, zx1, zy1 in tirar:
        m[zy0 - y0 : zy1 - y0, zx0 - x0 : zx1 - x0] = 0
    m = cv2.morphologyEx(m, cv2.MORPH_OPEN, np.ones((3, 3), np.uint8))
    m = cv2.morphologyEx(m, cv2.MORPH_CLOSE, np.ones((7, 7), np.uint8))
    # preenche buracos: tudo que não é alcançado a partir da borda é prédio
    h, w = m.shape
    inv = np.pad(1 - m, 1, constant_values=1)
    fl = inv.copy()
    cv2.floodFill(fl, np.zeros((h + 4, w + 4), np.uint8), (0, 0), 2)
    m = ((fl[1:-1, 1:-1] != 2)).astype(np.uint8)
    # fica só com os pedaços grandes (sem grãozinhos de areia soltos)
    n, lab, st, _ = cv2.connectedComponentsWithStats(m, 8)
    keep = np.zeros_like(m)
    for k in range(1, n):
        if st[k, cv2.CC_STAT_AREA] > 300:
            keep[lab == k] = 1
    if escala != 1.0:
        p = cv2.resize(p, None, fx=escala, fy=escala, interpolation=cv2.INTER_NEAREST)
        keep = cv2.resize(keep, None, fx=escala, fy=escala, interpolation=cv2.INTER_NEAREST)
    return p, keep.astype(np.float32)


def sombra(img, m, onde, dx=12, dy=7, forca=0.7):
    ox, oy = onde
    h, w = m.shape
    s = cv2.GaussianBlur(m, (0, 0), 2.5)
    for y in range(h):
        yy = oy + y + dy
        if not 0 <= yy < N:
            continue
        xa, xb = max(0, ox + dx), min(N, ox + dx + w)
        img[yy, xa:xb] *= 1 - (1 - forca) * s[y, xa - ox - dx : xb - ox - dx, None]


def pregar(img, sp, onde):
    p, m = sp
    ox, oy = onde
    h, w = m.shape
    a = m[..., None]
    img[oy : oy + h, ox : ox + w] = img[oy : oy + h, ox : ox + w] * (1 - a) + p * a


# cores do piso (medidas na estrada do mapa)
PISO = np.array([252, 195, 166], np.float32)
LINHA = np.array([237, 179, 151], np.float32)
CONTORNO = np.array([110, 48, 34], np.float32)
BRILHO = np.array([254, 222, 198], np.float32)
FILETE = np.array([214, 165, 136], np.float32)


def caminhos(img, retangulos):
    m = np.zeros((N, N), np.uint8)
    for x0, y0, x1, y1 in retangulos:
        m[y0:y1, x0:x1] = 1
    # sombra para baixo/direita, como na base
    sh = np.zeros_like(m)
    sh[6:, 6:] = m[:-6, :-6]
    sh = cv2.GaussianBlur((sh & (1 - m)).astype(np.float32), (0, 0), 2)
    img *= 1 - 0.32 * sh[..., None]
    k = np.ones((3, 3), np.uint8)
    e1 = cv2.erode(m, k)
    e3 = cv2.erode(m, k, iterations=3)
    e4 = cv2.erode(m, k, iterations=4)
    yy, xx = np.mgrid[0:N, 0:N]
    grade = ((xx % 25) == 12) | ((yy % 25) == 12)
    cor = np.where(grade[..., None], LINHA, PISO)
    cor = np.where((e3 & (1 - e4))[..., None].astype(bool), FILETE, cor)
    cor = np.where((e1 & (1 - e3))[..., None].astype(bool), BRILHO, cor)
    cor = np.where((m & (1 - e1))[..., None].astype(bool), CONTORNO, cor)
    img[:] = np.where(m[..., None].astype(bool), cor, img)


def poste(img, x, y):
    """poste de luz em pixel art (base em x, y): pé, haste e lâmpada amarela."""
    img[y - 4 : y, x - 6 : x + 6] = (92, 84, 92)
    img[y - 40 : y - 4, x - 2 : x + 2] = (150, 142, 150)
    img[y - 40 : y - 4, x - 2 : x - 1] = (205, 198, 205)
    img[y - 48 : y - 40, x - 7 : x + 7] = (92, 84, 92)
    img[y - 46 : y - 42, x - 5 : x + 5] = (255, 214, 92)
    img[y - 4 : y, x + 6 : x + 12] *= 0.7


e = chao()
# crateras e pedras longe dos prédios e do caminho do astronauta
for c, onde, esc, esp in [(CRATERAS[0], (150, 790), 1.3, False), (CRATERAS[3], (700, 770), 1.2, True)]:
    colar(e, c, onde, esc, esp)
for p, onde in zip(PEDRAS[:9], [(160, 640), (830, 640), (440, 175), (610, 160), (180, 420), (840, 470),
                                (560, 860), (300, 880), (860, 900)]):
    colar(e, p, onde, 1.0, bool(rng.integers(0, 2)))

PAD_X, PAD_Y = 398, 500  # plataforma do rover (garagem vazia do mapa)
lab = sprite(LAB, 1.25, tirar=[(30, 838, 168, 868)])  # sem os caixotes (vão à parte)
LAB_XY = (522 - int((203 - LAB[0]) * 1.25), 516 - int((862 - LAB[1]) * 1.25))
pain = sprite(PAINEIS, 0.6)
PAIN_XY = (150, 172)
ant = sprite(ANTENA, 0.72)
ANT_XY = (708, 182)
cx = sprite(CAIXAS, 0.75)
CX_XY = (664, 440)

# piso: uma rua na frente da estação ligando painéis, porta e antena; a calçada da esquerda é o
# caminho a pé do astronauta (RoverCena.tsx: A_PE) e a ligação da porta com a plataforma
porta_pain = PAIN_XY[0] + int((207 - PAINEIS[0]) * 0.6)
porta_ant = ANT_XY[0] + int((793 - ANTENA[0]) * 0.72)
caminhos(e, [
    (190, 512, 864, 562),  # rua da frente
    (430, 540, 614, 548),  # encosta na plataforma
    (porta_pain - 24, 282, porta_pain + 24, 540),  # painéis
    (porta_ant - 24, ANT_XY[1] + 196, porta_ant + 24, 540),  # antena
    (352, 512, 404, 776),  # calçada do astronauta
    (352, 726, 470, 776),
    (497, 500, 547, 548),  # porta → plataforma
])
pad = np.asarray(Image.open(garagem).convert("RGB")).astype(np.float32)
pad_sp = sprite((4, 44, 248, 206), 1.0, fonte=pad)  # só a plataforma, sem o chão em volta
pregar(e, pad_sp, (PAD_X + 4, PAD_Y + 44))

for sp, xy in [(pain, PAIN_XY), (ant, ANT_XY), (lab, LAB_XY), (cx, CX_XY)]:
    sombra(e, sp[1], xy)
for sp, xy in [(pain, PAIN_XY), (ant, ANT_XY), (lab, LAB_XY), (cx, CX_XY)]:
    pregar(e, sp, xy)
for x, y in [(338, 566), (668, 566), (190, 566), (864, 566)]:
    poste(e, x, y)
Image.fromarray(np.clip(e, 0, 255).astype(np.uint8)).save(os.path.join(out, "estacao.webp"), "WEBP", quality=92, method=6)

# onde ficam as janelas e a luz da porta (para o RoverCena acender quando o tempo passa)
J = lambda x, y: (round((LAB_XY[0] + (x - LAB[0]) * 1.25) / N * 100, 1), round((LAB_XY[1] + (y - LAB[1]) * 1.25) / N * 100, 1))
print("lab", LAB_XY, "janela", J(75, 770), J(225, 812), "luz porta", J(203, 817), "postes", [(round(x / N * 100, 1), round((y - 44) / N * 100, 1)) for x, y in [(338, 566), (668, 566), (190, 566), (864, 566)]])
print("ok")
