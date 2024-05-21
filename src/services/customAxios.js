"use server";
import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import history from "history";
const API = "https://dai.tongdaihoidap.com";

const instance = axios.create({
  baseURL: `${API}/v1/api`,
});

instance.interceptors.request.use(async (request, res) => {
  const accessToken = cookies().has("token");
  if (accessToken) {
    request.headers["x-xclient-id"] = cookies().get("userID").value;
    request.headers["authorization"] = cookies().get("token").value;
  } else {
    cookies().delete("token");
    cookies().delete("userID");
    redirect("/login");
  }
  return request;
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
