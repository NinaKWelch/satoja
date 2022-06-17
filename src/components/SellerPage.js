import { useEffect, useState } from "react"
import { useParams, useLocation } from "react-router-dom"
import { getSeller } from "../services/sellers"
import { getSellersUpcomingEventsWithProducts } from "../services/events"
import defaultImg from "../media/img-defaults/profile-blank_or75kg.png"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Image from "react-bootstrap/Image"
import Spinner from "react-bootstrap/Spinner"
import EventList from "./EventList"
import TemplatePage from "./TemplatePage"
import moment from "moment"

const SellerPage = () => {
  const { sellerID } = useParams()
  const location = useLocation()
  const [seller, setSeller] = useState(location.state ? location.state.seller : null)
  const [events, setEvents] = useState(null)

  // remove url protocol from visible url
  // and add missing protocol to the link
  const handleUrl = (url, isLink) => {
    const splitUrlByProtocol = (str) => str.split("//")
    const linkArray = splitUrlByProtocol(url)

    if (url.includes("http://") || url.includes("https://")) {
      // check that protocol has been added only once
      if (isLink && linkArray.length === 2) {
        return url
      } else if (isLink && linkArray.length > 2) {
        return `https://${linkArray[linkArray.length - 1]}`
      } else {
        return linkArray[linkArray.length - 1]
      }
    } else {
      // add missing protocol for the link
      if (isLink) {
        return `https://${url}`
      } else {
        return url
      }
    }
  }

  useEffect(() => {
    if (!seller) {
      const fetchSeller = async () => {
        const res = await getSeller(sellerID)
        setSeller(res)
        //disregard events from the past
        const filteredEvents = res.events.filter((d) => moment(d.start) - moment() > 0)
        setEvents(filteredEvents)
      }
      fetchSeller()
    }
    if (seller && !events) {
      const fetchEvents = async () => {
        const res = await getSellersUpcomingEventsWithProducts(sellerID)
        //disregard events from the past
        const filteredEvents = res.filter((d) => moment(d.start) - moment() > 0)
        setEvents(filteredEvents)
      }
      fetchEvents()
    }
  }, [sellerID, seller, events])

  // separate text to paragraphs
  const textByParagraph = (text) => {
    const textArray = text.split(/\r?\n/g)
    const paragraphArray = textArray.filter((text) => text !== "")

    return paragraphArray
  }
  const linkTo = location.state
    ? location.state.linkTo
      ? location.state.linkTo
      : {
          pathname: "/map",
        }
    : {
        pathname: "/map",
      }

  return seller ? (
    <TemplatePage
      pageHeader={seller.name ? seller.name : `${seller.firstname} ${seller.lastname}`}
      backLink={linkTo}
      backLinkLabel="Palaa edelliselle sivulle"
      pageColor="bg-light-blue"
    >
      <Row className="g-2 pt-3">
        <Col
          xs={12}
          md={{ span: 10, offset: 1 }}
          lg={{ span: 8, offset: 2 }}
          className="pt-4"
        >
          <Row className="align-items-center">
            <Col xs={{ span: 6, offset: 3 }} className="mb-2">
              {/* fallbacks added for missing or broken image link */}
              <Image
                src={
                  seller.image_url
                    ? `https://res.cloudinary.com/dpk81nwou/image/upload/w_600/${seller.image_url}`
                    : defaultImg
                }
                onError={(e) =>
                  e.target.src !== defaultImg ? (e.target.src = defaultImg) : ""
                }
                alt="profiilikuva"
                fluid
              />
            </Col>

            <Col xs={12} className="mb-4 text-center">
              <h4 className="mb-0">{seller.address}</h4>
              <p className="mb-0">
                {seller.city} {seller.zipcode}
              </p>
              {seller.phonenumber && <p>{seller.phonenumber}</p>}
              {seller.business_id && <p>Y-tunnus: {seller.business_id}</p>}
              <p className="mb-0">{seller.email}</p>
              {seller.homepage && (
                <p>
                  <a
                    href={handleUrl(seller.homepage, true)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {handleUrl(seller.homepage, false)}
                  </a>
                </p>
              )}
            </Col>
            {seller.description && (
              <Col xs={12} className="mb-5 pt-4">
                <h4 className="fs-5">Esittely</h4>
                <div>
                  {textByParagraph(seller.description).map((paragraph, index) => (
                    <p key={index} className="fs-6">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Col>
            )}
          </Row>
        </Col>
        <Col xs={12} md={{ span: 10, offset: 1 }} lg={{ span: 8, offset: 2 }}>
          <Row>
            <Col className="text-center">
              {events && events.length > 0 && <h3 className="mb-4">Myyntipisteet</h3>}
            </Col>
            {events && events.length > 0 && (
              <Col xs={12}>
                <EventList
                  events={events}
                  linkTo={{
                    pathname: `/sellers/${seller.id}`,
                    state: {
                      seller: seller,
                    },
                  }}
                />
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </TemplatePage>
  ) : (
    <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
  )
}

export default SellerPage
