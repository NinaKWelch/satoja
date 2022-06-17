import Toast from "react-bootstrap/Toast"
import Alert from "react-bootstrap/Alert"

/*
Parent Component:
- the error notification should be placed apart from the main content
- set a delay in milliseconds (ie. 5000 = 5 sec) for how long the notification should be displayed

const Parent = () => {
    const [show, setShow] = React.useState(false);

  return (
    <>
      <NotificationError
        show={show}
        handleClose={() => setShow(false)}
        delay={ms}
        message="message"
      />

      <div>
        Other content
      </div>
    </>
  );
*/

const NotificationError = ({ show, handleClose, delay, message }) => (
  <div style={{ position: "relative" }}>
    <Toast
      show={show}
      onClose={handleClose}
      delay={delay}
      autohide
      style={{
        position: "fixed",
        top: 10,
        left: 0,
        right: 0,
        margin: "auto",
        zIndex: 10000,
      }}
    >
      <Alert className="my-0 text-center" variant="danger">
        {message}
      </Alert>
    </Toast>
  </div>
)

export default NotificationError
