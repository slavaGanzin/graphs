import React from 'react';
import ReactFlow, {Background, Controls} from 'reactflow';
import { shallow } from 'zustand/shallow';

import 'reactflow/dist/style.css';

import useStore from './HistoryStore';

const selector = (state) => ({
  nodes: state.state.nodes,
  edges: state.state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  undo: state.undo,
  redo: state.redo,
});

import Mousetrap from "mousetrap";
const Flow = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, undo, redo } = useStore(selector, shallow);

  React.useEffect(() => {
    Mousetrap.bind("ctrl+z", () => undo())
    Mousetrap.bind("ctrl+y", () => redo())
    return () => ['ctrl+z', 'ctrl+y'].map(Mousetrap.unbind)
  })

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
