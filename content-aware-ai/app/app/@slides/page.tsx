'use client';

import 'reactflow/dist/style.css';

import { FC, ReactNode, useEffect } from 'react';
import ReactFlow, {
  Position,
  Handle,
  NodeProps,
  useReactFlow,
  ReactFlowProvider,
  getBezierPath,
  EdgeProps,
  BaseEdge,
} from 'reactflow';
import { Switcher } from './Switcher';
import { cn } from '@/lib/utils';
import { slides, Slide as SlideProps } from './slides';
import { useAnimationStore } from '@/lib/store';

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
    badge?: ReactNode;
  }>
> = ({ data }) => (
  <div
    className={cn(
      'border-2 border-gray-800 p-4 gap-4 flex items-center justify-center rounded-md relative min-w-32 shadow-md',
      data.className
    )}
  >
    <Handle type="source" position={Position.Left} className="opacity-0" />
    <div className="flex flex-col gap-2 items-center justify-center">
      {data.icon}
      <div className="font-semibold">{data.label}</div>
      <div className="absolute top-[85%] left-8 flex flex-col gap-1">
        {data.badge}
      </div>
    </div>
    <Handle type="target" position={Position.Right} className="opacity-0" />
  </div>
);

export const Connection: FC<EdgeProps> = ({
  id,
  sourceX,
  sourceY,
  sourcePosition,
  targetX,
  targetY,
  targetPosition,
  style,
  markerStart,
  markerEnd,
}) => {
  const store = useAnimationStore();
  const [path] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  if (store.animatedEdges[id] === true) {
    return (
      <BaseEdge
        id={id}
        key={`${id}-animated`}
        path={path}
        style={{
          ...style,
          strokeWidth: 4,
          strokeDasharray: 5,
          animation: style?.animation,
        }}
        markerStart={markerStart}
        markerEnd={markerEnd}
      />
    );
  }

  return (
    <BaseEdge
      id={id}
      key={`${id}-static`}
      path={path}
      style={{
        ...style,
        strokeWidth: 2,
        strokeDasharray: 5,
        opacity: 0.5,
        animation: undefined,
      }}
      markerStart={markerStart}
      markerEnd={markerEnd}
    />
  );
};

const nodeTypes = {
  block: BlockNode,
};

const edgeTypes = {
  connection: Connection,
};

export default function Slide({ searchParams: { state } }: Params) {
  const slide = slides[state] || slides[0];
  return (
    <div
      className={cn(
        'w-full flex flex-shrink-0 h-[500px] justify-center items-center px-16 pt-4',
        slide.fullscreen ? 'h-full grow' : 'h-[500px]'
      )}
    >
      <ReactFlowProvider>
        <SlideView {...slide} />
      </ReactFlowProvider>
    </div>
  );
}

const SlideView = ({ title, nodes, edges, fullscreen }: SlideProps) => {
  const { fitView } = useReactFlow();

  useEffect(() => {
    setTimeout(() => fitView({ padding: 0.2, duration: 500 }), 300);
  }, [nodes]);

  return (
    <div
      className={cn(
        'flex w-full h-full grow align-middle gap-8',
        fullscreen ? 'flex-col pb-8' : 'flex-col max-w-7xl'
      )}
    >
      <div className="relative grow bg-gray-300 border border-gray-400 rounded-lg">
        <ReactFlow
          fitView
          zoomOnScroll={false}
          draggable={false}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          nodes={nodes}
          edges={edges}
          proOptions={{
            hideAttribution: true,
          }}
        />
        <Switcher />
      </div>
      <div className={cn('flex items-center', !fullscreen && 'whitespace-pre')}>
        <h2 className="text-3xl font-semibold italic text-wrap mx-auto text-center text-gray-700">
          {title}
        </h2>
      </div>
    </div>
  );
};
