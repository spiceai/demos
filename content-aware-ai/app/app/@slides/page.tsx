'use client';

import 'reactflow/dist/style.css';

import { FC, ReactNode, useEffect } from 'react';
import ReactFlow, {
  Position,
  Node,
  Edge,
  Handle,
  NodeProps,
  useReactFlow,
  ReactFlowProvider,
} from 'reactflow';
import { Switcher } from './Switcher';
import { cn } from '@/lib/utils';
import { slides, Slide as SlideProps } from './slides';

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
      'border p-4 gap-4 flex items-center justify-center rounded-md relative min-w-28',
      data.className
    )}
  >
    <Handle type='source' position={Position.Left} className='opacity-0' />
    <div className='flex flex-col gap-2 items-center justify-center'>
      {data.icon}
      <div className='text-sm'>{data.label}</div>
      {data.badge}
    </div>
    <Handle type='target' position={Position.Right} className='opacity-0' />
  </div>
);

const nodeTypes = {
  block: BlockNode,
};

export default function Slide({ searchParams: { state } }: Params) {
  const slide = slides[state] || slides[0];
  return (
    <div className='relative w-full flex flex-shrink-0 h-96 justify-center items-center px-8 pt-8'>
      <ReactFlowProvider>
        <SlideView {...slide} />
      </ReactFlowProvider>
      <Switcher />
    </div>
  );
}

const SlideView = ({ title, nodes, edges }: SlideProps) => {
  const { fitView } = useReactFlow();

  useEffect(() => {
    setTimeout(() => fitView({ padding: 0.1, duration: 500 }), 300);
  }, [nodes]);

  return (
    <div className='flex w-full h-full flex-row grow align-middle'>
      <div className='flex w-40 items-center'>
        <h2 className='text-xl font-semibold text-wrap mx-auto text-center'>
          {title}
        </h2>
      </div>
      <div className='grow -ml-20'>
        <ReactFlow
          fitView
          zoomOnScroll={false}
          draggable={false}
          nodeTypes={nodeTypes}
          nodes={nodes}
          edges={edges}
          proOptions={{
            hideAttribution: true,
          }}
        />
      </div>
    </div>
  );
};
