import { ReactComponent as PlusIcon } from "../../media/plus-circle-fill.svg"
import { ReactComponent as DashIcon } from "../../media/dash-circle-fill.svg"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"

export const AddToCartButtons = ({
  handleRemoveFromCart,
  handleAddToCart,
  inCart,
  size,
  minHeight,
}) => {
  return (
    <Row className="g-0 flex-nowrap align-items-center" style={{ height: minHeight }}>
      <Col className="text-start">
        <Button
          size="sm"
          variant="link"
          className={`p-1 ${size.quantity > 0 ? "text-dark" : "text-secondary"}`}
          onClick={() => inCart > 0 && handleRemoveFromCart(size)}
          aria-label="Poista tuote ostoskorista"
        >
          <DashIcon width="28" />
        </Button>
      </Col>
      <Col className=" text-center fs-5">
        <span className={size.quantity > 0 ? "text-default" : "text-secondary"}>
          {inCart}
        </span>
      </Col>
      <Col className="text-end">
        <Button
          size="sm"
          variant="link"
          className={`p-1 ${size.quantity > 0 ? "text-dark" : "text-secondary"}`}
          onClick={() => inCart < size.quantity && handleAddToCart(size)}
          aria-label="Lisää tuote ostoskoriin"
        >
          <PlusIcon width="28" />
        </Button>
      </Col>
    </Row>
  )
}

export default AddToCartButtons
