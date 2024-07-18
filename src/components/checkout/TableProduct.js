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
      onCell: (record, rowIndex) => {
        const prevRecord = productSelected[rowIndex - 1];
        const nextRecord = productSelected[rowIndex + 1];
        let rowSpan = 1;
        if (rowIndex > 0 && record.name_shop === prevRecord?.name_shop) {
          return { rowSpan: 0 };
        }
        if (record.name_shop === nextRecord?.name_shop) {
          rowSpan = productSelected.filter(
            (item) => item.name_shop === record.name_shop
          ).length;
        }
        return { rowSpan };
      },
      render: (text) => text,
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

  const dataSource = productSelected.map((item, index) => ({
    ...item,
    key: item.productId || index, // Ensure each item has a unique key
  }));

  return (
    <div className="mt-2 w-full bg-white">
      <Table
        className="p-2"
        pagination={false}
        columns={columns}
        dataSource={dataSource}
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default TableProduct;
