/** Ícones decorativos de interface. O texto ao lado descreve a ação ou o estado. */
export function PixelIcon({ name, size = 24 }: { name: string; size?: number }) {
  return (
    <img
      src={`/assets/ui/${name}.png`}
      alt=""
      width={size}
      height={size}
      className="inline-block shrink-0 align-middle"
      style={{ width: size, height: size, imageRendering: "pixelated" }}
      draggable={false}
    />
  );
}
