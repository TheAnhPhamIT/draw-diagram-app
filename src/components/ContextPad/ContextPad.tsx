import { ShapeType } from "../../types";
import "./ContextPad.css";

type ContextPadProps = {
  x: number;
  y: number;
  onDelete: () => void;
  onCreateNode: (nodeShapeType: ShapeType) => void;
};

export function ContextPad({
  x = 0,
  y = 0,
  onDelete,
  onCreateNode,
}: ContextPadProps) {
  return (
    <div className="context-pad" style={{ top: `${y}px`, left: `${x}px` }}>
      <button onClick={() => onCreateNode("circle")}>circle</button>
      <button onClick={() => onCreateNode("rectangle")}>rect</button>
      <button onClick={() => onCreateNode("polygon")}>polygon</button>
      <button onClick={onDelete}>delete</button>
    </div>
  );
}
