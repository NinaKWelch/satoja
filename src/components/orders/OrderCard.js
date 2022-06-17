import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import OrderSeller from "./OrderSeller"

const OrderCard = ({ order }) => {
  // calculate total order per seller
  const calcTotal = (arr) => {
    let total = 0
    arr.forEach((item) => {
      if (item.sizes.length > 0) {
        const sum = item.sizes.reduce((a, b) => b.price * b.quantity + a, 0)
        if (item.sizes[0].removed === false) {
          total += sum
        }
      } else {
        return
      }
    })

    return total
  }

  const calcOrderTotal = (arr) => {
    let orderTotal = 0

    arr.forEach((item) => {
      if (item.seller_products.length > 0) {
        const orderSum = calcTotal(item.seller_products)
        orderTotal += orderSum
      } else {
        return
      }
    })

    return orderTotal
  }

  return (
    <Row className="mb-3 g-2 p-2 border rounded bg-white">
      <Col xs={12} className="text-end">
        <h4>Tilausnumero: {order.id}</h4>
      </Col>
      {order.sellers.map((seller, index) => (
        <OrderSeller key={index} seller={seller} handleCalcTotal={calcTotal} />
      ))}
      <Col as="p">Koko tilaus:</Col>
      <Col as="p" className="ms-auto text-end">
        {calcOrderTotal(order.sellers).toFixed(2) + "€"}
      </Col>
    </Row>
  )
}

export default OrderCard
