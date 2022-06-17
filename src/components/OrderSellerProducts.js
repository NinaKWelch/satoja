import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Accordion from "react-bootstrap/Accordion"
import ListGroup from "react-bootstrap/ListGroup"
import ListGroupItem from "react-bootstrap/ListGroupItem"

const OrdersSellerProducts = (props) => {
  const Order = props.Order
  const products = props.Order.events_orders
  let productsList = []
  let userList = []
  //TODO this props need to be updated when removing an order in "ordersellerbuyers.js"
  //    console.log("products: ", products)
  //    console.log("Order: ", Order)

  const getUsers = (list) => {
    list.events_orders.map((x) => {
      if (x && x !== undefined) {
        userList.push({
          firstname: x.users_firstname,
          lastname: x.users_lastname,
          order_id: x.order_id,
          user_id: x.user_id,
          user_orders: x.user_orders,
        })
      }
      return null
    })
  }

  const getProducts = (list) => {
    const products = []
    const lista = []
    for (let i = 0; i < list.length; i++) {
      if (list[i] && list[i] !== undefined) {
        products.push(list[i].user_orders)
      }
    }
    products.map((x) => {
      for (let i = 0; i < x.length; i++) {
        lista.push({
          name: x[i].product_name,
          quantity: x[i].quantity,
          reserved_quantity: x[i].reserved_quantity,
          price: x[i].price,
          id: x[i].product_id,
          image: x[i].product_image_url,
          removed: x[i].removed,
        })
      }
      return null
    })
    productsList = []
    lista.forEach((x) => {
      //var quantityCounter = 0
      const tulos = productsList.find((t) => t.name === x.name)
      if (!tulos) {
        if (x.removed !== true) {
          productsList.push({
            name: x.name,
            quantity: x.quantity,
            reserved_quantity: x.reserved_quantity,
            price: x.price,
            image: x.image,
            removed: x.removed,
          })
        }
      } else {
        if (x.removed !== true && x.name === tulos.name) {
          tulos.quantity = tulos.quantity + x.quantity
        }
      }
    })
  }

  getProducts(products)
  getUsers(Order)

  const HandleSingleBuyerButton = () => {
    props.setNavBarValue("order")
    //props.setListView(false)
  }
  const Buyers = (props) => {
    const names = []
    props.userList.map((dude) => {
      dude.user_orders.map((yksikko) => {
        if (yksikko.product_name === props.product_name) {
          return names.push({
            firstname: dude.firstname,
            lastname: dude.lastname,
            id: dude.order_id,
          })
        }
        return null
      })
      return null
    })
    function getUnique(persons, index) {
      const unique = []
      persons.map((person) => {
        if (unique.find((x) => x.id === person.id)) {
        } else {
          unique.push(person)
        }
        return null
      })
      return unique
    }
    const uniqueUsers = getUnique(names)

    return uniqueUsers.map((person, index) => {
      return (
        <ListGroupItem className="border-0 px-0 pt-3 text-left" key={index}>
          <Row className="flex-nowrap align-items-center">
            <Col xs={9}>
              <Card.Text className="mb-1">
                {person.firstname} {person.lastname}
              </Card.Text>
              <Card.Text>Tilausnumero: {person.id}</Card.Text>
            </Col>
          </Row>
        </ListGroupItem>
      )
    })
  }

  const renderOrders = (product, index) => {
    return (
      <Accordion className="mb-1" key={index}>
        <Card>
          <Accordion.Toggle as={Button} variant="text" eventKey="0">
            <Row className="flex-nowrap align-items-center">
              <Col xs={4}>
                <Card.Img
                  src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_600/${product.image}`}
                  alt="Tuotekuva"
                />
              </Col>
              <Col xs={8} className="text-left">
                <Card.Title className="text-truncate">{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Myyty: {product.quantity} kpl
                </Card.Subtitle>
              </Col>
            </Row>
            <Accordion.Collapse eventKey="0">
              <ListGroup>
                <Buyers
                  key={index}
                  userList={userList}
                  product_name={product.name}
                  HandleSingleBuyerButton={HandleSingleBuyerButton}
                />
              </ListGroup>
            </Accordion.Collapse>
          </Accordion.Toggle>
        </Card>
      </Accordion>
    )
  }
  return <div>{productsList.map(renderOrders)}</div>
}

export default OrdersSellerProducts
