import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import SectionFContactForm from "./SectionFContactForm"

const SectionF = () => (
  <Col
    xs={12}
    as="section"
    id="home-contact"
    className="home-section-f bg-basic border-bottom"
  >
    <div className="pb-4 text-center">
      <h2 className="fs-1">Ota yhteyttä</h2>
      <p className="mb-0">
        Puh / Whatsapp:{" "}
        <a href="tel:+358452094027" className="text-decoration-none">
          045 209 4027
        </a>
      </p>
      <p>
        <a href="mailto:asiakaspalvelu@satoja.fi" className="text-decoration-none">
          asiakaspalvelu@satoja.fi
        </a>
      </p>
    </div>
    <Row className="px-2 pb-4">
      <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
        <SectionFContactForm />
      </Col>
    </Row>
  </Col>
)
export default SectionF
