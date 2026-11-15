"""Rover em pixel art gerado a partir de um modelo de blocos (voxels).

Mesmo desenho do rover do mapa: corpo creme, vidros azuis, faróis amarelos, detalhes verde-água,
6 rodas cinza, câmera na frente do teto e antena atrás. Como tudo sai do MESMO modelo, o rover
fica igual em todas as direções.

Uso:  python art-source/rover/rover.py public/assets/rover
Saída: <dir>_<quadro>.png (8 direções x 4 quadros de roda girando) e e_porta_<0..3>.png
(rover de lado com a porta abrindo, para o astronauta descer). Quadros de 112x112, chão em (56, 74).
"""
import math
import os
import sys

import numpy as np
from PIL import Image

D = 2  # voxels por pixel (densidade do modelo)
(VAZIO, CREME, VIDRO, FAROL, TEAL, PNEU, CUBO, CUBO2, METAL, METAL2, GRADE, LENTE, ESCURO) = range(13)
# 3 tons por material: claro, médio, escuro (luz de cima, vinda da esquerda)
PAL = {
    CREME: [(248, 240, 220), (220, 202, 174), (178, 154, 126)],
    VIDRO: [(150, 210, 245), (88, 160, 222), (58, 112, 178)],
    FAROL: [(255, 232, 125), (250, 202, 72), (222, 160, 50)],
    TEAL: [(92, 186, 172), (58, 148, 140), (40, 110, 106)],
    PNEU: [(96, 96, 102), (72, 72, 78), (54, 54, 60)],
    CUBO: [(218, 216, 208), (188, 186, 180), (150, 148, 144)],
    CUBO2: [(152, 150, 148), (128, 126, 124), (104, 102, 100)],
    METAL: [(198, 198, 204), (168, 168, 174), (130, 130, 138)],
    METAL2: [(152, 152, 158), (126, 126, 134), (100, 100, 108)],
    GRADE: [(112, 100, 92), (90, 82, 76), (70, 62, 58)],
    LENTE: [(122, 192, 242), (72, 142, 212), (50, 100, 170)],
    ESCURO: [(66, 46, 40), (54, 38, 34), (42, 30, 26)],
}
CONTORNO = (52, 30, 24)
SOMBRA = (70, 28, 16)

# modelo em "pixels": x = frente (+), y = lado direito (+), z = para cima
XMIN, XMAX, YMIN, YMAX, ZMAX = -32, 32, -24, 24, 50
nx, ny, nz = (XMAX - XMIN) * D, (YMAX - YMIN) * D, ZMAX * D
xs = (np.arange(nx) + 0.5) / D + XMIN
ys = (np.arange(ny) + 0.5) / D + YMIN
zs = (np.arange(nz) + 0.5) / D
X, Y, Z = np.meshgrid(xs, ys, zs, indexing="ij")


def caixa(x0, x1, y0, y1, z0, z1):
    return (X >= x0) & (X < x1) & (Y >= y0) & (Y < y1) & (Z >= z0) & (Z < z1)


def lado(s, a, b):
    """faixa fina na lateral: s=+1 direita, s=-1 esquerda"""
    return (a, b) if s > 0 else (-b, -a)


