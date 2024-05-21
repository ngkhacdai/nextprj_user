"use client";
import FooterCart from "@/components/cart/FooterCart";
import TableProduct from "@/components/cart/TableProduct";
import { onSelectProduct } from "@/lib/features/cartSlice";
import { getCart } from "@/services/cartAPI";
import { Affix, Spin } from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch();
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // localStorage.setItem("cart", cart._id);
  const getData = async () => {
    setCart(await getCart());
    dispatch(onSelectProduct([]));
    setIsLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }
  return (
    <div className="md:w-3/4 mx-auto">
      <div className=" bg-white">
        <TableProduct
          cart={cart}
          setIsLoading={setIsLoading}
          getData={() => getData()}
        />
      </div>
      <div>
        <Affix className="w-full mt-2" offsetBottom={0}>
          <FooterCart />
        </Affix>
      </div>
    </div>
  );
};

export default Cart;
