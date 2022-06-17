import Dropdown from "react-bootstrap/Dropdown"

const SelectMarket = ({ market, setMarket, markets }) => {
  const displayMarkets = markets.map((market, index) => (
    <Dropdown.Item key={index + "Key"} onClick={() => setMarket(market)}>
      {market.municipality_name ? market.municipality_name : ""} { market.place ? market.place : "" } { market.address ? market.address : ""}
    </Dropdown.Item>
  ))
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {market ? market.municipality_name ? market.municipality_name : "" :"Valitse noutopaikka"} {market ? market.place ? market.place : "" :null} { market ? market.address ? market.address : "":null }
        </Dropdown.Toggle>
        <Dropdown.Menu>{displayMarkets}</Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default SelectMarket
