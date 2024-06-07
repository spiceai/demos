'use client';

import { Position, Node, Edge, MarkerType } from 'reactflow';
import {
  PostgresIcon,
  SpiceIcon,
  DuckDbIcon,
  OpenAiIcon,
  DatabricksIcon,
} from './icons';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { TableCellsIcon } from '@heroicons/react/24/outline';

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

function postgresBlock(node: Partial<Node> = {}, data: any = {}): Node {
  return {
    id: 'db',
    type: 'block',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 700, y: -60 },
    data: {
      icon: <PostgresIcon className="size-6" />,
      label: 'PostgreSQL',
      badge: <TableBadge table="#daily-journal" />,
      className: 'bg-white',
      ...data,
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
    position: { x: 300, y: 0 },
    data: {
      icon: <SpiceIcon className="size-6" />,
      label: 'Spice OSS',
      className: 'bg-orange-500 text-white',
      ...data,
    },
    ...node,
  };
}

function datalakeBlock(node: Partial<Node> = {}, data: any = {}): Node {
  return {
    id: 'datalake',
    type: 'block',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 700, y: 60 },
    data: {
      icon: <DatabricksIcon className="size-6" />,
      label: 'Databricks',
      badge: <TableBadge table="#archive" />,
      ...data,
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
    position: { x: 900, y: 0 },
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
    position: { x: 550, y: 200 },
    data: {
      icon: <OpenAiIcon className="size-6" />,
      label: 'OpenAI',
    },
    ...node,
  };
}

function FederationBadge() {
  return (
    <div className="bg-blue-800 text-white py-1 px-2 text-xs rounded-sm border-2 border-black flex flex-col gap-1">
      <div className="flex items-center gap-2 text-sm whitespace-nowrap font-semibold">
        <TableCellsIcon className="h-5" /> + <TableCellsIcon className="h-5" />→
        #archive
      </div>
    </div>
  );
}

function AccelerationBadge() {
  return (
    <div className="bg-orange-800 text-white py-1 px-2 text-xs rounded-sm border-2 border-black flex flex-col gap-1">
      <div className="flex items-center gap-2 text-sm whitespace-nowrap font-semibold">
        <DuckDbIcon className="h-5" />
        #archive
      </div>
      <div className="flex items-center gap-2 text-sm">
        <DuckDbIcon className="h-5" />
        #general
      </div>
    </div>
  );
}

function TableBadge({ table }: { table: string }) {
  return (
    <div className="bg-gray-200 text-black py-1 px-2 text-xs rounded-sm border-2 border-black flex flex-col gap-1">
      <div className="flex items-center gap-2 text-sm whitespace-nowrap font-semibold">
        <TableCellsIcon className="h-5" />
        {table}
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
    type: 'connection',
    style: {
      stroke: m.color,
      strokeWidth: m.strokeWidth,
      // strokeDasharray: 5,
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
    nodes: [spiceChatBlock(), postgresBlock(), aiBlock()],
    edges: [
      edge('e-postgres', 'db', 'app'),
      // edge('e-datalake', 'datalake', 'app'),
      edge('e-openai', 'ai', 'app'),
    ],
  },

  1: {
    title: 'Spice Unified Query',
    nodes: [
      spiceChatBlock(),
      spiceBlock(
        {},
        {
          badge: <FederationBadge />,
        },
      ),
      postgresBlock(),
      datalakeBlock(),
      aiBlock(),
    ],
    edges: [
      edge('e-spice', 'spice', 'app', {
        color: '#f80',
      }),
      edge('e-postgres', 'db', 'spice'),
      edge('e-datalake', 'datalake', 'spice'),
      edge('e-openai', 'ai', 'app'),
    ],
  },

  2: {
    title: 'Spice Unified Query & Acceleration',
    nodes: [
      spiceChatBlock(),
      spiceBlock(
        {},
        {
          badge: (
            <>
              <FederationBadge />
              <AccelerationBadge />
            </>
          ),
        },
      ),
      postgresBlock(),
      datalakeBlock(),
      aiBlock(),
    ],
    edges: [
      edge('e-spice', 'spice', 'app', {
        color: '#f80',
        speed: 0.2,
      }),
      edge('e-postgres', 'db', 'spice'),
      edge('e-datalake', 'datalake', 'spice'),
      edge('e-openai', 'ai', 'app'),
    ],
  },

  3: {
    title: 'Spice Content-Aware AI',
    nodes: [
      spiceChatBlock(),
      spiceBlock(
        {},
        {
          badge: (
            <>
              <FederationBadge />
              <AccelerationBadge />
            </>
          ),
        },
      ),
      postgresBlock(),
      datalakeBlock(),
      aiBlock(),
      ftpBlock(),
    ],
    edges: [
      edge('e-spice', 'spice', 'app', {
        color: '#f80',
        speed: 0.2,
      }),
      edge('e-postgres', 'db', 'spice'),
      edge('e-ftp', 'ftp', 'spice'),
      edge('e-datalake', 'datalake', 'spice'),
      edge('e-openai', 'ai', 'spice', 'spice'),
    ],
  },
};
