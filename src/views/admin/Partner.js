import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Table } from "reactstrap";
import { getAllColor, getAllSize } from "services/ProductAttributeService";
import Header from "components/Headers/Header.js";

const Partner = () => {
  const [listSize, setListSize] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [checkboxesSize, setCheckboxesSize] = useState([]);
  const [selectedValuesSize, setSelectedValuesSize] = useState([]);

  const getlistColor = async () => {
    try {
      const res = await getAllColor();
      if (res && res.data) {
        // setListColor(res.data); // Không sử dụng biến này trong mã của bạn
      }
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };

  const getlistSize = async () => {
    try {
      const res = await getAllSize();
      if (res && res.data) {
        setListSize(res.data);
      }
    } catch (error) {
      console.error("Error fetching sizes:", error);
    }
  };

  const initializeCheckboxesSize = () => {
    const initialCheckboxesSize = listSize.map((item) => ({
      id: item.id,
      label: item.name,
      checked: false,
    }));
    setCheckboxesSize(initialCheckboxesSize);
  };

  function handleSelectAll() {
    const updatedCheckboxesSize = checkboxesSize.map((checkbox) => ({
      ...checkbox,
      checked: !selectAll,
    }));
    setCheckboxesSize(updatedCheckboxesSize);
    setSelectAll(!selectAll);

    // Cập nhật selectedValuesSize dựa trên checkboxes đã chọn
    const selectedValuesSize = updatedCheckboxesSize
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => ({ id: checkbox.id, name: checkbox.label }));
    setSelectedValuesSize(selectedValuesSize);
  }

  function handleCheckboxSizeChange(checkboxId) {
    const updatedCheckboxesSize = checkboxesSize.map((checkbox) =>
      checkbox.id === checkboxId ? { ...checkbox, checked: !checkbox.checked } : checkbox
    );
    setCheckboxesSize(updatedCheckboxesSize);

    // Cập nhật selectedValuesSize dựa trên checkboxes đã chọn
    const selectedValuesSize = updatedCheckboxesSize
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => ({ id: checkbox.id, name: checkbox.label }));
    setSelectedValuesSize(selectedValuesSize);
  }

  useEffect(() => {
    getlistSize();
  }, []);

  useEffect(() => {
    initializeCheckboxesSize();
  }, [listSize]);

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
                <div>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                    Select All
                  </label>
                  <br />
                  {checkboxesSize.map((checkbox) => (
                    <label key={checkbox.id}>
                      <input
                        type="checkbox"
                        checked={checkbox.checked}
                        onChange={() => handleCheckboxSizeChange(checkbox.id)}
                      />
                      {checkbox.label}
                    </label>
                  ))}
                </div>
                <div>
                  <p>Các giá trị đã chọn:</p>
                  <Table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedValuesSize.map((value, index) => (
                        <tr key={index}>
                          <td>{value.id}</td>
                          <td>{value.name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
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
