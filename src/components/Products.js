import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import productService from "../services/products"
import { /*products,*/ setProducts } from "../reducers/products"
import { handleMissingImage } from "../helpers/imageErrorHelper"
import Card from "react-bootstrap/Card"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Nav from "react-bootstrap/Nav"
import Accordion from "react-bootstrap/Accordion"
import TemplatePageLoading from "./TemplatePageLoading"
const Products = ({ user }) => {
  const [productsei, setProductsei] = useState(null)
  const [loading, setLoading] = useState(false)
  const id = user.id

  const dispatch = useDispatch()

  //when user has own products
  useEffect(() => {
    setLoading(true)
    async function fetchData() {
      const productsii = await productService.getSellerProducts(id)
      // filter out the products that have had their price modified
      if (productsii && productsii.status !== 500) {
        const originalPricesArray = productsii.filter((p) => p.price_modified === false)
        originalPricesArray.length > 0 && setProductsei(originalPricesArray) && dispatch(setProducts(productsei))
        setLoading(false)
      } else {
        setLoading(false)
      }
    }
  
    !productsei && fetchData()
  }, [id])

  const renderProducts = (product, index) => {
    return (
      <Accordion className="mb-2 " key={index}>
        <Accordion.Toggle as={Button} className="p-0" variant="text" eventKey="0">
          <Card>
            <Row className="align-items-center">
              <Col xs={4}>
                {/* fallbacks added for missing or broken image link */}
                <Card.Img
                  src={
                    product.image_url
                      ? `https://res.cloudinary.com/dpk81nwou/image/upload/w_600,ar_1:1,c_fill,g_auto/${product.image_url}`
                      : handleMissingImage(product.category)
                  }
                  onError={(e) =>
                    e.target.src !== handleMissingImage(product.category)
                      ? (e.target.src = handleMissingImage(product.category))
                      : ""
                  }
                  alt="tuotekuva"
                />
              </Col>
              <Col xs={8} className="pl-0">
                <Card.Title className="fs-3">{product.name}</Card.Title>
              </Col>
            </Row>
            <Accordion.Collapse eventKey="0">
              <Card.Body className="text-left">
                {/*<Card.Text className="mb-1">{product.description}</Card.Text>*/}
                <Card.Text className="mb-1">
                  Luomua: {product.organic ? "kyllä" : "ei"}
                </Card.Text>
                {/* count all the quantities of all sizes of the product together. */}
                <Card.Text className="mb-1">
                  Varastossa: {product.sizes.reduce((a, v) => (a = a + v.quantity), 0)}
                </Card.Text>
                <Card.Text className="mb-1">
                  Toimitusta odottavat tilaukset:{" "}
                  {product.sizes.reduce((a, v) => (a = a + v.reserved_quantity), 0)}
                </Card.Text>
                <Card.Text className="mb-4">
                  Hinta{" "}
                  {parseFloat(product.unit_price).toFixed(2).toString().replace(".", ",")}
                  € / {product.type}{" "}
                </Card.Text>
                <Nav>
                  <Button
                    as={Link}
                    to={`/update/${product.id}`}
                    variant="outline-success"
                    size="lg"
                    className="w-100"
                  >
                    Muokkaa ilmoitusta
                  </Button>
                </Nav>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion.Toggle>
      </Accordion>
    )
  }
  return (
    <Row className="g-2 pt-3">
      {loading ? (
        <TemplatePageLoading />
      ) : (
        <Col
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
      >
        {productsei && productsei.length > 0 ? productsei.map(renderProducts) : (
          <div className="text-center">
            <p>Et ole lisännyt yhtään tuotetta.</p>
          </div>
        )}
      </Col>
      )}
      
    </Row>
  )
}

export default Products
