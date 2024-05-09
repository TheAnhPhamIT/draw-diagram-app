export type ShapeType = "circle" | "rectangle" | "polygon";

export type NodeSize = {
  width: number;
  height: number;
};

export interface NodeLink {
  id: string;
  source: number;
  to: number;
}

export interface ShapePositions {
  x: number;
  y: number;
}

export interface Shape {
  type: ShapeType;
  positions: ShapePositions;
  stroke: string;
  fill: string;
}

export interface StepNodeData {
  title: string;
  comment: string;
}

export interface StepNode {
  id: number;
  shape: Shape;
  data?: StepNodeData;
}
