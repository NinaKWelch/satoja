import { useDispatch } from "react-redux"
import { handleLoginModal } from "../../actions/authedUser"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

const CartOrder = ({ signedUser, totalPrice, handleOrder }) => {
  const dispatch = useDispatch()
  return (
    <Container
      fluid
      className="position-fixed bottom-0 start-0 bg-light"
      style={{ paddingBottom: 80 }}
    >
      <Row className="border-top align-items-center">
        <Col
          as="p"
          xs={6}
          sm={{ span: 5, offset: 1 }}
          md={{ span: 3, offset: 0 }}
          className="mb-0 py-2 pb-md-0 text-uppercase"
        >
          Yhteensä:
        </Col>
        <Col as="p" xs={6} sm={5} md={3} className="mb-0 py-2 pb-md-0 text-end">
          {totalPrice.toFixed(2) + "€"}
        </Col>
        <Col
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 6, offset: 0 }}
          className="pt-md-2"
        >
          <Button
            type="submit"
            variant="success"
            size="lg"
            className="w-100"
            onClick={
              signedUser
                ? handleOrder
                : () => dispatch(handleLoginModal(true, false, false))
            }
          >
            Lähetä varaus
          </Button>
        </Col>
      </Row>
    </Container>
  )
}

export default CartOrder
