import axios from "axios"
const baseUrl = "/api/auth"
const resp = {
  status: 500,
}
export const createNewUser = async (newUser) => {
  var response = null
  // console.log("NEWUSER in CREATENEWUSER: ", newUser)
  try {
    response = await axios.post(`${baseUrl}/email/register`, newUser)
    //console.log("createnewuser response ", response)
  } catch (err) {
    // important!
    // for cases where user has an account with same email
    const resp2 = {
      status: 400,
    }
    console.log("ERROR in createnewuser: ", err)
    if (
      err.toString().substring(0, 42) === "Error: Request failed with status code 400"
    ) {
      // #purkkaFixit
      return resp2
    }
  }
  if (!response) {
    return resp
  } else {
    return response
  }
}

export const loginUser = async (credentials) => {
  var response = null
  try {
    response = await axios.post(`${baseUrl}/email`, credentials)
  } catch (err) {
    console.log("ERROR in loginuser: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.status
  }
}

export const logoutUser = async () => {
  var response = null
  try {
    response = await axios.get(`${baseUrl}/logout`)
  } catch (err) {
    console.log("ERROR in logoutuser: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.status
  }
}
