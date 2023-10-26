import React from 'react';
import { update } from 'ramda';
import FlowNodeAbstract from './FlowNodeAbstract';
import useFlowStore from '../../store/useFlowStore';

function QuestionNode({
  id, isConnectable,
}) {
  const [updateNode, node] = useFlowStore((x) => [x.updateNode, x.getNode(id)]);

  return (
    <FlowNodeAbstract name="question" id={id} isConnectable={isConnectable}>
      <label>Question</label>
      <input id="text" name="text" onChange={(e) => updateNode(id, { ...node.data, text: e.target.value })} className="nodrag" value={node.data.text} />
      <div>
        <label>Options</label>
        {node.data.options.map((value, i) => (
          <input
            key={i}
            id="text"
            name="text"
            onChange={(e) => updateNode(id, { ...node.data, options: update(i, e.target.value, node.data.options) })}
            className="nodrag"
            value={value}
          />
        ))}
      </div>
    </FlowNodeAbstract>
  );
}

export default QuestionNode;
