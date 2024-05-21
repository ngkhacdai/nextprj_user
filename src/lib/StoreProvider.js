"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { rootReducer } from "./store";

export default function StoreProvider({ children }) {
  const storeRef = useRef();
  if (!storeRef.current) {
    storeRef.current = rootReducer();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
