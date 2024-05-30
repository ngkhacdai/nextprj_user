import Loading from "@/app/loading";
import SideBar from "@/components/user/SideBar";
import { Suspense } from "react";

export default function UserLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <div className="h-full mx-auto sm:w-3/4">
        <SideBar>{children}</SideBar>
      </div>
    </Suspense>
  );
}
