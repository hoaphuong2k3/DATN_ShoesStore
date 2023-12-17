import React, { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import {
  getAllBrand1, getAllOrigin1, getAllDesignStyle1, getAllSkinType1, getAllToe1, getAllSole1, getAllLining1, getAllCushion1, getAllSize1, getAllColor1
} from "services/ProductAttributeService";
// reactstrap components
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  Card, CardHeader, CardBody, Container, Row, Col, FormGroup, Label, Input, Button, Table, CardTitle, Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { toast } from 'react-toastify';
import Header from "components/Headers/Header.js";
import axios from "axios";
import axiosInstance from "services/custommize-axios";
import { Tooltip, Popconfirm } from 'antd';


const ProductAttributes = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [modalEdit, setModalEdit] = useState(false);
  const toggleEdit = () => setModalEdit(!modalEdit);
  const [dataEdit, setDataEdit] = useState({});
  const [selecttt, setSelecttt] = useState('color');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElenments] = useState(0);
  const handlePageClick = (event) => {
    setPage(+event.selected);
  }
  const onChangeSize = (e) => {
    setSize(+e.target.value);
  }
  const [search, setSearch] = useState({
    "codeOrName": ""
  });
  const [formData, setformData] = useState({
    name: ""
  });

  const [list, setList] = useState([]);
  const handleDelete = async (id) => {
    if (selecttt === 'color') {
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        try {
          const response = await axiosInstance.delete(`/admin/color/delete`, { data: [id] });
          getColor();
          toast.success("Xóa màu sắc thành công");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }
      }
    } else if (selecttt === 'brand') {
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        try {
          const response = await axiosInstance.delete(`/admin/brand/delete`, { data: [id] });
          getColor();
          toast.success("Xóa thương hiệu thành công");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }
      }
    } else if (selecttt === 'origin') {
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        try {
          const response = await axiosInstance.delete(`/admin/origin/delete`, { data: [id] });
          getOrigin();
          toast.success("Xóa xuất xứ thành công");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }
      }
    } else if (selecttt === 'design_style') {
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        try {
          const response = await axiosInstance.delete(`/admin/design-style/delete`, { data: [id] });
          getDesignStyle();
          toast.success("Xóa thiết kế thành công");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }
      }
    } else if (selecttt === 'skin_type') {
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        try {
          const response = await axiosInstance.delete(`/admin/skin-type/delete`, { data: [id] });
          getSkinType();
          toast.success("Xóa da giày thành công");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }
      }
    } else if (selecttt === 'sole') {
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        try {
          const response = await axiosInstance.delete(`/admin/sole/delete`, { data: [id] });
          getSole();
          toast.success("Xóa đế giày thành công");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }
      }
    } else if (selecttt === 'toe') {
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        try {
          const response = await axiosInstance.delete(`/admin/toe/delete`, { data: [id] });
          getToe();
          toast.success("Xóa mũi giày thành công");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }
      }
    } else if (selecttt === 'lining') {
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        try {
          const response = await axiosInstance.delete(`/admin/lining/delete`, { data: [id] });
          getLining();
          toast.success("Xóa lót giày thành công");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }
      }
    } else if (selecttt === 'cushion') {
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        try {
          const response = await axiosInstance.delete(`/admin/cushion/delete`, { data: [id] });
          getCushion();
          toast.success("Xóa đệm giày thành công");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }
      }
    } else if (selecttt === 'size') {
      //size
      if (window.confirm("Bạn có chắc chắn muốn xóa không?")) {
        try {
          const response = await axiosInstance.delete(`/admin/size/delete`, { data: [id] });
          getSize();
          toast.success("Xóa size giày thành công");
        } catch (error) {
          let errorMessage = "Lỗi từ máy chủ";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
          toast.error(errorMessage);
        }
      }
    }
  }

  const handleProductAttribites = async () => {
    if (selecttt === 'color') {
      try {
        const response = await axiosInstance.post(`/admin/color`, formData);
        toggle();
        setformData({ ...setformData, name: "" });
        getColor();
        toast.success("Thêm mới màu sắc thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'brand') {
      try {
        const response = await axiosInstance.post(`/admin/brand`, formData);
        toggle();
        setformData({ ...setformData, name: "" });
        getBrand();
        toast.success("Thêm mới thương hiệu thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'origin') {
      try {
        const response = await axiosInstance.post(`/admin/origin`, formData);
        toggle();
        setformData({ ...setformData, name: "" });
        getOrigin();
        toast.success("Thêm mới xuất xứ thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'design_style') {
      try {
        const response = await axiosInstance.post(`/admin/design-style`, formData);
        toggle();
        setformData({ ...setformData, name: "" });
        getDesignStyle();
        toast.success("Thêm mới thiết kế thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'skin_type') {
      try {
        const response = await axiosInstance.post(`/admin/skin-type`, formData);
        toggle();
        setformData({ ...setformData, name: "" });
        getSkinType();
        toast.success("Thêm mới loại da thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'sole') {
      try {
        const response = await axiosInstance.post(`/admin/sole`, formData);
        toggle();
        setformData({ ...setformData, name: "" });
        getSole();
        toast.success("Thêm mới đế giày thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'toe') {
      try {
        const response = await axiosInstance.post(`/admin/toe`, formData);
        toggle();
        setformData({ ...setformData, name: "" });
        getToe();
        toast.success("Thêm mới mũi giày thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'lining') {
      try {
        const response = await axiosInstance.post(`/admin/lining`, formData);
        toggle();
        setformData({ ...setformData, name: "" });
        getLining();
        toast.success("Thêm mới lót giày thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'cushion') {
      try {
        const response = await axiosInstance.post(`/admin/cushion`, formData);
        toggle();
        setformData({ ...setformData, name: "" });
        getCushion();
        toast.success("Thêm mới đệm giày thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'size') {
      //size
      try {
        const response = await axiosInstance.post(`/admin/size`, formData);
        toggle();
        setformData({ ...setformData, name: "" });
        getSize();
        toast.success("Thêm mới size thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    }
  }
  const handleEdit = (item) => {
    setDataEdit(item);
    setformData({ ...setformData, name: item.name });
    toggleEdit();
  }
  const EditProductAttribites = async () => {
    if (selecttt === 'color') {
      try {
        await axiosInstance.put(`/admin/color/${dataEdit.id}`, formData);
        toggleEdit();
        getColor();
        setformData({ ...formData, name: "" })
        setDataEdit({});
        toast.success("Sửa màu sắc thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'brand') {
      try {
        await axiosInstance.put(`/admin/brand/${dataEdit.id}`, formData);
        toggleEdit();
        getBrand();
        setformData({ ...formData, name: "" })
        setDataEdit({});
        toast.success("Sửa thương hiệu thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'origin') {
      try {
        await axiosInstance.put(`/admin/origin/${dataEdit.id}`, formData);
        toggleEdit();
        getOrigin();
        setformData({ ...formData, name: "" })
        setDataEdit({});
        toast.success("Sửa xuất xứ thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'design_style') {
      try {
        await axiosInstance.put(`/admin/design-style/${dataEdit.id}`, formData);
        toggleEdit();
        getDesignStyle();
        setformData({ ...formData, name: "" })
        setDataEdit({});
        toast.success("Sửa thiết kế thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'skin_type') {
      try {
        await axiosInstance.put(`/admin/skin-type/${dataEdit.id}`, formData);
        toggleEdit();
        getSkinType();
        setformData({ ...formData, name: "" })
        setDataEdit({});
        toast.success("Sửa loại da thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'sole') {
      try {
        await axiosInstance.put(`/admin/sole/${dataEdit.id}`, formData);
        toggleEdit();
        getSole();
        setformData({ ...formData, name: "" })
        setDataEdit({});
        toast.success("Sửa đế giày thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'toe') {
      try {
        await axiosInstance.put(`/admin/toe/${dataEdit.id}`, formData);
        toggleEdit();
        getToe();
        setformData({ ...formData, name: "" })
        setDataEdit({});
        toast.success("Sửa mũi giày thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'lining') {
      try {
        await axiosInstance.put(`/admin/lining/${dataEdit.id}`, formData);
        toggleEdit();
        getLining();
        setformData({ ...formData, name: "" })
        setDataEdit({});
        toast.success("Sửa lót giày thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'cushion') {
      try {
        await axiosInstance.put(`/admin/cushion/${dataEdit.id}`, formData);
        toggleEdit();
        getCushion();
        setformData({ ...formData, name: "" })
        setDataEdit({});
        toast.success("Sửa đệm giày thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    } else if (selecttt === 'size') {
      //size
      try {
        await axiosInstance.put(`/admin/size/${dataEdit.id}`, formData);
        toggleEdit();
        getSize();
        setformData({ ...formData, name: "" })
        setDataEdit({});
        toast.success("Sửa size giày thành công");
      } catch (error) {
        let errorMessage = "Lỗi từ máy chủ";
        if (error.response && error.response.data && error.response.data.message) {
          errorMessage = error.response.data.message;
        }
        toast.error(errorMessage);
      }
    }

  }

  useEffect(() => {
    getColor();
  }, []);
  const getAll = () => {
    if (selecttt === 'color') {
      getColor();
    } else if (selecttt === 'brand') {
      getBrand();
    } else if (selecttt === 'origin') {
      getOrigin();
    } else if (selecttt === 'design_style') {
      getDesignStyle();
    } else if (selecttt === 'skin_type') {
      getSkinType();
    } else if (selecttt === 'sole') {
      getSole();
    } else if (selecttt === 'toe') {
      getToe();
    } else if (selecttt === 'lining') {
      getLining();
    } else if (selecttt === 'cushion') {
      getCushion();
    } else if (selecttt === 'size') {
      //size
      getSize();
    }
  }
  useEffect(() => {
    getAll();
  }, [search]);
  useEffect(() => {
    getAll();
  }, [selecttt]);
  //call api get-all
  const getColor = async () => {
    try {
      let res = await getAllColor1(page, size, search);
      if (res && res.data && res.data.content) {
        setList(res.data.content);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      setList([]);
    }
  };
  const getBrand = async () => {
    try {
      let res = await getAllBrand1(page, size, search);
      if (res && res.data && res.data.content) {
        setList(res.data.content);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      setList([]);
    }
  };
  const getOrigin = async () => {
    try {
      let res = await getAllOrigin1(page, size, search);
      if (res && res.data && res.data.content) {
        setList(res.data.content);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      setList([]);
    }
  };
  const getDesignStyle = async () => {
    try {
      let res = await getAllDesignStyle1(page, size, search);
      if (res && res.data && res.data.content) {
        setList(res.data.content);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      setList([]);
    }
  };
  const getSkinType = async () => {
    try {
      let res = await getAllSkinType1(page, size, search);
      if (res && res.data && res.data.content) {
        setList(res.data.content);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      setList([]);
    }
  };
  const getToe = async () => {
    try {
      let res = await getAllToe1(page, size, search);
      if (res && res.data && res.data.content) {
        setList(res.data.content);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      setList([]);
    }
  };
  const getSole = async () => {
    try {
      let res = await getAllSole1(page, size, search);
      if (res && res.data && res.data.content) {
        setList(res.data.content);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      setList([]);
    }
  };
  const getLining = async () => {
    try {
      let res = await getAllLining1(page, size, search);
      if (res && res.data && res.data.content) {
        setList(res.data.content);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      setList([]);
    }
  };
  const getCushion = async () => {
    try {
      let res = await getAllCushion1(page, size, search);
      if (res && res.data && res.data.content) {
        setList(res.data.content);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      setList([]);
    }
  };
  const getSize = async () => {
    try {
      let res = await getAllSize1(page, size, search);
      if (res && res.data && res.data.content) {
        setList(res.data.content);
        setTotalElenments(res.data.totalElements);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      setList([]);
    }
  };

  //end call api get-all
  useEffect(() => {
    getAll();
  }, [size]);
  useEffect(() => {
    getAll();
  }, [page]);
  const [showActions, setShowActions] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckboxChange = (idProduct) => {
    if (selectedItems.includes(idProduct)) {
      setSelectedItems(selectedItems.filter((id) => id !== idProduct));
      setShowActions(selectedItems.length - 1 > 0);
    } else {
      setSelectedItems([...selectedItems, idProduct]);
      setShowActions(true);
    }
  };
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
      setShowActions(false);
    } else {
      setSelectedItems(list.map(item => item.id));
      setShowActions(true);
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteButtonClick = async () => {
    if (selectedItems.length > 0) {
      if (selecttt === 'color') {
        if (window.confirm("Bạn có chắc chắn muốn xóa các màu sắc đã chọn không?")) {
          try {
            await axiosInstance.delete(`/admin/color/delete`, { data: selectedItems });
            getColor();
            setSelectedItems([]);
            toast.success("Xóa màu sắc thành công");
          } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
          }
        }
      } else if (selecttt === 'brand') {
        if (window.confirm("Bạn có chắc chắn muốn xóa các thương hiệu đã chọn không?")) {
          try {
            await axiosInstance.delete(`/admin/brand/delete`, { data: selectedItems });
            getColor();
            setSelectedItems([]);
            toast.success("Xóa thương hiệu thành công");
          } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
          }
        }
      } else if (selecttt === 'origin') {
        if (window.confirm("Bạn có chắc chắn muốn xóa các xuất xứ đã chọn không?")) {
          try {
            await axiosInstance.delete(`/admin/origin/delete`, { data: selectedItems });
            getOrigin();
            setSelectedItems([]);
            toast.success("Xóa xuất xứ thành công");
          } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
          }
        }
      } else if (selecttt === 'design_style') {
        if (window.confirm("Bạn có chắc chắn muốn xóa các thiết kế đã chọn không?")) {
          try {
            await axiosInstance.delete(`/admin/design-style/delete`, { data: selectedItems });
            getDesignStyle();
            setSelectedItems([]);
            toast.success("Xóa thiết kế thành công");
          } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
          }
        }
      } else if (selecttt === 'skin_type') {
        if (window.confirm("Bạn có chắc chắn muốn xóa các loại da đã chọn không?")) {
          try {
            await axiosInstance.delete(`/admin/skin-type/delete`, { data: selectedItems });
            getSkinType();
            setSelectedItems([]);
            toast.success("Xóa da giày thành công");
          } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
          }
        }
      } else if (selecttt === 'sole') {
        if (window.confirm("Bạn có chắc chắn muốn xóa các đế giày đã chọn không?")) {
          try {
            await axiosInstance.delete(`/admin/sole/delete`, { data: selectedItems });
            getSole();
            setSelectedItems([]);
            toast.success("Xóa đế giày thành công");
          } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
          }
        }
      } else if (selecttt === 'toe') {
        if (window.confirm("Bạn có chắc chắn muốn xóa các mũi giày đã chọn không?")) {
          try {
            await axiosInstance.delete(`/admin/toe/delete`, { data: selectedItems });
            getToe();
            setSelectedItems([]);
            toast.success("Xóa mũi giày thành công");
          } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
          }
        }
      } else if (selecttt === 'lining') {
        if (window.confirm("Bạn có chắc chắn muốn xóa các lót giày đã chọn không?")) {
          try {
            await axiosInstance.delete(`/admin/lining/delete`, { data: selectedItems });
            getLining();
            setSelectedItems([]);
            toast.success("Xóa lót giày thành công");
          } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
          }
        }
      } else if (selecttt === 'cushion') {
        if (window.confirm("Bạn có chắc chắn muốn xóa các đệm giày đã chọn không?")) {
          try {
            await axiosInstance.delete(`/admin/cushion/delete`, { data: selectedItems });
            getCushion();
            setSelectedItems([]);
            toast.success("Xóa đệm giày thành công");
          } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
          }
        }
      } else if (selecttt === 'size') {
        //size
        if (window.confirm("Bạn có chắc chắn muốn xóa các size giày đã chọn không?")) {
          try {
            await axiosInstance.delete(`/admin/size/delete`, { data: selectedItems });
            getSize();
            setSelectedItems([]);
            toast.success("Xóa size giày thành công");
          } catch (error) {
            let errorMessage = "Lỗi từ máy chủ";
            if (error.response && error.response.data && error.response.data.message) {
              errorMessage = error.response.data.message;
            }
            toast.error(errorMessage);
          }
        }
      }
    }
  };
  return (
    <>
      <Container fluid>
        <Row className="mb-4">
          <div className="col">
            <Card className="shadow  mt-7">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <h3 className="mb-0">Thuộc tính sản phẩm</h3>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Start row btn select productAttrinutes */}
                <Row>
                  <Col lg="6" xl="2">
                    <Label for="btn_select_tt" className="mt-1">
                      Thông tin của:
                    </Label>
                  </Col>
                  <Col lg="6" xl="4">
                    <FormGroup>
                      <Input id="btn_select_tt" name="select" type="select"
                        onChange={(event) => setSelecttt(event.target.value)} value={selecttt} >
                        <option value="color">
                          Màu
                        </option>
                        <option value="brand">
                          Thương hiệu
                        </option>
                        <option value="origin">
                          Xuất xứ
                        </option>
                        <option value="design_style">
                          Thiết kế
                        </option>
                        <option value="skin_type">
                          Loại da
                        </option>
                        <option value="sole">
                          Đế giày
                        </option>
                        <option value="toe">
                          Mũi giày
                        </option>
                        <option value="lining">
                          Lót giày
                        </option>
                        <option value="cushion">
                          Đệm giày
                        </option>
                        <option value="size">
                          Size
                        </option>

                      </Input>
                    </FormGroup>
                  </Col>
                  <Col lg="6" xl="4" className="text-center">
                    <Input
                      type="text"
                      name="code"
                      value={search.codeOrName}
                      onChange={(e) => setSearch({ ...search, codeOrName: e.target.value })}
                      placeholder="Mã hoặc tên thuộc tính" />
                  </Col>
                  <Col lg="6" xl="2" className="text-center">
                    <Button color="primary" onClick={toggle} className="btn btn-outline-primary">
                      + Thêm mới
                    </Button>
                  </Col>
                </Row>
                {/*-- end row btn select productAttrinutes -*/}
              </CardBody>
            </Card>
          </div>
        </Row>
        <Row className="mb-4">
          <Col lg="6" xl="12">
            <Card className="card-stats mb-4 mb-xl-0">
              <CardBody>
                <Row>
                  <div className="col">
                    <CardTitle
                      tag="h5"
                      className="text-uppercase text-muted mb-0"
                    >
                      <h3> DANH SÁCH</h3>

                    </CardTitle>
                  </div>
                  <div className="col text-right">
                    {showActions && (
                      <Button
                        color="danger" outline
                        size="sm"
                        onClick={handleDeleteButtonClick}
                      >
                        Xóa tất cả
                      </Button>
                    )}
                  </div>

                </Row>
                {/*  */}

                <Table responsive className="align-items-center table-flush">
                  <thead className="thead-light">
                    <tr>
                      <th className="text-center" >
                        <FormGroup check className="pb-4">
                          <Input
                            type="checkbox"
                            checked={selectAll}
                            onChange={handleSelectAll}
                          />
                        </FormGroup>

                      </th>
                      <th style={{ color: "black" }}>STT</th>
                      <th style={{ color: "black" }}>Mã</th>
                      <th style={{ color: "black" }}>Tên</th>
                      <th colSpan={2} style={{ color: "black" }}>Thao tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.length <= 0 &&
                      <th className="text-center" colSpan={6}>
                        Không có dữ liệu
                      </th>
                    }
                    {list && list.length > 0 &&
                      list.map((item, index) => {
                        return (
                          <tr key={item.id} >
                            <td className="text-center">
                              <FormGroup check className="pb-4">
                                <Input
                                  type="checkbox"
                                  checked={selectedItems.includes(item.id)}
                                  onChange={() => handleCheckboxChange(item.id)}
                                />

                              </FormGroup>
                            </td>
                            <th scope="row"> {index + 1}</th>
                            <td>{item.code}</td>
                            <td>{item.name}</td>
                            <td>
                              <Tooltip title="Chỉnh sửa">
                                <Button color="link" onClick={() => handleEdit(item)} size="sm">
                                  <FaEdit color="primary" />
                                </Button>
                              </Tooltip>
                              <Tooltip title="Xóa">
                                <Button color="link" size="sm" onClick={() => handleDelete(item.id)}>
                                  <FaTrash color="primary" />
                                </Button>
                              </Tooltip>

                            </td>
                          </tr>
                        )

                      })
                    }

                  </tbody>
                </Table>
                <Row className="mt-4">
                  <Col lg={6}>
                    <div style={{ fontSize: 14 }}>
                      Đang xem <b>1</b> đến <b>{totalElements < size ? totalElements : size}</b> trong tổng số <b>{totalElements}</b> mục
                    </div>
                  </Col>
                  <Col style={{ fontSize: 14 }} lg={2}>
                    <Row>
                      <span>Xem </span>&nbsp;
                      <span>
                        <Input type="select" name="status" style={{ width: "60px", fontSize: 14 }} size="sm" onChange={(e) => onChangeSize(e)} className="mt--1">
                          <option value="5">5</option>
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </Input>
                      </span>&nbsp;
                      <span> mục</span>
                    </Row>

                  </Col>
                  <Col lg={4} style={{ fontSize: 11 }} className="mt--1">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel=">"
                      pageRangeDisplayed={1} // Number of pages to display on each side of the selected page
                      pageCount={totalPages} // Total number of pages
                      previousLabel="<"
                      onPageChange={handlePageClick}
                      renderOnZeroPageCount={null}
                      pageClassName="page-item"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      containerClassName="pagination"
                      activeClassName="active"
                      marginPagesDisplayed={1}
                    />
                  </Col>
                </Row>

                {/*  */}
              </CardBody>

            </Card>
          </Col>
        </Row>
      </Container>
      <Modal
        isOpen={modal}
        toggle={toggle}
        backdrop={'static'}
        keyboard={false}
      >
        <ModalHeader toggle={toggle} >
          <h3 className="heading-small text-muted mb-0">Thêm thuộc tính</h3></ModalHeader>
        <ModalBody>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="username"
                    >
                      Tên thuộc tính:
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="username"
                      type="text"
                      value={formData.name}
                      onChange={(event) => setformData({ ...formData, name: event.target.value })}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button color="primary" onClick={() => handleProductAttribites()}>
              Thêm
            </Button>{' '}
          </div>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={modalEdit}
        toggleEdit={toggleEdit}
        backdrop={'static'}
        keyboard={false}
      >
        <ModalHeader toggle={toggleEdit}><h2>Sửa thuộc tính</h2></ModalHeader>
        <ModalBody>
          <Form>
            <div className="pl-lg-4">
              <Row>
                <Col lg="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="username"
                    >
                      Tên thuộc tính:
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="username"
                      type="text"
                      value={formData.name}
                      onChange={(event) => setformData({ ...formData, name: event.target.value })}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>
          </Form>
        </ModalBody>
        <ModalFooter>
          <div className="text-center">
            <Button color="danger" onClick={() => EditProductAttribites()}>
              Sửa
            </Button>{' '}
          </div>
        </ModalFooter>
      </Modal>

    </>
  );
};


export default ProductAttributes;