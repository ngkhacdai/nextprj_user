"use client";
import React, { useState } from "react";
import { Modal } from "antd";
import ModalAddress from "./ModalAddress";
import { IoMdClose } from "react-icons/io";
import { deleteAddress } from "@/api/User";

const AddressClient = ({ address }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addressID, setAddressID] = useState("");
  const showModal = (id) => {
    setAddressID(id);
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    const form = {
      addressID,
    };
    await deleteAddress(form);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div>
        <div className="flex items-center pb-2 justify-between">
          <p className="text-xl ">Địa chỉ của tôi</p>
          <ModalAddress getData={() => getData()} />
        </div>
        <hr />
        <div>
          <p className="text-xl">Địa chỉ</p>
        </div>
        <div>
          {address &&
            address.length > 0 &&
            address.map((item, index) => {
              return (
                <div key={`address-${index}`}>
                  <div className="flex justify-between my-2">
                    <div>
                      <div className="flex ">
                        <p className="mr-2">{item.userinfor.userName}</p>
                        <p>0{item.userinfor.phoneNumber}</p>
                      </div>
                      <p>{item.nameAddress}</p>
                      <p>{item.customAddress}</p>
                    </div>
                    <div>
                      <IoMdClose
                        onClick={() => {
                          showModal(item._id);
                        }}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                  <hr />
                </div>
              );
            })}
        </div>
        <Modal
          title="Xóa địa chỉ"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Bạn có muốn xóa địa chỉ này không?</p>
        </Modal>
      </div>
    </div>
  );
};

export default AddressClient;
