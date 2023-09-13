import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";

import Header from "components/Headers/Header.js";


const Statistical = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
            <CardHeader className="bg-transparent">
                <h3 className="mb-0">Thống kê</h3>
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

export default Statistical;
