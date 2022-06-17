import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import SectionALeft from "./SectionALeft"
import SectionACenter from "./SectionACenter"
import SectionARight from "./SectionARight"

const SectionA = () => (
  <Col xs={12} as="section" id="home" className="home-section-a">
    <Row className="justify-content-md-center align-items-end">
      <Col md={4} lg={3} className="d-none d-md-block">
        <SectionALeft />
      </Col>
      <SectionACenter />
      <Col md={4} lg={3} className="d-none d-md-block">
        <SectionARight />
      </Col>
    </Row>
  </Col>
)

export default SectionA
