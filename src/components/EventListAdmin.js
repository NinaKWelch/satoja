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
  const getEventsByDate = (eventsArray) => {
    let sortedArray = eventsArray.sort((a, b) => moment(a.start) > moment(b.start) ? -1 : 1)
    return sortedArray
  }

  const eventsByDate = getEventsByDate(events)

  return (
    <Col xs={12} className="text-left mb-4">
      {eventsByDate.map((event, index) => {
          return(
      <div key={index + "div"}>
            <p className="mt-4">{moment(event.start).format("DD.MM.YYYY")} {event.name? event.name : event.place ? event.place : event.municipality ? event.municipality : event.reko_name }</p>
            <EventListItemAdmin event={event} updateEvents={updateEvents} setUpdateEvents={setUpdateEvents} key={index + "Item"} />
          </div>
      )})}
    </Col>
  )
}

const EventListItemAdmin = ({ event, updateEvents,setUpdateEvents }) => {
  const [show, setShow] = useState(false)
  return (
    <Card className="mb-1 py-2 px-2">
      <Button onClick={() => setShow(true)}>Muokkaa</Button>
      <EventInfoLabelAdmin event={event} classes="mb-0" omitDate={true} />
      {show ? <EventForm setShow={setShow} event={event} updateEvents={updateEvents} setUpdateEvents={setUpdateEvents} key={event.id} /> : null}
    </Card>
  )
}
const EventForm = ({ setShow,event,updateEvents,setUpdateEvents }) => {

  const validationSchema = Yup.object().shape({
    starting_time: Yup.string().required("Vaadittu"),
    end_time: Yup.string().required("Vaadittu"),
    event_description: Yup.string().notRequired(),
    date: Yup.string().required("Vaadittu"),
    event_name: Yup.string().notRequired()
  })
  const [markets, setMarkets] = useState([])
  const [market, setMarket] = useState( event)
  //updates the dropdown menu of addresses to choose from
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("api/markets")
      setMarkets(response.data)
    }
    fetchData()
  }, [])

  const handleSubmit = async ({ starting_time, end_time, date, event_description,event_name}) => {
    const startDate = moment(date).format("YYYY-MM-DD")
    const startDateObject = moment(startDate + starting_time, 'YYYY-MM-DD HH:mm')
    const endDateObject = moment(startDate + " " + end_time, 'YYYY-MM-DD HH:mm')
    await eventService.updateEvent(moment(startDateObject).format('YYYY-MM-DD HH:mm'), moment(endDateObject).format('MM-DD-YYYY HH:mm'),
      market.market_id, event.id, event_description,event_name)
      //forces a re-fetch for data every time we submit = we get the updated data.
    if(updateEvents)
      setUpdateEvents(false)
    if(!updateEvents)
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
          event_description: event.event_description || "",
          event_name: event.event_name || "",
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
      <Field name="event_name" id="event_name" label="Nimi" component={FormFieldText} />
      <ErrorMessage name="event_name" component={FormErrorMessage} />
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
      <Field name="event_description" id="event_description" label="Kuvaus" component={FormFieldText} />
      <ErrorMessage name="event_description" component={FormErrorMessage} />

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