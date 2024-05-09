import { useMemo } from "react";
import { NodeSize, ShapeType } from "../../types";
import { DiagramSidebar } from "../DiagramSidebar/DiagramSidebar";
import { DrawBoard } from "../DrawBoard/DrawBoard";
import "./DiagramBoard.css";
import { ContextPad } from "../ContextPad/ContextPad";
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

export function DiagramBoard() {
  const { activeNode, nodes, deleteNode, onCreateFromNode } =
    useStepNodeContext();

  const [contextX, contextY] = useMemo(() => {
    if (!activeNode) return [null, null];
    const node = nodes.find((node) => node.id === activeNode);
    if (!node) return [null, null];
    const { width } = nodesSize[node.shape.type];
    const { x, y } = node.shape.positions;
    return [x + width + 20, y];
  }, [activeNode, nodes]);

  return (
    <div className="diagram-board">
      <DrawBoard />
      <DiagramSidebar />
      {activeNode && contextX !== null && (
        <ContextPad
          x={contextX}
          y={contextY}
          onDelete={() => deleteNode?.(activeNode)}
          onCreateNode={(nodeShapeType: ShapeType) =>
            onCreateFromNode?.(activeNode, nodeShapeType)
          }
        />
      )}
    </div>
  );
}
