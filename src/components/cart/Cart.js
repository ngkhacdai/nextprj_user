import { Affix } from "antd";
import FooterCart from "./FooterCart";
import TableProduct from "./TableProduct";
import { getCart } from "@/api/Cart";

const Cart = async () => {
  const cart = await getCart();

  return (
    <div>
      <div className="md:w-3/4 mx-auto">
        <div className=" bg-white">
          <TableProduct cart={cart} />
        </div>
        <div>
          <Affix className="w-full mt-2" offsetBottom={0}>
            <FooterCart />
          </Affix>
        </div>
      </div>
    </div>
  );
};

export default Cart;
