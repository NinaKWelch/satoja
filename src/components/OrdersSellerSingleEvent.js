import { useState } from "react"
import { useLocation } from "react-router-dom"
import Col from "react-bootstrap/esm/Col"
import TemplatePage from "./TemplatePage"
import OrderSellerNavigationBar from "./OrderSellerNavigationbar"
import OrderSellerTimeHeader from "./OrderSellerTimeHeader"
import OrdersSellerBuyers from "./OrderSellerBuyers"
import OrderSellerProducts from "./OrderSellerProducts"
//import OrdersSellerEvent from "./OrdersSellerEvent"
import moment from "moment"

const OrdersSellerSingleEvent = (props) => {
  const [buyerIndexi, setBuyerIndexi] = useState(null)
  const [navBarValue, setNavBarValue] = useState("product")

  const location = useLocation()
  const sellerId = Number(location.state.sellerID)
  const foundEvent = location.state.event
  //date manipulations, disgusting I know  --Yoda
  //const foundEvent = props.Orderasd.find((x) => x.event_id === eventID)

  const HandleOrderButton = () => setNavBarValue("order")
  const HandleProductButton = () => setNavBarValue("product")

  const dateStart = moment(foundEvent.event_start)
  const dateEnd = moment(foundEvent.event_endtime)

  const dateHourEnd = dateEnd.hours()
  var dateMinutesEnd = dateEnd.minutes()
  const dateHourStart = dateStart.hours()
  var dateMinutesStart = dateStart.minutes()
  const Month = dateStart.month() + 1
  const thisDate = dateStart.date()
  var paivaStart = dateStart.day()

  var datepaiva
  if (paivaStart === 1) {
    datepaiva = "Maanantai"
  }
  if (paivaStart === 2) {
    datepaiva = "Tiistai"
  }
  if (paivaStart === 3) {
    datepaiva = "Keskiviikko"
  }
  if (paivaStart === 4) {
    datepaiva = "Torstai"
  }
  if (paivaStart === 5) {
    datepaiva = "Perjantai"
  }
  if (paivaStart === 6) {
    datepaiva = "Lauantai"
  }
  if (paivaStart === 7) {
    datepaiva = "Sunnuntai"
  }
  if (dateMinutesStart === 0) {
    dateMinutesStart = "00"
  }
  if (dateMinutesEnd === 0) {
    dateMinutesEnd = "00"
  }
  /*if (props.eventId === null) {
    return (
      <OrdersSellerEvent tapahtumat={props.tapahtumat} setEventId={eventID} />
    )
  } else {*/
  if (navBarValue === "product") {
    return (
      <TemplatePage
        pageHeader="Tilaukset"
        backLink="/orders/seller"
        backLinkLabel="Palaa tapahtumiin"
        pageColor="bg-light-purple"
      >
        <OrderSellerTimeHeader
          datepaiva={datepaiva}
          dateHourStart={dateHourStart}
          dateMinutesStart={dateMinutesStart}
          month={Month}
          dateHourEnd={dateHourEnd}
          dateMinutesEnd={dateMinutesEnd}
          thisDate={thisDate}
          Order={foundEvent}
        />
        <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <OrderSellerNavigationBar
            HandleProductButton={HandleProductButton}
            HandleOrderButton={HandleOrderButton}
            navBarValue={navBarValue}
          />
          <OrderSellerProducts
            Order={foundEvent}
            //setListView={setListView}
            setNavBarValue={setNavBarValue}
          />
        </Col>
      </TemplatePage>
    )
  } else {
    return (
      <TemplatePage
        pageHeader="Tilaukset"
        backLink="/orders/seller"
        backLinkLabel="Palaa tapahtumiin"
        pageColor="bg-light-purple"
      >
        <OrderSellerTimeHeader
          datepaiva={datepaiva}
          dateHourStart={dateHourStart}
          dateMinutesStart={dateMinutesStart}
          month={Month}
          dateHourEnd={dateHourEnd}
          dateMinutesEnd={dateMinutesEnd}
          thisDate={thisDate}
          Order={foundEvent}
        />
        <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <OrderSellerNavigationBar
            HandleProductButton={HandleProductButton}
            HandleOrderButton={HandleOrderButton}
            navBarValue={navBarValue}
          />
          <OrdersSellerBuyers
            Order={foundEvent.events_orders}
            buyerIndexi={buyerIndexi}
            setBuyerIndexi={setBuyerIndexi}
            SellerId={sellerId}
            setNavBarValue={setNavBarValue}
          />
        </Col>
      </TemplatePage>
    )
  }
  /*}*/
}

export default OrdersSellerSingleEvent
