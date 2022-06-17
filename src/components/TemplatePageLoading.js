import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"

const TemplatePageLoading = () => (
  <Row className="pt-5">
    <Col xs={12} className="text-center">
      <Spinner animation="grow" variant="dark">
        <span className="sr-only">Ladataan...</span>
      </Spinner>
    </Col>
  </Row>
)

export default TemplatePageLoading
