import { useMemo, useRef } from "react";
import { NodeSize, StepNode } from "../../types";
import "./DrawBoard.css";
import { useScaleUnit } from "../../hooks/useScaleUnit";
import { Node } from "../Node/Node";
import { Line } from "../Line/Line";
import { useStepNodeContext } from "../../context/stepNodeContext";

const nodesSize: {
  [prop: string]: NodeSize;
} = {
  circle: {
    width: 60,
    height: 60,
  },
  rectangle: {
    width: 120,
    height: 100,
  },
  polygon: {
    width: 60,
    height: 60,
  },
};

export function DrawBoard() {
  const { nodes, links, activeNode, setActiveNode } = useStepNodeContext();

  const svgRef = useRef<SVGSVGElement>(null);
  const scaleUnit = useScaleUnit(svgRef);
  const groupNodeById = useMemo(() => {
    return nodes.reduce((acc: { [prop: string]: StepNode }, node) => {
      acc[node.id] = node;
      return acc;
    }, {});
  }, [nodes]);
  return (
    <svg className="draw-board" ref={svgRef}>
      <g transform={`scale(${scaleUnit})`}>
        {nodes.map((node) => (
          <Node
            node={node}
            key={node.id}
            onClick={() => setActiveNode?.(node.id)}
            active={node.id === activeNode}
          />
        ))}
        {links.map((link) => {
          const sourceNode = groupNodeById[link.source];
          const toNode = groupNodeById[link.to];
          if (!sourceNode || !toNode) return;

          let { x: x1, y: y1 } = sourceNode.shape.positions;
          const { x: x2 } = toNode.shape.positions;
          let { y: y2 } = toNode.shape.positions;

          const { width: sourceW, height: sourceH } =
            nodesSize[sourceNode.shape.type];
          const { height: toH } = nodesSize[toNode.shape.type];
          x1 += sourceW;
          y1 += Math.floor(sourceH / 2);
          y2 += Math.floor(toH / 2);
          return <Line x1={x1} y1={y1} x2={x2} y2={y2} key={link.id} />;
        })}
      </g>
    </svg>
  );
}
