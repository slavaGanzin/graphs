import React from 'react';
import Flow from './Flow';

import useStore from './HistoryStore';

import demoScript from './demoScript';
import FlowParser from './FlowParser';

const App = function () {
  const setState = useStore((x) => x.setState);
  setState(FlowParser(demoScript));
  return <Flow />;
};

export default App;
