"use client";
import { API } from "@/helper/url";
import { Avatar, List, Radio, Rate } from "antd";
import React, { useEffect, useState } from "react";

const ListReview = ({ reviews }) => {
  const [data, setData] = useState(reviews);
  const getUTCTimestamp = (dateReview) => {
    const d = new Date(dateReview).toISOString().split("T");
    const date = d[0];
    const time = d[1].split(".")[0];
    return `${date} ${time}`;
  };
  const fillter = (value) => {
    switch (value) {
      case "all":
        setData(reviews);
        break;
      case "5":
        setData(
          reviews.filter((item) => {
            return item.rating == 5;
          })
        );
        break;
      case "4":
        setData(
          reviews.filter((item) => {
            return item.rating == 4;
          })
        );
        break;
      case "3":
        setData(
          reviews.filter((item) => {
            return item.rating == 3;
          })
        );
        break;
      case "2":
        setData(
          reviews.filter((item) => {
            return item.rating == 2;
          })
        );
        break;
      case "1":
        setData(
          reviews.filter((item) => {
            return item.rating == 1;
          })
        );
        break;
      case "comment":
        setData(
          reviews.filter((item) => {
            return item.comment !== "";
          })
        );
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      {reviews == "Chưa có đánh giá nào" ? null : (
        <div>
          <div className="xs:flex items-center">
            <p className="mr-2">Sắp xếp theo: </p>
            <Radio.Group
              defaultValue="all"
              onChange={(e) => fillter(e.target.value)}
            >
              <Radio.Button value="all">Tất cả</Radio.Button>
              <Radio.Button value="5">5 Sao</Radio.Button>
              <Radio.Button value="4">4 Sao</Radio.Button>
              <Radio.Button value="3">3 Sao</Radio.Button>
              <Radio.Button value="2">2 Sao</Radio.Button>
              <Radio.Button value="1">1 Sao</Radio.Button>
              <Radio.Button value="comment">Có bình luận</Radio.Button>
            </Radio.Group>
          </div>
          <List
            pagination={{
              position: "bottom",
              align: "center",
            }}
            dataSource={data}
            renderItem={(item, index) => (
              <List.Item key={index}>
                <List.Item.Meta
                  avatar={
                    <Avatar src={`${API}/${item.user.information.avatar}`} />
                  }
                  title={
                    <div>
                      <p className="text-sm">
                        {item.user.information.fullName}
                      </p>
                      <p>
                        <Rate
                          className="text-sm"
                          disabled
                          value={item.rating}
                        />
                      </p>
                      <p>{getUTCTimestamp(item.updatedAt)}</p>
                    </div>
                  }
                  description={<p className="text-black">{item.comment}</p>}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default ListReview;
