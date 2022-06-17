import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

const SectionALeft = () => (
  <Card className="card-buy">
    <Card.Body className="p-4">
      <Card.Title className="text-uppercase">Osta lähiruokaa</Card.Title>
      <Card.Text>
        Palvelun kautta voit varata ja noutaa tuotteita suoraan tuottajilta.
      </Card.Text>
      <ol className="pl-3">
        <li>Löydä sopiva noutotilaisuus</li>
        <li>Tee ennakkotilaus</li>
        <li>Hae tilaukset noutotilaisuudesta</li>
      </ol>
      <Button as={Link} to="/map" variant="primary" size="lg" className="w-100">
        Löydä tuotteita
      </Button>
    </Card.Body>
  </Card>
)

export default SectionALeft
