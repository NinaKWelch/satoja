import axios from "axios"
const productService = require("../services/products")
const apiUrl = "/api/orders"
//const productApiUrl = "/api/products"
const resp = {
  status: 500,
}
export const getSellerOrders = async (id) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/seller/${id}`)
  } catch (err) {
    console.log("ERROR in getSellerOrders: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}
export const getSellerRekoOrders = async (id) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/sellerReko/${id}`)
  } catch (err) {
    console.log("ERROR in getSellerRekoOrders: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export const getBuyerOrders = async (id) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/buyer/${id}`)
  } catch (err) {
    console.log("ERROR in getBuyerOrders: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}
export const getBuyerRekoOrders = async (id) => {
  var response = null
  try {
    response = await axios.get(`${apiUrl}/buyerReko/${id}`)
  } catch (err) {
    console.log("ERROR in buyerReko: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export const submitBuyerOrders = async (orders, buyerID) => {
  var response = null
  var products = null
  if (orders && buyerID) {
    //console.log("orders in submitBuyerOrders", orders)

    //filter out undefined that sometimes comes with the orders.
    orders = orders.filter(Boolean || null || "")

    orders.forEach((o) => {
      o.batches = o.batches.filter(Boolean || null || "")
      var temp = o.batches.map((b) => {
        if (b.order_quantity > 0) {
          return b
        } else {
          return null
        }
      })
      temp = temp.filter(Boolean || null || "")
      o.batches = temp
    })

    //console.log("orders in submitBuyerOrders after", orders)
    if (orders && orders.length > 0) {
      try {
        response = await axios.post(`${apiUrl}/buyer/${buyerID}`, orders)
        if (response !== undefined) {
          if (response.status === 200) {
            return response
          } else {
            //console.log("response insubmitBuyerOrders was not 200 ")
            products = await productService.getSellersProducts(
              buyerID /*, productsRepository*/
            )
            return { response, products }
          }
        } else {
          //console.log("else insubmitBuyerOrders was not 200 ")
          products = await productService.getSellersProducts(
            buyerID /*, productsRepository*/
          )
          return { response, products }
        }
      } catch (e) {
        console.log("catch in submitBuyerOrders, e: ", e)
      }
    } else {
      //console.log("nothing in order to post")

      return resp
    }
  }
}

export const deleteOrder = async (seller_Id, order_Id) => {
  var response = null
  try {
    await axios.delete(`${apiUrl}/seller/${seller_Id}/${order_Id}`)
  } catch (err) {
    console.log("ERROR in deleteOrder: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}
export const deleteRekoOrder = async (seller_Id, order_Id) => {
  var response = null
  try {
    await axios.delete(`${apiUrl}/seller/${seller_Id}/${order_Id}`)
  } catch (err) {
    console.log("ERROR in deleteRekoOrder: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}
export const deleteProductOrder = async (seller_Id, order_Id, size_Id) => {
  var response = null
  try {
    response = await axios.delete(
      `${apiUrl}/seller/${seller_Id}/${order_Id}/size/${size_Id}`
    )
  } catch (err) {
    console.log("ERROR in deleteProductOrder: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export const deleteProductFromOrder = async (seller_Id, order_Id, product_Id) => {
  var response = null
  try {
    response = await axios.delete(
      `${apiUrl}/seller/${seller_Id}/${order_Id}/product/${product_Id}`
    )
  } catch (err) {
    console.log("ERROR in deleteProductFromOrder: ", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response.data
  }
}

export default {
  getSellerOrders,
  getSellerRekoOrders,
  getBuyerOrders,
  deleteOrder,
  deleteRekoOrder,
  deleteProductOrder,
}
