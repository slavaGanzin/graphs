import React from 'react'
import './nodes.css';

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

export default SwitchNode = ({id, isConnectable }) => {
  const [updateNode, node] = useStore(x => [x.updateNode, x.getNode(id)])

  return (
    <div className="switch-node node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label>Switch</label>
        {node.data.conditions.map((condition,i) => {
          const updateCondition = value => {
            node.data.conditions[i] = value
            return node.data.conditions
          }
          return <input key={i} id="text" name="text" onChange={e => updateNode(id, {...node.data, conditions: updateCondition(e.target.value) })} className="nodrag" value={condition.value}/>
        })}
      </div>
      {node.data.conditions.map((condition, i) =>
        <Handle type="source" position={Position.Bottom} key={i} id={String(i)} style={{left: (i+1)*(100/(node.data.conditions.length+1))+'%'}} isConnectable={isConnectable} />
      )}
    </div>
  );
}
