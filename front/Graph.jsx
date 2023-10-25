import React from 'react'
import createEngine, {
    DefaultLinkModel,
    DefaultNodeModel,
    DiagramModel
} from '@projectstorm/react-diagrams';


import {DemoCanvasWidget as Canvas} from './Canvas'

import {
    CanvasWidget
} from '@projectstorm/react-canvas-core';
const engine = createEngine();


const node1 = new DefaultNodeModel({
    name: 'Node 1',
    color: 'rgb(0,192,255)',
});
node1.setPosition(100, 100);
let port1 = node1.addOutPort('Out');

// node 2
const node2 = new DefaultNodeModel({
    name: 'Node 1',
    color: 'rgb(0,192,255)',
});
node2.setPosition(100, 100);
let port2 = node2.addOutPort('Out');
const link = port1.link(port2);
link.addLabel('Hello World!');

const model = new DiagramModel();
model.addAll(node1, node2, link);
engine.setModel(model);

const Graph = () => <Canvas><CanvasWidget engine={engine}  className="diagram-container" /></Canvas>
export default Graph
