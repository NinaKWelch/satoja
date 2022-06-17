import React, { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import marketservice from "../services/markets"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import FormFieldText from "./FormFieldText"
import FormErrorMessage from "./FormErrorMessage"
import moment from "moment"

const MarketsListAdmin = ({markets , updateMarkets,setUpdateMarkets}) => {

  const getmarketsByDate = (marketsArray) => {
    let sortedArray = marketsArray.sort((a, b) => moment(a.start) > moment(b.start) ? -1 : 1)
    return sortedArray
  }

  const marketsByDate = getmarketsByDate(markets)
//<span style={{ color: 'red'}}>{market.market_id ?  "REKO" : null  }</span> was removed from the div because it needs to be re-worked to work on other than market_id
  return (
    <Col xs={12} className="text-left mb-4">
      {marketsByDate && marketsByDate.length > 0 ? marketsByDate.map((market, index) => {
          return(
      <div key={index + "div"}>
            <p> {market.market_name ? market.market_name : market.place ? market.place : market.address ? market.address : null}</p>
            <MarketsListItemAdmin market={market} updateMarkets={updateMarkets} setUpdateMarkets={setUpdateMarkets} key={index + "Item"} />
          </div>
      )}):null}
    </Col>
  )
}

const MarketsListItemAdmin = ({ market,updateMarkets,setUpdateMarkets }) => {
  const [showForm, setShowForm] = useState(false)
  useEffect(() => {
  }, [showForm])
  return (
    <Card className="mb-1 py-2 px-2">
      <Button onClick={() => setShowForm(true)}>Muokkaa</Button>
      {showForm ? <MarketsForm updateMarkets={updateMarkets} setUpdateMarkets={setUpdateMarkets}  setShowForm={setShowForm} market={market} /> : null}
    </Card>
  )
}
const MarketsForm = ({market,setShowForm,updateMarkets,setUpdateMarkets }) => {
  const validationSchema = Yup.object().shape({
    latitude: Yup.string().required("Vaadittu"),
    longitude: Yup.string().required("Vaadittu"),
    description: Yup.string().notRequired("Ei vaadittu"),
    market_name: Yup.string().notRequired("Ei vaadittu"),
    place: Yup.string().notRequired("Ei vaadittu"),
    postalcode: Yup.number().min(0),

  })

  const handleSubmit = async ({ description,market_address, latitude, longitude, place,postalcode, market_name }) => {
    const location = `{"lat":"${latitude}","lon":"${longitude}"}`
    if(!postalcode || postalcode == ""){
      postalcode = 0
    }
    const resp = await marketservice.updateMarket(market.id,market_address,postalcode,location ,place, description, market.region_id, market.municipality_id, market_name)

    if(resp === 200){
      setShowForm(false)
      //forces an update for markets so we get the updated data.
      if(updateMarkets)
        setUpdateMarkets(false)
      if(!updateMarkets)
      setUpdateMarkets(true)
    }
    else{
      alert("Jotain meni vikaan!")
      return
    }
  }
if(market.postalcode == 0){
  market.postalcode = ""
}
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          name: market.name || "",
          market_address: market.address || "",
          market_name: market.name || "",
          postalcode: market.postalcode|| "",
          place: market.place || "",
          latitude: market.location.lat || "",
          longitude: market.location.lon || "",
          description: market.description || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Row>
              <MarketFormDetails/>             
            </Row>
            <Button
              variant="danger"
              onClick={() => {
                setShowForm(false)
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

const MarketFormDetails = () => {
  return (
    <Col xs={12} className="mb-5">
      <Field name="market_name" id="market_name" label="Nimi" component={FormFieldText} />
      <Field name="market_address" id="market_address" label="Osoite" component={FormFieldText} />
      <Field name="latitude" id="latitude" label="Latitude" component={FormFieldText} />
      <Field name="longitude" id="longitude" label="Longitude" component={FormFieldText} />
      <Field name="place" id="place" label="Paikka" component={FormFieldText} />
      <Field name="postalcode" id="postalcode" label="Postinumero" component={FormFieldText} />
      <Field name="description" id="description" label="Sijainnin kuvaus" component={FormFieldText} />
    </Col>
  )
}


export default MarketsListAdmin
