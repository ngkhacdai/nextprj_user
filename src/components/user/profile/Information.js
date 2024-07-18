"use client";
import { Col, Row } from "antd";
import ModalUpdate from "./ModalUpdate";
import { API } from "@/helper/url";

const Information = ({ profile }) => {
  function hideEmail(email) {
    const parts = email.split("@");
    const visiblePart = parts[0].substring(0, 2);
    const hiddenPart = "*".repeat(parts[0].length - 2);
    return visiblePart + hiddenPart + "@" + parts[1];
  }
  function hideNumber(number) {
    const visibleDigits = 2;
    const hiddenDigits = Math.max(0, String(number).length - visibleDigits);
    return "*".repeat(hiddenDigits) + String(number).slice(-visibleDigits);
  }

  return (
    <div className="pl-2">
      <h3 className="text-xl mb-2">Hồ sơ của tôi</h3>
      <p className="mb-2">Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
      <hr />
      <Row justify="space-between">
        <Col>
          <div className="flex mb-2">
            <p className="mr-4 w-24 text-right">Tên</p>
            <p>
              {profile?.information ? (
                profile?.information?.fullName
              ) : (
                <span>Hãy cập nhật thông tin</span>
              )}
            </p>
          </div>
          <div className="flex mb-2">
            <p className="mr-4 w-24 text-right">Email</p>
            <span>{profile.email && hideEmail(profile?.email)}</span>
          </div>
          <div className="flex mb-2">
            <p className="mr-4 w-24 text-right">Số điện thoại</p>
            <span>
              {profile.information ? (
                hideNumber(profile?.information?.phoneNumber)
              ) : (
                <span>Hãy cập nhật thông tin</span>
              )}
            </span>
          </div>
          <div className="flex mb-2">
            <p className="mr-4 w-24 text-right">Giới tính</p>
            <span>
              {profile?.information ? (
                profile?.information?.gender
              ) : (
                <span>Hãy cập nhật thông tin</span>
              )}
            </span>
          </div>
        </Col>
        <div>
          <img
            src={`${API}/${profile?.information?.avatar}`}
            className="w-20 h-20 border-solid mt-2 border-2 border-black rounded"
            alt="Chưa có thông tin"
          />
        </div>
      </Row>
      <div className="mt-3">
        <ModalUpdate profile={profile} />
      </div>
    </div>
  );
};

export default Information;
