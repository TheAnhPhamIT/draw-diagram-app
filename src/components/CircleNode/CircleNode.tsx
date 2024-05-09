type CircleNodeProps = {
  active?: boolean;
  x?: number;
  y?: number;
  onClick?: () => void;
};

export function CircleSVG(props: React.SVGProps<SVGCircleElement>) {
  return <circle {...props} />;
}

export function CircleNode({
  x = 0,
  y = 0,
  active = false,
  onClick,
}: CircleNodeProps) {
  return (
    <g className="shape-group" transform={`matrix(1 0 0 1 ${x} ${y})`}>
      <CircleSVG
        cx="30"
        cy="30"
        r="30"
        stroke="black"
        strokeWidth="2"
        fill="white"
        onClick={onClick}
      />

      {active && (
        <CircleSVG
          cx="30"
          cy="30"
          r="35"
          stroke="cyan"
          strokeWidth="2"
          fill="none"
        />
      )}
    </g>
  );
}
