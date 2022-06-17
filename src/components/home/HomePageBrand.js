import Logo from "../../media/satoja-logo.png"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const HomePageBrand = () => (
  <Row className="justify-content-center">
    <Col xs={{ span: "auto" }}>
      <a href="#home">
        <img src={Logo} height="30" className="" alt="Satoja" />
      </a>
    </Col>
  </Row>
)

export default HomePageBrand
