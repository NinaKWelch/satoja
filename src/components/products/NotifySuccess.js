import { Link } from "react-router-dom"
import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const NotifySuccess = ({
  success,
  handleSuccess,
  handleAddMoreProducts,
  handleNavigateToProducts,
}) => (
  <Modal
    show={success}
    onHide={handleSuccess}
    backdrop="static"
    keyboard={false}
    centered
  >
    <Modal.Header closeButton>
      <Modal.Title>Julkaistu</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>Kerro kavereille!</h4>
      <p>
        Ilmoitusta ja noutotilaisuuksia voi muokata{" "}
        <Link to="/products" className="text-primary text-decoration-underline">
          tuotteet
        </Link>{" "}
        sivulta.
      </p>
    </Modal.Body>
    <Modal.Footer>
      <Row className="w-100">
        <Col xs={6}>
          <Button
            type="button"
            className="w-100"
            variant="outline-secondary"
            onClick={handleNavigateToProducts}
          >
            Valmis
          </Button>
        </Col>
        <Col xs={6}>
          <Button
            type="submit"
            className="w-100"
            variant="success"
            onClick={handleAddMoreProducts}
          >
            Luo uusi ilmoitus
          </Button>
        </Col>
      </Row>
    </Modal.Footer>
  </Modal>
)

export default NotifySuccess
