import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
  status: 'idle',
  error: null,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
      fetchMessagesStart(state) {
        state.status = 'loading';
      },
      fetchMessagesSuccess(state, action) {
        state.messages = action.payload;
        state.status = 'succeeded';
      },
      fetchMessagesFailure(state, action) {
        state.status = 'failed';
        state.error = action.payload;
      },
      addMessage(state, action) {
        state.messages.push(action.payload);
      },
    },
  });

  export const { fetchMessagesStart, fetchMessagesSuccess, fetchMessagesFailure, addMessage } = chatSlice.actions;

  export const fetchMessages = () => async (dispatch, getState) => {
    dispatch(fetchMessagesStart());
    try {
      const token = getState().user.token;
      const response = await fetch('http://localhost:3001/chats', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
  
      const data = await response.json();
      dispatch(fetchMessagesSuccess(data));
    } catch (error) {
      dispatch(fetchMessagesFailure(error.message));
    }
  };


  export const sendMessage = (message) => async (dispatch, getState) => {
    const token = getState().user.token;
    try {
      const response = await fetch('http://localhost:3001/chats', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body: message }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
  
      const data = await response.json();
      dispatch(addMessage(data));
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  export default chatSlice.reducer;