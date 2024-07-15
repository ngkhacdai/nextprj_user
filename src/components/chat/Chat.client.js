"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { Button } from "antd";
import { IoMdChatbubbles, IoMdClose } from "react-icons/io";
import ChatForm from "./ChatForm";
import ChatBox from "./ChatBox";
import { API } from "@/helper/url";

const socket = io("http://localhost:8080", {
  transports: ["websocket"],
});

const ChatClient = ({ userId }) => {
  const [messageData, setMessageData] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [roomId, setRoomId] = useState(null);
  const [listUser, setListUser] = useState([]);
  useEffect(() => {
    socket.connect();

    socket.on("connect", () => {
      socket.emit("getListUser", { userId });
    });

    socket.on("listUserResponse", (data) => {
      setListUser(data);
    });

    socket.on("getallmessage", (data) => {
      setMessageData(data || []);
    });

    socket.on("newmessage", (message) => {
      setMessageData((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("connect");
      socket.off("getallmessage");
      socket.off("newmessage");
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = async (message) => {
    const form = {
      userId: roomId.userId,
      shopId: roomId.shopId._id,
      senderID: userId,
      message: message,
    };
    socket.emit("chat", form);
  };

  const toggleChat = () => {
    setIsShow((prevIsShow) => !prevIsShow);
  };

  const joinRoom = (item) => {
    setRoomId(item);
    socket.emit("joinroom", { userId: userId, shopId: item.shopId._id });
  };

  return (
    <div>
      <div
        className={`fixed bottom-0 z-20 right-0 w-full sm:w-128 min-h-120 bg-white border border-gray-300 shadow-lg transform transition-transform duration-300 ${
          isShow ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div
          className="bg-gray-200 p-2 flex justify-between items-center cursor-pointer"
          onClick={toggleChat}
        >
          <span>Chat</span>
          <IoMdClose />
        </div>
        <div className="flex">
          <div className="w-1/4 border-inherit border-2 h-[31rem] overflow-y-auto">
            {listUser.map((item, index) => (
              <div
                key={`user-${index}`}
                onClick={() => joinRoom(item)}
                className={`${
                  roomId?.shopId?._id === item?.shopId?._id
                    ? "bg-slate-300"
                    : ""
                } hover:bg-slate-200 p-2 border-inherit border-b-2 flex justify-start items-center cursor-pointer max-w-xs`}
              >
                <img
                  className="rounded-full mr-1 w-10 h-10"
                  alt=""
                  src={`${API}/${item?.shopId?.avatarShop}`}
                />
                <p>{item?.shopId?.nameShop}</p>
              </div>
            ))}
          </div>
          <div className="w-3/4 relative">
            <div className="max-h-[28rem] overflow-y-auto">
              <ChatBox messageData={messageData} />
            </div>
            <div className="p-2 border-gray-300 absolute bottom-0 w-full">
              <ChatForm sendMessage={sendMessage} />
            </div>
          </div>
        </div>
      </div>
      {!isShow && (
        <Button
          onClick={toggleChat}
          className="fixed bottom-4 right-4 flex items-center w-16 h-10 sm:w-24 sm:h-10"
        >
          <IoMdChatbubbles className="mr-1" />
          <p className="text-lg sm:text-xl">Chat</p>
        </Button>
      )}
    </div>
  );
};

export default ChatClient;
