"use server";

import axios from "axios";
import { cookies } from "next/headers";

export const login = async (form) => {
  console.log(form);
  await axios
    .post(`https://dai.tongdaihoidap.com/v1/api/access/login`, form)
    .then((response) => {
      cookies().set("userID", response.data.message.userId);
      cookies().set("token", response.data.message.accessToken);
    });
};
