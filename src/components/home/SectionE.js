import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
//import Image from "react-bootstrap/Image"
//import Video from "../../media/landing-page-image-web-sm.jpg"

const SectionE = () => (
  <Col
    xs={12}
    as="section"
    id="home-about"
    className="home-section-e bg-basic border-bottom"
  >
    <Row className="align-items-center">
      <Col xs={12} className="text-center">
        <h2 className="mb-4 fs-1">Reilu renki</h2>
      </Col>
      <Col xs={12} sm={6} md={{ span: 4, offset: 1 }}>
        <div
          style={{ backgroundColor: "#6b3529", borderRadius: "1em" }}
          className="border border-4 border-white p-4 text-center"
        >
          <h5 className="text-white">
            Vuonna 2020 Facebookia seurasi 58% 16-89-vuotiaista suomalaisista*
          </h5>
        </div>
        <div className="text-end">
          <p className="mr-2 fs-6 text-muted">*Lähde: stat.fi</p>
        </div>
      </Col>
      <Col xs={12} sm={6} md={{ span: 5, offset: 1 }} className="section-aside">
        <p>
          Löydä lähiruokaa myös Facebookin ulkopuolelta. Facebokissa toimivissa
          REKO-ryhmissä on voinut vuodesta 2013 lähtien ostaa ja myydä lähiruokaa. Sieltä
          ei kuitenkaan tavoita kaikkia mahdollisia asiakkaita.
        </p>
        <p>
          Satoja.fi palvelu tarjoaa tuottajille riskittömän palvelun, jonka kautta he voivat myydä ja markkinoida tuotteitaan suoraan kuluttajille.
        </p>
      </Col>
    </Row>
    {/*<div className="pb-4 text-center">
      <h2 className="fs-1">Tietoa meistä</h2>
    </div>
    <Row className="px-1">
      <Col xs={6} sm={4} md={3}>
        <Card className="card-list">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/200x250"
            alt="placeholder"
            className="border border-secondary border-2"
          />
          <Card.Body className="text-center">
            <Card.Title>Henkilö 1</Card.Title>
            <Card.Text className="card-text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={6} sm={4} md={3}>
        <Card className="card-list">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/200x250"
            alt="placeholder"
            className="border border-secondary border-2"
          />
          <Card.Body className="text-center">
            <Card.Title>Henkilö 2</Card.Title>
            <Card.Text className="card-text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={6} sm={4} md={3}>
        <Card className="card-list">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/200x250"
            alt="placeholder"
            className="border border-secondary border-2"
          />
          <Card.Body className="text-center">
            <Card.Title>Henkilö 3</Card.Title>
            <Card.Text className="card-text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={6} sm={4} md={3}>
        <Card className="card-list">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/200x250"
            alt="placeholder"
            className="border border-secondary border-2"
          />
          <Card.Body className="text-center">
            <Card.Title>Henkilö 4</Card.Title>
            <Card.Text className="card-text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        className="py-5"
      >
        <p>
          At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
          praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
          excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
          officia deserunt mollitia animi, id est laborum et dolorum fuga.
        </p>
      </Col>
    </Row>*/}
  </Col>
)

export default SectionE
