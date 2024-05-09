export function calcScale(scale: number, deltaY: number) {
  scale += deltaY * -0.001;

  scale = Math.min(Math.max(0.125, scale), 4);

  return scale;
}
