import Dropdown from "react-bootstrap/Dropdown"

const SelectMarket = ({ market, setMarket, markets }) => {
  const displayMarkets = markets.map((market, index) => (
    <Dropdown.Item key={index+"Key"} onClick={() => setMarket(market)}>{market.place +" " + market.address}</Dropdown.Item>
  ))
  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {market ?  market.address : "Valitse noutopaikka"}
        </Dropdown.Toggle>
        <Dropdown.Menu>{displayMarkets}</Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default SelectMarket
