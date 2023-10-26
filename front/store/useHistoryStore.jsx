import { create } from 'zustand';

const useHistoryStore = create((set, get) => ({
  history: [],
  index: -1,
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
}));

export default useHistoryStore;
