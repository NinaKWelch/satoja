import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getSeller } from "../../services/sellers"
import productService from "../../services/products"
import { getEvents } from "../../services/events"
import { setEvents } from "../../actions/events"
import { notifyError } from "../../actions/notification"
import { addProductToCart, removeProductFromCart } from "../../actions/shoppingCart"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplatePage from "../TemplatePage"
import TemplatePageLoading from "../TemplatePageLoading"
import SEO from "../home/SEO"
import ProductPageImage from "./ProductPageImage"
import ProductPageSizes from "./ProductPageSizes"
import ProductPageTabs from "./ProductPageTabs"
import SEOImage from "../../media/event-image-social.jpg"
import moment from "moment"

const ProductPage = () => {
  const dispatch = useDispatch()
  const { productID, eventID } = useParams()
  const events = useSelector(({ events }) => events)
  const [market, setMarket] = useState(null)
  const [event, setEvent] = useState(null)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [eventError, setEventError] = useState(false)

  // tell prerender.io exactly when page is ready to be saved
  // https://docs.prerender.io/docs/11-best-practices
  useEffect(() => {
    loading ? (window.prerenderReady = false) : (window.prerenderReady = true)
  }, [loading])

  useEffect(() => {
    // fetch seller from the server
    const fetchSellerInfo = async (id) => {
      await getSeller(id).then((response) => {
        response && response.status === 500
          ? dispatch(notifyError("Tuottajan tuonti palvelimelta epäonnistui"))
          : setProduct({
              ...product,
              seller: response,
            })
      })
    }

    if (product && eventError === false) {
      // seller info may be missing if products are added to cart
      // directly form product page without first visiting the event page
      // or when adding products to cart after page reload
      if (!Object.keys(product).includes("seller")) {
        fetchSellerInfo(product.sellers_id)
      }
    }
  }, [dispatch, eventError, product])

  useEffect(() => {
    setLoading(true)
    const currentDate = moment()

    // fetch product form the server
    const fetchProduct = async (id) => {
      await productService.getProductById(id).then((data) => {
        data && data.status !== 500 && setProduct(data)
      })
      setLoading(false)
    }

    // set page info
    const setMarketEventAndProduct = (event) => {
      const currentMarket = {
        id: event.market_id,
        start: event.start,
        endtime: event.endtime,
        address: event.address,
      }

      // assign current market and event
      setMarket(currentMarket)
      setEvent(event)

      // check if product is stored locally
      if (event.products && event.products.length > 0) {
        const currentProduct = event.products.find(
          (product) => product.id === Number(productID)
        )

        if (currentProduct) {
          setProduct(currentProduct)
          setLoading(false)
        }
      } else {
        fetchProduct(Number(productID))
      }
    }

    // fetch events form the server
    const fetchEvents = async () =>
      await getEvents().then((data) => {
        if (data && data.length > 0) {
          const currentEvents = data.filter((item) =>
            moment(item.endtime).isSameOrAfter(currentDate)
          )

          // save all current events (if any) to local state
          currentEvents && currentEvents.length > 0
            ? dispatch(setEvents(currentEvents))
            : setLoading(false)
        }

        if (data && data.status === 500) {
          // notify about server error (status 500)
          notifyError("Tapahtumien haku palvelimelta epäonnistui")
          setError(true)
        }

        // stop page loading if there are no current events
        // or if events couldn't be accessed
        if (data && (data.length === 0 || data.status === 500)) {
          setLoading(false)
        }
      })

    if (events && events.length > 0) {
      const currentEvent = events.find((event) => event.id === Number(eventID))

      if (currentEvent) {
        // check that locally stored event is still active
        const isCurrent = moment(currentEvent.endtime).isSameOrAfter(currentDate)

        isCurrent ? setMarketEventAndProduct(currentEvent) : setLoading(false)
      } else {
        setProduct(null)
        setEventError(true)
        setLoading(false)
      }
    }

    // fetch events and show event if current
    !events && error === false && fetchEvents()
  }, [events, error, eventID, productID, dispatch])

  const isSingleSize = (arr) => arr.length === 1

  const addToCart = (size) => {
    dispatch(
      addProductToCart({ ...product, singleSize: isSingleSize(product.sizes) }, size, {
        ...event,
        market: market,
      })
    )
  }

  const removeFromCart = (size) => {
    dispatch(removeProductFromCart(product, size, { ...event, market: market }))
  }

  const capitalise = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()

  const getSEOImage = () => {
    switch (true) {
      case product && product.image_url:
        return `https://res.cloudinary.com/dpk81nwou/image/upload/c_fill,g_auto,h_630,w_1200/${product.image_url}`
      case product && product.seller_image_url:
        return `https://res.cloudinary.com/dpk81nwou/image/upload/c_fill,g_auto,h_630,w_1200/${product.seller_image_url}`
      default:
        return SEOImage
    }
  }

  const shareContent = {
    heading: "Jaa tuotesivu",
    title: product ? product.name : "Satoja",
    hashtag:
      "#noutotilaisuus" /* for Facebook: only one allowed, must include hashtag character */,
    hashtags: [
      "noutotilaisuus",
    ] /* for Twitter: array of strings, must exclude hashtag character */,
    message: "Tilaa tämä tuote ennakkoon Satoja-palvelusta.",
  }

  return (
    <TemplatePage
      pageHeader={product ? product.name : ""}
      backLink={true}
      shareLink={shareContent}
      pageColor="bg-basic"
    >
      {loading ? (
        <TemplatePageLoading />
      ) : (
        <Row as="main" className="g-0">
          {product ? (
            <>
              <SEO
                title={
                  product.name.length > 30
                    ? `${capitalise(product.name).substring(0, 30)}...`
                    : capitalise(product.name)
                }
                description={
                  product.description.lenght > 270
                    ? `${capitalise(product.description).substring(0, 270)}...`
                    : capitalise(product.description)
                }
                keywords={`${product.category}, ${product.organic && "Luomu"}, Tuote`}
                image={getSEOImage()}
              />
              <ProductPageImage product={product} />
              <Col as="section" xs={12} md={{ span: 6, offset: 0 }}>
                <Row className="g-0">
                  <ProductPageSizes
                    eventId={eventID}
                    product={product}
                    singleSize={isSingleSize(product.sizes)}
                    handleAddToCart={addToCart}
                    handleRemoveFromCart={removeFromCart}
                  />
                  <ProductPageTabs product={product} />
                </Row>
              </Col>
            </>
          ) : (
            <Col xs={12} className="text-center">
              <p>
                {!error
                  ? "Tätä tuotetta ei löytynyt tästä tilaisuudesta. Ehkä tuote ei ole enää myynnissä tai tilaisuus on jo päättynyt."
                  : "Tuote ei ole nähtävissä teknisen vian johdosta. Kokeile myöhemmin uudelleen."}
              </p>
            </Col>
          )}
        </Row>
      )}
    </TemplatePage>
  )
}

export default ProductPage
