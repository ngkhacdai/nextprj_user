import dynamic from "next/dynamic";

// import Order from;
const Order = dynamic(() => import("@/components/user/Order"), {
  ssr: false,
});
const OrderStatusPage = ({ params }) => {
  return (
    <div>
      <Order status={params.orderStatus} />
    </div>
  );
};

export default OrderStatusPage;
