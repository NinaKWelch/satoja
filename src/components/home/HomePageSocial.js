import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const HomePageSocial = () => (
  <Row className="justify-content-center">
    <Col xs={{ span: "auto" }}>
      <Button as="a" href="tel:+358452094027" size="lg" className="bg-whatsapp py-0 px-2">
        <i
          itemProp="telephone"
          className="button-social bi bi-whatsapp"
          role="img"
          aria-label="Whats app"
        ></i>
      </Button>
    </Col>
    <Col xs={{ span: "auto" }}>
      <Button
        as="a"
        href="https://facebook.com/Satoja.fi"
        target="_blank"
        size="lg"
        className="bg-facebook py-0 px-2"
      >
        <i className="button-social bi bi-facebook" role="img" aria-label="Facebook"></i>
      </Button>
    </Col>
    <Col xs={{ span: "auto" }}>
      <Button
        as="a"
        href="https://instagram.com/lahiruokailija"
        target="_blank"
        size="lg"
        className="bg-instagram py-0 px-2"
      >
        <i
          className="button-social bi bi-instagram"
          role="img"
          aria-label="Instagram"
        ></i>
      </Button>
    </Col>
    <Col xs={{ span: "auto" }}>
      <Button
        as="a"
        href="https://youtube.com/channel/UCqiE95Um8Wq8JXTg92qsrcA"
        target="_blank"
        size="lg"
        className="bg-youtube py-0 px-2"
      >
        <i className="button-social bi bi-youtube" role="img" aria-label="Instagram"></i>
      </Button>
    </Col>
  </Row>
)

export default HomePageSocial
