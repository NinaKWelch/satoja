import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

const LogoutModal = ({ show, handleClose }) => (
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
    <Modal.Body className="my-3 text-center">
      <p>Idle limit for user reached, logging out!</p>
      <Button variant="outline-secondary" onClick={() => handleClose()} className="w-25">
        OK
      </Button>
    </Modal.Body>
  </Modal>
)

export default LogoutModal
