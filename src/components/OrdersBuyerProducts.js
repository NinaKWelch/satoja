import { Link } from "react-router-dom"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import OrdersBuyerNav from "./OrdersBuyerNav"
import EventInfoLabel from "./events/EventInfoLabel"
import OrganicLabel from "./OrganicLabel"

const OrdersBuyerProducts = (props) => {
  const event = props.location.state.event
  const orders = props.location.state.orders

  const RenderProducts = (product, index) => {
    return (
      <Card key={index} className="mb-2 p-2 bg-white">
        <Row>
          <Col xs={4}>
            <div style={{ position: "relative" }}>
              <Card.Img
                src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_600,ar_1:1,c_fill,g_auto/${product.product_image_url}`}
                alt="Product image"
                rounded="true"
              />
              {product.organic && <OrganicLabel onOrdersPage={true} />}
            </div>
          </Col>
          <Col xs={8} className="pt-1 text-left">
            <Row>
              {(() => {
                let sellerName = ""
                if (product.seller_name) {
                  sellerName = product.seller_name
                } else {
                  sellerName = product.seller_firstname + " " + product.seller_lastname
                }
                if (!product.removed) {
                  return <Card.Subtitle>{sellerName}</Card.Subtitle>
                } else
                  return (
                    <Card.Subtitle className="text-decoration-line-through">
                      {sellerName}
                    </Card.Subtitle>
                  )
              })()}
            </Row>
            <Row className=" text-decoration-none text-body">
              <Card.Title className="text-truncate">
                {product.removed ? (
                  <del>{product.product_name}</del>
                ) : (
                  product.product_name
                )}
              </Card.Title>
            </Row>
            <Row className=" text-decoration-none text-body">
              <Card.Subtitle>
                {product.removed ? (
                  <del>
                    {" "}
                    {product.size} {product.type}
                  </del>
                ) : (
                  product.quantity
                )}{" "}
                kpl, yht{" "}
                {product.removed ? (
                  <del>
                    {(product.price * product.quantity)
                      .toFixed(2)
                      .toString()
                      .replace(".", ",")}
                  </del>
                ) : (
                  (product.price * product.quantity)
                    .toFixed(2)
                    .toString()
                    .replace(".", ",")
                )}
                €
              </Card.Subtitle>
            </Row>
          </Col>
        </Row>
      </Card>
    )
  }

  return (
    <Row className="mb-5 pb-5 h-100 bg-light-blue">
      <OrdersBuyerNav
        navLink="/orders/buyer"
        altText="Takaisin tilauksiin"
        navHeader="Noudot"
      />
      <Col xs={12} className="mb-3 pb-0 mt-3 text-center">
        <EventInfoLabel
          market={event.market}
          event={event}
          classes="mb-0 mt-0"
          styles={{ fontSize: 16 }}
        />
      </Col>
      <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
        {orders.map((order, index) => {
          const sellerPageLink = {
            pathname: `/sellers/${order.products[0].seller_id}`,
            state: {
              linkTo: {
                pathname: `/orders/buyer/${event.id ? event.id : event.event_id}`,
                state: {
                  market: props.history.location.state.event.market.market_id,
                  event: event,
                  orders: orders,
                },
              },
            },
          }

          return (
            <div key={index}>
              <Card.Title
                style={{ textDecoration: "underline", color: "black" }}
                as={Link}
                to={sellerPageLink}
              >
                {order.products[0].seller_name
                  ? order.products[0].seller_name
                  : order.products[0].seller_firstname +
                    " " +
                    order.products[0].seller_lastname}
              </Card.Title>
              <h5>tilausnumerosi: {order.order_id}</h5>
              {order.products.map((product, index) => {
                return RenderProducts(product, index)
              })}
            </div>
          )
        })}
      </Col>
      <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
        <Row className="mx-2 justify-content-between">
          <h5>YHTEENSÄ</h5>{" "}
          <h5>
            {orders
              .reduce((acc, order) => {
                return (
                  acc +
                  order.products.reduce((acc, product) => {
                    if (!product.removed) {
                      return acc + product.price * product.quantity
                    }
                    return acc
                  }, 0)
                )
              }, 0)
              .toFixed(2)
              .toString()
              .replace(".", ",") + "€"}
          </h5>
        </Row>
      </Col>
    </Row>
  )
}

export default OrdersBuyerProducts
