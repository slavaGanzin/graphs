import React from 'react'
import './nodes.css';

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

export default SendNode = ({id, isConnectable }) => {
  const [updateNode, node] = useStore(x => [x.updateNode, x.getNode(id)])

  return (
    <div className="send-node node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label>Send</label>
        <input id="text" name="text" onChange={e => updateNode(id, {text: e.target.value})} className="nodrag" value={node.data.text}/>
      </div>
      <Handle type="source" position={Position.Bottom} id="0" isConnectable={isConnectable} />
    </div>
  );
}
