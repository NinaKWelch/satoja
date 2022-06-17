import React, { useEffect, useState } from "react"
import axios from "axios"
import { Field, ErrorMessage, Formik, Form } from "formik"
import * as Yup from "yup"
import eventService from "../services/events"
import marketService from "../services/markets"
import rekoService from "../services/reko"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import BootStrapForm from "react-bootstrap/Form"
import FormFieldText from "./FormFieldText"
import FormErrorMessage from "./FormErrorMessage"
import FormFieldDate from "./FormFieldDate"
import AdminSelectMunicipality from "./AdminSelectMunicipality"
import AdminSelectRegion from "./AdminSelectRegion"
import EventListAdmin from "./EventListAdmin"
import UserListAdmin from "./UserListAdmin"
import SellersListAdmin from "./SellersListAdmin"
import AdminCreatePickUpMap from "./AdminCreatePickUpMap"
import AdminModifyMarkets from "./AdminModifyMarkets"
import GlobalSalesAdmin from "./GlobalSalesAdmin"
import moment from "moment"
import SelectMarket from "./SelectMarket"


const EventForm = ({ setAddingEvent }) => {
  const validationSchema = Yup.object().shape({
    starting_time: Yup.string().required("Vaadittu"),
    end_time: Yup.string().required("Vaadittu"),
    event_description: Yup.string().notRequired(),
    event_name:Yup.string().notRequired(),
  })
  const [markets, setMarkets] = useState([])
  const [market, setMarket] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("api/markets")
      setMarkets(response.data)
    }
    fetchData()
  }, [])

  const handleSubmit = async ({ starting_time, end_time, event_description, event_name }) => {
    //had to split it up some, so i wouldnt get warnings for starting_time format
    const startHour = moment(starting_time).format("HH:mm")
    const startDay = moment(starting_time).format("YYYY-MM-DD")
    const realEndTime = moment(startDay + " " + end_time, "YYYY-MM-DD HH:mm")
    const realStartTime = moment(startDay + " " + startHour, "YYYY-MM-DD HH:mm")
    await eventService.addEvent(
      moment(realStartTime).format("YYYY-MM-DD HH:mm"),
      moment(realEndTime).format("YYYY-MM-DD HH:mm"),
      event_description,
      event_name,
      market.id
    )

    setAddingEvent(false)
  }
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          starting_time: "",
          end_time: "",
          event_description: "",
          event_name:"",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Row>
              <EventFormDetails />
              <SelectMarket market={market} setMarket={setMarket} markets={markets} />
            </Row>
            <Button variant="danger" onClick={() => setAddingEvent(false)}>
              Peruuta
            </Button>
            <Button type="submit">Lähetä</Button>
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
        id="starting_time"
        label="Aloitusaika"
        component={FormFieldDate}
      />
      <ErrorMessage name="starting_time" component={FormErrorMessage} />
      <Field
        name="end_time"
        id="end_time"
        label="Lopetusaika"
        component={FormFieldText}
      />
      <ErrorMessage name="end_time" component={FormErrorMessage} />
      <Field
        name="event_name"
        id="event_name"
        label="Nimi"
        component={FormFieldText}
      />
      <Field
        name="event_description"
        id="event_description"
        label="Kuvaus"
        component={FormFieldText}
      />

    </Col>
  )
}

const RekoForm = ({ setAddingReko }) => {
  const handleSubmit = async ({ area, name }) => {
    await rekoService.addRekoArea({ area, name })
    setAddingReko(false)
  }
  const validationSchema = Yup.object().shape({
    area: Yup.string().required("Vaadittu"),
    name: Yup.string().required("Vaadittu"),
  })
  return (
    <Col xs={12}>
      <Formik
        initialValues={{
          area: "",
          name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Row>
              <RekoFormDetails />
            </Row>
            <Button variant="danger" onClick={() => setAddingReko(false)}>
              Peruuta
            </Button>
            <Button type="submit">Lähetä</Button>
          </Form>
        )}
      </Formik>
    </Col>
  )
}

const RekoFormDetails = () => {
  return (
    <Col xs={12} className="mb-5">
      <Field name="area" id="area" label="Alue" component={FormFieldText} />
      <ErrorMessage name="area" component={FormErrorMessage} />
      <Field name="name" id="name" label="Nimi" component={FormFieldText} />
      <ErrorMessage name="nimi" component={FormErrorMessage} />
    </Col>
  )
}

