import axios from "axios"

const apiUrl = "/api/markets/map"
const resp = {
  status: 500,
}

export const getMapData = async () => {
  var response = null
  try {
    response = await axios.get(apiUrl)
  } catch (err) {
    console.log("ERROR in getMapData: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}
