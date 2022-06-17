import "./PopUp.css"
import Col from "react-bootstrap/esm/Col"
import Row from "react-bootstrap/esm/Row"
import Button from "react-bootstrap/Button"

const DeleteOrderPopUp = (props) => {
  const handleDeleteButton = () => {
    if (props.deleteProductPopUp) {
      props.DeleteProductFromOrder()
      props.setPopUp(false)
    }
    if (props.deleteOrderPopUp) {
      props.DeleteOrder()
      props.setPopUp(false)
    }
  }
  return (
    <div className="popup">
      <div className="popup-inner">
        <Row className="flex-column text-center">
          <Col xs={{ span: 2, offset: 10 }}>
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                className="bi bi-x-circle"
                viewBox="0 0 16 16"
                onClick={() => props.setPopUp(false)}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </div>
          </Col>
          <Col className="mb-3 p-2">{props.children}</Col>
          <Col className="text-center">
            <Button
              type="submit"
              variant="outline-danger"
              onClick={handleDeleteButton}
              size="lg"
              className="w-75"
            >
              Vahvista poisto
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default DeleteOrderPopUp
