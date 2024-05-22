import Order from "@/components/user/Order";

const OrderStatusPage = ({ params }) => {
  return (
    <div>
      <Order status={params.orderStatus} />
    </div>
  );
};

export default OrderStatusPage;
