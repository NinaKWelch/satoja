import axios from "axios"

const apiUrl = "/api/buyers"
const resp = {
  status: 500,
}
export const getBuyersInfo = async (id) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/${id}`)
  } catch (e) {
    console.log("error getBuyersInfo()", e)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}
