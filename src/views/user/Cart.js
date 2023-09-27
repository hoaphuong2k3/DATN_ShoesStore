
import { Card, CardHeader, CardBody, Container, Row, } from "reactstrap";
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
                                <div class="inner">
                                    <h1>Giỏ hàng</h1>
                                    <form action="/cart" method="post" novalidate="" class="cart table-wrap medium--hide small--hide">
                                        <table class="cart-table full table--responsive">
                                            <thead class="cart__row cart__header-labels">
                                                <tr><th colspan="2" class="text-center">Thông tin chi tiết sản phẩm</th>
                                                    <th class="text-center">Đơn giá</th>
                                                    <th class="text-center">Số lượng</th>
                                                    <th class="text-right">Tổng giá</th>
                                                </tr></thead>
                                            <tbody>
                                                <tr class="cart__row table__section">
                                                    <td data-label="Sản phẩm">
                                                        <a href="/products/giay-slip-on-double-monk-strap" class="cart__image">


                                                            <img src="//product.hstatic.net/200000054280/product/pro-capture_one_0265_ff52ce98ad81488ba5077feb7adf69f7_medium.jpg" alt="giày da cao cấp loafer LF915" />

                                                        </a>
                                                    </td>
                                                    <td class="cart-product-title">
                                                        <a href="/products/giay-slip-on-double-monk-strap" class="h4">
                                                            giày da cao cấp loafer LF915
                                                        </a>

                                                        <p>Phiên bản: Nâu / 38</p>
                                                        <p>Thương hiệu: Khác</p>
                                                        Khuyến mãi:
                                                        1042052951 - 1499
                                                        <br />
                                                        <a href="/cart/change?line=1&amp;quantity=0" class="cart__remove">
                                                            <small>Xóa</small>
                                                        </a>
                                                    </td>
                                                    <td class="cart-product-price" data-label="Đơn giá">
                                                        <span class="h3">
                                                            1,499,000₫
                                                        </span>
                                                    </td>
                                                    <td data-label="Số lượng">
                                                        <div class="js-qty">
                                                            <button type="button" class="js-qty__adjust js-qty__adjust--minus icon-fallback-text" data-id="" data-qty="1">
                                                                <span class="icon icon-minus" aria-hidden="true"></span>
                                                                <span class="fallback-text" aria-hidden="true">−</span>
                                                                {/* <span class="visually-hidden">Giảm số lượng sản phẩm đi 1</span> */}
                                                            </button>
                                                            <input type="number" class="js-qty__num" value="2" min="1" data-id="" aria-label="quantity" pattern="[0-9]*" name="updates[]" id="updates_" />
                                                            <button type="button" class="js-qty__adjust js-qty__adjust--plus icon-fallback-text" data-id="" data-qty="21">
                                                                <span class="icon icon-plus" aria-hidden="true"></span>
                                                                <span class="fallback-text" aria-hidden="true">+</span>
                                                                {/* <span class="visually-hidden">Tăng số lượng sản phẩm lên 1</span> */}
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td data-label="Tổng giá" class="cart-product-price text-right">
                                                        <span class="h3">
                                                            2,998,000₫
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div class="grid cart__row">

                                            <div class="grid__item two-thirds small--one-whole">
                                                <label for="CartSpecialInstructions">Chú thích cho cửa hàng</label>
                                                <textarea name="note" class="input-full" id="CartSpecialInstructions"></textarea>
                                            </div>

                                            <div class="grid__item text-right one-third small--one-whole">
                                                <p>
                                                    <span class="cart__subtotal-title">Tổng tiền</span>
                                                    <span class="h3 cart__subtotal">2,998,000₫</span>
                                                </p>


                                                <button type="submit" name="update" class="btnCart update-cart">Cập nhật</button>
                                                <button type="submit" name="checkout" class="btnCart">Thanh toán</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};

export default Cart;
