import React, { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown"

const AdminSelectRegion = ({ regionsArr, regionChoice, setRegionChoice }) => {
  const [choice, setChoice] = useState([])
  const regions = []
  regions.push([
    <div key={12} className="form-check">
      <Dropdown.Item
        key={22}
        onClick={() => {
          setChoice(["all"])
        }}
      >
        {"Näytä kaikki"}
      </Dropdown.Item>
    </div>,
  ])
  regionsArr.map((region, index) => {
    regions.push([
      <div key={index} className="form-check">
        <Dropdown.Item
          key={index}
          onClick={() => {
            setRegionChoice(region)
            setChoice(region)
          }}
        >
          {region.region}
        </Dropdown.Item>
      </div>,
    ])
  })
  return (
    <>
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {choice.region ? choice.region : "Valitse maakunta"}
          </Dropdown.Toggle>
          <Dropdown.Menu>{regions}</Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  )
}
export default AdminSelectRegion
