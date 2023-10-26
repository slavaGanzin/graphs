import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import FlowEdit from './page/Flow/FlowEdit';
import FlowList from './page/Flow/FlowList';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FlowList />,
  },
  {
    path: '/flow/edit/:id',
    element: <FlowEdit />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
