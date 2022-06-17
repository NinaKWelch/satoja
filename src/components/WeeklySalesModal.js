import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"

const WeeklySalesModal = ({ show, handleClose, selectedWeeklySales }) => (
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
    <Modal.Body className="text-center">
      <div>
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

            {/* <tr>
                <td></td>
                <td></td>
                <td>Yhteensä:</td>
                <td>{selectedSales[0] &&selectedSales[0].orders&& selectedSales[0].orders.length > 0 ? (
                        selectedSales[0].orders.reduce((tot,order) => {
                        return (
                            tot + order.events_orders.reduce((tot,event_order)=>{
                                return (
                                        tot + event_order.user_orders.reduce((tot,user_order)=>{
                                            if (!user_order.removed && event_order.user_id !== selectedSales[0].sellerId) {
                                                return (tot + (user_order.unit_price * user_order.quantity)) 
                                            }
                                            else{
                                                return tot
                                            }
                                        },0)
                                        )
                                },0)
                                )
                        },0).toFixed(2)+"€"
                ) :null}
                </td>
                <td>{selectedSales[0] &&selectedSales[0].orders&& selectedSales[0].orders.length > 0 ? (
                        selectedSales[0].orders.reduce((tot,order) => {
                        return (
                            tot + order.events_orders.reduce((tot,event_order)=>{
                                return (
                                        tot + event_order.user_orders.reduce((tot,user_order)=>{
                                            if (!user_order.removed && event_order.user_id === selectedSales[0].sellerId) {
                                                return (tot + (user_order.unit_price * user_order.quantity))
                                            }
                                            else{
                                                return tot
                                            }
                                        },0)
                                        )
                                },0)
                                )
                        },0).toFixed(2)+"€"
                ):null}
                </td>
              </tr> */}
          </tbody>
        </table>
      </div>

      <Button variant="outline-secondary" onClick={() => handleClose()} className="w-25">
        OK
      </Button>
    </Modal.Body>
  </Modal>
)

export default WeeklySalesModal
