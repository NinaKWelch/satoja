import { ReactComponent as EmailIcon } from "../../media/envelope-fill.svg"
import { ReactComponent as PhoneIcon } from "../../media/telephone-fill.svg"
//import { ReactComponent as EditIcon } from "../../media/pencil-fill.svg"
import { ReactComponent as DeleteIcon } from "../../media/trash-fill.svg"
import Card from "react-bootstrap/Card"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import OrderSellerProductList from "../orders/OrderSellerProductList"

const EventOrdersOrderContent = ({
  order,
  outdated,
  handleCalcTotal,
  handleOrderToDelete,
}) => (
  <Card.Body className="px-3">
    <Row>
      <Col className="mb-4">
        {order.users_email && (
          <Card.Text className="mb-0 fs-6">
            <EmailIcon /> <a href={`mailto:${order.users_email}`}>{order.users_email}</a>
          </Card.Text>
        )}
        {order.users_phonenumber && (
          <Card.Text className="mb-0 fs-6">
            <PhoneIcon />{" "}
            <a href={`tel:${order.users_phonenumber}`}>{order.users_phonenumber}</a>
          </Card.Text>
        )}
      </Col>
      <Col xs={12}>
        {order.products && order.products.length > 0 ? (
          <OrderSellerProductList
            products={order.products}
            handleCalcTotal={handleCalcTotal}
          />
        ) : (
          <Card.Text>Ei tilattuja tuotteita</Card.Text>
        )}
      </Col>
      {outdated === false && (
        <Col xs={12} sm={{ span: 6, offset: 6 }} className="mb-2">
          <Button
            variant="outline-danger"
            className="w-100"
            disabled={handleCalcTotal(order.products) === 0}
            onClick={() => handleOrderToDelete(order)}
          >
            <DeleteIcon className="mb-1" />{" "}
            {handleCalcTotal(order.products) !== 0 ? "Poista tilaus" : "Tilaus poistettu"}
          </Button>
          {/*<Button
          variant="success"
          aria-label="Muokkaa tilausta"
          className="mr-3 rounded-circle"
        >
          <EditIcon />
        </Button>*/}
        </Col>
      )}
    </Row>
  </Card.Body>
)

export default EventOrdersOrderContent
