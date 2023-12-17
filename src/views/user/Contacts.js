import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";
// core components
import Header from "components/Headers/UserHeader3.js";
import "assets/css/contact.css";
const Contact2 = () => {
  return (
    <>
      <Header />
      <Container className="mb-5">
        <div>
          <section class="title-section">
            <h2 class="title-header">Liên hệ</h2>
          </section>
          <div className="panel-layout">
            <div className="panel-grid panel-no-style">
              <div className="panel-grid-cell">
                <div className="so-panel widget widget_black-studio-tinymce widget_black_studio_tinymce panel-first-child panel-last-child">
                  <div className="textwidget">
                    <div class="top_item">
                      <div class="count_item" style={{ right: "130px" }}>
                        01
                      </div>
                      <div class="post-list_h">
                        <p class="text_lh"> Bán hàng online</p>
                        <p class="phone_lh"> 0989.312.433</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-grid-cell ml-3">
                <div className="so-panel widget widget_black-studio-tinymce widget_black_studio_tinymce panel-first-child panel-last-child">
                  <div class="textwidget">
                    <div class="top_item">
                      <div class="count_item" style={{ right: "137px" }}>
                        02
                      </div>
                      <div class="post-list_h">
                        <p class="text_lh"> Liên hệ làm đại lý</p>
                        <p class="phone_lh"> 0979.460.110</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="panel-grid-cell">
                <div className="so-panel widget widget_black-studio-tinymce widget_black_studio_tinymce panel-first-child panel-last-child">
                  <div class="textwidget">
                    <div class="top_item">
                      <div class="count_item mr-2" style={{ right: "186px" }}>
                        03
                      </div>
                      <div class="post-list_h">
                        <p class="text_lh"> E-mail</p>
                        <p class="phone_lh"> admin@shoesstore.vn</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <Container fluid>
        <div className="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8631710597724!2d105.74398427411813!3d21.038160187457798!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1702457396912!5m2!1svi!2s"
            width="100%"
            height="650"
            style={{ border: "0", marginTop: "30px" }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Container>
    </>
  );
};

export default Contact2;
