import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import moment from "moment"

const SalesModal = ({ show, handleClose, selectedSales }) => (
  <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false} centered>
    <Modal.Body className="text-center">
      <div>
        <table className="table table-striped  table-responsive-sm">
          <thead className="thead-dark">
            <tr>
              <th>Pvm</th>
              <th>Paikkakunta</th>
              <th>Osoite</th>
              <th>Myynti</th>
              <th>Myynti itselle</th>
            </tr>
          </thead>
          <tbody>
            {/* mapataan. jos event on ollu viikon sisällä tjtn ni näytetään sen tiedot? ja yhteenlasketut ostokset, poislukien myyjän itsensä ostamat */}
            {selectedSales[0] &&
            selectedSales[0].orders &&
            selectedSales[0].orders.length > 0 ? (
              selectedSales[0].orders.map((o) => {
                let totalsalesEvent = 0
                let totalOwnSalesEvent = 0 //buyers own purchases from himself
                o.events_orders.map((eo) => {
                  eo.user_orders.map((i) => {
                    if (!i.removed && eo.user_id !== selectedSales[0].sellerId) {
                      totalsalesEvent = totalsalesEvent + i.unit_price * i.quantity
                    } else if (!i.removed) {
                      totalOwnSalesEvent = totalOwnSalesEvent + i.unit_price * i.quantity
                    }
                  })
                })
                return (
                  <tr key={o.event_address}>
                    <td>{moment(o.event_start).format("DD/MM/YYYY HH:mm")}</td>
                    <td>{o.reko_name}</td>
                    <td>{o.event_address}</td>
                    <td>{totalsalesEvent.toFixed(2)}€</td>
                    <td>{totalOwnSalesEvent.toFixed(2)}€</td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td>Ei tietoja</td>
                <td>Ei tietoja</td>
                <td>Ei tietoja</td>
                <td>Ei tietoja</td>
                <td>Ei tietoja</td>
              </tr>
            )}

            <tr>
              <td></td>
              <td></td>
              <td>Yhteensä:</td>
              <td>
                {selectedSales[0] &&
                selectedSales[0].orders &&
                selectedSales[0].orders.length > 0
                  ? selectedSales[0].orders
                      .reduce((tot, order) => {
                        return (
                          tot +
                          order.events_orders.reduce((tot, event_order) => {
                            return (
                              tot +
                              event_order.user_orders.reduce((tot, user_order) => {
                                if (
                                  !user_order.removed &&
                                  event_order.user_id !== selectedSales[0].sellerId
                                ) {
                                  return tot + user_order.unit_price * user_order.quantity
                                } else {
                                  return tot
                                }
                              }, 0)
                            )
                          }, 0)
                        )
                      }, 0)
                      .toFixed(2) + "€"
                  : null}
              </td>
              <td>
                {selectedSales[0] &&
                selectedSales[0].orders &&
                selectedSales[0].orders.length > 0
                  ? selectedSales[0].orders
                      .reduce((tot, order) => {
                        return (
                          tot +
                          order.events_orders.reduce((tot, event_order) => {
                            return (
                              tot +
                              event_order.user_orders.reduce((tot, user_order) => {
                                if (
                                  !user_order.removed &&
                                  event_order.user_id === selectedSales[0].sellerId
                                ) {
                                  return tot + user_order.unit_price * user_order.quantity
                                } else {
                                  return tot
                                }
                              }, 0)
                            )
                          }, 0)
                        )
                      }, 0)
                      .toFixed(2) + "€"
                  : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <Button variant="outline-secondary" onClick={() => handleClose()} className="w-25">
        OK
      </Button>
    </Modal.Body>
  </Modal>
)

export default SalesModal
