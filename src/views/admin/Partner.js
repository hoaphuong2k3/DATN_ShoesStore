import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Table } from "reactstrap";
import Header from "components/Headers/Header.js";

const Partner = () => {

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
                
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Partner;
