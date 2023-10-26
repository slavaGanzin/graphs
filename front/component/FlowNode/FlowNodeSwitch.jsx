import React from 'react';
import { update } from 'ramda';
import FlowNodeAbstract from './FlowNodeAbstract';

import useFlowStore from '../../store/useFlowStore';

function SwitchNode({
  id, isConnectable,
}) {
  const [updateNode, node] = useFlowStore((x) => [x.updateNode, x.getNode(id)]);

  return (
    <FlowNodeAbstract name="switch" id={id} isConnectable={isConnectable} targets={node.data.conditions.map((x) => ({}))}>
      <label>Switch</label>
      {node.data.conditions.map((condition, i) => (
        <input
          key={i}
          id="text"
          name="text"
          onChange={(e) => updateNode(id, { ...node.data, conditions: update(i, e.target.value, node.data.conditions) })}
          className="nodrag"
          value={condition.value}
        />
      ))}
    </FlowNodeAbstract>
  );
}

export default SwitchNode;
