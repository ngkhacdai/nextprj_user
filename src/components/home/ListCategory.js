"use client";
import { API } from "@/helper/url";
import { Col, Image, Row } from "antd";
import { useRouter } from "next/navigation";

const ListCategory = ({ category }) => {
  const router = useRouter();

  const onSelectCategory = (select) => {
    const params = new URLSearchParams({
      id: select._id,
      name: select.category_name,
    }).toString();
    router.push(`/category?${params}`);
  };
  return (
    <div className="bg-white p-2 mb-3">
      <p className="text-lg p-2">Danh mục</p>
      <div className="relative">
        <Row gutter={[10, 10]} justify="start">
          {category &&
            category.length > 0 &&
            category.map((item, index) => {
              return (
                <Col
                  onClick={() => onSelectCategory(item)}
                  className="text-center justify-center xs:w-1/6 md:w-1/12  w-1/4  container flex-col flex cursor-pointer border border-inherit hover:border-gray-300 hover:shadow-lg"
                  key={`category-${index}`}
                >
                  <img
                    className="mx-auto w-16 bg-slate-200 object-scale-down h-16 m-4 rounded-full"
                    src={`${API}/${item.category_thumb}`}
                    alt=""
                  />
                  <p>{item.category_name}</p>
                </Col>
              );
            })}
        </Row>
      </div>
    </div>
  );
};

export default ListCategory;
