import Col from "react-bootstrap/Col"
import OrdersSellerEvent from "./OrdersSellerEvent"
import moment from "moment"

const OrderSellerEventList = (props) => {
  const Paivamaarat = (date, index) => {
    // sorting events by date
    const tapahtumat = []
    for (let i = 0; i < props.paivamaarat.length; i++) {
      var date2 = props.paivamaarat[i]
      // if (
      //   date2.date() === date.date() &&
      //   date2.month() === date.month() &&
      //   date2.getFullYear() === date.getFullYear()
      // )
      if ((moment(date2).isSame(date), "day")) {
        tapahtumat.push(date)
      }
    }

    if (props.eventId === null) {
      return (
        <Col
          key={index}
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 8, offset: 2 }}
          lg={{ span: 6, offset: 3 }}
          className="mb-4"
        >
          <h4 className="mb-0 pt-1">
            {/* {date.date()}.{date.month() + 1}. */}
            {moment(date).date()}.{moment(date).month() + 1}.
          </h4>
          <OrdersSellerEvent
            setEventId={props.setEventId}
            Orderasd={props.Orderasd}
            tapahtumat={tapahtumat}
            user={props.user}
          />
        </Col>
      )
    }
  }
  return props.paivamaarat.map((p, i) => Paivamaarat(p, i))
}
export default OrderSellerEventList
