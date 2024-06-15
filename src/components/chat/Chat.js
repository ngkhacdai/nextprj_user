import { getCookie } from "@/api/route";
import ChatClient from "./Chat.client";
import { getListUsers } from "@/api/Chat";

const Chat = async () => {
  // const listUser = await getListUsers();
  const cookie = await getCookie();
  return (
    <div>
      <ChatClient userId={cookie.userID} />
    </div>
  );
};

export default Chat;
