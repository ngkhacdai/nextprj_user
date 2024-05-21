import { API } from "@/url";
import { Button } from "antd";
import Link from "next/link";
const ShopInfor = ({ ProductDetail }) => {
  return (
    <div className="bg-white mt-3 pb-2 w-full flex flex-row items-center">
      <div className="ml-2">
        <img
          alt=""
          preview={false}
          className="w-24 h-24 rounded-full border-black border mt-3"
          src={`${API}/${ProductDetail.shop_avatar}`}
        />
      </div>
      <div className="ml-2">
        <p>{ProductDetail.shop_name}</p>
        <span>
          <Button className="mr-2 text-orange-500 hover:bg-orange-300">
            Chat ngay
          </Button>
          <Link href={`/shop/${ProductDetail.shop_id}`}>
            <Button>Xem Shop</Button>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default ShopInfor;
