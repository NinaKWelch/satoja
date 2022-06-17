import axios from "axios"
const apiUrl = "/api/users"
const sellerApiUrl = "/api/sellers"
const resp = {
  status: 500,
}
export const getAuthedUser = async () => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/current/user`)
  } catch (err) {
    console.log("ERROR in getAuthedUser: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data[0]
  }
}

export const getUserList = async () => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/userList`)
  } catch (err) {
    console.log("ERROR in getUserList: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data[0]
  }
}

export const createNewFacebookUser = async (newUser) => {
  var response = null
  try {
    response = await axios.post(`${apiUrl}`, newUser)
  } catch (err) {
    console.log("ERROR in createNewFacebookUser: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response
  }
}
//new
export const createSeller = async (seller_id, seller) => {
  var response = null
  //console.log("seller in createSeller: ", seller)
  try {
    if (
      !seller.location ||
      seller.location === "" ||
      seller.location === null ||
      seller.location === undefined
    ) {
      seller.location = {}
      seller.location = { lat: "", lon: "" }
    }
    const object = {
      seller_info: {
        reko_areas: seller.reko_areas,
        regions: seller.regions,
        name: seller.name || null,
        address: seller.address || null,
        zipcode: seller.zipcode || null,
        city: seller.city || null,
        business_id: seller.business_id || null,
        homepage: seller.homepage || null,
        description: seller.description || null,
        salesreport_check: seller.salesreport_check || false,
        location: seller.location || { lat: "", lon: "" },
      },
      user_info: {
        lastname: seller.lastname,
        firstname: seller.firstname,
        email: seller.email,
        phonenumber: seller.phonenumber || null,
      },
    }
    //console.log("object in createSeller: ", object)

    response = await axios.post(`${sellerApiUrl}/${seller_id}/newSeller`, object)
  } catch (err) {
    console.log("ERROR in createSeller: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.status
  }
}

export const updateAuthedBuyer = async (buyer) => {
  var response = null
  try {
    const object = {
      buyer_info: {
        cancel_notification_check: buyer.cancel_notification_check || false,
        newsletter_check: buyer.newsletter_check || false,
      },
      user_info: {
        lastname: buyer.lastname,
        firstname: buyer.firstname,
        email: buyer.email,
        phonenumber: buyer.phonenumber || null,
      },
    }
    response = await axios.put(`${apiUrl}/${buyer.id}`, object)
  } catch (err) {
    console.log("ERROR in updateAuthedBuyer: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.status
  }
}

export const updateAuthedSeller = async (seller) => {
  var response = null
  try {
    const object = {
      seller_info: {
        reko_areas: seller.reko_areas,
        regions: seller.regions,
        name: seller.name || null,
        address: seller.address || null,
        zipcode: seller.zipcode || null,
        city: seller.city || null,
        business_id: seller.business_id || null,
        homepage: seller.homepage || null,
        description: seller.description || null,
        salesreport_check: seller.salesreport_check || false,
        location: seller.location || ["", ""],
      },
      user_info: {
        lastname: seller.lastname,
        firstname: seller.firstname,
        email: seller.email,
        phonenumber: seller.phonenumber || null,
      },
    }
    response = await axios.put(`${apiUrl}/${seller.id}`, object)
  } catch (err) {
    console.log("ERROR in updateAuthedSeller: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.status
  }
}

export const updateSellerImage = async (id, image_id) => {
  var response = null
  try {
    response = await axios.put(`/api/sellers/${id}/image`, { image_id })
  } catch (err) {
    console.log("ERROR in updateSellerImage: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.status
  }
}

export const updateBuyerImage = async (id, image_id) => {
  var response = null
  try {
    response = await axios.put(`/api/buyers/${id}/image`, { image_id })
  } catch (err) {
    console.log("ERROR in updateBuyerImage: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.status
  }
}

//new
export const getSellerPaymentOptions = async (id) => {
  var response = null
  try {
    response = response = await axios.get(`/api/sellers/${id}/payments`)
  } catch (err) {
    console.log("ERROR in getSellerPaymentOptions: ", err)
  }
  if (response === null || response === undefined) {
    return []
  } else if (response.data.length > 0) {
    return response.data[0].options
  } else {
    return []
  }
}

//new
export const updateSellerPaymentOptions = async (id, options) => {
  var response = null
  try {
    response = await axios.put(`/api/sellers/${id}/payments`, { options })
  } catch (err) {
    console.log("ERROR in updateSellerPaymentOptions: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.status
  }
}

//new
export const getUserFbIdById = async (id) => {
  var response = null
  try {
    response = await axios.get(`/api/users/facebook_id/${id}`)
    //console.log("getUserFbIdById response.data ", response.data)
  } catch (err) {
    console.log("ERROR in getUserFbIdById: ", err)
  }
  if (response === null || response === undefined) {
    return []
  } else if (response.data.length > 0) {
    return response.data[0].options
  } else {
    return []
  }
}
