import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const TemplatePageHeader = ({ pageHeader }) => (
  <Row className="pt-2">
    <Col className="flex-grow-1 text-center" style={{ paddingTop: "0.8rem" }}>
      <h2 className="mb-0 text-break text-capitalize">{pageHeader}</h2>
    </Col>
  </Row>
)

export default TemplatePageHeader