def corpo_rover(porta=0.0):
    """porta: 0 = fechada … 1 = toda aberta (corre para a frente)"""
    M = np.zeros((nx, ny, nz), np.uint8)
    corpo = caixa(-27, 27, -14, 14, 9, 31)
    r = 4.0
    cx = np.clip(np.abs(X) - (27 - r), 0, None)
    cy = np.clip(np.abs(Y) - (14 - r), 0, None)
    cz = np.clip(Z - (31 - r), 0, None)
    corpo &= ~(cy**2 + cz**2 > r * r)
    corpo &= ~(cx**2 + cz**2 > r * r)
    corpo &= ~(cx**2 + cy**2 > (r + 1) ** 2)
    M[corpo] = CREME
    M[corpo & (Z < 13)] = TEAL  # saia verde-água
    M[caixa(26, 28.5, -6, 6, 10, 16)] = TEAL  # grade da frente
    for s in (-1, 1):
        M[caixa(26, 28, *lado(s, 7, 12), 12, 17)] = FAROL
    M[caixa(25.5, 27.5, -11, 11, 19, 28) & corpo] = VIDRO  # para-brisa
    for s in (-1, 1):
        M[caixa(10, 23, *lado(s, 12.5, 14.5), 19, 28) & corpo] = VIDRO  # janelas da cabine
        M[caixa(-27, -18, *lado(s, 12.5, 14.5), 13, 17) & corpo] = TEAL  # faixa de trás
        for zz in (19, 22.5, 26):  # ventilação
            M[caixa(-22, -9, *lado(s, 13, 14.5), zz, zz + 1.5) & corpo] = GRADE
    # porta do lado direito
    if porta <= 0:
        for xx in (-6.5, 5.5):
            M[caixa(xx, xx + 1, 13, 14.5, 13, 29) & corpo] = GRADE
    else:
        desl = 12 * porta
        M[caixa(-6, -6 + desl, 12, 14.5, 13, 29) & corpo] = ESCURO  # vão aberto
        M[caixa(-6 + desl, 6 + desl, 14.5, 16, 13, 29)] = CREME  # porta correndo por fora
        M[caixa(-6 + desl, -5 + desl, 14.5, 16, 13, 29)] = GRADE
    # câmera no teto (frente) e antena (atrás)
    M[caixa(15, 19, -2, 2, 31, 37)] = METAL2
    M[caixa(12, 24, -6, 6, 36, 43)] = CREME
    M[caixa(12, 24, -6, 6, 36, 38)] = TEAL
    M[caixa(23.5, 24.5, -3.5, 3.5, 38.5, 41.5)] = LENTE
    M[caixa(-24, -10, -8, 8, 31, 33)] = METAL2
    M[caixa(-18, -16, -1, 1, 33, 47)] = METAL
    M[caixa(-19, -15, -2, 2, 46, 48)] = METAL
    return M


def rodas(fase):
    M = np.zeros((nx, ny, nz), np.uint8)
    R, ZC = 9.0, 9.0
    for xc in (-18, 0, 18):
        for s in (-1, 1):
            y0, y1 = lado(s, 13, 21)
            dx, dz = X - xc, Z - ZC
            rr = np.sqrt(dx**2 + dz**2)
            dentro = (Y >= y0) & (Y < y1) & (rr <= R)
            M[dentro] = PNEU
            ang = (np.arctan2(dz, dx) / (2 * np.pi) * 12 + fase) % 1.0
            M[dentro & (rr > R - 2.2) & (ang < 0.35)] = GRADE  # sulcos (giram com a fase)
            fora = (Y >= y1 - 1.2) if s > 0 else (Y < y0 + 1.2)
            M[dentro & fora & (rr <= 5.5)] = CUBO  # calota
            M[dentro & fora & (rr <= 2.2)] = CUBO2
            # parafusos da calota (também giram)
            for k in range(4):
                a = 2 * np.pi * (k / 4 - fase / 3)
                bx, bz = xc + 3.7 * math.cos(a), ZC + 3.7 * math.sin(a)
                M[dentro & fora & ((X - bx) ** 2 + (Z - bz) ** 2 <= 0.9)] = CUBO2
    return M


NORMAIS = [(1, 0, 0), (-1, 0, 0), (0, 1, 0), (0, -1, 0), (0, 0, 1), (0, 0, -1)]
SIN_A, COS_A = 0.77, 0.64  # câmera ~50° de cima, igual ao mapa
LUZ = np.array([-0.45, 0.35, 0.82])
LUZ /= np.linalg.norm(LUZ)
W = H = 112
AX, AY = 56, 74  # onde fica o centro do rover no chão, dentro do quadro


