// import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
// import { create } from 'zustand';
// import useHistoryStore from './useHistoryStore';
//
// const data = [
//   {
//     id: 0,
//     kind: 'send',
//     data: { text: 'Hello' },
//     next: [1],
//   },
//   {
//     id: 1,
//     kind: 'question',
//     data: { text: 'Are you good', options: ['Yes', 'No'] },
//     next: [3],
//   },
//   {
//     id: 3,
//     kind: 'switch',
//     data: {
//       conditions: [
//         { property: 'answer', operation: 'eq', value: 'Yes' },
//         { property: 'answer', operation: 'eq', value: 'No' },
//       ],
//     },
//     next: ['4', '5'],
//   },
//   {
//     id: 4,
//     kind: 'send',
//     data: { text: 'That is Good' },
//   },
//   {
//     id: 5,
//     kind: 'send',
//     data: { text: 'Shame on you' },
//   },
// ];
//
// const { edges, nodes } = FlowParser(data);
//
// const useFlowStore = (id) =>
// // const { data, error, isLoading } = useFetch(`/flow/${id}`, {});
//
//   create((set, get) => ({
//     ...useHistoryStore(),
//     state: {
//       nodes, edges,
//     },
//     updateNode: (id, data) => {
//       const { nodes } = get().state;
//       nodes.find((x) => x.id === id).data = data;
//       get().setState({ ...get(), nodes });
//     },
//     getNode: (id) => get().state.nodes.find((x) => x.id === id),
//     onNodesChange: (changes) => {
//       get().setState({
//         nodes: applyNodeChanges(changes, get().state.nodes),
//       });
//     },
//     onEdgesChange: (changes) => {
//       get().setState({
//         edges: applyEdgeChanges(changes, get().state.edges),
//       });
//     },
//     onConnect: (connection) => {
//       get().setState({
//         edges: addEdge(connection, get().state.edges),
//       });
//     },
//   }));
//
// export default useFlowStore;

import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import useFetch from '../hooks/useFetch';

const useStore = create((set, get) => ({
  history: [],
  index: -1,
  state: {
    nodes: [],
    edges: [],
    id: null,
  },
  updateNode: (id, data) => {
    const { nodes } = get().state;
    nodes.find((x) => x.id === id).data = data;
    get().setState({ ...get(), nodes });
  },
  getNode: (id) => get().state.nodes.find((x) => x.id === id),
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
