import axios from "axios"

const apiUrl = "/api/products"
const resp = {
  status: 500,
}
export const getSellerProducts = async (id) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/seller/${id}`)
  } catch (err) {
    console.log("ERROR in getSellerProducts: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export const DeleteProduct = async (id) => {
  var response = null
  try {
    response = await axios.delete(`${apiUrl}/${id}`)
  } catch (err) {
    console.log("ERROR in DeleteProduct: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export const getEventProducts = async (id) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/events/${id}`)
  } catch (err) {
    console.log("ERROR in getEventProducts: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export const getTestiProducts = async () => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}`)
  } catch (err) {
    console.log("ERROR in getTestiProducts: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

const getUserProducts = async (id) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/${id}`)
  } catch (err) {
    console.log("ERROR in getUserProducts: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

const addProduct = async (productObject) => {
  var response = null
  try {
    response = await axios.post(
      `${apiUrl}/seller/${productObject.product.sellers_id}`,
      productObject
    )
  } catch (err) {
    console.log("ERROR in addProduct: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.status
  }
}

const updateProduct = async (product_id, productObject) => {
  var response = null
  try {
    response = await axios.put(`${apiUrl}/${product_id}`, productObject)
  } catch (err) {
    console.log("ERROR in updateProduct: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.status
  }
}

const getProductById = async (product_id) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/${product_id}`)
  } catch (err) {
    console.log("ERROR in getProductById: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export default {
  getUserProducts,
  getEventProducts,
  DeleteProduct,
  addProduct,
  updateProduct,
  getProductById,
  getTestiProducts,
  getSellerProducts,
}
