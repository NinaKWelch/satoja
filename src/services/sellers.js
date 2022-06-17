import axios from "axios"

const apiUrl = "/api/sellers"
const resp = {
  status: 500,
}

export const getSeller = async (id) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/${id}`)
  } catch (err) {
    console.log("ERROR in getSeller: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}
