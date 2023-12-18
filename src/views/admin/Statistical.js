import React from "react";

// reactstrap components
import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";

import Header from "components/Headers/Header.js";


const Statistical = () => {
  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Thống kê</h3>
              </CardHeader>
              <CardBody>
                {/* const [validationErrors, setValidationErrors] = useState({ });
                const discountSchema = yup.object().shape({
                  name: yup.string().required('Vui lòng nhập Tên Khuyến mãi'),
        // minPrice: yup.number().when('typePeriod', {
                  //     is: 0,
                  //     then: yup.number()
                  //         .typeError('Vui lòng nhập một số')
                  //         .min(0, 'Hóa đơn tối thiểu phải lớn hơn hoặc bằng 0')
                  //         .required('Vui lòng nhập Hóa đơn tối thiểu'),
                  //     otherwise: yup.mixed().notRequired(),
                  // }),
                  // salePercent: yup.number().when('typePeriod', {
                  //     is: 0,
                  //     then: yup.number()
                  //         .typeError('Vui lòng nhập một số')
                  //         .min(1, '1% <= ..% <= 15%')
                  //         .max(15, '1% <= ..% <= 15%')
                  //         .required('Vui lòng nhập Giá trị giảm'),
                  //     otherwise: yup.mixed().notRequired(),
                  // }),

                  startDate: yup.date()
                .typeError('Vui lòng chọn một ngày hợp lệ')
                .min(startOfToday(), 'Ngày bắt đầu phải từ ngày hiện tại')
                .required('Vui lòng nhập ngày bắt đầu'),
                endDate: yup.date()
                .typeError('Vui lòng chọn một ngày hợp lệ')
                .min(yup.ref('startDate'), 'Ngày kết thúc phải sau Ngày bắt đầu'),

                description: yup.string().required('Vui lòng nhập mô tả'),
    }); */}
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Statistical;
