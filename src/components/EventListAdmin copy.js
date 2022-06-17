import React, { useEffect, useState } from "react"
import axios from "axios"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import eventService from "../services/events"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import FormFieldText from "./FormFieldText"
import FormErrorMessage from "./FormErrorMessage"
import SelectMarket from "./SelectMarket"
import moment from "moment"

const EventListAdmin = ({ events, updateEvents, setUpdateEvents }) => {
//.sort((a, b) => a.itemM > b.itemM ? 1 : -1)
  /*
  const UserListAdmin = ({ users }) => {
    return users
    // return users.map((u)=>{

    // })
  }
  */

  const getEventsByDate = (eventsArray) => {
    let sortedArray = eventsArray
     sortedArray = sortedArray.sort((a, b) => moment(a.start) > moment(b.start) ? -1 : 1)
    return sortedArray
    // const eventsByDate = {}
    // sortedArray.forEach((event) => {
    //   const date = moment(event.start)
    //   const dateKey =
    //     "" +
    //     date.year() +
    //     (date.month() + 1 < 10 ? "0" + (date.month() + 1) : date.month() + 1) +
    //     (date.date() + 1 < 10 ? "0" + (date.date() + 1) : date.date() + 1)

    //   eventsByDate[dateKey] = eventsByDate[dateKey]
    //     ? eventsByDate[dateKey].concat(event)
    //     : [event]
    // })
    // return eventsByDate
  }

  const eventsByDate = getEventsByDate(events)
  const dateString = (event) => {
    const date = moment(event.start)
    //return "" + date.date() + "." + (date.month() + 1) + "." + date.year()
    return date.format("DD/MM/YYYY")
  }

  return (
    <Col xs={12} className="text-left mb-4">
      {/* {Object.keys(eventsByDate).map((day, index) => {
        return (
          <div key={index}>
            <p className="mt-4">{dateString(eventsByDate[day][0])}</p>
            {eventsByDate[day].map((event, index) => (
              <EventListItemAdmin event={event} key={index} />
            ))}
          </div>
        )
      })} */}
      {eventsByDate.map((event, index) => {
          return(
      <div key={index + "div"}>
            <p className="mt-4">{moment(event.start).format("DD.MM.YYYY")} {event.place ? event.place : event.municipality ? event.municipality : event.reko_name }</p>
            <EventListItemAdmin event={event} updateEvents={updateEvents} setUpdateEvents={setUpdateEvents} key={index + "Item"} />
          </div>
      )})}
    </Col>
  )
}
// import { Link } from "react-router-dom"

const EventListItemAdmin = ({ event, updateEvents, setUpdateEvents }) => {
  const [show, setShow] = useState(false)
  return (
    <Card className="mb-1 py-2 px-2">
      <Button onClick={() => setShow(true)}>Muokkaa</Button>
      <EventInfoLabelAdmin event={event} classes="mb-0" omitDate={true} />
      {show ? <EventForm setShow={setShow} event={event} updateEvents={updateEvents} setUpdateEvents={setUpdateEvents} /> : null}
    </Card>
  )
}
const EventForm = ({ setShow, event, updateEvents, setUpdateEvents }) => {
  const validationSchema = Yup.object().shape({
    starting_time: Yup.string().required("Vaadittu"),
    end_time: Yup.string().required("Vaadittu"),
    description: Yup.string().notRequired(),
    date: Yup.string().required("Vaadittu"),
  })
  const [markets, setMarkets] = useState([])
  const [market, setMarket] = useState({ address: event.address, id: event.market_id })
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("api/markets")
      setMarkets(response.data)
    }
    fetchData()
  }, [])

  const handleSubmit = async ({ starting_time, end_time, date, description}) => {
    const startDate = moment(date).format("YYYY-MM-DD")
    const startDateObject = moment(startDate + starting_time, 'YYYY-MM-DD HH:mm')
    const endDateObject = moment(startDate + " " + end_time, 'YYYY-MM-DD HH:mm')
    // const location = `{"lat":"${latitude}","lon":"${longitude}"}`
    // console.log("location ", location)
    //  console.log("start: " + moment(startDateObject).format('MM-DD-YYYY HH:mm'))
    //  console.log("end: " + moment(endDateObject).format('MM-DD-YYYY HH:mm'))
    await eventService.updateEvent(moment(startDateObject).format('YYYY-MM-DD HH:mm'), moment(endDateObject).format('MM-DD-YYYY HH:mm'),
      market.id, event.id, description)
    setUpdateEvents(true)
    setShow(false)
    
  }

  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          starting_time: moment(event.start).format("HH:mm"),
          end_time: moment(event.endtime).format("HH:mm"),
          date: moment(event.start).format("YYYY-MM-DD"),
          market_address: event.address,
          description: event.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Row>
              <EventFormDetails/>
              <SelectMarket market={market} setMarket={setMarket} markets={markets} />
            </Row>
            <Button
              variant="danger"
              onClick={() => {
                setShow(false)
              }}
            >
              Peruuta
            </Button>
            <Button type="submit">Päivitä</Button>
          </Form>
        )}
      </Formik>
    </Col>
  )
}

const EventFormDetails = () => {
  return (
    <Col xs={12} className="mb-5">
      <Field
        name="starting_time"
        id="staring_time"
        label="Aloitus aika"
        component={FormFieldText}
      />
      <ErrorMessage name="starting_time" component={FormErrorMessage} />
      <Field
        name="end_time"
        id="end_time"
        label="Lopetus aika"
        component={FormFieldText}
      />
      <ErrorMessage name="end_time" component={FormErrorMessage} />
      <Field name="date" id="date" label="Päivä" component={FormFieldText} />
      <ErrorMessage name="date" component={FormErrorMessage} />
      <Field name="description" id="description" label="Kuvaus" component={FormFieldText} />
      <ErrorMessage name="description" component={FormErrorMessage} />

      {/* need to move these to modify pickUpPlace once i create it */}
      {/* <Field name="latitude" id="latitude" label="Latitude" component={FormFieldText} />
      <Field name="longitude" id="longitude" label="Longitude" component={FormFieldText} /> */}
    </Col>
  )
}

const EventInfoLabelAdmin = ({ event }) => {
  const startDate = moment(event.start)
  const endDate = moment(event.endtime)

  const weekdays = [
    "Sunnuntai",
    "Maanantai",
    "Tiistai",
    "Keskiviikko",
    "Torstai",
    "Perjantai",
    "Lauantai",
  ]
  const startTime = moment(startDate).format("HH:mm")
  const endTime = moment(endDate).format("HH:mm")

//   const startTime =
//     startDate.hours() +
//     ":" +
//     (startDate.minutes() < 10 ? "0" + startDate.minutes() : startDate.minutes())
//   const endTime =
//     endDate.hours() +
//     ":" +
//     (endDate.minutes() < 10 ? "0" + endDate.minutes() : endDate.minutes())

   const startDay = weekdays[startDate.day()]

  return (
    <div>
      <p>
        {startDay} {moment(startDate).format("DD.MM")}
      </p>
      <p>
        {startTime}-{endTime}
      </p>
    </div>
  )
}

export default EventListAdmin