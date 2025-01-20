import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice"
import chatReducer from "./ChatSlice"


const loadState = () => {
    try {
      const serializedState = localStorage.getItem('reduxState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('reduxState', serializedState);
    } catch (err) {
      console.error('Could not save state:', err);
    }
  };
  
  const preloadedState = loadState();
  
  const store = configureStore({
    reducer: {
      user: userReducer,
      chat: chatReducer,
    },
    preloadedState,
  });
  
  store.subscribe(() => {
    saveState(store.getState());
  });
  
  export default store;