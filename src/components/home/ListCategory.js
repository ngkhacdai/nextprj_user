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
      <div className="relative">
        <Row gutter={[10, 10]} justify="start">
          {category &&
            category.length > 0 &&
            category.map((item, index) => {
              return (
                <Col
                  onClick={() => onSelectCategory(item)}
                  className="text-center justify-center flex-col flex cursor-pointer border border-inherit hover:bg-white hover:z-10 hover:scale-110 duration-700"
                  xs={6}
                  sm={4}
                  md={4}
                  lg={3}
                  xl={2}
                  key={`category-${index}`}
                >
                  <Image
                    preview={false}
                    className=""
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
