import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

const SectionARight = () => (
  <Card className="card-sell">
    <Card.Body className="p-4">
      <Card.Title className="text-uppercase">Myy lähiruokaa</Card.Title>
      <Card.Text>
        Liity yhteisiin noutotilaisuuksiin ja ota vastaan ennakkotilauksia.
      </Card.Text>
      <ol className="pl-3">
        <li>Luo tuoteilmoituksia</li>
        <li>Liity tilaisuuksiin</li>
        <li>Vastaanota ennakkotilauksia</li>
        <li>Toimita tuotteet tilaisuuteen</li>
      </ol>
      <Button as={Link} to="/home" variant="primary" size="lg" className="w-100">
        Lisää tuotteita
      </Button>
    </Card.Body>
  </Card>
)

export default SectionARight
