import { API } from "@/helper/url";
import { HomeOutlined } from "@ant-design/icons";
import { Breadcrumb, Col, Row } from "antd";
import Link from "next/link";
import { BiCategory } from "react-icons/bi";

const CardCategory = ({ searchParams, category }) => {
  return (
    <div>
      <div className="w-full bg-white p-2 rounded-xl border-inherit">
        <Row justify="space-between">
          <Col>
            <p className="text-2xl">{searchParams.name}</p>
            <div className="flex items-center pt-2">
              <Breadcrumb
                items={[
                  {
                    title: (
                      <Link href={"/"}>
                        <HomeOutlined />
                      </Link>
                    ),
                  },
                  {
                    title: (
                      <div className="flex items-center">
                        <BiCategory />
                        <span>Category</span>
                      </div>
                    ),
                  },
                  {
                    title: <p>{searchParams.name}</p>,
                  },
                ]}
              />
            </div>
          </Col>
          <Col>
            <img
              alt=""
              className="w-20 h-20"
              src={`${API}/${
                category.find((item) => item._id === searchParams.id)
                  .category_thumb
              }`}
            />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CardCategory;
