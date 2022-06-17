import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
// Hei{user ? ` ${user.firstname}` : ""}!
const WelcomePage = ({ user }) => (
  <Row as="main" className="pt-5">
    <Col xs={12} className="mb-3 text-center">
      <h3>Tervetuloa mukaan Satoja-palveluun.</h3>
      <p>Voit nyt sulkea tämän välilehden ja kirjautua palveluun.</p>
    </Col>
  </Row>
)

export default WelcomePage
