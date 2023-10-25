import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';

export default useStore = create((set, get) => ({
  history: [],
  index: -1,
  state: {
    nodes: [],
    edges: [],
  },
  updateNode: (id, data) => {
    const nodes = get().state.nodes
    nodes.find(x => x.id==id).data = data
    get().setState({...get(), nodes})
  },
  getNode: id => get().state.nodes.find(x => x.id ==id),
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
