
import React from 'react';
import { Container, Card, CardHeader, CardBody,Row } from 'reactstrap';
// import { useParams } from 'react-router-dom';

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import AdminFooter from "components/Footers/AdminFooter.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Header from "components/Headers/BillHeader.js";

const BillDetail = () => {
    // const { id } = useParams();
  
    // Sử dụng `id` để lấy thông tin chi tiết của đơn hàng từ API hoặc bất kỳ nguồn dữ liệu nào phù hợp
  
    return (
    
        <>
        
        <Header />
        {/* Page content */}
        <Container className="mt--7" fluid>
          <Row>
            <div className="col">
              <Card className="shadow">
              <CardHeader className="bg-transparent">
                  <h3 className="mb-0">Đối tác</h3>
                </CardHeader>
                <CardBody>
                 
                </CardBody>
              </Card>
            </div>
          </Row>
        </Container>

      </>
    );
  };
  
  export default BillDetail;