
import { Button, Container, Row, Col } from "reactstrap";

const ProfileHeader = () => {
  return (
    <>
      <div
        className="header pb-6 pt-5 pt-lg-8 d-flex align-items-center"

      >
        {/* Mask */}
        <span className="mask bg-gradient-default opacity-7" />
        {/* Header container */}
        <Container className="d-flex align-items-center" fluid>
        </Container>
      </div>
    </>
  );
};

export default ProfileHeader;
