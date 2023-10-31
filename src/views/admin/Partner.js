// import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Table } from "reactstrap";
import Header from "components/Headers/Header.js";
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaUpload, FaTrash } from 'react-icons/fa';
import "assets/css/anh.css";
const Partner = () => {

  const [uploadedFile, setUploadedFile] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
  });

  const handleDelete = () => {
    setUploadedFile(null);
  };
  const base64Data ='';
  const dataUrl = `data:image/png;base64,${base64Data}`;
  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Đối tác</h3>
              </CardHeader>
              <CardBody>
           

     
                {/* <div>
                  <img src={`data:image/png;base64,${}`} alt="Image" />
                </div> */}
        

                <div className="upload-container">
                  {uploadedFile ? (
                    <div className="uploaded-image">
                      <p>Ảnh đã tải lên:</p>
                      <img src={URL.createObjectURL(uploadedFile)} alt={uploadedFile.name} />
                      <button onClick={handleDelete} className="delete-button">
                        <FaTrash />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div {...getRootProps()} className="dropzone">
                        <input {...getInputProps()} />
                      </div>
                      <button className="upload-button">
                        <FaUpload />
                      </button>
                    </>
                  )}
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
