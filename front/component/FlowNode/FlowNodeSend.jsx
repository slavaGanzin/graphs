import React from 'react';
import FlowNodeAbstract from './FlowNodeAbstract';
import useFlowStore from '../../store/useFlowStore';

function SendNode({ id, isConnectable }) {
  const [updateNode, node] = useFlowStore((x) => [x.updateNode, x.getNode(id)]);

  return (
    <FlowNodeAbstract name="send" id={id} isConnectable={isConnectable}>
      <label>Send</label>
      <input
        id="text"
        name="text"
        onChange={(e) => updateNode(id, { text: e.target.value })}
        className="nodrag"
        value={node.data.text}
      />
    </FlowNodeAbstract>
  );
}

export default SendNode;
