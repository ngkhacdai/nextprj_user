// In your server component or function file
"use server";
import { cookies } from "next/headers";

export const getListUsers = async () => {
  // Fetch the cookie value on the server
  const cookieStore = cookies();
  const userId = cookieStore.get("userID")?.value;

  // Ensure userId is present
  if (!userId) {
    throw new Error("User ID not found in cookies");
  }

  // Fetch the list of users using the userId
  const response = await fetch(`http://localhost:3001/getListUser/${userId}`, {
    method: "GET",
  });

  // Parse the response
  const listUser = await response.json();

  // Return the list of users (must be serializable)
  return listUser;
};
