'use client';

import { Position, Node, Edge, MarkerType } from 'reactflow';
import {
  PostgresIcon,
  SpiceIcon,
  DuckDbIcon,
  OpenAiIcon,
  DatabricksIcon,
  GraphQlIcon,
  MysqlIcon,
  S3Icon,
  SnowflakeIcon,
  ClickhouseIcon,
  PrometheusIcon,
  OpentelemetryIcon,
  OnnxIcon,
  HuggingfaceIcon,
} from './icons';
import { DocumentIcon } from '@heroicons/react/24/outline';
import { TableCellsIcon } from '@heroicons/react/24/outline';
import { DatabaseZap, TableIcon, CpuIcon, SearchCode } from 'lucide-react';

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
    position: { x: 700, y: -80 },
    data: {
      icon: <PostgresIcon className="size-6" />,
      label: 'PostgreSQL',
      badge: <TablesBadge tables={['#daily-journal', '#general']} />,
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
      badge: <TablesBadge tables={['#archive']} />,
      className: 'bg-white',
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
      label: 'FTP/SFTP',
      className: 'bg-white',
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
      className: 'bg-white',
    },
    ...node,
  };
}

function block(id: string, node: Partial<Node> = {}, data: any = {}): Node {
  return {
    id,
    type: 'block',
    sourcePosition: Position.Right,
    targetPosition: Position.Left,
    position: { x: 550, y: 200 },
    data: {
      className: 'bg-white',
      ...data,
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

function TablesBadge({ tables }: { tables: string[] }) {
  return (
    <div className="bg-blue-200 text-black py-1 px-2 text-xs rounded-sm border-2 border-black flex flex-col gap-1">
      {tables.map((table) => (
        <div
          key={table}
          className="flex items-center gap-2 text-sm whitespace-nowrap font-semibold"
        >
          <TableCellsIcon className="h-5" />
          {table}
        </div>
      ))}
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
  fullscreen?: boolean;
  title: string;
  accelerated?: boolean;
  augmented?: boolean;
  nodes: Node[];
  edges: Edge[];
}

export const slides: Record<string, Slide> = {
  0: {
    title: 'Just postgres',
    nodes: [spiceChatBlock(), postgresBlock({ position: { x: 400, y: 0 } })],
    edges: [edge('e-postgres', 'db', 'app')],
  },

  1: {
    title: 'Add OpenAI',
    nodes: [
      spiceChatBlock(),
      postgresBlock({ position: { x: 600, y: 0 } }),
      aiBlock(),
    ],
    edges: [
      edge('e-postgres', 'db', 'app'),
      edge('e-datalake', 'datalake', 'app'),
      edge('e-openai', 'ai', 'app'),
    ],
  },

  2: {
    title: 'Postgres + databricks',
    nodes: [spiceChatBlock(), postgresBlock(), datalakeBlock(), aiBlock()],
    edges: [
      edge('e-postgres', 'db', 'app'),
      edge('e-datalake', 'datalake', 'app'),
      edge('e-openai', 'ai', 'app'),
    ],
  },

  3: {
    title: 'Spice unified query and intelligence',
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

  4: {
    title: 'LLMs in Spice',
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
      edge('e-openai', 'ai', 'spice'),
    ],
  },

  5: {
    title: 'Spice accelerated queries',
    accelerated: true,
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
      edge('e-openai', 'ai', 'spice'),
    ],
  },

  6: {
    title: 'Content-aware Spice AI',
    accelerated: true,
    augmented: true,
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
      edge('e-openai', 'ai', 'spice'),
    ],
  },

  7: {
    fullscreen: true,
    title: '',
    accelerated: true,
    augmented: true,
    nodes: [
      block(
        'aiapp',
        { position: { x: -200, y: -150 } },
        {
          icon: <CpuIcon className="size-6" />,
          label: 'AI app',
        },
      ),
      block(
        'rag',
        { position: { x: -220, y: -30 } },
        {
          icon: <SearchCode className="size-6" />,
          label: 'RAG',
        },
      ),
      block(
        'dataapp',
        { position: { x: -100, y: -250 } },
        {
          icon: <DatabaseZap className="size-6" />,
          label: 'Data appp',
        },
      ),
      spiceBlock({
        position: { x: 200, y: 0 },
      }),
      postgresBlock({ position: { x: 700, y: -150 } }, { badge: undefined }),
      datalakeBlock({}, { badge: undefined }),
      aiBlock({ position: { x: 650, y: 300 } }),
      ftpBlock(),
      block(
        's3',
        { position: { x: 900, y: -120 } },
        {
          icon: <S3Icon className="size-8" />,
          label: 'AWS S3',
        },
      ),
      block(
        'gql',
        { position: { x: 500, y: -300 } },
        {
          icon: <GraphQlIcon className="size-6" />,
          label: 'GraphQL',
        },
      ),
      block(
        'snowflake',
        { position: { x: 700, y: 180 } },
        {
          icon: <SnowflakeIcon className="size-6" />,
          label: 'Snowflake',
        },
      ),
      block(
        'clickhouse',
        { position: { x: 850, y: 130 } },
        {
          icon: <ClickhouseIcon className="size-6" />,
          label: 'Clickhouse',
        },
      ),
      block(
        'mysql',
        { position: { x: 700, y: -250 } },
        {
          icon: <MysqlIcon className="size-6" />,
          label: 'MySQL',
        },
      ),
      block(
        'llm',
        { position: { x: 500, y: 300 } },
        {
          icon: <CpuIcon className="size-6" />,
          label: 'Local LLM',
        },
      ),
      block(
        'onnx',
        { position: { x: 550, y: 400 } },
        {
          icon: <OnnxIcon className="size-16" />,
          label: 'ONNX models',
        },
      ),
      block(
        'hf',
        { position: { x: 800, y: 300 } },
        {
          icon: <HuggingfaceIcon className="size-6" />,
          label: 'Huggingface',
        },
      ),
      block(
        'prometheus',
        { position: { x: -150, y: 250 } },
        {
          icon: <PrometheusIcon className="size-6" />,
          label: 'Prometheus',
        },
      ),
      block(
        'otel',
        { position: { x: -150, y: 350 } },
        {
          icon: <OpentelemetryIcon className="size-6" />,
          label: 'OpenTelemetry',
        },
      ),
    ],
    edges: [
      edge('e-spice', 'spice', 'app', {
        color: '#f80',
        speed: 0.2,
      }),
      edge('e-aiapp', 'spice', 'aiapp'),
      edge('e-rag', 'spice', 'rag'),
      edge('e-dataapp', 'spice', 'dataapp'),
      edge('e-prometheus', 'spice', 'prometheus'),
      edge('e-otel', 'spice', 'otel'),
      edge('e-postgres', 'db', 'spice'),
      edge('e-ftp', 'ftp', 'spice'),
      edge('e-datalake', 'datalake', 'spice'),
      edge('e-openai', 'ai', 'spice'),
      edge('e-llm', 'llm', 'spice'),
      edge('e-onnx', 'onnx', 'spice'),
      edge('e-hf', 'hf', 'spice'),
      edge('e-s3', 's3', 'spice'),
      edge('e-gql', 'gql', 'spice'),
      edge('e-mysql', 'mysql', 'spice'),
      edge('e-snowflake', 'snowflake', 'spice'),
      edge('e-clickhouse', 'clickhouse', 'spice'),
    ],
  },
};
