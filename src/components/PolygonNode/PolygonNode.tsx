type PolygonNodeProps = {
  active?: boolean;
  x?: number;
  y?: number;
  onClick?: () => void;
};

function PolygonSVG(props: React.SVGProps<SVGPolygonElement>) {
  return <polygon {...props} />;
}

export function PolygonNode({
  x = 0,
  y = 0,
  onClick,
  active = false,
}: PolygonNodeProps) {
  return (
    <g className="shape-group" transform={`matrix(1 0 0 1 ${x} ${y})`}>
      <PolygonSVG
        points={`30,0 60,30 30,60 0,30`}
        style={{ fill: "white", stroke: "black", strokeWidth: 2 }}
        onClick={onClick}
      />

      {active && (
        <PolygonSVG
          points={`30,-5 65,30 30,65 -5,30`}
          style={{ fill: "none", stroke: "cyan", strokeWidth: 2 }}
        />
      )}
    </g>
  );
}
