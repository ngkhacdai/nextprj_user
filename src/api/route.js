"use server";
import { cookies } from "next/headers";

// export const dynamic = "force-dynamic";
const API = "https://dai.tongdaihoidap.com";

export async function GET(request) {
  const userID = cookies().get("userID").value;
  const token = cookies().get("token").value;
  const res = await fetch(`${API}/v1/api${request}`, {
    headers: {
      "Content-Type": "application/json",
      "x-xclient-id": userID,
      authorization: token,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}

export async function POST(request, form) {
  const userID = cookies().get("userID")?.value;
  const token = cookies().get("token")?.value;

  const res = await fetch(`${API}/v1/api${request}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-xclient-id": userID,
      authorization: token,
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
export async function PUT(request, form) {
  const userID = cookies().get("userID")?.value;
  const token = cookies().get("token")?.value;

  const res = await fetch(`${API}/v1/api${request}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "x-xclient-id": userID,
      authorization: token,
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
export async function PATCH(request, form) {
  const userID = cookies().get("userID")?.value;
  const token = cookies().get("token")?.value;

  const res = await fetch(`${API}/v1/api${request}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-xclient-id": userID,
      authorization: token,
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
export async function DELETE(request, form) {
  const userID = cookies().get("userID")?.value;
  const token = cookies().get("token")?.value;

  const res = await fetch(`${API}/v1/api${request}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "x-xclient-id": userID,
      authorization: token,
    },
    body: JSON.stringify(form),
  });

  if (!res.ok) {
    console.log(res);
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return data;
}
