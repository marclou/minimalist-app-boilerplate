import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import authService from '../services/auth';

let refreshTokenTimeout;
const user = JSON.parse(localStorage.getItem('user'));
const tokens = JSON.parse(localStorage.getItem('tokens'));
const initialState = {
  isLoggedIn:
    user && tokens && new Date(tokens.access.expires) > Date.now() && new Date(tokens.refresh.expires) > Date.now(),
  user: user || null,
  tokens: tokens || null,
};

const startRefreshTokenTimer = (thunkAPI, tokens) => {
  refreshTokenTimeout && stopRefreshTokenTimer();
  const expires = new Date(tokens.access.expires);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  refreshTokenTimeout = setTimeout(() => thunkAPI.dispatch(refreshTokens({ refreshToken: tokens.refresh.token })), timeout);
};

const stopRefreshTokenTimer = () => {
  clearTimeout(refreshTokenTimeout);
};

export const register = createAsyncThunk('auth/register', async ({ name, email, password, tz }, thunkAPI) => {
  try {
    const response = await authService.register(name, email, password, tz);

    startRefreshTokenTimer(thunkAPI, response.tokens);

    return { user: response.user, tokens: response.tokens };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const response = await authService.login(email, password);

    startRefreshTokenTimer(thunkAPI, response.tokens);

    return { user: response.user, tokens: response.tokens };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshTokens = createAsyncThunk('auth/refreshToken', async ({ refreshToken }, thunkAPI) => {
  try {
    const response = await authService.refreshTokens(refreshToken);

    startRefreshTokenTimer(thunkAPI, response);

    return { tokens: response };
  } catch (error) {
    console.log(error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async ({ refreshToken }, thunkAPI) => {
  try {
    await authService.logout(refreshToken);

    stopRefreshTokenTimer();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.tokens = action.payload.tokens;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.tokens = null;
    },
    [refreshTokens.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.tokens = action.payload.tokens;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
      state.tokens = null;
    },
  },
});

const { reducer } = authSlice;
export default reducer;
