"use client";

import "reactflow/dist/style.css";

import { FC, ReactNode, useEffect } from "react";
import ReactFlow, {
  Position,
  Node,
  Edge,
  MarkerType,
  Handle,
  NodeProps,
  useReactFlow,
} from "reactflow";
import { Switcher } from "./Switcher";
import { PostgresIcon, SpiceIcon } from "./icons";
import { cn } from "@/lib/utils";
import { Database } from "lucide-react";
import { CpuChipIcon } from "@heroicons/react/24/outline";

interface Params {
  searchParams: {
    state: string;
  };
}

export const BlockNode: FC<
  NodeProps<{
    icon?: ReactNode;
    className?: string;
    label: string;
  }>
> = ({ data }) => (
  <div
    className={cn(
      "border p-4 gap-4 flex items-center rounded-md",
      data.className,
    )}
  >
    <Handle type="target" position={Position.Left} className="opacity-0" />
    <div className="flex flex-col gap-2 items-center justify-center">
      {data.icon}
      <div className="text-sm">{data.label}</div>
    </div>
    <Handle type="source" position={Position.Right} className="opacity-0" />
  </div>
);

const nodeTypes = {
  block: BlockNode,
};

export default function Slide({ searchParams: { state } }: Params) {
  const slide = slides[state] || slides[0];
  return (
    <div className="relative w-full flex flex-shrink-0 h-96 justify-center items-center px-8 pt-8">
      <SlideView {...slide} />
      <Switcher />
    </div>
  );
}

const nodes: Node[] = [
  {
    id: "app",
    type: "block",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 0, y: 0 },
    data: {
      icon: <div className="text-2xl size-6">🌶</div>,
      label: "Spicy Chat",
      className: "bg-blue-500 text-white",
    },
  },

  {
    id: "spice",
    type: "block",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 300, y: 0 },
    data: {
      icon: <SpiceIcon className="size-6" />,
      label: "Spicy Chat",
      className: "bg-orange-500 text-white",
    },
  },

  {
    id: "db",
    type: "block",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 600, y: 0 },
    data: {
      icon: <PostgresIcon className="size-6" />,
      label: "Postgres",
    },
  },

  {
    id: "datalake",
    type: "block",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 600, y: 100 },
    data: {
      icon: <Database className="size-6" />,
      label: "Databricks",
    },
  },

  {
    id: "ai",
    type: "block",
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 500, y: 200 },
    data: {
      icon: <CpuChipIcon className="size-6" />,
      label: "OpenAI",
    },
  },
];
const edges: Edge[] = [
  {
    id: "e1-2",
    source: "app",
    target: "spice",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#000" },
    markerStart: { type: MarkerType.ArrowClosed, color: "#000" },
  },
  {
    id: "e2-3",
    source: "spice",
    target: "db",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#000" },
    markerStart: { type: MarkerType.ArrowClosed, color: "#000" },
  },
  {
    id: "e2-4",
    source: "spice",
    target: "datalake",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#000" },
    markerStart: { type: MarkerType.ArrowClosed, color: "#000" },
  },
  {
    id: "e2-5",
    source: "spice",
    target: "ai",
    animated: true,
    markerEnd: { type: MarkerType.ArrowClosed, color: "#000" },
    markerStart: { type: MarkerType.ArrowClosed, color: "#000" },
  },
];

const AutoFit = ({ nodes }: { nodes: Node[] }) => {
  const reactFlow = useReactFlow();

  useEffect(() => {
    reactFlow.fitView({ nodes });
  }, [nodes]);

  return null;
};

const SlideView = ({ nodes, edges }: { nodes: Node[]; edges: Edge[] }) => {
  return (
    <div className="w-full h-full">
      <ReactFlow
        fitView
        // maxZoom={1}
        // minZoom={1}
        zoomOnScroll={false}
        draggable={false}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        proOptions={{
          hideAttribution: true,
        }}
      >
        <AutoFit nodes={nodes} />
      </ReactFlow>
      {/* Spicy chat {"<- (slow) ->"} <PostgresIcon className="size-8" /> */}
    </div>
  );
};

const slides: Record<string, { nodes: Node[]; edges: Edge[] }> = {
  0: {
    nodes: [
      {
        id: "app",
        type: "block",
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: { x: 0, y: 0 },
        data: {
          icon: <div className="text-2xl size-6">🌶</div>,
          label: "Spicy Chat",
          className: "bg-blue-500 text-white",
        },
      },

      {
        id: "db",
        type: "block",
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: { x: 300, y: 0 },
        data: {
          icon: <PostgresIcon className="size-6" />,
          label: "Postgres",
        },
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "app",
        target: "db",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#000" },
        markerStart: { type: MarkerType.ArrowClosed, color: "#000" },
      },
    ],
  },
  1: {
    nodes: [
      {
        id: "app",
        type: "block",
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: { x: 0, y: 0 },
        data: {
          icon: <div className="text-2xl size-6">🌶</div>,
          label: "Spicy Chat",
          className: "bg-blue-500 text-white",
        },
      },

      {
        id: "spice",
        type: "block",
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: { x: 300, y: 0 },
        data: {
          icon: <SpiceIcon className="size-6" />,
          label: "Spicy Chat",
          className: "bg-orange-500 text-white",
        },
      },

      {
        id: "db",
        type: "block",
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: { x: 600, y: 0 },
        data: {
          icon: <PostgresIcon className="size-6" />,
          label: "Postgres",
        },
      },

      {
        id: "datalake",
        type: "block",
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: { x: 600, y: 100 },
        data: {
          icon: <Database className="size-6" />,
          label: "Databricks",
        },
      },

      {
        id: "ai",
        type: "block",
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
        position: { x: 500, y: 200 },
        data: {
          icon: <CpuChipIcon className="size-6" />,
          label: "OpenAI",
        },
      },
    ],
    edges: [
      {
        id: "e1-2",
        source: "app",
        target: "spice",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#000" },
        markerStart: { type: MarkerType.ArrowClosed, color: "#000" },
      },
      {
        id: "e2-3",
        source: "spice",
        target: "db",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#000" },
        markerStart: { type: MarkerType.ArrowClosed, color: "#000" },
      },
      {
        id: "e2-4",
        source: "spice",
        target: "datalake",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#000" },
        markerStart: { type: MarkerType.ArrowClosed, color: "#000" },
      },
      {
        id: "e2-5",
        source: "spice",
        target: "ai",
        animated: true,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#000" },
        markerStart: { type: MarkerType.ArrowClosed, color: "#000" },
      },
    ],
  },
  // 1: (
  //   <div className="flex items-center justify-center gap-4">
  //     Spicy chat {"<- (fast) ->"}
  //     <SpiceIcon className="size-8" />
  //     {"<- (slow)->"} <PostgresIcon className="size-8" />
  //   </div>
  // ),
  // 2: (
  //   <div className="flex items-center justify-center gap-4">
  //     Spicy chat {"<- (fast) ->"}
  //     <SpiceIcon className="size-8" />
  //     {"<- (slow)->"}
  //     <PostgresIcon className="size-8" />
  //   </div>
  // ),
  // 3: <div>Slide 4</div>,
  // 4: <div>Slide 5</div>,
};
