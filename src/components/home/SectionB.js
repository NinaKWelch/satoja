import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Card from "react-bootstrap/Card"

const SectionB = () => (
  <Col
    xs={12}
    as="section"
    className="home-section-b bg-white"
    style={{ paddingBottom: 70 }}
  >
    <Row className="justify-content-center align-items-md-center">
      <Col xs={12} md={{ span: 6, order: "last" }}>
        <Card className="border-0 bg-transparent card-video">
          <Card.Img as="figure" variant="top" className="mb-0">
            <iframe
              title="Satoja"
              src="https://www.youtube.com/embed/LEfkEBvviNc"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <figcaption className="sr-only">Maija myy lähiruokaa -video</figcaption>
          </Card.Img>
        </Card>
      </Col>
      <Col xs={12} md={{ span: 6, order: "first" }} className="text-center">
        <h3 className="mb-4 text-uppercase ">Tervetuloa!</h3>
        <p>
          SATOJA.fi on kotimainen palvelu jossa voit ostaa ja myydä lähiruokaa ja muita
          paikallisesti valmistettuja tuotteita.
        </p>
      </Col>
    </Row>
  </Col>
)

export default SectionB
