import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Image from "react-bootstrap/Image"
import Fruits from "../../media/fruit-basket.jpg"

const SectionC = () => (
  <Col xs={12} as="section" id="home-pricing" className="home-section-c bg-basic">
    <Row>
      <Col xs={12} className="text-center">
        <h2 className="mb-4 fs-1">Hinnasto</h2>
      </Col>
      <Col xs={12} md={6}>
        <Image src={Fruits} alt="hedelmäkori" fluid className="card-pricing" />
      </Col>
      <Col xs={12} md={6}>
        <h3 className="fs-3">Ostaja</h3>
        <p>Avoin kaikille. </p>
        <p>Tilaaminen vaatii rekisteröitymisen.</p>
        <h3 className="fs-3">Myyjä</h3>
        <p>5% provisio toteutuneesta myynnistä.</p>
        <p>Maksetaan kerran kuussa.</p>
        <p>
          <b>Avajaistarjous:</b>
        </p>
        <p>Ilmainen heinäkuun loppuun saakka.</p>
      </Col>
    </Row>
  </Col>
)

export default SectionC
