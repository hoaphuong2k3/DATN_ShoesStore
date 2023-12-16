import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";
// core components
import Header from "components/Headers/UserHeader3.js";

const Contacts = () => {
  return (
    <>
      <Header />
      <Container fluid>
        <Row>
          <div className="col container">
            <section class="title-section">
              <h2 class="title-header">Liên hệ </h2>
            </section>
            <div className="panel-layout"></div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Contacts;
