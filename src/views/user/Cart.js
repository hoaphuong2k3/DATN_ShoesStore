
import {Card, CardHeader, CardBody, Container, Row,} from "reactstrap";
// core components
import Header from "components/Headers/ProductHeader";

const Cart = () => {
    return (
        <>
            <Header />
            <Container fluid>
                {/* Table */}
                <Row>
                    <div className="col">
                        <Card className="shadow">
                            <CardHeader className="bg-transparent">
                             {/* <i class="fas fa-h3">Thêm giỏ hàng</i> */}
                             
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

export default Cart;
