import axios from "axios"
const baseUrl = "/api/mail"
const resp = {
  status: 500,
}
export const sendMail = async (message) => {
  var response = null
  try {
    response = await axios.post(`${baseUrl}/contact`, message)
  } catch (err) {
    console.log("ERROR sendMail error ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.status
  }
}
