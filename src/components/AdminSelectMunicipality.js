import React, { useState } from "react"
import Dropdown from "react-bootstrap/Dropdown"

const AdminSelectMunicipality = ({
  municipalitiesArr,
  regionChoice,
  municipalityChoice,
  setMunicipalityChoice,
}) => {
  const [choice, setChoice] = useState([])
  let municipalities = []
  municipalities.push([
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
  const selectedRegionMunicipalities = municipalitiesArr.filter(
    (muni) => muni.region_id === regionChoice.id
  )
  // console.log(selectedRegionMunicipalities)
  if (selectedRegionMunicipalities.length > 0 && choice[0] !== "all") {
    selectedRegionMunicipalities.map((municipality, index) => {
      municipalities.push([
        <div key={index} className="form-check">
          <Dropdown.Item
            key={index}
            onClick={() => {
              setMunicipalityChoice(municipality)
              setChoice(municipality)
            }}
          >
            {municipality ? municipality.municipality : "Valitse kunta"}
          </Dropdown.Item>
        </div>,
      ])
    })
  } else {
    municipalitiesArr.map((municipality, index) => {
      municipalities.push([
        <div key={index} className="form-check">
          <Dropdown.Item
            key={index}
            onClick={() => {
              setMunicipalityChoice(municipality)
              setChoice(municipality)
            }}
          >
            {municipality ? municipality.municipality : "Valitse kunta"}
          </Dropdown.Item>
        </div>,
      ])
    })
  }
  if (choice[0] === "all") {
    municipalitiesArr.map((municipality, index) => {
      municipalities.push([
        <div key={index} className="form-check">
          <Dropdown.Item
            key={index}
            onClick={() => {
              setMunicipalityChoice(municipality)
              setChoice(municipality)
            }}
          >
            {municipality ? municipality.municipality : "Valitse kunta"}
          </Dropdown.Item>
        </div>,
      ])
    })
  }
  return (
    <>
      <div>
        <Dropdown style={{ height: "200px", overflowY: "scroll" }}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {choice.municipality ? choice.municipality : "Valitse kunta"}
          </Dropdown.Toggle>
          <Dropdown.Menu>{municipalities}</Dropdown.Menu>
        </Dropdown>
      </div>
    </>
  )
}

export default AdminSelectMunicipality
