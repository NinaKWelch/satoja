import Toast from "react-bootstrap/Toast"
import Alert from "react-bootstrap/Alert"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const NotificationGDPR = ({ show, handleClose }) => (
  <div style={{ position: "relative" }}>
    <Toast
      show={show}
      style={{
        position: "fixed",
        bottom: 10,
        left: 0,
        right: 0,
        margin: "auto",
        width: "95%",
        zIndex: 10000,
      }}
    >
      <Alert className="my-0" variant="light">
        <Row className="mt-3 align-items-center">
          <Col xs={12} md={6} className="text-center text-md-start mb-3">
            Käytämme palvelun parantamiseksi omia ja kolmannen osapuolen evästeitä.
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Button
              variant="danger"
              size="sm"
              onClick={handleClose}
              className="w-100 mb-3"
            >
              Hyväksyn välttämättömät
            </Button>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <Button
              variant="success"
              size="sm"
              onClick={handleClose}
              className="w-100 mb-3"
            >
              Hyväksyn kaikki
            </Button>
          </Col>
        </Row>
      </Alert>
    </Toast>
  </div>
)

export default NotificationGDPR
