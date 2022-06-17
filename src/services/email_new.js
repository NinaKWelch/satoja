import axios from "axios"
const apiUrl = "/api/auth/email"
const resp = {
  status: 500,
}
export const ResetPassword_new = async (email) => {
  var response = null
  try {
    response = await axios.post(`${apiUrl}/sent_password_reset_link`, {
      email,
    })
  } catch (err) {
    console.log("ERROR in ResetPassword_new: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export default { ResetPassword_new }
