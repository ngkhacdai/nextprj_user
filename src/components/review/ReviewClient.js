"use client";
import { reviewProduct } from "@/api/Product";
import { Button, Form, Input, Rate, notification } from "antd";
import { useRouter } from "next/navigation";

const ReviewClient = ({ productID }) => {
  const [api, contextHolder] = notification.useNotification();
  const router = useRouter();
  const onFinish = async (values) => {
    if (values.rating === 0) {
      return openNotificationWithIcon("Hãy chọn số sao");
    }
    await reviewProduct(productID, values);
    openNotificationWithIcon("Đánh giá sản phẩm thành công");
    router.push("/");
  };
  const openNotificationWithIcon = (content) => {
    api["success"]({
      message: "Thông báo",
      description: content,
    });
  };
  return (
    <div className="text-center p-2">
      {contextHolder}
      <p className="font-bold text-2xl mb-2">Đánh giá sản phẩm</p>
      <Form onFinish={onFinish} initialValues={{ rating: 5 }}>
        <Form.Item name="rating">
          <Rate />
        </Form.Item>
        <Form.Item name="comment">
          <Input.TextArea
            className="max-w-96"
            placeholder="Hãy chia sẻ thông tin của bạn về sản phẩm"
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Đánh giá
        </Button>
      </Form>
    </div>
  );
};

export default ReviewClient;
