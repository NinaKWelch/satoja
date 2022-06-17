import axios from "axios"

const apiUrl = "api/markets"
const resp = {
  status: 500,
}
//original reko
// const addMarket = async (address, postalcode,place,description,location, rekoChoices, region, municipality) => {
//   var response = null
//   try {
//     response = await axios.post(`${apiUrl}/reko_market`, {
//       address,
//       place,
//       description,
//       postalcode,
//       location,
//       reko_areas: rekoChoices,
//       region,
//       municipality
//     })
//   } catch (e) {
//     console.log("ERROR in addMarket: ", e)
//   }
//   if (response === null || response === undefined) {
//     return resp
//   } else {
//     return response
//   }
// }
const addMarketToRegionMarkets = async (
  address,
  postalcode,
  place,
  market_description,
  location,
  region,
  municipality,
  market_name,
) => {
  var response = null
  try {
    response = await axios.post(`${apiUrl}/region_market`, {
      address,
      place,
      market_description,
      postalcode,
      location,
      region,
      municipality,
      market_name
    })
  } catch (e) {
    console.log("ERROR in addMarket: ", e)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response
  }
}
const getAllMarkets = async () => {
  var response = null
  try {
    response = await axios.get(apiUrl)
  } catch (e) {
    console.log("ERROR in getAllMarkets: ", e)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export const getSellerMarkets = async (id) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/seller/${id}`)
  } catch (e) {
    console.log("ERROR in getSellerMarkets: ", e)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export const updateMarket = async(id, address, postalcode, location, place, 
      market_description, region_id, municipality_id, market_name ) =>{

  var response = null
  try {
    response = await axios.post(`${apiUrl}`, {
      id, 
      address, 
      postalcode,
      location, 
      place, 
      market_description, 
      region_id, 
      municipality_id, 
      market_name
    })
   } catch (e) {
    console.log("ERROR in updateMarket: ", e)
  }
  if (response === null || response === undefined) {
    return resp.status
  } else {
    return response.status
  }
}
export default { getAllMarkets, getSellerMarkets, addMarketToRegionMarkets,updateMarket }
