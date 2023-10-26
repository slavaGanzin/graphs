import React from 'react';
import ReactFlow, { Background, Controls } from 'reactflow';
import { mapObjIndexed } from 'ramda';
import addGlobalBinds from 'bind-mousetrap-global';
import Mousetrap from 'mousetrap';
import { useParams } from 'react-router-dom';
import useFlowStore from '../../store/useFlowStore';
import nodeTypes from '../../component/FlowNode/nodeTypes';
import useFetch from '../../hooks/useFetch';

import 'reactflow/dist/style.css';

import FlowParser from '../../helpers/FlowParser';

addGlobalBinds(Mousetrap);

function FlowEdit() {
  const {
    state: { id, nodes, edges }, onNodesChange, onEdgesChange, onConnect, undo, redo, fetchFlow, getNode, updateNode,
  } = useFlowStore();

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

function FlowLoader() {
  const params = useParams();

  const { data, isLoading, get } = useFetch(`/flow/${params.id}`, {});

  React.useEffect(() => {
    if (!data) {
      get();
      return;
    }
    const { edges, nodes } = FlowParser(data);
    useFlowStore.getState().setState({ edges, nodes, id: params.id });
  }, [params.id, data]);

  if (data) return <FlowEdit />;
  return 'loading';
}

export default FlowLoader;
