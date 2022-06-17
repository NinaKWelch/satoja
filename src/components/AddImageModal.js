import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Spinner from "react-bootstrap/Spinner"

const AddImageModal = ({ show, loading, handleClose, children }) => (
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>Lataa kuva laitteeltasi</Modal.Title>
    </Modal.Header>
    <Modal.Body className="my-3">
      <Row className="text-center">
        {loading === true && (
          <Col xs={12} className="text-center">
            <Spinner animation="border" variant="secondary" />
            <p className="py-2 text-muted">Ladataan...</p>
          </Col>
        )}
        <Col xs={12}>{children}</Col>
      </Row>
    </Modal.Body>
  </Modal>
)

export default AddImageModal
