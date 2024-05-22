import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../schema";

export interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  token: string;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  token: "",
};

const API_URL = process.env.REACT_APP_API_SERVER;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    loginUser: builder.mutation<{ user: User; token: string }, Partial<User>>({
      query: (userData) => ({
        url: "/auth/login",
        method: "POST",
        body: userData,
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            userSlice.actions.setUser({
              user: data.user,
              isAuthenticated: true,
              token: data.token,
            })
          );
        } catch (error) {}
      },
    }),
    signupUser: builder.mutation<{ user: User; token: string }, Partial<User>>({
      query: (userData) => ({
        url: "/auth/signup",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useLoginUserMutation, useSignupUserMutation } = authApi;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
      state.token = action.payload.token;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.token = "";
    },
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
