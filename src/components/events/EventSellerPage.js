import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getSeller } from "../../services/sellers"
import {
  getSellersUpcomingEventsWithProducts,
  getSellersUpcomingRekoEventsWithProducts,
} from "../../services/events"
import { getEventProducts } from "../../services/products"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplatePage from "../TemplatePage"
import TemplatePageLoading from "../TemplatePageLoading"
import SEO from "../home/SEO"
import EventSellerPageImage from "./EventSellerPageImage"
import EventSellerPageEvents from "./EventSellerPageEvents"
import EventSellerPageProducts from "./EventSellerPageProducts"
import EventSellerPageInfo from "./EventSellerPageInfo"
import EventSellerPageDescription from "./EventSellerPageDescription"
import SEOImage from "../../media/event-image-social.jpg"
import moment from "moment"

const EventSellerPage = () => {
  const { sellerID } = useParams()
  const [seller, setSeller] = useState(null)
  const [events, setEvents] = useState(null)
  const [products, setProducts] = useState(null)
  const [loading, setLoading] = useState(false)
  const [eventFetchError, setEventFetchError] = useState(false)
  const [productFetchError, setProductFetchError] = useState(false)

  // tell prerender.io exactly when page is ready to be saved
  // https://docs.prerender.io/docs/11-best-practices
  useEffect(() => {
    loading ? (window.prerenderReady = false) : (window.prerenderReady = true)
  }, [loading])

  // get seller data from the server
  useEffect(() => {
    setLoading(true)
    let controller = new AbortController()

    // get seller data form the server
    const fetchSellerData = async () =>
      await getSeller(sellerID).then((data) => {
        if (data) {
          data.status !== 500 && setSeller(data)
          setLoading(false)
          controller = null
        } else {
          setLoading(false)
        }
      })

    !seller ? fetchSellerData() : setLoading(false)

    // handles cases where component unmounts during API requests
    // ie. on browser refresh
    return () => controller?.abort()
  }, [seller, sellerID])

  // get seller events data from the server
  useEffect(() => {
    // currently both past and current events are being fetched with
    // getSellersUpcomingEventsWithProducts and getSellersUpcomingRekoEventsWithProducts
    // so they need to filtered to what is current
    const date = moment()
    const showOnlyCurrentEvents = (arr) =>
      arr.filter((item) => moment(item.endtime).isAfter(date))

    // fetch seller reko event data from the server
    const fetchRekoEventsWithProducts = async (events, id) =>
      await getSellersUpcomingRekoEventsWithProducts(id).then((data) => {
        if (data) {
          // show all events
          if (data.status !== 500) {
            if (data.length > 0 && events && events.length > 0) {
              const combinedEvents = [...events, ...data]
              setEvents(showOnlyCurrentEvents(combinedEvents))
            } else if (events && events.length > 0) {
              setEvents(showOnlyCurrentEvents(events))
            } else if (data.length > 0) {
              setEvents(showOnlyCurrentEvents(data))
            }
          }
          // show error message if data could not be fetched
          data.status === 500 && setEventFetchError(true)
        }
      })

    // fetch seller event data from the server
    const fetchEventsWithProducts = async (id) =>
      await getSellersUpcomingEventsWithProducts(id).then((data) => {
        if (data) {
          // show error message if data could not be fetched
          data.status !== 500
            ? fetchRekoEventsWithProducts(data, sellerID)
            : setEventFetchError(true)
        }
      })

    !events && fetchEventsWithProducts(sellerID)
  }, [events, sellerID])

  // get all products from each event seller is selling in
  // and list all sellers products currently for sale
  useEffect(() => {
    const fetchProducts = async (eventIds, id) => {
      let productsToShow = []

      for (let eventId of eventIds) {
        // fetch data for all events where seller is active from the server
        await getEventProducts(eventId).then((data) => {
          if (data && data.length > 0) {
            // filter products from the seller
            const sellerProducts = data.filter((item) => item.sellers_id === id)
            if (sellerProducts && sellerProducts.length > 0) {
              sellerProducts.forEach((item) => {
                if (productsToShow.length > 0) {
                  // check if product has already been added via another event
                  // if not, add it to the list
                  const hasProduct = productsToShow.find(
                    (product) => product.id === item.id
                  )

                  !hasProduct && productsToShow.push(item)
                } else {
                  productsToShow.push(item)
                }
              })
            }

            // show error message if data could not be fetched
            data.status === 500 && setProductFetchError(true)
          }
        })
      }

      setProducts(productsToShow)
    }

    if (
      productFetchError === false &&
      seller &&
      events &&
      events.length > 0 &&
      !products
    ) {
      const eventIds = events.map((event) => {
        return event.event_id
      })

      fetchProducts(eventIds, Number(seller.id))
    }
  }, [products, productFetchError, seller, events])

  const capitalise = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

  const getSellerName = (item) =>
    item.seller_name ? item.seller_name : item.firstname + " " + item.lastname

  const getSellerQueryName = (seller) => {
    const name = getSellerName(seller)

    return name
      .toLowerCase()
      .replace(/[&]/g, "ja")
      .replace(/[^a-zA-Z0-9_-]/g, "")
  }

  const getSEOImage = () => {
    switch (true) {
      case seller && seller.image_url:
        return `https://res.cloudinary.com/dpk81nwou/image/upload/c_fill,g_auto,h_630,w_1200/${seller.image_url}`
      case products && products.length > 0 && products[0].image_url:
        return `https://res.cloudinary.com/dpk81nwou/image/upload/c_fill,g_auto,h_630,w_1200/${products[0].image_url}`
      default:
        return SEOImage
    }
  }

  const shareContent = {
    heading: "Jaa tuottajan sivu",
    title: seller
      ? seller.seller_name
        ? capitalise(seller.seller_name)
        : capitalise(seller.firstname) + " " + capitalise(seller.lastname)
      : "Satoja",
    hashtag:
      "#tuottaja" /* for Facebook: only one allowed, must include hashtag character */,
    hashtags: [
      "tuottaja",
    ] /* for Twitter: array of strings, must exclude hashtag character */,
    message: "Tilaa tämän tuottajan tuotteita ennakkoon Satoja-palvelusta.",
  }

  return (
    <TemplatePage
      pageHeader={seller ? getSellerName(seller) : ""}
      backLink={true}
      shareLink={shareContent}
      pageColor="bg-basic"
    >
      {loading ? (
        <TemplatePageLoading />
      ) : (
        <Row as="main" className="g-3">
          {seller ? (
            <>
              <SEO
                title={
                  seller.seller_name
                    ? capitalise(seller.seller_name)
                    : capitalise(seller.firstname) + " " + capitalise(seller.lastname)
                }
                description={
                  seller.description
                    ? `Tuottajan kotisivu. ${
                        seller.description.length > 270
                          ? capitalise(seller.description).substring(0, 270) + "..."
                          : capitalise(seller.description)
                      }`
                    : "Tuottajan kotisivu"
                }
                keywords="Tuottaja"
                image={getSEOImage()}
              />
              <Col
                as="section"
                xs={{ span: 10, offset: 1 }}
                sm={{ span: 8, offset: 2 }}
                md={{ span: 5, offset: 1 }}
                className="pt-4"
              >
                <EventSellerPageImage seller={seller} />
                <div className="d-none d-md-block">
                  {seller.description && (
                    <EventSellerPageDescription description={seller.description} />
                  )}
                  <EventSellerPageInfo seller={seller} />
                </div>
              </Col>
              <Col
                as="section"
                xs={{ span: 10, offset: 1 }}
                sm={{ span: 8, offset: 2 }}
                md={{ span: 5, offset: 0 }}
                className="pt-sm-2 pt-md-4"
              >
                <EventSellerPageEvents
                  sellerQueryName={getSellerQueryName(seller)}
                  sellerName={getSellerName(seller)}
                  events={events}
                  error={eventFetchError}
                />
                {eventFetchError === false && (
                  <div>
                    <h3 className="fs-4">Tuotteita</h3>
                    {productFetchError === false && products && products.length > 0 && (
                      <>
                        <p className="fs-6 lh-0">
                          Voit tilata myynnissä olevia tuotteita noutotilaisuuksista.
                        </p>
                        <EventSellerPageProducts products={products} />
                      </>
                    )}
                    {productFetchError === false && !products && (
                      <p>Ei tuotteita myynnissä</p>
                    )}
                    {productFetchError === true && !products && (
                      <p className="text-danger">
                        Tuotteiden haku palvelimelta epännistui. Kokeile myöhemmin
                        uudellen.
                      </p>
                    )}
                  </div>
                )}
              </Col>
              {/** this section is hidden on larger devises */}
              <Col
                as="section"
                xs={{ span: 10, offset: 1 }}
                sm={{ span: 8, offset: 2 }}
                className="d-md-none border-top border-secondary pt-4"
              >
                {seller.description && (
                  <EventSellerPageDescription description={seller.description} />
                )}
                <EventSellerPageInfo seller={seller} />
              </Col>
            </>
          ) : (
            <Col xs={12} className="text-center">
              <p>Tätä tuottajaa ei löytynyt</p>
            </Col>
          )}
        </Row>
      )}
    </TemplatePage>
  )
}

export default EventSellerPage
