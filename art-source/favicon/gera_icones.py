"""Gera os ícones do site (navegador, iPhone, Android) a partir do foguete em pixel art.

A arte é uma grade de 32x32 pixels ampliada 8x (foguete_256.png). Todos os tamanhos saem
ampliando a grade com vizinho mais próximo, então os pixels ficam nítidos.
Uso:  python art-source/favicon/gera_icones.py
"""
import os

from PIL import Image

AQUI = os.path.dirname(os.path.abspath(__file__))
PUB = os.path.join(AQUI, "..", "..", "public")
FUNDO = (42, 5, 8, 255)  # #2a0508, o bordô do menu do jogo

grade = Image.open(os.path.join(AQUI, "foguete_256.png")).convert("RGBA").resize((32, 32), Image.NEAREST)


def ampliado(px):
    return grade.resize((px, px), Image.NEAREST)


def com_fundo(lado, icone):
    """ícone no meio de um quadrado bordô (iPhone e Android "maskable" não aceitam transparência)."""
    fundo = Image.new("RGBA", (lado, lado), FUNDO)
    img = ampliado(icone)
    off = (lado - icone) // 2
    fundo.alpha_composite(img, (off, off))
    return fundo.convert("RGB")


# 16x16 desenhado à mão (vem do foguete.ico original; reduzir a grade de 32 perderia pixels)
ICO = Image.open(os.path.join(AQUI, "foguete.ico"))
ICO.size = (16, 16)
ICO.load()
ICO.convert("RGBA").save(os.path.join(PUB, "favicon-16x16.png"))
ampliado(32).save(os.path.join(PUB, "favicon-32x32.png"))
ampliado(192).save(os.path.join(PUB, "android-chrome-192x192.png"))
ampliado(512).save(os.path.join(PUB, "android-chrome-512x512.png"))
# Android corta o ícone "maskable" num círculo/gota: o desenho fica dentro dos 80% do meio
com_fundo(512, 384).save(os.path.join(PUB, "maskable-512x512.png"))
# iPhone/iPad: 180x180 sem transparência (o iOS arredonda os cantos sozinho)
com_fundo(180, 160).save(os.path.join(PUB, "apple-touch-icon.png"))
# .ico com 16, 32 e 48 (abas, favoritos e atalho do Windows): o original, como veio
with open(os.path.join(AQUI, "foguete.ico"), "rb") as f, open(os.path.join(PUB, "favicon.ico"), "wb") as g:
    g.write(f.read())

# SVG com os pixels (fica nítido em qualquer tamanho, inclusive telas de alta densidade)
px = grade.load()
rects = []
for y in range(32):
    x = 0
    while x < 32:
        r, g, b, a = px[x, y]
        if a < 128:
            x += 1
            continue
        x2 = x
        while x2 + 1 < 32 and px[x2 + 1, y] == px[x, y]:
            x2 += 1
        rects.append(f'<rect x="{x}" y="{y}" width="{x2 - x + 1}" height="1" fill="#{r:02x}{g:02x}{b:02x}"/>')
        x = x2 + 1
svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" shape-rendering="crispEdges">'
       + "".join(rects) + "</svg>\n")
open(os.path.join(PUB, "favicon.svg"), "w", encoding="utf-8").write(svg)
print("ok")
