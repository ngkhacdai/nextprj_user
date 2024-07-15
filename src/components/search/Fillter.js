"use client";
import { Button, Modal, Radio, Space } from "antd";
import { useState } from "react";
import { FaFilter } from "react-icons/fa6";

const Fillter = ({ productSearch = [], sortProduct }) => {
  const [isShowModal, setIsShopModal] = useState(false);
  const [value, setValue] = useState(1);

  const handleOk = () => {
    setIsShopModal(false);

    switch (value) {
      case 1:
        return sortProduct(productSearch);
      case 2:
        return sortProduct(
          [...productSearch].sort((a, b) => {
            const nameA = a.product_name.toUpperCase();
            const nameB = b.product_name.toUpperCase();
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
          })
        );
      case 3:
        return sortProduct(
          [...productSearch].sort((a, b) => a.product_price - b.product_price)
        );
      case 4:
        return sortProduct(
          [...productSearch].sort((a, b) => b.product_sold - a.product_sold)
        );
    }
  };

  const handleCancel = () => {
    setIsShopModal(false);
  };

  const showModal = () => {
    setIsShopModal(true);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <Button onClick={showModal} className="flex mt-2 items-center">
        <FaFilter data-testid="btnsort" className="mr-2" />
        <p>Sắp xếp</p>
      </Button>
      <Modal
        title="Sắp xếp sản phẩm"
        okText={"Lưu"}
        cancelText="Hủy"
        onOk={handleOk}
        onCancel={handleCancel}
        open={isShowModal}
      >
        {/* <p>Sắp xếp theo:</p> */}
        <Radio.Group onChange={onChange} value={value}>
          <Space direction="vertical">
            <Radio value={1}>Tất cả</Radio>
            <Radio value={2}>Tên</Radio>
            <Radio value={3}>Giá</Radio>
            <Radio value={4}>Số lượng bán</Radio>
          </Space>
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default Fillter;
