import { PropsWithChildren, createContext, useContext, useState } from "react";
import { NodeLink, NodeSize, ShapeType, StepNode } from "../types";

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

const stepNodes: StepNode[] = [
  {
    id: 1,
    shape: {
      type: "circle",
      positions: {
        x: 200,
        y: 200,
      },
      fill: "white",
      stroke: "black",
    },
  },
];

type StepNodeContextValue = {
  nodes: StepNode[];
  links: NodeLink[];
  activeNode: null | number;
  setActiveNode?: (nodeId: number) => void;
  deleteNode?: (nodeId: number) => void;
  createNode?: (node: Omit<StepNode, "id">, fromNode: null | number) => void;
  onCreateFromNode?: (fromNode: number, shapeType: ShapeType) => void;
};

const StepNodeContext = createContext<StepNodeContextValue>({
  nodes: [],
  links: [],
  activeNode: null,
});

export function useStepNodeContext() {
  return useContext(StepNodeContext);
}

let currNodeId = 5;

export function StepNodeProvider({ children }: PropsWithChildren) {
  const [nodes, setNodes] = useState(stepNodes);
  const [links, setLinks] = useState<NodeLink[]>([]);
  const [activeNode, setActiveNode] = useState<number | null>(null);

  function onSetActiveNode(nodeId: number) {
    if (nodeId === activeNode) {
      setActiveNode(null);
    } else {
      setActiveNode(nodeId);
    }
  }

  function onDeleteNode(nodeId: number) {
    const node = nodes.find((node) => node.id === nodeId);
    if (!node) return;
    setNodes((prev) => prev.filter((node) => node.id !== nodeId));
    setLinks((prev) =>
      prev.filter((link) => link.source !== nodeId && link.to !== nodeId)
    );
  }

  function onCreateNode(node: Omit<StepNode, "id">, fromNode: number | null) {
    const newNode = { id: ++currNodeId, ...node };
    setNodes((prev) => [...prev, newNode]);
    setActiveNode(null);
    if (fromNode) {
      const newLink: NodeLink = {
        id: `${fromNode}-${newNode.id}`,
        source: fromNode,
        to: newNode.id,
      };
      setLinks((prev) => [...prev, newLink]);
    }
  }

  function onCreateFromNode(fromNodeId: number, shapeType: ShapeType) {
    const fromNode = nodes.find((node) => node.id === fromNodeId);
    if (!fromNode) return;
    const { x: fromX, y: fromY } = fromNode.shape.positions;
    const { width } = nodesSize[fromNode.shape.type];
    const toNodeIds = links
      .filter((link) => link.source === fromNodeId)
      .map((link) => link.to);

    let newNodePositionY = fromY;
    for (const node of nodes) {
      if (toNodeIds.indexOf(node.id) < 0) continue;
      const { y } = node.shape.positions;
      if (y >= newNodePositionY) {
        newNodePositionY = y + nodesSize[node.shape.type].height + 20;
      }
    }

    const newNode = {
      shape: {
        type: shapeType,
        positions: {
          x: fromX + width + 100,
          y: newNodePositionY,
        },
        fill: "white",
        stroke: "black",
      },
    };

    onCreateNode(newNode, fromNodeId);
  }
  return (
    <StepNodeContext.Provider
      value={{
        nodes,
        links,
        activeNode,
        deleteNode: onDeleteNode,
        createNode: onCreateNode,
        setActiveNode: onSetActiveNode,
        onCreateFromNode,
      }}
    >
      {children}
    </StepNodeContext.Provider>
  );
}
