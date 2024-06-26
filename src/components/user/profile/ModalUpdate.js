"use client";
import { updateProfile } from "@/api/User";
import { fetchUserInfo } from "@/lib/features/userSlice";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Radio, Upload, notification } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ModalUpdate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [file, setFile] = useState([]);
  const [fullname, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [gender, setGender] = useState("Nam");
  const dispatch = useDispatch();
  const [api, contextHolder] = notification.useNotification();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const openNotificationWithIcon = (content, type = "error") => {
    api[type]({
      message: "Thông báo",
      description: content,
    });
  };
  const handleOk = async () => {
    if (file.length !== 0 && fullname && phoneNumber && gender) {
      const formData = new FormData();
      formData.append("avatar", file.originFileObj);
      formData.append("fullName", fullname);
      formData.append("gender", gender);
      formData.append("phoneNumber", phoneNumber);
      await updateProfile(formData);
      openNotificationWithIcon("Cập nhật thành công", "success");
      dispatch(fetchUserInfo());
      setIsModalOpen(false);
      clearForm();
    } else {
      openNotificationWithIcon("Hãy nhập đủ các trường");
    }
  };
  const clearForm = () => {
    setFullName("");
    setPhoneNumber("");
    setGender("Nam");
  };
  const handleCancel = () => {
    clearForm();
    setIsModalOpen(false);
  };
  return (
    <div>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Update thông tin cá nhân
      </Button>
      <Modal
        title="Update thông tin cá nhân"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Cập nhật"
        cancelText="Hủy"
      >
        <Form
          name="basic"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          className="w-full text-center"
          autoComplete="off"
        >
          <Form.Item
            label="Ảnh đại diện"
            name="avatar"
            rules={[
              {
                required: true,
                message: "Hãy chọn ảnh",
              },
            ]}
          >
            <Upload
              beforeUpload={() => false}
              maxCount={1}
              name="avatar"
              listType="picture-card"
              onChange={(e) => {
                setFile(e.fileList[0]);
              }}
            >
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Hãy điền họ và tên",
              },
            ]}
            label="Họ và tên"
            name="fullName"
            required={true}
          >
            <Input
              value={fullname}
              onChange={(e) => {
                setFullName(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            rules={[
              {
                required: true,
                min: 9,
                message: "Số điện thoại có ít nhất 9 số",
              },
            ]}
            required={true}
            name="phone"
          >
            <Input
              type="Number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </Form.Item>
          <Form.Item label="Giới tính" name="gender">
            <Radio.Group
              defaultValue={gender}
              onChange={(e) => {
                setGender(e.target.value);
              }}
            >
              <Radio value="Nam"> Nam </Radio>
              <Radio value="Nữ"> Nữ </Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalUpdate;
