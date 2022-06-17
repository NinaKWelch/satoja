import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import eventService from "../../services/events"
import productService from "../../services/products"
import { notifyError } from "../../actions/notification"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProductForm from "./ProductForm"
import NotifySuccess from "./NotifySuccess"

const AddProducts = ({ user }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const [success, setSuccess] = useState(false)
  const [events, setEvents] = useState([])
  const [eventSelection, setEventSelection] = useState([])

  useEffect(() => {
    // create an array of events
    // to be added to a form field
    const createEventSelection = (arr) => {
      const selection = []

      arr.forEach((obj) => {
        const event = {
          event_id: obj.id,
          selected: false,
        }
        selection.push(event)
      })

      setEventSelection(selection)
      setEvents(arr)
    }

    // get user's events from the server
    const getData = async () => {
      try {
        const data = await eventService.getSellersUpcomingEvents(user.id)
        const rekoData = await eventService.getSellersUpcomingRekoEvents(user.id)

        //combine both
        let combined = [...data, ...rekoData]
        combined.sort((a, b) => new Date(a.start) - new Date(b.start))

        createEventSelection(combined)
      } catch (err) {
        dispatch(notifyError("Tilaisuuksien haku palvelimelta epäonnistui"))
      }
    }

    getData()
  }, [user, dispatch])

  // sort selected events and
  // create array of event ids
  const sortEventsBySelected = (arr) => {
    const selected = []

    arr.forEach((obj) => {
      if (obj.selected === true) {
        selected.push(obj.event_id)
      }
    })

    return selected
  }

  // add the new product listing
  const addNewProduct = async (product, events, sizes) => {
    const eventChoices = sortEventsBySelected(events)

    try {
      const status = await productService.addProduct({ product, eventChoices, sizes })
      return status
    } catch (err) {
      dispatch(notifyError("Tuotteen lisääminen epäonnistui"))
    }
  }

  // add more products after submittimg
  const addMoreProducts = () => {
    setSuccess(false)
    setTimeout(() => window.scroll(0, 0), 500)
  }

  // navigate to products page after submittimg
  const navigateToProducts = () => {
    setSuccess(false)
    history.push("/products")
  }

  return (
    <Row className="g-2 pt-3">
      <Col xs={12} md={{ span: 6, offset: 3 }} className="pb-4">
        <ProductForm
          user={user}
          events={events}
          eventSelection={eventSelection}
          handleAddNewProduct={addNewProduct}
          handleSuccess={() => setSuccess(true)}
        />
      </Col>
      <NotifySuccess
        success={success}
        handleSuccess={() => setSuccess(false)}
        handleAddMoreProducts={addMoreProducts}
        handleNavigateToProducts={navigateToProducts}
      />
    </Row>
  )
}

export default AddProducts
