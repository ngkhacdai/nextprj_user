import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showChat: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    onShowChat: (state) => {
      state.showChat = !state.showChat;
    },
  },
});

export const { onShowChat } = chatSlice.actions;

export default chatSlice.reducer;
