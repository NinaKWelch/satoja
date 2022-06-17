import axios from "axios"

const apiUrl = "/api/events"
const resp = {
  status: 500,
}

export const getEvents = async () => {
  var response = null
  try {
    response = await axios.get(apiUrl)
  } catch (e) {
    console.log("ERROR in getEvents: ", e)
  }

  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

/*
const getSellerEvents = async (id) => {
  const response = await axios.get(`${apiUrl}/seller/${id}`)
  return response.data
}
*/

export const getSellersUpcomingEventsWithProducts = async (id) => {
  var response = null

  try {
    response = await axios.get(`/api/sellers/events/${id}`)
  } catch (e) {
    console.log("ERROR in getEvents: ", e)
  }

  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}
export const getSellersUpcomingRekoEventsWithProducts = async (id) => {
  var response = null
  try {
    response = await axios.get(`/api/sellers/rekoEvents/${id}`)
  } catch (e) {
    console.log("ERROR in getSellersUpcomingRekoEventsWithProducts: ", e)
  }

  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export const getEventProduct = async (eventID, productID) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/${eventID}/products/${productID}`)
  } catch (e) {
    console.log("ERROR in getEventProduct: ", e)
  }

  if (response === null || response === undefined) {
    return resp
  } else {
    return response
  }
}

export const getSellersUpcomingEvents = async (id) => {
  var response = null
  try {
    response = response = await axios.get(`${apiUrl}/seller/${id}`)
  } catch (e) {
    console.log("ERROR in getSellersUpcomingEvents: ", e)
  }

  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export const getSellersUpcomingRekoEvents = async (id) => {
  var response = null
  try {
    response = response = await axios.get(`${apiUrl}/sellerReko/${id}`)
  } catch (e) {
    console.log("ERROR in getSellersUpcomingRekoEvents: ", e)
  }

  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

const addEvent = async (start, end, event_description,event_name, market_id) => {
  var response = null
  try {
    response = await axios.post(`${apiUrl}`, {
      start,
      end,
      event_description,
      event_name,
      market_id,
    })
  } catch (e) {
    console.log("ERROR in addEvent: ", e)
  }

  if (response === null || response === undefined) {
    return resp
  } else {
    return response
  }
}

const updateEvent = async (start, end, market_id, event_id, event_description, event_name) => {
  var response = null
  try {
    response = await axios.put(`${apiUrl}/${event_id}`, {
      start,
      end,
      market_id,
      event_description,
      event_name,
    })
  } catch (e) {
    console.log("ERROR in updateEvent: ", e)
  }

  if (response === null || response === undefined) {
    return resp
  } else {
    return response
  }
}

export default { /*getEvents,*/ getSellersUpcomingEvents,getSellersUpcomingRekoEvents, addEvent, updateEvent,
getSellersUpcomingRekoEventsWithProducts, }
