import React, { useState } from 'react';
import {Button } from "reactstrap";

import Confirm from "views/admin/transaction/Confirm.js";
import Waitting from "views/admin/transaction/Waitting.js";
import Shipping from "views/admin/transaction/Shipping.js";
import Success from "views/admin/transaction/Success.js";
import Received from "views/admin/transaction/Received.js";
import Cancel from "views/admin/transaction/Cancel.js";



const QuanLyDonHang = () => {
  const [selectedIdss, setSelectedIds] = useState([]);
  const [isProductDeleted, setIsProductDeleteds] = useState(false);

  const handleConfirm = async () => {
    try {
     
      setSelectedIds([]);
      setIsProductDeleteds(true); 
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái đơn hàng:", error);
    }
  };

  return (
    <>
      {/* Truyền selectedIds và setIsProductDeleted như là props */}
      <Confirm selectedIdss={selectedIdss} setIsProductDeleteds={setIsProductDeleteds} />
      <Waitting selectedIdss={selectedIdss} setIsProductDeleteds={setIsProductDeleteds} />
      <Shipping selectedIdss={selectedIdss} setIsProductDeleteds={setIsProductDeleteds} />
      <Success selectedIdss={selectedIdss} setIsProductDeleteds={setIsProductDeleteds} />
      <Received selectedIdss={selectedIdss} setIsProductDeleteds={setIsProductDeleteds} />
      <Cancel selectedIdss={selectedIdss} setIsProductDeleteds={setIsProductDeleteds} />
      
      {/* Render các tab/thành phần khác */}
      <Button color="primary" outline size="sm" onClick={handleConfirm}>
        Xác nhận
      </Button>
    </>
  );
};

export default QuanLyDonHang;