const RekoCheckBox = ({ reko_area, rekoChoices, setRekoChoices }) => {
  const handleCheck = (id) => {
    if (rekoChoices.includes(id)) {
      setRekoChoices([])
    } else {
      setRekoChoices([id])
    }
  }
  return (
    <BootStrapForm.Check
      type="radio"
      name="flexRadioDefault"
      label={reko_area.name}
      onChange={() => handleCheck(reko_area.id)}
    />
  )
}

// const RekoAreas = ({ setRekoChoices, rekoAreas, rekoChoices }) => {
//   const checkboxes = rekoAreas.map((reko_area, index) => (
//     <div key={index} className="form-check">
//       <RekoCheckBox
//         key={reko_area.id}
//         reko_area={reko_area}
//         rekoChoices={rekoChoices}
//         setRekoChoices={setRekoChoices}
//       />
// 		</div>
//   ))
//   return (
//     <>
//       <p>Valitse noutopaikan REKO-alue:</p>
//       <br />
//       <div> {checkboxes} </div>
//     </>
//   )
// }

const MarketForm = ({ setAddingMarket }) => {
  //const [rekoAreas, setRekoAreas] = useState([])
  //const [rekoChoices, setRekoChoices] = useState([])
  const [location, setLocation] = useState({ lat: 0, lng: 0 })
  const [regions, setRegions] = useState([])
  const [regionChoice, setRegionChoice] = useState([])
  const [municipalities, setMunicipalitys] = useState([])
  const [municipalityChoice, setMunicipalityChoice] = useState([])
  const [postalc, setPostalc] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/reko_areas")
      //setRekoAreas(result.data)
      const areas = await axios.get("/api/areas")
      setRegions(areas.data.regions)
      setMunicipalitys(areas.data.municipalities)
    }
    fetchData()
  }, [])

  const handleSubmit = async ({ address, postalcode, place, market_description, market_name }) => {
    //const resp = await marketService.addMarket(address, postalcode, place, description, location, rekoChoices, regionChoice, municipalityChoice)
    if(!postalcode || postalcode == ""){
      postalcode = 0
    }
    if (!regionChoice.id) {
      alert("Maakunta puuttuu!")
      return
    }
    if (!municipalityChoice.id) {
      alert("Kunta puuttuu!")
      return
    }
    const resp = await marketService.addMarketToRegionMarkets(
      address,
      postalcode,
      place,
      market_description,
      location,
      regionChoice,
      municipalityChoice,
      market_name,
    )

    if (resp.status === 200) {
      alert("Tapahtuma lisätty!")
    } else {
      alert("Jotain meni vikaan!")
    }
    //setAddingMarket(false)
  }

  const handleChange = (postalcode) => {
    if (postalcode.length === 5) {
      setPostalc(postalcode)
    }
  }

  const validationSchema = Yup.object().shape({
    address: Yup.string().required("Vaadittu"),
    postalcode: Yup.number().min(0),
    place: Yup.string().notRequired(),
    market_description: Yup.string().notRequired(),
    market_name: Yup.string().notRequired(),

  })

  return (
    <div xs={12}>
      <Formik
        initialValues={{
          address: "",
          postalcode: "",
          place: "",
          market_description: "",
          market_name: "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form
          xs={6}
          onChange={(e) => {
            if (e.target.id === "postalcode") {
              handleChange(e.target.value)
            }
          }}
        >
          <Row>
            <Col xs={6}>
              <MarketFormDetails />
              {/* <RekoAreas
              rekoAreas={rekoAreas}
              rekoChoices={rekoChoices}
              setRekoChoices={setRekoChoices}
            /> */}
              {regions ? (
                <AdminSelectRegion
                  regionsArr={regions}
                  regionChoice={regionChoice}
                  setRegionChoice={setRegionChoice}
                />
              ) : null}
              {municipalities ? (
                <AdminSelectMunicipality
                  municipalitiesArr={municipalities}
                  regionChoice={regionChoice}
                  municipalityChoice={municipalityChoice}
                  setMunicipalityChoice={setMunicipalityChoice}
                />
              ) : null}
            </Col>
            <Col xs={6}>
              <AdminCreatePickUpMap
                location={location}
                setLocation={setLocation}
                zipcode={postalc}
              />
            </Col>
          </Row>
          <Button variant="danger" onClick={() => setAddingMarket(false)}>
            Peruuta
          </Button>
          <Button type="submit">Lähetä</Button>
        </Form>
      </Formik>
    </div>
  ) //keke
}

const MarketFormDetails = () => {
  return (
    <Col xs={12} className="mb-5">
      <Field name="address" id="address" label="Osoite" component={FormFieldText} />
      <ErrorMessage name="address" component={FormErrorMessage} />
      <Field
        name="postalcode"
        id="postalcode"
        label="Postinumero"
        component={FormFieldText}
      />
      <ErrorMessage name="postalcode" component={FormErrorMessage} />
      <Field name="place" id="place" label="Paikka" component={FormFieldText} />
      <Field name="market_name" id="market_name" label="Nimi" component={FormFieldText} />
      <ErrorMessage name="market_name" component={FormErrorMessage} />
      <ErrorMessage name="address" component={FormErrorMessage} />
      
      <Field
        name="market_description"
        id="market_description"
        label="Kuvaa sijantia"
        component={FormFieldText}
      />
      <ErrorMessage name="market_description" component={FormErrorMessage} />
    </Col>
  )
}

const ModifyEvents = ({ setModifyingEvents }) => {
  const [updateEvents, setUpdateEvents] = useState(false)

  const [events, setEvents] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const events = await axios.get("/api/events")
      setEvents(events.data)
      //console.log("fetched events ", events.data)
    }
    fetchData()
  }, [updateEvents])
  return (
    <div>
      <Button variant="danger" onClick={() => setModifyingEvents(false)}>
        {" "}
        Peruuta{" "}
      </Button>
      <EventListAdmin
        events={events}
        updateEvents={updateEvents}
        setUpdateEvents={setUpdateEvents}
      />
    </div>
  )
}

