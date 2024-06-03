import dynamic from "next/dynamic";

const CheckOut = dynamic(() => import("@/components/checkout/CheckOut"), {
  ssr: false,
});

const CheckOutPage = () => {
  return <CheckOut />;
};

export default CheckOutPage;
