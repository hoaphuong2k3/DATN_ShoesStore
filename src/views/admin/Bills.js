
import {Card, CardHeader, CardBody, Container, Row,} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";

const Bills = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Hóa đơn</h3>
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

export default Bills;
