import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

const HomePageBusiness = () => (
  <Row className="justify-content-center">
    <Col xs={{ span: "auto" }} className="home-business">
      <h6 className="mb-0 lh-0 text-white">Satoja Oy</h6>
      <p className="lh-0 text-white">
        Y-tunnus: 3190600-8
        <br />
        <a
          href="https://satoja.fi/dokumentit/tietosuojaseloste.html"
          target="_blank"
          rel="noreferrer"
        >
          Tietosuojaseloste
        </a>
        <br />
        <a
          href="https://satoja.fi/dokumentit/sopimusehdot.html"
          target="_blank"
          rel="noreferrer"
        >
          Käyttöehtosopimus
        </a>
        <br />
        <a
          href="https://www.epressi.com/tiedotteet/yrittajyys/uusi-verkkopalvelu-helpottaa-lahiruoan-saatavuutta-satoja-oy-etsii-lahiruokatuottajia-testaamaan-palveluaan.html"
          target="_blank"
          rel="noreferrer"
        >
          Lehdistötiedote
        </a>
        <br />
        &#169;2022
      </p>
    </Col>
  </Row>
)

export default HomePageBusiness
