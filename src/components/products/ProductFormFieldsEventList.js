import { Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import ProductFormFieldsEventListItem from "./ProductFormFieldsEventListItem"

const ProductFormFieldsEventList = ({ events, values }) => {
  // get event details by id
  const getEventInfo = (id) => {
    const eventInfo = events.find((event) => event.id === id)
    return eventInfo
  }

  return (
    <Row className="mb-3">
      <Col xs={12} className="text-center">
        <h4 className="fs-4">Valitse myyntipiste(et)*</h4>
      </Col>
      {values.events.map((event, index) => (
        <Col
          key={index}
          xs={12}
          sm={{ span: 10, offset: 1 }}
          md={{ span: 12, offset: 0 }}
          lg={{ span: 10, offset: 1 }}
        >
          <ProductFormFieldsEventListItem
            index={index}
            eventInfo={getEventInfo(event.event_id)}
          />
          {values.events[index].selected === false && values.events[index].reserved > 0 && (
            <div className="text-center text-warning">
              <span>
                Huom!{" "}
                {values.events[index].reserved === 1
                  ? `${values.events[index].reserved} tilaus`
                  : `${values.events[index].reserved} tilausta`}{" "}
                odottaa toimitusta tähän tilaisuuteen.
              </span>
              <br />
              <span>
                Tilauksia voi perua{" "}
                <Link
                  to="/orders/seller"
                  className="text-warning text-decoration-underline"
                >
                  tilaukset
                </Link>{" "}
                sivulla
              </span>
            </div>
          )}
        </Col>
      ))}
      <Col xs={12} className="pt-3 text-center">
        <p className="lh-2 mb-0">
          Onko sinulla ehdotuksia <strong>tapahtumista</strong>, joita voisimme lisätä?{" "}
          <Link to="/contact" target="_blank">
            Ota yhteyttä
          </Link>
        </p>
      </Col>
    </Row>
  )
}

export default ProductFormFieldsEventList
