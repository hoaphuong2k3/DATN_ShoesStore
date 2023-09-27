
// reactstrap components
import { Row, Form, Col, FormGroup, Input, Button, Table } from "reactstrap";




const Promo = () => {
  return (
    <>

      <Form>
        <h6 className="heading-small text-muted mb-4">
          Thông tin
        </h6>
        <Row>
          <Col lg="4">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="code"
              >
                Mã KM
              </label>
              <Input
                className="form-control-alternative"
                placeholder="Code"
                id="code"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="4">
            <FormGroup >
              <label
                className="form-control-label"
                htmlFor="name"
              >
                Tên KM
              </label>
              <Input
                className="form-control-alternative"
                id="name"
                placeholder="Tên khuyến mại"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="4">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="category"
              >
                Loại KM
              </label>
              <Input
                className="form-control-alternative"
                id="input-email"
                type="email"
              />
            </FormGroup>
          </Col>

          <Col lg="4">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="sale"
              >
                Giảm giá (%)
              </label>
              <Input
                className="form-control-alternative"
                placeholder="eg. 10%"
                id="sale"
                type="number"
              />
            </FormGroup>
          </Col>
          <Col lg="4">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="startDate"
              >
                Ngày bắt đầu
              </label>
              <Input
                className="form-control-alternative"
                id="startDate"
                type="date"
              />
            </FormGroup>
          </Col>
          <Col lg="4">
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="endDate"
              >
                Ngày kết thúc
              </label>
              <Input
                className="form-control-alternative"
                id="endDate"
                type="date"
              />
            </FormGroup>
          </Col>

          <Col lg="12">
            <h6 className="heading-small text-muted mb-4">
              Sản phẩm áp dụng
            </h6>
            <Table className="align-items-center table-flush" responsive>
              <thead className="thead-light">
                <tr className="text-center">
                  <th scope="col">#</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Thương hiệu</th>
                  <th scope="col">Giá gốc</th>


                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center"><Input type="checkbox" /></td>
                  <td></td>
                  <td></td>
                  <td></td>

                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <hr className="my-4" />

        <Row>
          <Col className="text-center">
            <Button
              className="btn btn-outline-primary"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              Thêm mới
            </Button>
            <Button
              className="btn btn-outline-primary"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              Cập nhật
            </Button>
            <Button
              className="btn btn-outline-primary"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              Xóa
            </Button>
            <Button
              className="btn btn-outline-primary"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              Reset
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Description */}
      <hr className="my-4" />
      <h6 className="heading-small text-muted mb-4">Danh sách</h6>
      <Table className="align-items-center table-flush" responsive>
        <thead className="thead-light">
          <tr>
            <th scope="col">STT</th>
            <th scope="col">Tên khuyến mại</th>
            <th scope="col">Loại khuyến mại</th>       
            <th scope="col">Phần trăm (%)</th>
            <th scope="col">Ngày bắt đầu</th>
            <th scope="col">Ngày kết thúc</th>
            <th scope="col">Trạng thái</th>
            <th scope="col">Hành động</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </Table>

    </>
  );
};

export default Promo;
