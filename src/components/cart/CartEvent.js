import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import EventInfo from "../events/EventInfo"
import CartEventSeller from "./CartEventSeller"

const CartEvent = ({ event, products, orderChanges }) => {
  const [sellers, setSellers] = useState(null)

  useEffect(() => {
    // add notification message
    const addMessage = (product, quantity, unit) => {
      if (product.singleSize) {
        return {
          ...product,
          message:
            quantity === 0 ? "Tämä tuote on loppuunmyyty" : `Vain ${quantity} jäljellä`,
        }
      } else {
        return {
          ...product,
          message:
            quantity === 0
              ? `${unit}${product.type} koko on loppuunmyyty`
              : `${unit}${product.type} kokoa vain ${quantity} jäljellä`,
        }
      }
    }

    // notify user about reduced product availabiliy
    const addChangesToOrder = (sellers) => {
      let changedSellers = []

      sellers.forEach((seller) => {
        let sellerProducts = []

        seller.products.forEach((product) => {
          // check each item for order changes
          const hasChanged = orderChanges.find((order) => order.id === product.id)

          if (hasChanged) {
            const changedProduct = addMessage(
              product,
              hasChanged.quantity,
              hasChanged.unit
            )
            sellerProducts.push(changedProduct)
          } else {
            sellerProducts.push(product)
          }
        })
        // update sellers products
        changedSellers.push({ ...seller, products: sellerProducts })
      })
      setSellers(changedSellers)
    }

    // remove redundant products and sellers
    const sortCart = (arr) => {
      let updatedCart = []
      const getProductQuantity = (arr) => arr.reduce((a, b) => a + b.order_quantity, 0)

      arr.forEach((item) => {
        let updatedSeller = item

        // chenck for products that have been removed from cart
        item.products.forEach((product) => {
          const sizesInCart = getProductQuantity(
            product.sizes.filter((size) => size.order_quantity)
          )

          if (sizesInCart === 0) {
            updatedSeller = {
              ...updatedSeller,
              products: updatedSeller.products.filter((p) => p.id !== product.id),
            }
          }
        })

        // only add sellers who have products in cart
        updatedSeller.products.length > 0 && updatedCart.push(updatedSeller)
      })

      //return updatedCart
      setSellers(updatedCart)
    }

    // sort products in cart by seller
    const sortProductsBySeller = (arr) => {
      let productsBySeller = []

      for (let item of arr) {
        const addProduct = (product, size_id, order_quantity) => {
          const sizes = product.sizes.map((size) => {
            // the size id may be either id or size_id
            let id = size.size_id ? size.size_id : size.id
            if (id !== size_id) {
              return size
            } else {
              return { ...size, order_quantity }
            }
          })

          return { ...item.product, sizes }
        }

        const seller = {
          sellers_id: item.product.sellers_id,
          seller_name: item.product.seller_name,
          seller_firstname: item.product.seller_firstname,
          seller_lastname: item.product.seller_lastname,
          products: [addProduct(item.product, item.size_id, item.order_quantity)],
        }

        if (productsBySeller.length > 0) {
          // chheck if seller has alredy been added
          const isSeller = productsBySeller.find(
            (seller) => seller.sellers_id === item.product.sellers_id
          )

          if (isSeller) {
            const hasProduct = isSeller.products.find(
              (product) => product.id === item.product.id
            )

            // add new product to sellers products
            if (!hasProduct) {
              productsBySeller = productsBySeller.map((seller) =>
                seller.sellers_id !== item.product.sellers_id
                  ? seller
                  : {
                      ...seller,
                      products: [
                        ...seller.products,
                        addProduct(item.product, item.size_id, item.order_quantity),
                      ],
                    }
              )
            }

            // update current product sizes
            if (hasProduct) {
              const updatedProducts = isSeller.products.map((product) =>
                product.id !== item.product.id
                  ? product
                  : addProduct(hasProduct, item.size_id, item.order_quantity)
              )

              productsBySeller = productsBySeller.map((seller) =>
                seller.sellers_id !== item.product.sellers_id
                  ? seller
                  : { ...seller, products: updatedProducts }
              )
            }
          } else {
            productsBySeller.push(seller)
          }
        } else {
          productsBySeller.push(seller)
        }
      }

      orderChanges ? addChangesToOrder(productsBySeller) : sortCart(productsBySeller)
    }

    products && sortProductsBySeller(products)
  }, [products, orderChanges])

  const getMarketInfo = (item) => {
    const market = {
      id: item.market.id,
      start: item.market.start,
      endtime: item.market.endtime,
      address: item.market.address,
      market_name: item.market_name || "",
      place: item.place || "",
    }

    return market
  }

  return (
    <>
      {sellers && sellers.length > 0 && (
        <Row className="mb-5">
          <Col xs={12} className="mb-4 text-center">
            <h2 className="mb-0 fs-4">Noutotilaisuus</h2>
            <EventInfo market={getMarketInfo(event)} event={event} />
          </Col>
          <Col xs={12}>
            {sellers.map(
              (seller, index) =>
                seller.products.length > 0 && (
                  <CartEventSeller
                    key={index}
                    market={getMarketInfo(event)}
                    event={event}
                    seller={seller}
                  />
                )
            )}
          </Col>
          <Col xs={12} sm={{ span: 6, offset: 6 }}>
            <Button
              as={Link}
              to={`/events/${event.id}`}
              variant="secondary"
              size="lg"
              className="w-100"
            >
              Lisää tuotteita
            </Button>
          </Col>
        </Row>
      )}
    </>
  )
}

export default CartEvent
