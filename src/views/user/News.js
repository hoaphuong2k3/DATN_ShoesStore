
import {Card, CardHeader, CardBody, Container, Row,} from "reactstrap";
// core components
import Header from "components/Headers/UserHeader3.js";

const News = () => {
    return (
        <>
            <Header />
            <Container fluid>
                {/* Table */}
                <style>
            {`
              .panel-no-style {
                -webkit-align-items: flex-start;
                align-items: flex-start;
              }
              .title-section {
                margin: 80px 0px 0px 0px;
              }
              h2.title-header {
                font-size: 16px;
                line-height: 30px;
                color: #000;
                letter-spacing: 10.2px;
                text-transform: uppercase;
                padding: 0px 0px 3em 12em;
                font-weight: bold;
                position: relative;
              }
              .panel-no-style {
                display: flex;
                 -ms-flex-wrap: wrap;
                flex-wrap: nowrap;
                -ms-justify-content: space-between;
                justify-content: space-between;
              }
              .panel-grid-cell {
                -ms-box-sizing: border-box;
                box-sizing: border-box;
              }
              .so-panel.widget.widget_black-studio-tinymce.widget_black_studio_tinymce.panel-first-child.panel-last-child {
                padding-top: 30px;
                padding-left: 20px;
                padding-right: 20px;
              }
              .top_item {
                position: relative;
              }
              .count_item {
                top: 15px;
              }
              .top_item .count_item {
                position: absolute;
                font-size: 60px;
                line-height: 30px;
                top: 10px;
                color: #ebebeb;
                font-weight: bold;
                
              }
              .text_lh {
                margin: 0px;
                line-height: 30px;
              }
              .phone_lh {
                font-size: 16px;
                font-weight: bold;
                color: #000;
              }

              `}
          </style>
          <div>
            <section class="title-section">
              <h2 class="title-header">Liên hệ </h2>
            </section>
            <div className="panel-layout">
              <div className="panel-grid panel-no-style">
                <div className="panel-grid-cell">
                  <div className="so-panel widget widget_black-studio-tinymce widget_black_studio_tinymce panel-first-child panel-last-child">
                    <div className="textwidget">
                      <div class="top_item">
                        <div class="count_item" style={{right: "130px"}}>01</div>
                        <div class="post-list_h">
                          <p class="text_lh"> Bán hàng online</p>
                          <p class="phone_lh"> 0989.312.433</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="panel-grid-cell">
                  <div className="so-panel widget widget_black-studio-tinymce widget_black_studio_tinymce panel-first-child panel-last-child">
                    <div class="textwidget">
                      <div class="top_item">
                        <div class="count_item" style={{right: "134px"}}>02</div>
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
                        <div class="count_item" style={{right: "183px"}}>03</div>
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

          <div className="map"></div>
            </Container>
        </>
    );
};

export default News;
