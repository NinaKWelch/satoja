//import ToastContainer from "react-bootstrap/ToastContainer"
import Toast from "react-bootstrap/Toast"

const NotificationVerify = ({ show, handleClose, message }) => (
  <div style={{ position: "relative" }}>
    <Toast
      show={show}
      onClose={handleClose}
      style={{
        position: "fixed",
        top: 10,
        left: 0,
        right: 0,
        margin: "auto",
        zIndex: 10000,
      }}
      className="bg-warning"
    >
      <Toast.Header>
        <strong className="me-auto">Satoja</strong>
      </Toast.Header>
      <Toast.Body className="bg-warning text-center">{message}</Toast.Body>
    </Toast>
  </div>
)

export default NotificationVerify
