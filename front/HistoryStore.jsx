import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

const initialNodes =  [
  {
    id: '1',
    type: 'input',
    data: { label: 'Input' },
    position: { x: 250, y: 25 },
  },

  {
    id: '2',
    data: { label: 'Default' },
    position: { x: 100, y: 125 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: 'Output' },
    position: { x: 250, y: 250 },
  },
]

const useStore = create((set, get) => ({
  history: [],
  index: -1,
  state: {
    nodes: initialNodes,
    edges: initialEdges,
  },
  setState: (newState) => {
    set((state) => {
      const currentIndex = state.index;
      const newHistory = state.history.slice(0, currentIndex + 1);
      newHistory.push(newState);
      return {
        history: newHistory,
        index: currentIndex + 1,
        state: newState,
      };
    });
  },
  undo: () => {
    set((state) => {
      if (state.index > 0) {
        const newIndex = state.index - 1;
        const newState = state.history[newIndex];
        return {
          index: newIndex,
          state: newState,
        };
      }
      return state;
    });
  },
  redo: () => {
    set((state) => {
      if (state.index < state.history.length - 1) {
        const newIndex = state.index + 1;
        const newState = state.history[newIndex];
        return {
          index: newIndex,
          state: newState,
        };
      }
      return state;
    });
  },
  onNodesChange: (changes) => {
    get().setState({
      nodes: applyNodeChanges(changes, get().state.nodes),
    });
  },
  onEdgesChange: (changes) => {
    get().setState({
      edges: applyEdgeChanges(changes, get().state.edges),
    });
  },
  onConnect: (connection) => {
    get().setState({
      edges: addEdge(connection, get().state.edges),
    });
  },
}));

export default useStore;
