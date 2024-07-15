"use client";
import { API } from "@/helper/url";
import { Button, Col, Pagination, Row } from "antd";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa6";

const ListProduct = ({ product }) => {
  const [productItem, setProductItem] = useState(product.slice(0, 24));
  const ref = useRef();
  useEffect(() => {
    setProductItem(product.slice(0, 24));
  }, [product]);
  const changePage = (page) => {
    // ref.current.scrollIntoView();
    setProductItem(product.slice((page - 1) * 25, 25 * page - 1));
  };
  return (
    <div ref={ref} className="">
      <Row justify="start" className="container mx-auto">
        {productItem && productItem.length > 0 ? (
          productItem.map((item, index) => (
            <Col
              xs={12}
              sm={12}
              md={6}
              lg={6}
              xl={4}
              key={`product-${index}`}
              className="p-1"
            >
              <div className="bg-white border-2 border-transparent hover:drop-shadow-lg hover:border-green-500 transition hover:-translate-y-1 duration-500">
                <Link
                  href={`/product/${item._id}`}
                  className="w-full hover:text-black"
                >
                  <img
                    alt={item.product_name}
                    className="w-full h-52 object-cover"
                    src={`${API}/uploads/${item.product_thumb[0]}`}
                  />
                  <div className="p-2">
                    <p
                      className="text-black"
                      style={{
                        lineHeight: "1.5em",
                        height: "3em",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                        wordBreak: "break-word",
                      }}
                    >
                      {item.product_name}
                    </p>
                    <div className="text-red-500 font-bold">
                      {item.product_price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </div>
                    <div justify="space-between">
                      <p className="text-black text-xs">
                        Đã bán: {item.product_sold}
                      </p>
                    </div>
                    <div className="flex justify-between pt-1">
                      <div className="flex items-center">
                        <p className="text-black text-xs">
                          {item.product_ratingAverage}/5
                        </p>
                        <FaStar color="yellow" />
                      </div>
                      <div className="text-black">
                        <Button>Chi tiết</Button>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </Col>
          ))
        ) : (
          <p className="w-full text-center mt-2 text-xl">
            Không có sản phẩm nào
          </p>
        )}
      </Row>
      <Pagination
        className="p-2 text-center"
        defaultCurrent={1}
        total={product.length}
        pageSize={24}
        showSizeChanger={false}
        onChange={changePage}
      />
    </div>
  );
};

export default ListProduct;
