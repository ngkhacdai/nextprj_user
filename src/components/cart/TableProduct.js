"use client";
import { Button, Table } from "antd";
import { useDispatch } from "react-redux";
import { API } from "@/helper/url";

import {
  onRemoveItem,
  onSelectProduct,
  onUpdateQuantityDec,
  onUpdateQuantityInc,
} from "@/lib/features/cartSlice";
import { useEffect, useState } from "react";
import { deleteProductInCart, updateUserCartQuantity } from "@/api/Cart";
const TableProduct = ({ cart, getData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(onSelectProduct([]));
  }, []);
  const [loadingUp, setLoadingUp] = useState(false);
  const columns = [
    {
      title: "Sản phẩm",
      render: (record) => {
        return (
          <div className="flex justify-start overflow-hidden">
            <img
              alt=""
              src={`${API}/uploads/${record.product_thumb}`}
              style={{ width: "50px", height: "50px" }}
            />
            <span className="w-56 line-clamp-2 pl-2">{record.name}</span>
          </div>
        );
      },
    },
    {
      title: "Phân loại",
      render: (record) => {
        return (
          <div>
            <div>{record.color}</div>
            <div>{record.size}</div>
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
        return (
          <div>
            <Button
              disabled={loadingUp || record.quantity <= 1}
              onClick={() => onDecrement(record)}
            >
              -
            </Button>
            <span className="mx-2">{record.quantity}</span>
            <Button disabled={loadingUp} onClick={() => onIncrement(record)}>
              +
            </Button>
          </div>
        );
      },
    },
    {
      title: "Số tiền",
      render: (record) => {
        let total = record.price * record.quantity;
        return (
          <p>
            {total.toLocaleString("en-US", {
              style: "currency",
              currency: "VND",
            })}
          </p>
        );
      },
    },
    {
      title: "Thao tác",
      render: (record) => {
        return (
          <div>
            <Button
              onClick={() => onDeleteProduct(record)}
              className="hover:text-red-500"
            >
              Xóa
            </Button>
          </div>
        );
      },
    },
  ];
  const onDecrement = async (record) => {
    if (record.quantity === 1) return;
    const shop_order_ids = [
      {
        shopId: record.shopId,
        item_product: [
          {
            productId: record.productId,
            quantity: record.quantity - 1,
            old_quantity: record.quantity,
            size: record.size,
            color: record.color,
          },
        ],
      },
    ];
    setLoadingUp(true);
    const res = await updateUserCartQuantity(shop_order_ids);
    if (res) setLoadingUp(false);
    else setLoadingUp(false);
    dispatch(onUpdateQuantityDec({ itemId: record.itemId }));
  };
  const onIncrement = async (record) => {
    const shop_order_ids = [
      {
        shopId: record.shopId,
        item_product: [
          {
            productId: record.productId,
            quantity: record.quantity + 1,
            old_quantity: record.quantity,
            size: record.size,
            color: record.color,
          },
        ],
      },
    ];
    await updateUserCartQuantity(shop_order_ids);
    dispatch(onUpdateQuantityInc({ itemId: record.itemId }));
  };
  const onDeleteProduct = async (record) => {
    const form = {
      productId: record.productId,
      size: record.size,
      color: record.color,
    };
    await deleteProductInCart(form);
    dispatch(onRemoveItem({ itemId: record.itemId }));
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      dispatch(onSelectProduct(selectedRows));
    },
  };

  return (
    <div>
      <Table
        span={24}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        rowKey={"itemId"}
        dataSource={cart}
        pagination={false}
        className="w-full"
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default TableProduct;
