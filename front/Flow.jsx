import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import { shallow } from 'zustand/shallow';
import addGlobalBinds from 'bind-mousetrap-global';
import Mousetrap from 'mousetrap';
import useStore from './HistoryStore';
import nodeTypes from './FlowNode/index';

import 'reactflow/dist/style.css';

addGlobalBinds(Mousetrap);

const selector = (state) => ({
  nodes: state.state.nodes,
  edges: state.state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  undo: state.undo,
  redo: state.redo,
});

function Flow() {
  const {
    nodes, edges, onNodesChange, onEdgesChange, onConnect, undo, redo,
  } = useStore(selector, shallow);

  React.useEffect(() => {
    Mousetrap.bindGlobal('ctrl+z', () => undo());
    Mousetrap.bindGlobal('ctrl+y', () => redo());
    return () => ['ctrl+z', 'ctrl+y'].map(Mousetrap.unbind);
  });

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow
        nodeTypes={nodeTypes}
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
