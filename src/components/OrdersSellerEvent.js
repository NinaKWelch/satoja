import { Link } from "react-router-dom"
import moment from "moment"
import Card from "react-bootstrap/Card"

const OrdersSellerEvent = (props) => {
  //console.log("PROPS C: ", props)
  const RenderEvents = (event, index) => {
    var dateStart = moment(event.event_start)
    var dateEnd = moment(event.event_endtime)
    var dateMinutesStart = dateStart.minutes()
    // changes 10:0 to 10:00
    if (moment(dateStart).minutes() === 0) {
      dateMinutesStart = "00"
    }
    var dateMinutesEnd = dateEnd.minutes()
    // changes 10:0 to 10:00
    if (dateEnd.minutes() === 0) {
      dateMinutesEnd = "00"
    }

    const ordersPageLink = {
      pathname: `/orders/seller/${event.event_id}`,
      state: {
        //Orderasd: props.Orderasd,
        //setEventId: props.setEventId,
        //tapahtumat: props.tapahtumat,
        event: event,
        sellerID: props.user.id,
      },
    }

    return (
      <Card
        as={Link}
        to={ordersPageLink}
        key={index}
        className="mb-1 border border-1 border-secondary text-decoration-none"
        /*onClick={() => {
          props.setEventId(event.event_id)
        }}*/
      >
        <Card.Body className="text-dark">
          <Card.Text className="mb-0">{event.reko_name} (REKO)</Card.Text>
          <Card.Text className="mb-0">{event.event_address}</Card.Text>
          <Card.Text className="mb-0">
            aika {dateStart.hours()}:{dateMinutesStart}-{dateEnd.hours()}:{dateMinutesEnd}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
  var date = []
  var date2 = []
  var lista = []
  props.Orderasd.forEach((single, i) => {
    date = moment(single.event_start)
    date2 = moment(props.tapahtumat[0])
    if (date.isSame(date2)) {
      lista.push(single)
    }
  })

  return <div>{lista.map(RenderEvents)}</div>
}

export default OrdersSellerEvent
