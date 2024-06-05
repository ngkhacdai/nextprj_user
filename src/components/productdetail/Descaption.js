import { API } from "@/helper/url";
import { Image } from "antd";

const Descaption = ({ ProductDetail }) => {
  return (
    <div className="bg-white mt-3 ">
      <div className="p-5">
        <h3 className="text-2xl mb-2">Chi tiết sản phẩm</h3>
        <div style={{ whiteSpace: "pre-wrap" }}>
          {ProductDetail.product_description}
        </div>
        {ProductDetail.product_thumb.map((item, index) => {
          return (
            <div key={`descaption-${index}`}>
              <Image
                alt=""
                preview={false}
                src={`${API}/uploads/${item}`}
                className="mt-2 w-screen "
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Descaption;
