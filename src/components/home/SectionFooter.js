import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"

const SectionFooter = ({ url, children }) => (
  <Col xs={12} className="bg-dark py-3 text-center">
    <Link to={url}>{children}</Link>
  </Col>
)

export default SectionFooter
