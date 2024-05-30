import Loading from "@/app/loading";
import NavOrder from "@/components/user/NavOrder";
import { Suspense } from "react";

export default function OrderLayout({ children }) {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <NavOrder>{children}</NavOrder>
      </Suspense>
    </div>
  );
}
