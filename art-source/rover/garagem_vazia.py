"""Garagem vazia: recorte do mapa SEM o rover pintado, para pôr por cima do mapa quando o rover sai.

Uso:  python art-source/rover/garagem_vazia.py public/assets/map public/assets/rover
Lê base_<periodo>.webp e grava garagem_<periodo>.png (recorte RECORTE do mapa 1024x1024).

Como funciona: a área do rover e da sombra é preenchida a partir das bordas da plataforma
(inpaint), depois recebe o mesmo granulado do piso. A borda de cima da plataforma é refeita
com as colunas retas que aparecem, e o caminho/terra acima (câmera e antena) é copiado de cima.
"""
import os
import sys

import cv2
import numpy as np
from PIL import Image

RECORTE = (392, 756, 644, 964)  # x0, y0, x1, y1 no mapa 1024x1024
# miolo da plataforma (sem a borda clara), com os cantos de cima chanfrados
PISO = [(419, 806), (603, 806), (630, 831), (630, 944), (399, 944), (399, 826)]
PONTOS = [(408, 832, 415, 838), (609, 829, 616, 835)]  # pontinhos claros dos cantos de cima
LIMPO = [(399, 836, 413, 916), (616, 840, 630, 860), (440, 936, 590, 944)]  # piso sem rover
MARCAS = [(402, 920, 429, 942), (594, 920, 620, 942)]  # L dos cantos de baixo: ficam
GRAO = (399, 838, 413, 915)  # piso limpo (fonte do granulado)
BORDA_LINHAS = (796, 809)  # linhas da borda de cima da plataforma
BORDA_FONTE = (420, 452)  # colunas da borda de cima reta e sem rover
BORDA_ALVO = (452, 603)
ACIMA = (455, 576, 760, 797)  # câmera e antena por cima do caminho e da terra: x0, x1, y0, y1
DY_ACIMA = 42


def gerar(src):
    o = np.asarray(Image.open(src).convert("RGB"))
    m = o.copy()
    # 1) caminho e terra acima da plataforma
    x0, x1, y0, y1 = ACIMA
    m[y0:y1, x0:x1] = o[y0 - DY_ACIMA : y1 - DY_ACIMA, x0:x1]
    # 2) borda de cima da plataforma
    l0, l1 = BORDA_LINHAS
    c0, c1 = BORDA_FONTE
    for x in range(*BORDA_ALVO):
        m[l0:l1, x] = o[l0:l1, c0 + (x - BORDA_ALVO[0]) % (c1 - c0)]
    # 3) piso: a plataforma inteira (sem a borda) vira cor lisa + granulado do próprio piso
    mask = np.zeros(o.shape[:2], np.uint8)
    cv2.fillPoly(mask, [np.array(PISO, np.int32)], 255)
    lum_o = o.astype(np.float32).mean(axis=2)
    # cor do piso: mediana dos pixels limpos (fora do rover e da sombra)
    limpo = np.zeros_like(mask)
    for a, b, c, d in LIMPO:
        limpo[b:d, a:c] = 255
    px = o[limpo > 0].astype(np.float32)
    lum = px.mean(axis=1)
    px = px[lum >= np.percentile(lum, 40)]  # tira o que estiver na sombra
    cor = np.median(px, axis=0)
    # marcas e pontinhos: o formato vem do mapa de dia (sem brilho de farol nem sombra);
    # a cor vem da marca da direita deste horário, que fica longe do farol
    dia = np.asarray(Image.open(os.path.join(os.path.dirname(src), "base_dia.webp")).convert("RGB"))
    lum_d = dia.astype(np.float32).mean(axis=2)
    cor_dia = np.median(dia[limpo > 0].astype(np.float32), axis=0)
    forma = {}
    for caixa in MARCAS + PONTOS:
        a, b, c, d = caixa
        forma[caixa] = lum_d[b:d, a:c] > cor_dia.mean() + 22
    a, b, c, d = MARCAS[1]
    cor_marca = np.median(o[b:d, a:c][forma[MARCAS[1]]].astype(np.float32), axis=0)
    pintar = []
    for caixa, f in forma.items():
        a, b, c, d = caixa
        pintar.append((caixa, f))
    a, b, c, d = GRAO
    amostra = o[b:d, a:c].astype(np.float32)
    grao = amostra - cv2.GaussianBlur(amostra, (0, 0), 3)
    rng = np.random.default_rng(7)
    ys, xs = np.nonzero(mask)
    gh, gw = grao.shape[:2]
    ruido = np.zeros(o.shape, np.float32)
    for y in range(ys.min(), ys.max() + 1, 6):
        for x in range(xs.min(), xs.max() + 1, 6):
            sy, sx = rng.integers(0, gh - 6), rng.integers(0, gw - 6)
            ruido[y : y + 6, x : x + 6] = grao[sy : sy + 6, sx : sx + 6]
    m = np.where(mask[..., None] > 0, np.clip(cor + ruido, 0, 255), m).astype(np.uint8)
    for (a, b, c, d), f in pintar:
        m[b:d, a:c][f] = np.clip(cor_marca + ruido[b:d, a:c][f] * 0.5, 0, 255).astype(np.uint8)
    x0, y0, x1, y1 = RECORTE
    return Image.fromarray(m[y0:y1, x0:x1])


if __name__ == "__main__":
    mapas, saida = sys.argv[1], sys.argv[2]
    os.makedirs(saida, exist_ok=True)
    for p in ("dia", "entardecer", "noite"):
        gerar(os.path.join(mapas, f"base_{p}.webp")).save(os.path.join(saida, f"garagem_{p}.png"), optimize=True)
    print("ok", RECORTE)
