'use client';

import { Position, Node, Edge, MarkerType } from 'reactflow';
import { PostgresIcon, SpiceIcon, DuckDbIcon } from './icons';

import { Database } from 'lucide-react';
import { CpuChipIcon, DocumentIcon } from '@heroicons/react/24/outline';

function spiceChatBlock(node: Partial<Node> = {}): Node {
  return {
    id: 'app',
    type: 'block',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 0, y: 0 },
    data: {
      icon: <div className="text-2xl size-6">🌶</div>,
      label: 'Spicy Chat',
      className: 'bg-blue-500 text-white',
    },
    ...node,
  };
}

function postgresBlock(node: Partial<Node> = {}): Node {
  return {
    id: 'db',
    type: 'block',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 300, y: 0 },
    data: {
      icon: <PostgresIcon className="size-6" />,
      label: 'PostgreSQL',
    },
    ...node,
  };
}

function spiceBlock(node: Partial<Node> = {}, data: any = {}): Node {
  return {
    id: 'spice',
    type: 'block',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 350, y: 0 },
    data: {
      icon: <SpiceIcon className="size-6" />,
      label: 'Spice OSS',
      className: 'bg-orange-500 text-white',
      ...data,
    },
    ...node,
  };
}

function datalakeBlock(node: Partial<Node> = {}): Node {
  return {
    id: 'datalake',
    type: 'block',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 600, y: 100 },
    data: {
      icon: <Database className="size-6" />,
      label: 'Databricks',
    },
    ...node,
  };
}

function ftpBlock(node: Partial<Node> = {}): Node {
  return {
    id: 'ftp',
    type: 'block',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 600, y: 100 },
    data: {
      icon: <DocumentIcon className="size-6" />,
      label: 'FTP Server',
    },
    ...node,
  };
}

function aiBlock(node: Partial<Node> = {}): Node {
  return {
    id: 'ai',
    type: 'block',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 500, y: 200 },
    data: {
      icon: <CpuChipIcon className="size-6" />,
      label: 'OpenAI',
    },
    ...node,
  };
}

function AccelerationBadge() {
  return (
    <div className="absolute bg-amber-500 text-black p-1 text-xs rounded-sm border border-amber-800 -bottom-12 -right-1 flex flex-col gap-1">
      <div className="flex items-center gap-2 text-xs">
        <DuckDbIcon className="h-5" />
        postgres
      </div>
      <div className="flex items-center gap-2 text-xs">
        <DuckDbIcon className="h-5" />
        databricks
      </div>
    </div>
  );
}

function edge(
  id: string,
  source: string,
  target: string,
  mode: any = {},
  e: Partial<Edge> = {},
): Edge {
  const m = {
    color: '#000',
    speed: 0.5,
    strokeWidth: 1.5,
    ...mode,
  };

  return {
    id,
    source,
    target,
    animated: true,
    style: {
      stroke: m.color,
      strokeWidth: m.strokeWidth,
      animation: `dashdraw ${m.speed}s linear infinite`,
    },
    // markerEnd: { type: MarkerType.ArrowClosed, color: m.color },
    markerStart: { type: MarkerType.ArrowClosed, color: m.color },
    ...e,
  };
}

export interface Slide {
  title: string;
  nodes: Node[];
  edges: Edge[];
}

export const slides: Record<string, Slide> = {
  0: {
    title: 'Without Spice',
    nodes: [
      spiceChatBlock(),
      postgresBlock({
        position: { x: 700, y: -50 },
      }),
      datalakeBlock({
        position: { x: 700, y: 50 },
      }),
      aiBlock({
        position: { x: 600, y: 150 },
      }),
    ],
    edges: [
      edge('e1-3', 'db', 'app'),
      edge('e1-4', 'datalake', 'app'),
      edge('e1-5', 'ai', 'app'),
    ],
  },

  1: {
    title: 'Spice Unified Query',
    nodes: [
      spiceChatBlock(),
      spiceBlock(),
      postgresBlock({
        position: { x: 700, y: -50 },
      }),
      datalakeBlock({
        position: { x: 700, y: 50 },
      }),
      aiBlock({
        position: { x: 600, y: 150 },
      }),
    ],
    edges: [
      edge('e1-2', 'spice', 'app', {
        color: '#f80',
        strokeWidth: 2,
      }),
      edge('e2-3', 'db', 'spice'),
      edge('e2-4', 'datalake', 'spice'),
      edge('e1-5', 'ai', 'app'),
    ],
  },

  2: {
    title: 'Spice Unified Query & Acceleration',
    nodes: [
      spiceChatBlock(),
      spiceBlock(
        {},
        {
          badge: <AccelerationBadge />,
        },
      ),
      postgresBlock({
        position: { x: 700, y: -50 },
      }),
      datalakeBlock({
        position: { x: 700, y: 50 },
      }),
      aiBlock({
        position: { x: 600, y: 150 },
      }),
    ],
    edges: [
      edge('e1-2', 'spice', 'app', {
        color: '#f80',
        speed: 0.2,
        strokeWidth: 2,
      }),
      edge('e2-3', 'db', 'spice'),
      edge('e2-4', 'datalake', 'spice'),
      edge('e1-5', 'ai', 'app'),
    ],
  },

  // 3: {
  //   title: "Spice AI Gateway",
  //   nodes: [
  //     spiceChatBlock(),
  //     spiceBlock(
  //       {},
  //       {
  //         badge: (
  //           <div className="absolute bg-white text-black p-1 text-xs rounded-sm border -bottom-4 -right-4">
  //             <TableCellsIcon className="size-6" />
  //           </div>
  //         ),
  //       },
  //     ),
  //     postgresBlock({
  //       position: { x: 600, y: 0 },
  //     }),
  //     datalakeBlock({
  //       position: { x: 600, y: 100 },
  //     }),
  //     aiBlock({
  //       position: { x: 500, y: 200 },
  //     }),
  //   ],
  //   edges: [
  //     edge("e1-2", "spice", "app", {
  //       color: "#f80",
  //       speed: 0.2,
  //       strokeWidth: 2,
  //     }),
  //     edge("e2-3", "db", "spice"),
  //     edge("e2-4", "datalake", "spice"),
  //     edge("e1-5", "ai", "app"),
  //   ],
  // },

  3: {
    title: 'Spice Content-Aware AI',
    nodes: [
      spiceChatBlock(),
      spiceBlock(
        {},
        {
          badge: <AccelerationBadge />,
        },
      ),
      postgresBlock({
        position: { x: 700, y: -50 },
      }),
      datalakeBlock({
        position: { x: 700, y: 50 },
      }),
      aiBlock({
        position: { x: 600, y: 150 },
      }),
      ftpBlock({
        position: { x: 850, y: 0 },
      }),
    ],
    edges: [
      edge('e1-2', 'spice', 'app', {
        color: '#f80',
        speed: 0.2,
        strokeWidth: 2,
      }),
      edge('e2-3', 'db', 'spice'),
      edge('e2-5', 'ftp', 'spice'),
      edge('e2-4', 'datalake', 'spice'),
      edge('e2-6', 'ai', 'spice', 'spice'),
    ],
  },
};
