import "../globals.css";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import HeaderComponent from "@/components/Header/Header";
const Header = dynamic(() => import("@/components/Header"), { ssr: false });

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({ children }) {
  return (
    <div>
      <div className="bg-green-300">
        <HeaderComponent />
      </div>
      {children}
    </div>
  );
}
