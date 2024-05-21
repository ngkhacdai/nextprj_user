"use client";
import Address from "@/components/checkout/Address";
import Method from "@/components/checkout/Method";
import TableProduct from "@/components/checkout/TableProduct";
import { getAddress } from "@/services/userAPI";
import { Spin } from "antd";
import { useEffect, useState } from "react";

const CheckOut = () => {
  const [address, setAddress] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getData = async () => {
    setAddress(await getAddress());
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div className="mx-auto md:w-3/4">
      <Address address={address} />
      <TableProduct />
      <Method address={address} />
    </div>
  );
};

export default CheckOut;
