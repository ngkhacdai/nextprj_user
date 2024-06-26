"use client";
import { API } from "@/helper/url";
import { Table } from "antd";
import { useSelector } from "react-redux";

const TableProduct = () => {
  const productSelected = useSelector((state) => state.cart.selectProduct);
  const columns = [
    {
      title: "Shop Name",
      dataIndex: "name_shop",
      key: "name_shop",
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };
        if (
          index > 0 &&
          row.name_shop === productSelected[index - 1].name_shop
        ) {
          obj.props.rowSpan = 0;
        } else {
          const count = productSelected.filter(
            (item) => item.name_shop === value
          ).length;
          obj.props.rowSpan = count;
        }
        return obj;
      },
    },
    {
      title: "Sản phẩm",
      render: (record) => {
        return (
          <div className="flex items-center">
            <img
              alt=""
              className="w-24 h-24"
              src={`${API}/uploads/${record.product_thumb}`}
            />
            <span className="line-clamp-2 pl-2">{record.name}</span>
          </div>
        );
      },
    },
    {
      title: "",
      render: (record) => {
        return (
          <div>
            <p>Màu {record.color}</p>
            <p>Kích cỡ {record.size}</p>
          </div>
        );
      },
    },
    {
      title: "Đơn giá",
      render: (record) => {
        return (
          <p>
            {record.price.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        );
      },
    },
    {
      title: "Số lượng",
      render: (record) => {
        return <p>{record.quantity}</p>;
      },
    },
    {
      title: "Số tiền",
      render: (record) => {
        return (
          <p>
            {(record.price * record.quantity).toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        );
      },
    },
  ];

  return (
    <div className="mt-2 w-full bg-white">
      <Table
        className="p-2"
        pagination={false}
        columns={columns}
        dataSource={productSelected}
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default TableProduct;
