import { Fragment, useMemo } from "react";
import { StepNode } from "../../types";
import { CircleNode } from "../CircleNode/CircleNode";
import { RectNode } from "../RectNode/RectNode";
import { PolygonNode } from "../PolygonNode/PolygonNode";

type StepNodeProps = {
  node: StepNode;
  active?: boolean;
  onClick?: () => void;
};

export function Node({ node, active, onClick }: StepNodeProps) {
  const Comp = useMemo(() => {
    switch (node?.shape.type) {
      case "circle": {
        return CircleNode;
      }
      case "rectangle": {
        return RectNode;
      }
      case "polygon": {
        return PolygonNode;
      }
      default: {
        return Fragment;
      }
    }
  }, [node]);

  const { x, y } = node.shape.positions;
  return <Comp x={x} y={y} active={active} onClick={onClick} />;
}
