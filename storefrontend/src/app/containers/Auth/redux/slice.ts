import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RLogin } from "../../../../utils/store/types";

export const initialState: RLogin = {
  accessToken: "",
  findUser: {
    _id: "",
    email: "",
    password: "",
    username: "",
    role:"",
    preference: "",
    __v: 0
  }
};

const authSlice = createSlice({
  name: "authState",
  initialState,
  reducers: {
    setForm: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      const { key, value } = action.payload;

      if (key === "accessToken") {
        state.accessToken = value;
      } else if (key === "findUser") {
        state.findUser = JSON.parse(value); // Assuming 'value' is a stringified JSON
      }
    },
    // logout(state) {},
  },
});

export const { actions, reducer, name: authSliceKey } = authSlice;
