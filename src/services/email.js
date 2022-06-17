import axios from "axios"
const apiUrl = "/api/auth/email"
const resp = {
  status: 500,
}
export const ResetPassword = async (email, password) => {
  var response = null
  try {
    response = await axios.post(`${apiUrl}/reset_password`, { email, password })
  } catch (err) {
    console.log("ERROR in resetpassword: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export default { ResetPassword }
