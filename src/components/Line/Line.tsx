import { useMemo } from "react";

export function Line(props: React.SVGProps<SVGLineElement>) {
  const { x1 = 0, y1 = 0, x2 = 0, y2 = 0 } = props;
  const polygonPoints = useMemo(() => {
    const x = +x2 - 8;
    return `${x},${+y2 - 8} ${x + 8},${y2} ${x},${+y2 + 8}`;
  }, [x2, y2]);

  return (
    <g className="line-group">
      <line
        x1={x1}
        y1={y1}
        x2={+x2 - 8}
        y2={y2}
        style={{ stroke: "black", strokeWidth: 2 }}
      />
      <polygon points={polygonPoints} style={{ fill: "black" }} />
    </g>
  );
}
