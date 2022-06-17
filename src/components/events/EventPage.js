import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory } from "react-router-dom"
import { getEvents } from "../../services/events"
import { getEventProducts } from "../../services/products"
import { setEvents, updateEvent } from "../../actions/events"
import { notifyError } from "../../actions/notification"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplatePage from "../TemplatePage"
import TemplatePageLoading from "../TemplatePageLoading"
import SEO from "../home/SEO"
import EventPageProductFilter from "./EventPageProductFilter"
import EventPageProductList from "./EventPageProductList"
import EventInfo from "./EventInfo"
import SEOImage from "../../media/event-image-social.jpg"
import { isEqual } from "lodash"
import moment from "moment"

const EventPage = () => {
  const { eventID } = useParams()
  const history = useHistory()
  const dispatch = useDispatch()
  const events = useSelector(({ events }) => events)
  const cart = useSelector(({ shoppingCart }) => shoppingCart)
  const [event, setEvent] = useState(null)
  const [market, setMarket] = useState(null)
  const [productsToShow, setProductsToShow] = useState(null)
  const [querySeller, setQuerySeller] = useState("")
  const [queryCategory, setQueryCategory] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  // assign name for the seller
  const getSellerName = (product) => {
    if (product.seller_name) {
      return product.seller_name
    } else if (product.seller_firstname && product.seller_lastname) {
      return `${product.seller_firstname} ${product.seller_lastname}`
    } else if (product.seller_firstname || product.seller_lastname) {
      return product.seller_firstname ? product.seller_firstname : product.seller_lastname
    } else {
      // default for missing name
      return "Tuottaja " + product.sellers_id
    }
  }

  // tell prerender.io exactly when page is ready to be saved
  // https://docs.prerender.io/docs/11-best-practices
  useEffect(() => {
    loading ? (window.prerenderReady = false) : (window.prerenderReady = true)
  }, [loading])

  useEffect(() => {
    // this checks if the produts shown are the right ones
    // ie. page reloads or user opens the page via url
    const checkForWrongProducts = (products, seller, category) => {
      const includesOtherSellers =
        seller !== "Kaikki tuottajat" &&
        products.filter((product) => !seller.includes(getSellerName(product))).length > 0
      const includesOtherCategories =
        category !== "Kaikki tuotekategoriat" &&
        products.filter((product) => !category.includes(product.category)).length > 0

      if (includesOtherSellers || includesOtherCategories) {
        if (seller !== "Kaikki tuottajat" && category !== "Kaikki tuotekategoriat") {
          let newProducts = products.filter(
            (product) =>
              seller.includes(getSellerName(product)) &&
              category.includes(product.category)
          )
          setProductsToShow(newProducts)
        } else if (seller !== "Kaikki tuottajat") {
          let newProducts = products.filter((product) =>
            seller.includes(getSellerName(product))
          )
          setProductsToShow(newProducts)
        } else if (category !== "Kaikki tuotekategoriat") {
          let newProducts = products.filter((product) =>
            category.includes(product.category)
          )
          setProductsToShow(newProducts)
        }
      }
    }

    if (productsToShow && querySeller !== "" && queryCategory !== "") {
      checkForWrongProducts(productsToShow, querySeller, queryCategory)
    }
  }, [productsToShow, querySeller, queryCategory])

  useEffect(() => {
    // the user may have ordered the same product form another event
    // in which case the product quantity for current event must be reduced
    const checkForProductOrders = (products, orders) => {
      let updatedProducts = []

      // reduce the order quantity of products that are sold at
      // the current event but have been added to cart via another event
      for (let product of products) {
        for (let order of orders) {
          for (let batch of order.batches) {
            // check size id to find out
            // if product is sold at the current event
            const hasProductSize = product.sizes.find(
              (item) => item.size_id === batch.size_id
            )

            const updatedProductSizes = (sizes) =>
              sizes.map((item) =>
                item.size_id !== batch.size_id
                  ? item
                  : { ...item, quantity: batch.quantity - batch.order_quantity }
              )

            const updatedProduct = {
              ...product,
              sizes: updatedProductSizes(product.sizes),
            }

            if (hasProductSize) {
              if (updatedProducts.length > 0) {
                // check if product has orders in more than one event
                // or in more than one size
                const hasProduct = updatedProducts.find((item) => item.id === product.id)

                if (hasProduct) {
                  updatedProducts = updatedProducts.map((item) =>
                    item.id !== product.id
                      ? item
                      : { ...item, sizes: updatedProductSizes(item.sizes) }
                  )
                }
              } else {
                updatedProducts.push(updatedProduct)
              }
            }
          }
        }
      }

      // update products if available quantities have changed
      if (updatedProducts.length > 0) {
        const productsWithUpdates = products.map((product) => {
          const changedItem = updatedProducts.find((item) => item.id === product.id)
          if (changedItem) {
            return changedItem
          } else {
            return product
          }
        })

        const noChanges = isEqual(products, productsWithUpdates)
        noChanges === false && setEvent({ ...event, products: productsWithUpdates })
      }
    }

    if (event && event.products && event.products.length > 0) {
      if (cart && cart.length > 0) {
        // check for orders in other events
        const ordersInOtherEvents = cart.filter(
          (order) => order.event_id !== Number(eventID)
        )

        ordersInOtherEvents.length > 0 &&
          checkForProductOrders(event.products, ordersInOtherEvents)
      }
    }
  }, [cart, eventID, event])

  useEffect(() => {
    setLoading(true)
    let controller = new AbortController()
    const currentDate = moment()

    // fetch event products from the server
    const fetchEventProducts = async (event) =>
      await getEventProducts(event.id).then((data) => {
        if (data && data.length > 0) {
          // TODO: can this be fixed at the server side?
          const products = data.map((product) =>
            product.type !== "pc" ? product : { ...product, type: "kpl" }
          )

          // check if event products are added and up to date
          // (only the product ids are compared,
          // availability is checked on checkout)
          if (!event.products) {
            dispatch(updateEvent({ ...event, products }))
            setEvent({ ...event, products })
          } else if (event.products) {
            let newProducts = []

            for (let product of products) {
              const currentProduct = event.products.find((item) => item.id === product.id)

              !currentProduct && newProducts.push(product)
            }

            // if new products have been added
            // update event products
            if (newProducts.length > 0) {
              const updatedProducts = [...event.products, ...newProducts]
              dispatch(updateEvent({ ...event, products: updatedProducts }))
              setEvent({ ...event, products: updatedProducts })
            } else {
              // if no new products have been added,
              // show current event with products
              setEvent(event)
            }
          }
          controller = null
        } else if (data && data.length === 0) {
          // if number of products is 0, add a products variable
          setEvent({ ...event, products: [] })
        }

        if (data && data.status === 500) {
          // notify about server error (status 500)
          dispatch(
            notifyError("Tapahtumassa olevien tuotteiden haku palvelimelta epäonnistui")
          )
        }

        setLoading(false)
      })

    // fetch events form the server
    const fetchEvents = async () =>
      await getEvents().then((data) => {
        if (data && data.length > 0) {
          const currentEvents = data.filter((item) =>
            moment(item.endtime).isSameOrAfter(currentDate)
          )

          if (currentEvents && currentEvents.length > 0) {
            const isCurrent = currentEvents.find((event) => event.id === Number(eventID))

            // if event is current (date),
            // save all current events to local state
            isCurrent && dispatch(setEvents(currentEvents))
          }
        }

        if (data && data.status === 500) {
          // notify about server error (status 500)
          dispatch(notifyError("Tapahtumien haku palvelimelta epäonnistui"))
          setError(true)
        }

        setLoading(false)
      })

    // show event if current
    if (events && events.length > 0) {
      const currentEvent = events.find((event) => event.id === Number(eventID))

      if (currentEvent) {
        // check that locally stored event is still active
        const isCurrent = moment(currentEvent.endtime).isSameOrAfter(currentDate)

        if (isCurrent) {
          const currentMarket = {
            id: currentEvent.market_id,
            start: currentEvent.start,
            endtime: currentEvent.endtime,
            market_name: currentEvent.market_name || "",
            place: currentEvent.place || "",
            market_description: currentEvent.market_description || "",
            address: currentEvent.address,
          }

          // assign current market
          setMarket(currentMarket)
          fetchEventProducts(currentEvent)
        } else {
          setLoading(false)
        }
      } else {
        // check if event is a current event but not in local state
        // ie. cases where url is no longer valid
        // or cases where user refreshes product page
        // and then selects event via map page
        fetchEvents()
      }
    }

    // fetch events and show event if current
    !events && error === false && fetchEvents()

    // handles cases where component unmounts during API requests
    // ie. on browser refresh
    return () => controller?.abort()
  }, [dispatch, error, eventID, events])

  // handle changed search terms
  const handleQueryUrl = (seller, category) => {
    // remove spaces and special characters from the filter values
    let sellerName = seller.replace(/[&]/g, "ja").replace(/[^a-zA-Z0-9_-]/g, "")
    let categoryName = category.replace(/[&]/g, "ja").replace(/[^a-zA-Z0-9_-]/g, "")

    // change url based on the query
    history.replace(
      `/events/${eventID}?name=${sellerName.toLowerCase()}&category=${categoryName.toLowerCase()}`
    )
  }

  // add event details to meta descriptionn (SEO)
  const date = (event) => {
    const weekdays = [
      "Sunnuntai",
      "Maanantai",
      "Tiistai",
      "Keskiviikko",
      "Torstai",
      "Perjantai",
      "Lauantai",
    ]

    const startDate = moment(event.start ? event.start : event.event_start)
    const startDay = weekdays[startDate.day()]
    const startTime = `${startDate.hours()}:${
      startDate.minutes() < 10 ? "0" + startDate.minutes() : startDate.minutes()
    }`

    return `${startDay} ${startDate.date()}.${startDate.month() + 1} klo ${startTime}`
  }

  const capitalise = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

  const getSEOImage = () => {
    if (productsToShow && productsToShow.length > 0) {
      if (querySeller !== "" || querySeller !== "Kaikki tuottajat") {
        switch (true) {
          case productsToShow[0].seller_image_url:
            return `https://res.cloudinary.com/dpk81nwou/image/upload/c_fill,g_auto,h_630,w_1200/${productsToShow[0].seller_image_url}`
          case productsToShow[0].image_url:
            return `https://res.cloudinary.com/dpk81nwou/image/upload/c_fill,g_auto,h_630,w_1200/${productsToShow[0].image_url}`
          default:
            return SEOImage
        }
      } else {
        return SEOImage
      }
    } else {
      return SEOImage
    }
  }

  const shareContent = {
    heading: "Jaa noutotilaisuus",
    title: "Noutotilaisuus",
    hashtag:
      "#noutotilaisuus" /* for Facebook: only one allowed, must include hashtag character */,
    hashtags: [
      "noutotilaisuus",
    ] /* for Twitter: array of strings, must exclude hashtag character */,
    message: "Tilaa tuotteita ennakkoon Satoja-palvelusta.",
  }

  return (
    <TemplatePage
      pageHeader="Noutotilaisuus"
      backLink={true}
      shareLink={shareContent}
      pageColor="bg-basic"
    >
      {loading ? (
        <TemplatePageLoading />
      ) : (
        <Row as="main" className="g-0 align-items-center">
          {event ? (
            <>
              <SEO
                title="Noutotilaisuus"
                description={`${date(event)}, ${event.event_name && event.event_name}, ${
                  market.market_name && market.market_name
                }, ${market.place && market.place}, ${market.address}. ${
                  event.event_description.length > 270
                    ? capitalise(event.event_description).substring(0, 270) + "..."
                    : capitalise(event.event_description)
                }`}
                keywords="Tilaisuus, Noutotilaisuus, Tapahtuma, Ennakkotilaus"
                image={getSEOImage()}
              />
              <Col xs={12} className="mb-4 text-center">
                <EventInfo market={market} event={event} />
              </Col>
              {event.event_description && (
                <Col xs={12} md={{ span: 8, offset: 2 }} className="mb-4 text-center">
                  <p className="fs-6">{event.event_description}</p>
                </Col>
              )}
              <Col xs={12}>
                <EventPageProductFilter
                  eventProducts={event.products}
                  setProductsToShow={setProductsToShow}
                  handleQueryUrl={handleQueryUrl}
                  querySeller={querySeller}
                  handleSetQuerySeller={setQuerySeller}
                  queryCategory={queryCategory}
                  handleSetQueryCategory={setQueryCategory}
                />
              </Col>
              <Col as="section" xs={12}>
                <EventPageProductList
                  productsToShow={
                    productsToShow ? productsToShow : event.products ? event.products : []
                  }
                  market={market}
                  event={event}
                />
              </Col>
            </>
          ) : (
            <Col xs={12} className="mb-4 text-center">
              <p>
                {!error
                  ? "Tätä tilaisuutta ei löytynyt tai se on jo päättynyt."
                  : "Tilaisuus ei ole nähtävissä teknisen vian johdosta. Kokeile myöhemmin uudelleen."}
              </p>
            </Col>
          )}
        </Row>
      )}
    </TemplatePage>
  )
}

export default EventPage
