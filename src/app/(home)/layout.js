import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import { Affix } from "antd";
import "../globals.css";
import { Inter } from "next/font/google";
import HeaderComponent from "@/components/Header/Header";
import Chat from "@/components/chat/Chat";
import Loading from "../loading";
import Footer from "@/components/footer/Footer";

const Header = dynamic(() => import("@/components/Header"), { ssr: false });
const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({ children }) {
  return (
    <div className={`${inter.className} flex flex-col min-h-screen`}>
      <Affix offsetTop={0}>
        <div className="bg-white">
          <HeaderComponent />
        </div>
      </Affix>
      <div className="flex-grow">
        {children}
        <Chat />
      </div>
      <Footer />
    </div>
  );
}
