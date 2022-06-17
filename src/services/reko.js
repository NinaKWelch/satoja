import axios from "axios"

const apiUrl = "/api/reko_areas"
const resp = {
  status: 500,
}
export const addRekoArea = async ({ name, area }) => {
  var response = null
  try {
    response = await axios.post(`${apiUrl}`, { name, area })
  } catch (err) {
    console.log("ERROR in addRekoArea: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export default { addRekoArea }
