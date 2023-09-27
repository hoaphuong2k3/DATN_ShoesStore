import React, { Component } from "react";
// reactstrap components
import { Row, Form, Col, FormGroup, Input, Button, Table, Modal } from "reactstrap";


class Voucher extends Component {

    constructor() {
        super();
        this.state = {
            selectedOption: null,
        };
    }

    handleRadioChange = (event) => {
        this.setState({
            selectedOption: event.target.value
        });
    };

    state = {};
    toggleModal = (state) => {
        this.setState({
            [state]: !this.state[state],
        });
    };

    render() {
        return (
            <>
                <Form>
                    <h6 className="heading-small text-muted mb-4">
                        Thông tin
                    </h6>
                    <div className="pl-lg-4">
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
                                <FormGroup>
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
                                    <Button
                                        color="primary"
                                        size="sm"
                                        onClick={() => this.toggleModal("defaultModal")}
                                    >
                                        +
                                    </Button>

                                    <Modal
                                        className="modal-dialog-centered"
                                        isOpen={this.state.defaultModal}
                                        toggle={() => this.toggleModal("defaultModal")}
                                    >
                                        <div className="modal-header">
                                            <h6 className="modal-title">
                                                Loại khuyến mại
                                            </h6>
                                            <button
                                                aria-label="Close"
                                                className="close"
                                                data-dismiss="modal"
                                                type="button"
                                                onClick={() => this.toggleModal("defaultModal")}
                                            >
                                                <span aria-hidden={true}>×</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <Form>
                                                
                                            </Form>
                                        </div>
                                        <div className="modal-footer">
                                            <Button color="primary" type="button" size="sm">
                                                Edit
                                            </Button>
                                            <Button
                                                className="ml-auto"
                                                color="link"
                                                data-dismiss="modal"
                                                type="button"
                                                onClick={() => this.toggleModal("defaultModal")}
                                            >
                                                Close
                                            </Button>
                                        </div>
                                    </Modal>

                                </FormGroup>
                            </Col>

                            <Col lg="4">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="input-price">
                                        Hình thức giảm
                                    </label>
                                    <div style={{ display: "flex" }}>
                                        <div className="custom-control custom-radio">
                                            <Input
                                                className="custom-control-alternative"
                                                name="price"
                                                type="radio"
                                                value="persent"
                                                onChange={this.handleRadioChange}
                                            />Phần trăm (%)
                                        </div>
                                        <div className="custom-control custom-radio">
                                            <Input
                                                className="custom-control-alternative"
                                                name="price"
                                                type="radio"
                                                value="money"
                                                onChange={this.handleRadioChange}
                                            />Tiền
                                        </div>
                                    </div>
                                </FormGroup>
                            </Col>

                            {this.state.selectedOption === "persent" && (
                                <Col lg="4">
                                    <FormGroup>
                                        <label
                                            className="form-control-label"
                                            htmlFor="startDate"
                                        >
                                            Giảm giá:
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="persent"
                                            type="number"
                                            placeholder="eg. 10%"
                                        />
                                    </FormGroup>
                                </Col>
                            )}

                            {this.state.selectedOption === "money" && (
                                <Col lg="8" style={{ display: "flex" }}>
                                    <FormGroup className="col" lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="startDate"
                                        >
                                            Giảm giá từ:
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="min"
                                            type="number"
                                            placeholder="10000"
                                        />
                                    </FormGroup>
                                    <FormGroup className="col" lg="6">
                                        <label
                                            className="form-control-label"
                                            htmlFor="startDate"
                                        >
                                            Giảm giá đến:
                                        </label>
                                        <Input
                                            className="form-control-alternative"
                                            id="max"
                                            type="number"
                                            placeholder="100000"
                                        />
                                    </FormGroup>
                                </Col>



                            )}


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
                            <Col className="pl-lg-4">
                                <FormGroup>
                                    <label
                                        className="form-control-label"
                                        htmlFor="description"
                                    >
                                        Mô tả
                                    </label>
                                    <Input
                                        className="form-control-alternative"
                                        placeholder="Sản phẩm ....."
                                        rows="4"
                                        type="textarea"
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
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
                    </div>


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
                            <th scope="col">Mô tả</th>
                            <th scope="col">Phần trăm (%)</th>
                            <th scope="col">Tiền</th>
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
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </>
        );
    }
}
export default Voucher;
