import React, { useEffect, useState } from "react"
import WeeklySalesModal from "./WeeklySalesModal"
import SalesModal from "./SalesModal"
import Button from "react-bootstrap/Button"
import moment from "moment"

const GlobalSalesAdmin = ({ sellers, sellersAndOrders }) => {
  //sellers.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))
  const [showWeeklySalesModal, setShowWeeklySalesModal] = useState(false)
  const [showGeneralSalesModal, setShowGeneralSalesModal] = useState(false)

  //const [selectedSales, setSelectedSales] = useState([])
  const [selectedWeeklySales, setSelectedWeeklySales] = useState([])
  useEffect(() => {
    handleSelectedWeeklySales()
  }, [sellersAndOrders])
  // const handleSelectedGeneralSales = (id) => {
  //   var temp = []
  //   sellersAndOrders.map((so) => {
  //     if (so.seller.id === id && so.orders.length > 0) {
  //       var obj = {
  //         sellerId: so.seller.id,
  //         seller_name: so.seller.name,
  //         orders: so.orders,
  //       }

  //       temp.push(obj)
  //     }
  //   })
  //   setSelectedSales(temp)
  //   setShowGeneralSalesModal(true)
  // }

  const handleSelectedWeeklySales = () => {
    var temp = []
    sellersAndOrders.map((so) => {
      if (so.orders.length > 0) {
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
      {/* <table className="table table-striped  table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th>Viikko</th>
            <th>Myynti</th>
            <th>Muutos</th>
          </tr>
        </thead>
        <tbody>
          {selectedWeeklySales ? selectedWeeklySales.map((sales, index) => (
            <tr key={index}>
              <td>{sales.week}</td>
              <td>{sales.orders}</td>
              <td>{sales.lastname}</td>
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
          ))
        :
        null} */}

      <h1>Viikottainen myynti (ei sisällä omia tilauksia)</h1>
      <table className="table table-striped  table-responsive-sm">
        <thead className="thead-dark">
          <tr>
            <th>Viikko</th>
            <th>Myynti(€)</th>
            <th>Muutos edelliseen viikkoon (%)</th>
          </tr>
        </thead>
        <tbody>
          {selectedWeeklySales[0] &&
          selectedWeeklySales[0].orders &&
          selectedWeeklySales[0].orders.length > 0 ? (
            selectedWeeklySales.map((o, index) => {
              let totalsalesEvent = 0
              let totalOwnSalesEvent = 0 //buyers own purchases from himself
              o.orders.forEach((order) => {
                if (order && order.events_orders) {
                  order.events_orders.forEach((eo) => {
                    eo.user_orders.forEach((i) => {
                      if (!i.removed && eo.user_id !== o.sellerId) {
                        totalsalesEvent = totalsalesEvent + i.unit_price * i.quantity
                      } else if (!i.removed) {
                        totalOwnSalesEvent =
                          totalOwnSalesEvent + i.unit_price * i.quantity
                      }
                    })
                  })
                }
              })
              selectedWeeklySales[index].weekTotalSales = totalsalesEvent
              // this is hideous but it seems to work, calculate what to show in different scenarios for weekly sales comparation
              return (
                <tr key={o.week}>
                  <td>{o.week}</td>
                  <td>{totalsalesEvent.toFixed(2)}€</td>
                  <td>
                    {selectedWeeklySales[index - 1] &&
                    selectedWeeklySales[index - 1].weekTotalSales > 0 &&
                    totalsalesEvent > 0
                      ? (selectedWeeklySales[index - 1].weekTotalSales /
                          totalsalesEvent) *
                        100
                      : selectedWeeklySales[index - 1] && totalsalesEvent > 0
                      ? totalsalesEvent * 100
                      : selectedWeeklySales[index - 1] &&
                        selectedWeeklySales[index - 1].weekTotalSales <= 0 &&
                        totalsalesEvent <= 0
                      ? ((totalsalesEvent -
                          selectedWeeklySales[index - 1].weekTotalSales) /
                          100) *
                        100
                      : selectedWeeklySales[index - 1] &&
                        selectedWeeklySales[index - 1].weekTotalSales
                      ? -selectedWeeklySales[index - 1].weekTotalSales * 100
                      : "- "}
                    %
                  </td>
                  {/* <td>{totalOwnSalesEvent.toFixed(2)}€</td> */}
                </tr>
              )
            })
          ) : (
            <tr>
              <td>Ei tietoja</td>
              <td>Ei tietoja</td>
              <td>Ei tietoja</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* {showGeneralSalesModal ? (
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
      ) : null} */}
    </div>
  )
}

export default GlobalSalesAdmin
