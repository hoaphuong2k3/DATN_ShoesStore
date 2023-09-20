
import { Container, Row, Card, CardBody } from "reactstrap";
import Header from "components/Headers/ProductHeader.js";


const DetailProduct = () => {

  return (
    <>
      <Header />
      <Container fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardBody>
               
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default DetailProduct;