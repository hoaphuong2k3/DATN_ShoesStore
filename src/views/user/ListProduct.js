
import {Card, CardHeader, CardBody, Container, Row,} from "reactstrap";
// core components
import Header from "components/Headers/ProductHeader.js";

const Product = () => {
    return (
        <>
            <Header />
            <Container fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                                <h3 className="mb-0">Sản phẩm</h3>
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

export default Product;
