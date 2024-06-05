"use client";

import React from "react";
import { List, Menu } from "antd";
import { useRouter } from "next/navigation";
import { API } from "@/helper/url";

const MenuCategory = ({ category }) => {
  const router = useRouter();

  const handleClick = (item) => {
    const params = new URLSearchParams({
      id: item._id,
      name: item.category_name,
    }).toString();
    router.push(`/category?${params}`);
  };

  return (
    <div className="bg-white p-2 rounded-t-md">
      <p className="text-xl">Tất cả danh mục</p>
      <List
        itemLayout="horizontal"
        dataSource={category}
        renderItem={(item, index) => (
          <List.Item
            className="cursor-pointer hover:bg-slate-200"
            onClick={() => handleClick(item)}
          >
            <List.Item.Meta
              className="pl-2"
              // avatar={
              //   <img
              //     className="w-10 h-10"
              //     src={`${API}/${item.category_thumb}`}
              //     alt={item.category_name}
              //   />
              // }
              title={<p>{item.category_name}</p>}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default MenuCategory;
