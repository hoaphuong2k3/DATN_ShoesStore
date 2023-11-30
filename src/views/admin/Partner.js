import { Card, CardHeader, CardBody, Container, Row, Table } from "reactstrap";
import React, { useState } from 'react';
import "assets/css/anh.css";
import { QrReader } from 'react-qr-reader';
const Partner = () => {

  const [result, setResult] = useState('');

  const handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  }

  const handleError = (err) => {
    console.error(err);
  }
  return (
    <>
      <Container className="mt-7" fluid>
        <div>
          <QrReader
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={{ width: '100%' }}
          />
          <p>{result}</p>
        </div>
      </Container>
    </>
  );
};

export default Partner;
