import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { addProductToCart, removeProductFromCart } from "../actions/shoppingCart"
import { handleMissingImage } from "../helpers/imageErrorHelper"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import EventPageListButtons from "../events/EventPageListButtons"
import OrganicLabel from "./OrganicLabel"

const EventPageListItem = ({ product, event, market, singleSize }) => {
  const dispatch = useDispatch()

  const handleAddToCart = (size) => {
    dispatch(
      addProductToCart({ ...product, singleSize: singleSize }, size, {
        ...event,
        market: market,
      })
    )
  }

  const handleRemoveFromCart = (size) => {
    dispatch(removeProductFromCart(product, size, { ...event, market: market }))
  }

  const productPageLink = {
    pathname: `/events/${event.id ? event.id : event.event_id}/products/${product.id}`,
    state: {
      event: event,
      product: product,
      market: market,
      singleSize: singleSize,
      linkTo: {
        pathname: `/events/${event.id ? event.id : event.event_id}`,
        state: { market: market, event: event },
      },
    },
  }

  /*
  const sellerPageLink = {
    pathname: `/sellers/${product.sellers_id}`,
    state: {
      linkTo: {
        pathname: `/events/${event.id ? event.id : event.event_id}`,
        state: { market: market, event: event },
      },
    },
  }
  */

  return (
    <Card className="mb-1 p-2">
      <Row>
        <Col xs={4} as={Link} to={productPageLink} alt="katso tuotteen tiedot">
          <div style={{ position: "relative" }}>
            {/* fallbacks added for missing or broken image link */}
            <Card.Img
              src={
                product.image_url
                  ? `https://res.cloudinary.com/dpk81nwou/image/upload/w_600,ar_1:1,c_fill,g_auto/${product.image_url}`
                  : handleMissingImage(product.category)
              }
              onError={(e) =>
                e.target.src !== handleMissingImage(product.category)
                  ? (e.target.src = handleMissingImage(product.category))
                  : ""
              }
              alt="tuotekuva"
            />
            {product.organic && <OrganicLabel />}
          </div>
        </Col>
        <Col xs={8} className="pt-1 text-left">
          <Row
            className="pr-3 justify-content-between text-decoration-none text-muted"
            as={Link}
            to={productPageLink}
            alt="katso tuotteen tiedot"
          >
            <Card.Subtitle>
              {product.seller_name
                ? product.seller_name
                : product.seller_firstname + " " + product.seller_lastname}
            </Card.Subtitle>
          </Row>
          <Row
            className="flex-column text-decoration-none text-body pr-2"
            as={Link}
            to={productPageLink}
          >
            <Card.Title className="mb-0">{product.name}</Card.Title>
            {/* was showing most expensive price per type, keeping this line here if we want to use it {!singleSize && (
              <Card.Title>
                {" "}
                {product.unit_price  + "e / " + product.type}{" "}
              </Card.Title>
            )} */}
          </Row>

          {singleSize ? (
            <Row>
              <EventPageListButtons
                addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
                eventID={event.id ? event.id : event.event_id}
                size={product.sizes[0]}
                unit={product.type}
                product={product}
              />
            </Row>
          ) : (
            <Col className="text-right">
              <Button size="sm" variant="light" as={Link} to={productPageLink}>
                <i className="bi bi-card-list"></i> Eri kokoja
              </Button>
            </Col>
          )}
        </Col>
      </Row>
    </Card>
  )
}

export default EventPageListItem
