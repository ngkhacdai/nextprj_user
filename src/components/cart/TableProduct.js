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
import { useEffect, useState, useCallback } from "react";
import { deleteProductInCart, updateUserCartQuantity } from "@/api/Cart";
import { debounce } from "lodash";

const TableProduct = ({ cart }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(cart);

  useEffect(() => {
    setData(cart);
  }, [cart]);

  useEffect(() => {
    dispatch(onSelectProduct([]));
  }, []);

  const [loadingUp, setLoadingUp] = useState(false);
  const [quantityChanges, setQuantityChanges] = useState({});

  const debouncedUpdateQuantity = useCallback(
    debounce((shop_order_ids) => {
      updateUserCartQuantity(shop_order_ids);
    }, 1000),
    []
  );

  const updateQuantity = (record, change) => {
    const itemId = record.itemId;
    const newQuantity =
      (quantityChanges[itemId]?.quantity || record.quantity) + change;

    if (newQuantity < 1) return;

    const updatedQuantityChanges = {
      ...quantityChanges,
      [itemId]: {
        ...record,
        quantity: newQuantity,
      },
    };
    setQuantityChanges(updatedQuantityChanges);

    const shop_order_ids = [
      {
        shopId: record.shopId,
        item_product: [
          {
            productId: record.productId,
            quantity: newQuantity,
            old_quantity: record.quantity,
            size: record.size,
            color: record.color,
          },
        ],
      },
    ];

    debouncedUpdateQuantity(shop_order_ids);

    if (change > 0) {
      dispatch(onUpdateQuantityInc({ itemId: record.itemId }));
    } else {
      dispatch(onUpdateQuantityDec({ itemId: record.itemId }));
    }
  };

  const onDecrement = (record) => {
    updateQuantity(record, -1);
  };

  const onIncrement = (record) => {
    updateQuantity(record, 1);
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
        const itemId = record.itemId;
        const quantity = quantityChanges[itemId]?.quantity || record.quantity;

        return (
          <div>
            <Button
              disabled={loadingUp || quantity <= 1}
              onClick={() => onDecrement(record)}
            >
              -
            </Button>
            <span className="mx-2">{quantity}</span>
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
        const itemId = record.itemId;
        const quantity = quantityChanges[itemId]?.quantity || record.quantity;
        let total = record.price * quantity;
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

  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        rowKey={"itemId"}
        dataSource={data}
        pagination={false}
        className="w-full"
        scroll={{ x: 900 }}
      />
    </div>
  );
};

export default TableProduct;
