"use client";
import {
  Button,
  Col,
  ConfigProvider,
  Radio,
  Rate,
  Row,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { onSelectProduct } from "@/lib/features/cartSlice";
import { addProductToCart } from "@/api/Cart";
import { useRouter } from "next/navigation";

const ProductInfo = ({ ProductDetail }) => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const [attribute, setAttribute] = useState("");
  const [options, setOptions] = useState("");
  const [count, setCount] = useState(1);
  const router = useRouter();
  const onSelectAttributed = (e) => {
    setCount(1);
    setAttribute(e.target.value);
  };
  const onSelectOption = (e) => {
    setCount(1);
    setOptions(e.target.value);
  };
  useEffect(() => {
    setOptions("");
  }, [attribute]);
  const payProduct = async () => {
    if (count > options.options_quantity) {
      return openNotificationWithIcon("Số lượng sản phẩm trong kho không đủ");
    }
    if (!attribute || !options) {
      return openNotificationWithIcon("Hãy chọn các thuộc tính để mua");
    }
    const form = [
      {
        productId: window.location.pathname.split("/")[2],
        shopId: ProductDetail.shop_id,
        quantity: count,
        name: ProductDetail.product_name,
        price: ProductDetail.product_price,
        color: attribute.color,
        size: options.size,
        product_thumb: ProductDetail.product_thumb[0],
        name_shop: ProductDetail.shop_name,
      },
    ];
    dispatch(onSelectProduct(form));
    router.push("/checkout");
  };
  const addToCart = async () => {
    if (count > options.options_quantity) {
      return openNotificationWithIcon("Số lượng sản phẩm trong kho không đủ");
    }
    if (!attribute || !options) {
      return openNotificationWithIcon(
        "Hãy chọn các thuộc tính để thêm vào giỏ hàng"
      );
    }
    const product = {
      productId: window.location.pathname.split("/")[2],
      shopId: ProductDetail.shop_id,
      quantity: count,
      name: ProductDetail.product_name,
      price: ProductDetail.product_price,
      color: attribute.color,
      size: options.size,
    };
    await addProductToCart(product).then(() => {
      openNotificationWithIcon("Thêm vào giỏ hàng thành công", "success");
    });
  };
  const countIncrement = () => {
    if (count < options.options_quantity) {
      setCount(count + 1);
    }
  };
  const countDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const openNotificationWithIcon = (content, type = "error") => {
    api[type]({
      message: "Thông báo",
      description: content,
    });
  };
  return (
    <div>
      {contextHolder}
      <div className="">
        <h2 className="text-2xl font-bold">{ProductDetail.product_name}</h2>
        <Row gutter={[10, 10]} className="flex items-center">
          <Col>
            <span>
              <Rate
                allowHalf
                defaultValue={ProductDetail?.product_ratingAverage}
                disabled
              />
            </span>
          </Col>
          <Col>
            <span>
              {ProductDetail?.reviews === "Chưa có đánh giá nào"
                ? 0
                : ProductDetail?.reviews.length}
            </span>
            <span> Đánh giá</span>
          </Col>
          <Col>
            <span className="mr-1">{ProductDetail.product_sold}</span>
            <span>Đã bán</span>
          </Col>
        </Row>
        <h2 className="text-xl text-red-500 font-bold ">
          {ProductDetail.product_price.toLocaleString("en-US", {
            style: "currency",
            currency: "VND",
          })}
        </h2>
        <div className="mt-2">
          <Radio.Group value={attribute} onChange={onSelectAttributed}>
            {ProductDetail.product_attributes.map((item, index) => (
              <Radio.Button key={`attribute-${index}`} value={item}>
                {item.color}
              </Radio.Button>
            ))}
          </Radio.Group>
        </div>
        <div className="my-2">
          <Radio.Group value={options} onChange={onSelectOption}>
            {attribute &&
              attribute.options.map((item, index) => (
                <Radio.Button key={`options-${index}`} value={item}>
                  {item.size}
                </Radio.Button>
              ))}
          </Radio.Group>
        </div>
        <div>Số lượng hàng còn lại: {options.options_quantity}</div>
      </div>
      <div className="my-2">
        <Button onClick={countDecrement}>-</Button>
        <span className="mx-5">{count}</span>
        <Button onClick={countIncrement}>+</Button>
      </div>
      <div>
        <Button onClick={addToCart} type="primary" className="mr-3 ">
          Thêm vào giỏ hàng
        </Button>
        <ConfigProvider
          theme={{
            components: {
              Button: {
                colorPrimary: "red",
                algorithm: true,
              },
            },
          }}
        >
          {!attribute || !options ? (
            <Button type="primary" onClick={payProduct}>
              Mua ngay
            </Button>
          ) : (
            <Button type="primary" onClick={payProduct}>
              Mua ngay
            </Button>
          )}
        </ConfigProvider>
      </div>
    </div>
  );
};

export default ProductInfo;
