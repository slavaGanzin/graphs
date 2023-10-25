import React from 'react'
import './nodes.css';

import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

export default QuestionNode = ({id, isConnectable }) => {
  const [updateNode, node] = useStore(x => [x.updateNode, x.getNode(id)])

  return (
    <div className="question-node node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>
        <label>Question</label>
        <input id="text" name="text" onChange={e => updateNode(id, {...node.data, text: e.target.value})} className="nodrag" value={node.data.text}/>
        <div>
        <label>Options</label>
        {node.data.options.map((value,i) => {
          const updateOptions = value => {
            node.data.options[i] = value
            return node.data.options
          }
          return <input key={i} id="text" name="text" onChange={e => updateNode(id, {...node.data, options: updateOptions(e.target.value) })} className="nodrag" value={value}/>
        })}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="0" isConnectable={isConnectable} />
    </div>
  );
}
