import React from "react"

import Button from "react-bootstrap/Button"

//import BootStrapForm from "react-bootstrap/Form"

const SalesReportAdmin = ({ sellers }) => {
  //sellers.sort((a, b) => (a.created_at > b.created_at ? -1 : 1))

  return (
    <table className="table table-striped  table-responsive-sm">
      <thead className="thead-dark">
        <tr>
          <th>Pvm</th>
          <th>Kaupunki</th>
          <th>Osoite</th>
          <th>Myyjä</th>
          <th>Myynnit</th>
        </tr>
      </thead>
      <tbody>
        {sellers.map((s) => (
          <tr key={s.id}>
            <td>{s.name}</td>
            <td>{s.address}</td>
            <td>{s.homepage}</td>
            <td>{s.name}</td>
            <td>
              <Button
                type="button"
                class="btn btn-primary"
                //onClick={() => setAddingEvent(true)}
              >
                Viikon myyntitiedot
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default SalesReportAdmin
