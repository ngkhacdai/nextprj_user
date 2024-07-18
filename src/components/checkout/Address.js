"use client";
import { Button, Col, Modal, Radio, Row, Space } from "antd";
import { useState } from "react";

const Address = ({ address }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectIndex, setSelectedIndex] = useState(0);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRadioChange = (e) => {
    setSelectedIndex(e.target.value);
  };

  return (
    <div className="bg-white p-2">
      <div className="text-xl text-red-400">Địa chỉ nhận hàng</div>
      <Modal
        title="Địa chỉ của tôi"
        open={isModalOpen} // Use 'open' instead of 'visible'
        onCancel={handleCancel} // Use 'onClose' instead of 'onCancel'
        okButtonProps={{ style: { display: "none" } }}
      >
        <hr />
        <Radio.Group onChange={handleRadioChange} value={selectIndex}>
          <Space direction="vertical">
            {address?.map((item, index) => (
              <Radio key={`address-${index}`} value={index}>
                <Row>
                  <Col className="mr-2 font-bold">
                    {item.userinfor.userName}
                  </Col>
                  <Col className="mr-2 font-bold">
                    0{item.userinfor.phoneNumber}
                  </Col>
                  <Col className="mr-2">{item.customAddress}</Col>
                </Row>
              </Radio>
            ))}
          </Space>
        </Radio.Group>
      </Modal>
      {address && address.length > 0 ? (
        <Row className="items-center">
          <Col className="mr-2 font-bold">
            {address[selectIndex].userinfor.userName}
          </Col>
          <Col className="mr-2 font-bold">
            0{address[selectIndex].userinfor.phoneNumber}
          </Col>
          <Col className="mr-2">{address[selectIndex].customAddress}</Col>
          <Col className="mr-2">
            <Button className="border-none" onClick={showModal}>
              Thay đổi
            </Button>
          </Col>
        </Row>
      ) : (
        <div>Chưa có địa chỉ</div>
      )}
    </div>
  );
};

export default Address;
