"use client";
import ListProduct from "@/components/ListProduct";
import ListCategory from "@/components/home/ListCategory";
import { getAllCategory } from "@/services/categoryAPI";
import { getAllProduct } from "@/services/productAPI";
import { Spin } from "antd";
import { useEffect, useState } from "react";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const getData = async () => {
      setProduct(await getAllProduct());
      setCategory(await getAllCategory());
      setIsLoading(false);
    };

    getData();
  }, []);

  if (isLoading) {
    return <Spin fullscreen />;
  }

  return (
    <div className="md:w-3/4 mx-auto">
      <ListCategory category={category} />
      <ListProduct product={product} />
    </div>
  );
}
