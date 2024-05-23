import "../globals.css";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import HeaderComponent from "@/components/Header/Header";
import { Affix } from "antd";
import Chat from "@/components/chat/Chat";
const Header = dynamic(() => import("@/components/Header"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({ children }) {
  return (
    <div>
      <Affix offsetTop={0}>
        <div className="bg-green-300">
          <HeaderComponent />
        </div>
      </Affix>
      {children}
      <Chat />
    </div>
  );
}
