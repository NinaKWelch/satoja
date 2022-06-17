import Modal from "react-bootstrap/Modal"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

/*
Parent Component:
- set a button variant based on React-Bootstrap button variants

const Parent = () => {
    const [show, setShow] = React.useState(false)
    const handleSubmit = () => {
        what happens on submit
        setShow(false)
    }

  return (
    <>
      <Button onClick={() => setShow(true)}>open modal</Button>

      <TemplateModal
        show={show}
        handleClose={() => setShow(false)}
        handleSubmit={handleSubmit}
        title="title"
        cancelButtonLabel="Cancel"
        submitButtonVariant="success"
        submitButtonLabel="Submit"
      >
        add modal content here
      </TemplateModal>
    </>
  );
*/

const TemplateModal = ({
  show,
  handleClose,
  handleSubmit,
  title,
  cancelButtonLabel,
  submitButtonVariant,
  submitButtonLabel,
  children,
}) => (
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{children}</Modal.Body>
    <Modal.Footer>
      <Row className="w-100">
        <Col xs={6}>
          <Button
            type="button"
            className="w-100"
            variant="outline-secondary"
            onClick={handleClose}
          >
            {cancelButtonLabel}
          </Button>
        </Col>
        <Col xs={6}>
          <Button
            type="submit"
            className="w-100"
            variant={submitButtonVariant}
            onClick={handleSubmit}
          >
            {submitButtonLabel}
          </Button>
        </Col>
      </Row>
    </Modal.Footer>
  </Modal>
)

export default TemplateModal
