import React, { useState, useEffect, useParams } from "react";
import { useNavigate, Link } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  FormGroup, Form, Button,
  Input,
  CardTitle, Label, Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";
import { useAuth } from "services/AuthContext.js";
import { FaEdit, FaTrash, FaBook, FaRegUser, FaDollarSign } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axiosInstance from "services/custommize-axios";
import axios from "axios";


const Rate = () => {
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const formattedDate = `${dateObject.getFullYear()}/${(dateObject.getMonth() + 1).toString().padStart(2, '0')}/${dateObject.getDate().toString().padStart(2, '0')} ${dateObject.getHours().toString().padStart(2, '0')}:${dateObject.getMinutes().toString().padStart(2, '0')}:${dateObject.getSeconds().toString().padStart(2, '0')}`;
    return formattedDate;
  }
  const storedUserId = localStorage.getItem("userId");
  const [list, setList] = useState([]);
  
  const getAll = async () => {
    try {
      const response = await axios.get(`http://localhost:33321/api/users/comment/getAll-account/${storedUserId}`);
      console.log(response)
      if (response && response.data) {
        setList(response.data.data);
      }
    } catch (error) {
      console.error("Error:", error);
      console.error("Response data:", error.response.data);
    }
  }
  useEffect(() => {
    getAll();
  }, []);
  return (
    <>
      <Card className="shadow">
        <CardHeader className="bg-transparent">
          <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
            <Row>
              <span className="col-9">
                <h3>Lịch sử đánh giá</h3>
              </span>
            </Row>
          </CardTitle>
        </CardHeader>
        <CardBody>
          <div className="pl-lg-4">
            {list && list.length > 0 &&
              list.map((item, index) => {
                return (
                  <>
                    <Row className="mt-3">
                      <Col lg="1">
                        <Row>
                          {item.avatar === null ?
                            <img src="https://thumbs.dreamstime.com/b/default-businessman-avatar-icon-vector-business-people-profile-concept-279597784.jpg" style={{ borderRadius: "50%", width: "80px", height: "80px" }} />
                            :
                            <img src="https://thumbs.dreamstime.com/b/default-businessman-avatar-icon-vector-business-people-profile-concept-279597784.jpg" style={{ borderRadius: "50%", width: "80px", height: "80px" }} />
                          }
                        </Row>
                      </Col>
                      <Col lg="10">
                        <Row className="m-3" style={{ color: 'black', fontSize: '14px' }}>
                          {item.userName}
                        </Row>
                        <Row className="m-3 mt--2">
                          <Rate
                            value={item.vote}
                            style={{ color: '#ee4d2d', fontSize: '14px' }}
                          />
                        </Row>
                        <Row style={{ color: 'gray', fontSize: '14px' }} className="m-3 mt--2">
                          {formatDate(item.createdDate)}
                        </Row>
                        <Row style={{ color: 'black' }} className="m-3">
                          {item.comment}
                        </Row>
                      </Col>
                    </Row>
                    {(index + 1) < list.length && <hr />}
                  </>
                )
              })
            }
          </div>
        </CardBody>
      </Card>

    </>
  );
}


export default Rate;
