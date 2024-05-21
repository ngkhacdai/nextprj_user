import { getProfile } from "@/services/userAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUserInfo = createAsyncThunk(
  "user/fetchUserInfo",
  async () => {
    const response = await getProfile();
    return response;
  }
);

const initialState = {
  profile: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      state.profile = action.payload;
    });
  },
});

export default userSlice.reducer;