const UserList = ({ setShowList }) => {
  const [userList, setUserList] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/users/userList")
      setUserList(response.data)
    }
    fetchData()
  }, [])
  return (
    <div>
      <Button variant="danger" onClick={() => setShowList(false)}>
        {" "}
        Piilota lista{" "}
      </Button>
      <UserListAdmin users={userList} />
    </div>
  )
}
const SalesList = ({ setShowSales }) => {
  const [allSellersAndOrders, setAllSellersAndOrders] = useState([])
  const [userList, setUserList] = useState([])

  const [sellersList, setSellersList] = useState([])
  const [lastFetch, setLastFetch] = useState(moment())
  useEffect(() => {
    const fetchData = async () => {
      if (
        allSellersAndOrders.length === 0 ||
        moment() > moment(lastFetch).add(10, "minutes")
      ) {
        setLastFetch(moment())
        try {
          const sellersList = await axios.get("/api/sellers/getall")

          let temp = allSellersAndOrders
          const usersList = await axios.get("/api/users/userList")
          const lastLogins = await axios.get("/api/users/userLastLogins")

          sellersList.data.map((seller) => {
            seller.info = {}
            seller.info = usersList.data.find(
              (user) => parseInt(user.id) == parseInt(seller.id)
            )
            seller.info.last_online = {}
            seller.info.last_online = lastLogins.data.find(
              (login) => login.user_id == seller.id
            )
            return seller
          })
          //console.log("sellerslist: ", sellersList)
          setSellersList(sellersList.data)
          if (sellersList.data && sellersList.data.length > 0) {
            const promises = sellersList.data.map(async (r) => {
              let orders = await axios.get(`/api/orders/seller/admin/${r.id}`)
              let obj = {
                seller: r,
                orders: orders.data,
              }
              temp.push(obj)
            })
            await Promise.all(promises)
            setAllSellersAndOrders(temp)
          }
        } catch (e) {
          console.log("error in saleslist ", e)
        }
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <Button variant="danger" onClick={() => setShowSales(false)}>
        {" "}
        Piilota lista{" "}
      </Button>
      <SellersListAdmin sellers={sellersList} sellersAndOrders={allSellersAndOrders} />
    </div>
  )
}

const GlobalSalesList = ({ setShowGlobalSales }) => {
  const [allSellersAndOrders, setAllSellersAndOrders] = useState([])
  const [key, setKey] = useState(0)

  const [sellersList, setSellersList] = useState([])
  const [lastFetch, setLastFetch] = useState(moment())
  useEffect(() => {
    const fetchData = async () => {
      if (
        allSellersAndOrders.length === 0 ||
        moment() > moment(lastFetch).add(10, "minutes")
      ) {
        setLastFetch(moment())
        try {
          const sellersList = await axios.get("/api/sellers/getall")

          let temp = allSellersAndOrders
          const usersList = await axios.get("/api/users/userList")
          const lastLogins = await axios.get("/api/users/userLastLogins")

          sellersList.data.map((seller) => {
            seller.info = {}
            seller.info = usersList.data.find(
              (user) => parseInt(user.id) == parseInt(seller.id)
            )
            seller.info.last_online = {}
            seller.info.last_online = lastLogins.data.find(
              (login) => login.user_id == seller.id
            )
            return seller
          })
          //console.log("sellerslist: ", sellersList)
          setSellersList(sellersList.data)
          if (sellersList.data && sellersList.data.length > 0) {
            const promises = sellersList.data.map(async (r) => {
              let orders = await axios.get(`/api/orders/seller/admin/${r.id}`)
              let obj = {
                seller: r,
                orders: orders.data,
              }
              temp.push(obj)
            })
            await Promise.all(promises)
            //Fconsole.log("temp: ", temp)
            setAllSellersAndOrders(temp)
          }
        } catch (e) {
          console.log("error in saleslist ", e)
        }
      }
      setKey(1)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Button variant="danger" onClick={() => setShowGlobalSales(false)}>
        {" "}
        Piilota lista{" "}
      </Button>
      {allSellersAndOrders.length > 0 ? (
        <GlobalSalesAdmin
          key={key}
          sellers={sellersList}
          sellersAndOrders={allSellersAndOrders}
        />
      ) : (
        <p>Haetaan tietoja...</p>
      )}
    </div>
  )
}

const sendOrders = async () => {
  const response = await axios.post("api/orders/seller/sendAllOrders")
}

const AdminPage = () => {
  const [addingEvent, setAddingEvent] = useState(false)
  const [addingMarket, setAddingMarket] = useState(false)
  const [addingReko, setAddingReko] = useState(false)
  const [modifyingEvents, setModifyingEvents] = useState(false)
  const [modifyingMarkets, setModifyingMarkets] = useState(false)

  //const [userList, setUserList] = useState(false)
  const [showList, setShowList] = useState(false)
  const [showSales, setShowSales] = useState(false)
  const [showGlobalSales, setShowGlobalSales] = useState(false)

  return (
    <div>
      <Button onClick={() => setAddingEvent(true)}>Lisää tapahtuma</Button>
      <Button onClick={() => setAddingMarket(true)}>Lisää noutopiste</Button>
      <Button onClick={() => setAddingReko(true)}>Lisää Reko-alue</Button>
      <Button onClick={() => setModifyingEvents(true)}>Muokkaa tapahtumaa</Button>
      <Button onClick={() => setModifyingMarkets(true)}>Muokkaa noutopistettä</Button>
      <Button onClick={() => setShowList(true)}>Hae käyttäjät</Button>
      <Button onClick={() => setShowSales(true)}>Hae myyntitietoja</Button>
      <Button onClick={() => setShowGlobalSales(true)}>Hae globaalit myyntitiedot</Button>

      <Button onClick={() => sendOrders()}>Lähetä tilaukset myyjille</Button>

      {showGlobalSales ? (
        <GlobalSalesList setShowGlobalSales={setShowGlobalSales} />
      ) : null}
      {showSales ? <SalesList setShowSales={setShowSales} /> : null}
      {addingMarket ? <MarketForm setAddingMarket={setAddingMarket} /> : null}
      {addingEvent ? <EventForm setAddingEvent={setAddingEvent} /> : null}
      {addingReko ? <RekoForm setAddingReko={setAddingReko} /> : null}
      {modifyingEvents ? <ModifyEvents setModifyingEvents={setModifyingEvents} /> : null}
      {modifyingMarkets ? <AdminModifyMarkets setModifyingMarkets={setModifyingMarkets} /> : null}

      {showList ? <UserList setShowList={setShowList} /> : null}
    </div>
  )
}

export default AdminPage
