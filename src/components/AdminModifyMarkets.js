
import Button from "react-bootstrap/Button"
import React, { useEffect, useState } from "react"
import MarketsListAdmin from "./MarketsListAdmin"
const axios = require("axios")

const AdminModifyMarkets = ({ setModifyingMarkets }) => {
  const [markets, setMarkets] = useState([])
  const [updateMarkets , setUpdateMarkets] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const pickups = await axios.get("/api/markets")
      setMarkets(pickups.data)
    }
    fetchData()
    //console.log("fetching market info")
  }, [updateMarkets])

  return (
    <div>
      <Button variant="danger" onClick={() => setModifyingMarkets(false)}>
        Peruuta
      </Button>
      <MarketsListAdmin markets={markets} updateMarkets={updateMarkets} setUpdateMarkets={setUpdateMarkets}/>
    </div>
  )
}

export default AdminModifyMarkets
