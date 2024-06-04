import { getAllOrderByStatus } from "@/api/Order";
import dynamic from "next/dynamic";
const ListOrder = dynamic(() => import("./ListOrder"), { ssr: false });

const Order = async ({ status }) => {
  const orderStatus = status || "pending";
  const orderData = await getAllOrderByStatus(orderStatus);

  return (
    <div>
      <ListOrder orderData={orderData} />
    </div>
  );
};

export default Order;
