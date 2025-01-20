// features/userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const register = createAsyncThunk(
    'user/register',
    async ({ username, password }, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:3001/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error('Registration failed');
        }
  
        const data = await response.json();
        console.log('Registration successful:', data); // Логируем успешную регистрацию
        return data;
      } catch (error) {
        console.error('Registration error:', error.message); // Логируем ошибку
        return rejectWithValue(error.message);
      }
    }
  );
  
  // Действие для входа
  export const login = createAsyncThunk(
    'user/login',
    async ({ username, password }, { rejectWithValue }) => {
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const data = await response.json();
        console.log('Login successful:', data); // Логируем успешный вход
  
        // Возвращаем user и token из ответа сервера
        return { user: data.user, token: data.token };
      } catch (error) {
        console.error('Login error:', error.message); // Логируем ошибку
        return rejectWithValue(error.message);
      }
    }
  );
  
  const userSlice = createSlice({
    name: 'user',
    initialState: {
      user: null,
      token: null,
      status: 'idle',
      error: null,
    },
    reducers: {
      logout(state) {
        state.user = null;
        state.token = null;
        state.status = 'idle';
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(login.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(login.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.user = action.payload.user; // Проверьте, что user обновляется
          state.token = action.payload.token; // Проверьте, что token обновляется
          console.log('User state updated:', state); // Логируем обновление состояния
        })
        .addCase(login.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
          console.error('Login failed:', action.payload); // Логируем ошибку
        });
    },
  });
  
  export const { logout } = userSlice.actions;
  export default userSlice.reducer;