import React, { useState } from "react"
import WeeklySalesModal from "./WeeklySalesModal"
import SalesModal from "./SalesModal"
import Button from "react-bootstrap/Button"
import moment from "moment"

const SellersListAdmin = ({ sellers, sellersAndOrders }) => {
  //sellers.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
  const [showWeeklySalesModal, setShowWeeklySalesModal] = useState(false)
  const [showGeneralSalesModal, setShowGeneralSalesModal] = useState(false)

  const [selectedSales, setSelectedSales] = useState([])
  const [selectedWeeklySales, setSelectedWeeklySales] = useState([])

  const handleSelectedGeneralSales = (id) => {
    var temp = []
    sellersAndOrders.map((so) => {
      if (so.seller.id === id && so.orders.length > 0) {
        var obj = {
          sellerId: so.seller.id,
          seller_name: so.seller.name,
          orders: so.orders,
        }

        temp.push(obj)
      }
    })
    setSelectedSales(temp)
    setShowGeneralSalesModal(true)
  }

  const handleSelectedWeeklySales = (id) => {
    var temp = []
    sellersAndOrders.map((so) => {
      if (so.seller.id === id && so.orders.length > 0) {
        var obj = {
          sellerId: so.seller.id,
          seller_name: so.seller.name,
          orders: so.orders,
        }

        temp.push(obj)
      }
    })
    //sort data weekly
    let weeksData = []
    if (temp[0]) {
      temp[0].orders.forEach((order) => {
        let obj = {
          sellerId: temp[0].sellerId,
          week: moment(order.event_start).isoWeek(),
          orders: [],
        }
        obj.orders.push(order)
        weeksData.push(obj)
      })

      let weeklySales = []
      weeksData.forEach((weekOrders, index) => {
        let matched = false
        if (weeklySales.length === 0) {
          weeklySales.push(weekOrders)
          weeksData.splice(index, 1)
        } else {
          weeklySales.forEach((weekly) => {
            if (weekOrders.week === weekly.week) {
              weekly.orders.push(weekOrders.orders)
              matched = true
              weeksData.splice(index, 1)
            }
          })
          if (!matched) {
            weeklySales.push(weekOrders)
          }
        }
      })
      weeklySales = weeklySales.sort((a, b) => (a.week > b.week ? 1 : -1))
      setSelectedWeeklySales(weeklySales)
      setShowWeeklySalesModal(true)
    } else {
      let weeklySales = []
      setSelectedWeeklySales(weeklySales)
      setShowWeeklySalesModal(true)
    }
  }

  return (
    <div>
      <table className="table table-striped  table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th>Yritys</th>
            <th>Etunimi</th>
            <th>Sukunimi</th>
            <th>Email</th>
            <th>Osoite</th>
            <th>Numero</th>
            <th>Kotisivu</th>
            <th>Liittymispäivä</th>
            <th>Edellinen kirjautuminen</th>
            <th>Business id</th>
            <th>Myynnit</th>
            <th>Viikottaiset myynnit</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((u) => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.firstname}</td>
              <td>{u.lastname}</td>
              <td>{u.email}</td>
              <td>{u.address}</td>
              <td>{u.info.phonenumber}</td>
              <td>{u.homepage}</td>
              <td>{moment(u.info.created_at).format("DD/MM/YYYY")}</td>
              <td>
                {u.info.last_online && u.info.last_online.last_online
                  ? moment(u.info.last_online.last_online).format("DD/MM/YYYY")
                  : ""}
              </td>
              <td>{u.business_id}</td>
              <td>
                <Button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSelectedGeneralSales(u.id)}
                >
                  Myyntitiedot
                </Button>
              </td>
              <td>
                <Button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSelectedWeeklySales(u.id)}
                >
                  Viikottaiset myyntitiedot
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showGeneralSalesModal ? (
        <SalesModal
          show={showGeneralSalesModal}
          handleClose={() => setShowGeneralSalesModal(false)}
          selectedSales={selectedSales}
        />
      ) : null}
      {showWeeklySalesModal ? (
        <WeeklySalesModal
          show={showWeeklySalesModal}
          handleClose={() => setShowWeeklySalesModal(false)}
          selectedWeeklySales={selectedWeeklySales}
        />
      ) : null}
    </div>
  )
}

export default SellersListAdmin
