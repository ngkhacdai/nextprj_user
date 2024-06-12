"use server";

import { cookies } from "next/headers";
import { DELETE, POST } from "./route";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export const login = async (form) => {
  await POST(`/access/login`, form).then((response) => {
    cookies().set("userID", response.message.userId);
    cookies().set("token", response.message.accessToken);
  });
};
export const register = async (form) => {
  await POST(`/access/signup`, form);
};
export const verifyOtp = async (form) => {
  await POST(`/access/verifyOtp`, form).then((res) => {
    cookies().set("userID", res.newUser._id);
  });
};
export const signout = async () => {
  DELETE("/access/signOut");
  cookies().delete("userID");
  cookies().delete("token");
  redirect("/login");
};
