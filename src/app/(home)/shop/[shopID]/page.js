import Shop from "@/components/shop/Shop";
import React from "react";

const page = ({ params }) => {
  return <Shop shopID={params.shopID} />;
};

export default page;
