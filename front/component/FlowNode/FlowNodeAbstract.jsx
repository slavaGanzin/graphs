import React from 'react';
import { Handle, Position } from 'reactflow';

function Handles({ handles, type, defaults }) {
  return handles.map((props, i) => (
    <Handle
      type={type}
      key={i}
      id={String(i)}
      position={props.position || defaults.position}
      isConnectable={props.isConnectable || defaults.isConnectable}
      style={{ left: `${(i + 1) * (100 / (handles.length + 1))}%` }}
    />
  ));
}

function FlowNodeAbstract({
  id, children, isConnectable, name, sources = [{}], targets = [{}],
}) {
  return (
    <div className={`node ${name}-node`}>
      <Handles type="target" handles={targets} defaults={{ position: Position.Top, isConnectable }} />
      <div>
        {children}
      </div>
      <Handles type="source" handles={sources} defaults={{ position: Position.Bottom, isConnectable }} />
    </div>
  );
}

export default FlowNodeAbstract;
