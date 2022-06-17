import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
//import Card from "react-bootstrap/Card"

const SectionD = () => (
  <Col
    xs={12}
    as="section"
    id="home-podcast"
    className="home-section-d bg-white"
    style={{ paddingBottom: 80 }}
  >
    <Row className="mb-4">
      <Col xs={12} className="pb-4 text-center">
        <h2 className="fs-1">Tunne Tuottaja podcast</h2>
      </Col>
      <Col
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        className="section-text"
      >
        <p>
          Satoja etsii Etelä-Savosta ja ympäröivistä maakunnista tuottajia, joiden tilan
          toimintaan voisin tulla tutustumaan työvaatteissa.
        </p>
        <p>
          Onko teidän tilalla tarvetta ylimääräiselle käsiparille?{" "}
          <a href="#home-contact">Ota yhteyttä</a>, niin sovitaan päivämäärä. Ei maksa
          mitään. Jos haluatte, niin voidaan työpäivän päätteeksi jutella tilan
          toiminnasta nauhalle.
        </p>
        <p>- Nestori Virtanen, Satoja Oy</p>
      </Col>
    </Row>
    <Row>
      <Col xs={12} className="mb-4 text-center">
        <h3>Kuuntele viimeisimmät podcast jaksot</h3>
      </Col>
      <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
        <iframe
          src="https://open.spotify.com/embed/episode/3fQfthXs9IuKEtjUjMJqd4?utm_source=generator&theme=0"
          title="Tutustumispäivä Iso-Mikkasen lammastilaan Anu Mikkasen opastuksella."
          width="100%"
          height="152"
          frameBorder="0"
          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </Col>
      <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
        <iframe
          src="https://open.spotify.com/embed/episode/65GAuFtavrKBhcOG7Af66P?utm_source=generator&theme=0"
          title="Tässä jaksossa tutustutaan Kuvalan lihan toimintaan."
          width="100%"
          height="152"
          frameBorder="0"
          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </Col>
      <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
        <iframe
          src="https://open.spotify.com/embed/episode/5wOBSztEzSp2zCx7bgxHtv?utm_source=generator&theme=0"
          title="Järvisuomen kalatuote Hirvensalmen Kissakoskella."
          width="100%"
          height="152"
          frameBorder="0"
          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </Col>
      <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
        <iframe
          src="https://open.spotify.com/embed/episode/7MSdmEUim1znEDfFWe30S1?utm_source=generator&theme=0"
          title="Jaksossa tutustutaan Hietalan luomutilan toimintaan"
          width="100%"
          height="152"
          frameBorder="0"
          allow="clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        ></iframe>
      </Col>
    </Row>
    {/*<Row className="px-1">
      <Col xs={12} sm={6} md={4}>
        <Card className="card-list">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/300x200"
            alt="placeholder"
            className="border border-secondary border-2"
          />
          <Card.Body>
            <Card.Title>Jakso 1</Card.Title>
            <Card.Text className="card-text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={6} md={4}>
        <Card className="card-list">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/300x200"
            alt="placeholder"
            className="border border-secondary border-2"
          />
          <Card.Body>
            <Card.Title>Jakso 2</Card.Title>
            <Card.Text className="card-text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col xs={12} sm={6} md={4}>
        <Card className="card-list">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/300x200"
            alt="placeholder"
            className="border border-secondary border-2"
          />
          <Card.Body>
            <Card.Title>Jakso 3</Card.Title>
            <Card.Text className="card-text-truncate">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>*/}
  </Col>
)

export default SectionD
