import Header from "@/components/Header";
import SideBar from "@/components/user/SideBar";

export default function UserLayout({ children }) {
  return (
    <div className="h-full mx-auto sm:w-3/4">
      <SideBar>{children}</SideBar>
    </div>
  );
}
