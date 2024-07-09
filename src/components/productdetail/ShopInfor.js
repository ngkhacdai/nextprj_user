"use client";
import { getCookie } from "@/api/route";
import { API } from "@/helper/url";
import { Button } from "antd";
import Link from "next/link";
import { useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8080/", {
  transports: ["websocket"],
});

const ShopInfor = ({ ProductDetail }) => {
  const chat = async () => {
    const cookie = await getCookie();
    const userId = cookie.userID;
    console.log("UserID:", userId);

    socket.emit("joinroom", {
      userId,
      shopId: ProductDetail.shop_id,
    });
  };

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  return (
    <div className="bg-white mt-3 pb-2 w-full flex flex-row items-center">
      <div className="ml-2">
        <img
          alt=""
          className="w-24 h-24 rounded-full border-black border mt-3"
          src={`${API}/${ProductDetail.shop_avatar}`}
        />
      </div>
      <div className="ml-2">
        <p>{ProductDetail.shop_name}</p>
        <span>
          <Button
            onClick={chat}
            className="mr-2 text-orange-500 hover:bg-orange-300"
          >
            Chat ngay
          </Button>
          <Link href={`/shop/${ProductDetail.shop_id}`}>
            <Button>Xem Shop</Button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ShopInfor;
