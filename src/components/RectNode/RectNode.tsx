type RectNodeProps = {
  active?: boolean;
  x?: number;
  y?: number;
  onClick?: () => void;
};

function RectSVG(props: React.SVGProps<SVGRectElement>) {
  return <rect {...props} />;
}

export function RectNode({
  x = 0,
  y = 0,
  active = false,
  onClick,
}: RectNodeProps) {
  return (
    <g className="shape-group" transform={`matrix(1 0 0 1 ${x} ${y})`}>
      <RectSVG
        width="120"
        height="100"
        x={0}
        y={0}
        rx="12"
        ry="12"
        style={{ fill: "white", stroke: "black", strokeWidth: 2 }}
        onClick={onClick}
      />

      {active && (
        <RectSVG
          width={130}
          height={110}
          x={-5}
          y={-5}
          rx="15"
          ry="15"
          style={{ fill: "none", stroke: "cyan", strokeWidth: 2 }}
        />
      )}
    </g>
  );
}
