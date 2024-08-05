import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loadState } from "./storage";
import axios, { AxiosError } from "axios";
import { LoginResponce } from "../interfaces/auth.interface";

export const JWT_PERSISTENT_STATE = "userData";
export interface UserPersistentState {
  jwt: string | null;
}

export interface UserState {
  jwt: string | null;
  loginError?: string;
  registerError?: string;
}

const initialState: UserState = {
  jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null,
};

export const login = createAsyncThunk(
  "user/login",
  async (params: { email: string; password: string }) => {
    try {
      const { data } = await axios.post<LoginResponce>(
        `https://reqres.in/api/login`,
        {
          email: params.email,
          password: params.password,
        }
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.statusText);
      }
    }
  }
);

export const register = createAsyncThunk(
  "user/register",
  async (params: { email: string; password: string; name: string }) => {
    try {
      const { data } = await axios.post<LoginResponce>(
        `https://reqres.in/api/register`,
        {
          email: params.email,
          password: params.password,
        }
      );
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        throw new Error(e.response?.statusText);
      }
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
    },
    clearError: (state) => {
      state.loginError = undefined;
    },
    clearRegisterError: (state) => {
      state.registerError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action) => {
        if (!action.payload) {
          return;
        }
        state.jwt = action.payload.token;
      }
    );
    builder.addCase(login.rejected, (state, action) => {
      state.loginError = action.error.message;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.jwt = action.payload.token;
    });
    builder.addCase(register.rejected, (state) => {
      state.registerError = "Ошибка при регистрации";
    });
  },
});

export default userSlice.reducer;
export const userActions = userSlice.actions;
