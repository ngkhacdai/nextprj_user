"use server";

import { cookies } from "next/headers";
import { POST } from "./route";
export const login = async (form) => {
  await POST(`access/login`, form).then((response) => {
    console.log(response);
    cookies().set("userID", response.data.message.userId);
    cookies().set("token", response.data.message.accessToken);
  });
};
export const register = async (form) => {
  await POST(`access/login`, form);
};
export const verifyOtp = async (form) => {
  await POST(`/access/verifyOtp`, form).then((res) => {
    cookies().set("userID", res.newUser._id);
  });
};
