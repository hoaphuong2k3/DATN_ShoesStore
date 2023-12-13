import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";
// core components
import Header from "components/Headers/ProductHeader";
import "assets/css/introduce.css";

const Introduce = () => {
  return (
    <>
      <Header />
      <Card>
        <Container>
          <div className="panel-layout m-7">
            <div className="panel-grid panel-has-style">
              <div className="panel-row-style panel-row-style panel-grid-cell">
                <div className="">
                  <div className="widget_text so-panel widget widget_custom_html panel-first-child panel-last-child">
                    <div class="widget-title ml-7">
                      <span>
                        <label className="label1">01</label> <span>Về ShoesStore</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="" style={{ marginLeft: "150px" }}>
                  <div className="so-panel widget widget_black-studio-tinymce widget_black_studio_tinymce panel-first-child panel-last-child">
                    <div class="title">
                      <span>
                        <h2>
                          <small>Về chúng tôi</small>
                        </h2>
                        <h3>Nhiệm vụ, tầm nhìn và giá trị thương hiệu.</h3>
                      </span>
                    </div>
                    <div className="textwidget mr-5" style={{color: "black"}}>
                      <p>
                        ShoesStore hướng tới mục tiêu trở thành thương hiệu đồ
                        da hàng đầu Việt Nam, chúng tôi luôn nỗ lực không ngừng
                        để đưa thương hiệu ShoesStore trở nên gần gũi hơn và là
                        thương hiệu cung cấp những sản phẩm đồ da cụ thể là giày da . Mang
                        chất lượng tốt nhất, thỏa mãn nhu cầu mua sắm của quý
                        khách hàng.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* <div> */}
          <section class="title-section">
            <h2 class="title-header">Tại sao bạn nên chọn ShoesStore</h2>
          </section>
          {/* </div> */}

          <div className="row">
            <div className="col-md-4">
              <Card>
                <div className="">
                  <img
                    src={`https://laforce.vn/wp-content/uploads/2018/05/z989382668421_58c6146086f87b29199dfc790a82beb8.jpg`}
                    alt=""
                    className=""
                    style={{ width: "100%" }}
                  />
                </div>
              </Card>
              <p className="mt-3 text-center text-dark">
                Đồ da ShoesStore - da thật 100%
              </p>
            </div>

            <div className="col-md-4">
              <Card>
                <div className="">
                  <img
                    src={`https://laforce.vn/wp-content/uploads/2018/05/z989382672650_82c37d8b072d15b661875c62d025900d.jpg`}
                    alt=""
                    className=""
                    style={{ width: "100%" }}
                  />
                </div>
              </Card>
              <p className="mt-3 text-center text-dark">
                Thiết kế độc đáo, sáng tạo
              </p>
            </div>

            <div className="col-md-4">
              <Card>
                <div className="">
                  <img
                    src={`https://laforce.vn/wp-content/uploads/2022/03/giay-tay-hieu-laforce.jpg`}
                    alt=""
                    className=""
                    style={{ width: "400px", height: "349px" }}
                  />
                </div>
              </Card>
              <p className="mt-3 text-center text-dark">
                Dịch vụ khách hàng chuyên nghiệp
              </p>
            </div>
          </div>

          <div className="m-7" style={{color: "black"}}>
            <p>
              Sản phẩm đồ da ShoesStore được làm từ da bò thật nguyên miếng, giữ
              nguyên được kết cấu của da nên có thể dùng được lâu dài, tuổi thọ
              trung bình đạt từ 3 đến 5 năm
            </p>
            <p>
              Với thiết kế độc đáo, lịch lãm và không kém phần hiện đại, các sản
              phẩm của ShoesStore phù hợp với nhiều đối tượng, tôn lên sự nam tính
              cho các quý ông hiện đại. Các sản phẩm đều được kiểm tra kỹ lưỡng
              trước khi mang bán ra thị trường, mang đến những sản phẩm với chất
              lượng tốt nhất tới quý khách hàng.
            </p>
            <p>
              Ngoài ra, với hệ thống cửa hàng rộng khắp cả nước cùng đội ngũ
              nhân viên bán hàng chuyên nghiệp, ShoesStore hứa hẹn mang đến quý
              khách hàng dịch vụ khách hàng tốt nhất cùng chính sách bảo hành,
              bảo trì trọn đời cho các sản phẩm da từ ShoesStore như lời cam kết về
              uy tín và chất lượng của chúng tôi đến với khách hàng.
            </p>
          </div>
        </Container>
      </Card>
    </>
  );
};

export default Introduce;
