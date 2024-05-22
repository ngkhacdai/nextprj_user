import { getAllOrderByStatus } from "@/api/Order";
import ListOrder from "./ListOrder";

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
