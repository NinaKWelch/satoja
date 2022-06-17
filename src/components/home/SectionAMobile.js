import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import SectionALeft from "./SectionALeft"
import SectionARight from "./SectionARight"

const SectionAMobile = () => (
  <Col xs={12} as="section" className="d-md-none bg-basic">
    <Row className="mt-5 mx-3">
      <Col md={3} className="mb-3">
        <SectionALeft />
      </Col>
      <Col md={3}>
        <SectionARight />
      </Col>
    </Row>
  </Col>
)

export default SectionAMobile
