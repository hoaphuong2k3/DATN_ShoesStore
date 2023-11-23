// import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Table } from "reactstrap";
import Header from "components/Headers/Header.js";
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaTrash } from 'react-icons/fa';
import "assets/css/anh.css";
const Partner = () => {

  const [selectedImages, setSelectedImages] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Lưu trữ tất cả ảnh đã chọn
    setSelectedImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const removeImage = (indexToRemove) => {
    // Xóa ảnh theo chỉ số trong danh sách
    setSelectedImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });
  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Đối tác</h3>
              </CardHeader>
              <CardBody>
              <div className="image-uploader-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        {selectedImages.length > 0 ? (
          <div>
            <p>Ảnh đã chọn:</p>
            {selectedImages.map((image, index) => (
              <div key={index} className="selected-image-container">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Selected ${index}`}
                  className="selected-image"
                />
                <button onClick={() => removeImage(index)}>Xóa</button>
              </div>
            ))}
          </div>
        ) : (
          <p>Kéo và thả ảnh hoặc click để chọn ảnh</p>
        )}
      </div>
    </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Partner;
