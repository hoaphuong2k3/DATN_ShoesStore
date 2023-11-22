import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
    Button,
    FormGroup,
    Input,
    Row,
    Col,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    InputGroup,
    InputGroupAddon,
    InputGroupText
} from "reactstrap";
import "../../assets/css/forgotPass.css";

const Products = () => {

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [modal2, setModal2] = useState(false);
    const toggle2 = () => setModal2(!modal2);

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [inputs, setInputs] = useState(Array(6).fill(""));
    const [otpValue, setOtpValue] = useState("");
    const navigate = useNavigate();

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;

        setInputs(newInputs);
        const newOtpValue = newInputs.join("");
        setOtpValue(newOtpValue);

        if (value && index < inputs.length - 1) {
            document.getElementById(`activation-input-${index + 1}`).focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !inputs[index] && index > 0) {
            document.getElementById(`activation-input-${index - 1}`).focus();
        }
    };

    //checkOTP
    const handleNext = async () => {
        try {
            if (otpValue.length !== 6) {
                toast.error("Vui lòng nhập đủ 6 chữ số OTP.");
                return;
            }

            const response = await axios.get(`http://localhost:33321/api/staff/otpcheck?otp=${otpValue}`);

            toast.success("Xác minh thành công.");
            toggle();
            toggle2();
        } catch (error) {
            console.error("Lỗi cuộc gọi API:", error);
            toast.error("Đã xảy ra lỗi. Vui lòng thử lại sau.");
        }
    };

    //sendOTP
    const sendOTP = async () => {

        const sendOTP = document.getElementById("sendOTP").value;

        try {
            if (!sendOTP) {
                toast.error("Vui lòng nhập email/số điện thoại.");
                return;
            }
            await axios.get(`http://localhost:33321/api/staff/sms?phonenumberOrEmail=${encodeURIComponent(sendOTP)}`);
            toast.success("Chúng tôi sẽ gửi mã xác minh đến email/số điện thoại của bạn.")
            toggle();
        } catch (error) {
            console.error("Lỗi cuộc gọi API:", error);
        }

    };

    //newPass
    const handleComplete = async () => {

        try {
            await axios.put("http://localhost:33321/api/staff/forgotPassword",
                { newPassword, confirmPassword },
                { headers: { "Content-Type": "application/json" } }
            );

            toast.success("Đặt lại mật khẩu thành công!");
            setModal2(false);
            navigate("/");

        } catch (error) {

            console.error("Lỗi cuộc gọi API:", error);
            toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
        }
    };

    return (
        <>
            <Row>
                <Col lg="12">
                    <FormGroup>
                        <label style={{ fontSize: 13 }}>
                            Email/Số điện thoại
                        </label>
                        <Input
                            className="form-control"
                            type="text"
                            id="sendOTP"
                        />
                    </FormGroup>
                </Col>
                <Col lg="12">
                    <Button className="text-uppercase" color="info" block onClick={sendOTP}>
                        Tiếp theo
                    </Button>
                </Col>
            </Row>

            <Modal
                isOpen={modal}
                toggle={toggle}
                backdrop={'static'}
                keyboard={false}
                style={{ maxWidth: '430px' }}
            >
                <ModalHeader toggle={toggle}>
                    <h3 className="heading-small text-dark mb-0">Nhập mã xác minh</h3>
                </ModalHeader>
                <ModalBody>
                    <div className="activation-code active">
                        <span>Mã xác minh</span>
                        <div className="activation-code-inputs">
                            {inputs.map((value, index) => (
                                <input
                                    key={index}
                                    id={`activation-input-${index}`}
                                    type="text"
                                    maxLength="1"
                                    pattern="[0-9]"
                                    className="activation-code-input"
                                    value={value}
                                    onChange={(e) => handleInputChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                />
                            ))}
                        </div>
                    </div>
                </ModalBody >
                <ModalFooter>
                    <Button className="btn btn-info text-uppercase w-100" onClick={handleNext} >Tiếp theo</Button>
                </ModalFooter>
            </Modal >

            <Modal
                isOpen={modal2}
                toggle={toggle2}
                backdrop={'static'}
                keyboard={false}
                style={{ maxWidth: '430px' }}
            >
                <ModalHeader toggle={toggle2}>
                    <h3 className="heading-small text-dark mb-0">Đặt lại mật khẩu</h3>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-lock-circle-open" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Mật khẩu mới"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </InputGroup>
                    </FormGroup>
                    <FormGroup>
                        <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                                <InputGroupText>
                                    <i className="ni ni-key-25" />
                                </InputGroupText>
                            </InputGroupAddon>
                            <Input
                                placeholder="Nhập lại mật khẩu"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </InputGroup>
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button
                        className="btn btn-info text-uppercase w-100"
                        onClick={handleComplete}
                    >
                        Hoàn tất
                    </Button>
                </ModalFooter>
            </Modal>

            <ToastContainer />
        </>
    );

};

export default Products;