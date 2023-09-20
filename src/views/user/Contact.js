
import {Card, CardHeader, CardBody, Container, Row,} from "reactstrap";
// core components
import Header from "components/Headers/UserHeader3.js";

const Contacts = () => {
    return (
        <>
            <Header />
            <Container fluid>
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                {/* <h3 className="mb-0"></h3> */}
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

export default Contacts;