def render(M, rumo):
    """rumo em graus de tela: 0 = direita (leste), 90 = para baixo (sul)."""
    h = math.radians(rumo)
    ch, sh = math.cos(h), math.sin(h)
    solido = M > 0
    img = np.zeros((H, W, 4), np.uint8)
    prof = np.full((H, W), -1e9)
    partes = []
    for a, b, c in NORMAIS:
        eixo = 0 if a else (1 if b else 2)
        viz = np.zeros_like(solido)
        src = [slice(None)] * 3
        dst = [slice(None)] * 3
        if a + b + c > 0:
            src[eixo], dst[eixo] = slice(1, None), slice(0, -1)
        else:
            src[eixo], dst[eixo] = slice(0, -1), slice(1, None)
        viz[tuple(dst)] = solido[tuple(src)]
        ii, jj, kk = np.nonzero(solido & ~viz)
        nwx, nwy = a * ch - b * sh, a * sh + b * ch
        if nwy * COS_A + c * SIN_A <= 0.02:
            continue  # face de costas para a câmera
        luz = max(0.0, nwx * LUZ[0] + nwy * LUZ[1] + c * LUZ[2])
        px = xs[ii] + a * 0.5 / D
        py = ys[jj] + b * 0.5 / D
        pz = zs[kk] + c * 0.5 / D
        WX = px * ch - py * sh
        WY = px * sh + py * ch
        partes.append((WX + AX, WY * SIN_A - pz * COS_A + AY, WY * COS_A + pz * SIN_A, M[ii, jj, kk], luz))
    sx = np.concatenate([p[0] for p in partes])
    sy = np.concatenate([p[1] for p in partes])
    dp = np.concatenate([p[2] for p in partes])
    mt = np.concatenate([p[3] for p in partes])
    lz = np.concatenate([np.full(len(p[0]), p[4]) for p in partes])
    ix, iy = np.floor(sx).astype(int), np.floor(sy).astype(int)
    ok = (ix >= 0) & (ix < W) & (iy >= 0) & (iy < H)
    ordem = np.argsort(dp[ok])
    ix, iy, dp, mt, lz = (v[ok][ordem] for v in (ix, iy, dp, mt, lz))
    prof[iy, ix] = dp
    tom = np.where(lz > 0.72, 0, np.where(lz > 0.42, 1, 2))
    cores = np.zeros((len(ix), 3), np.uint8)
    for m, tons in PAL.items():
        for t in range(3):
            cores[(mt == m) & (tom == t)] = tons[t]
    img[iy, ix, :3] = cores
    img[iy, ix, 3] = 255
    # contorno escuro: borda da silhueta e degraus de profundidade (como as linhas do mapa)
    a = img[:, :, 3] > 0
    borda = np.zeros_like(a)
    salto = np.zeros_like(a)
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        va = np.roll(np.roll(a, dy, 0), dx, 1)
        vp = np.roll(np.roll(prof, dy, 0), dx, 1)
        borda |= a & ~va
        salto |= a & va & (vp - prof > 4.5)
    img[borda | salto, :3] = CONTORNO
    return img


def sombra(rumo):
    h = math.radians(rumo)
    ch, sh = math.cos(h), math.sin(h)
    yy, xx = np.mgrid[0:H, 0:W]
    wx = xx + 0.5 - AX
    wy = (yy + 0.5 - AY) / SIN_A
    lx = wx * ch + wy * sh
    ly = -wx * sh + wy * ch
    return (((lx / 31) ** 2 + (ly / 23) ** 2) <= 1).astype(np.float32)


def quadro(rumo, fase, porta=0.0):
    M = corpo_rover(porta)
    R = rodas(fase)
    M = np.where(R > 0, R, M)
    img = render(M, rumo).astype(np.float32)
    out = np.zeros((H, W, 4), np.float32)
    out[..., :3] = SOMBRA
    out[..., 3] = sombra(rumo) * 80
    a = img[..., 3:4] / 255
    out[..., :3] = img[..., :3] * a + out[..., :3] * (1 - a)
    out[..., 3] = np.maximum(img[..., 3], out[..., 3])
    return Image.fromarray(out.clip(0, 255).astype(np.uint8), "RGBA")


DIRS = {"e": 0, "se": 45, "s": 90, "sw": 135, "w": 180, "nw": 225, "n": 270, "ne": 315}

if __name__ == "__main__":
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    for nome, ang in DIRS.items():
        for f in range(4):
            quadro(ang, f / 4).save(os.path.join(out, f"{nome}_{f}.png"), optimize=True)
    for k in range(4):  # porta abrindo (rover parado de lado, virado para a direita)
        quadro(0, 0, porta=(k + 1) / 4).save(os.path.join(out, f"e_porta_{k}.png"), optimize=True)
    print("ok")
