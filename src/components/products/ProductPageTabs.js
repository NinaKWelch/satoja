import Col from "react-bootstrap/Col"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import ProductPageInfo from "./ProductPageInfo"
import ProductPageInfoSeller from "./ProductPageInfoSeller"

const ProductPageTabs = ({ product }) => (
  <Col
    xs={{ span: 10, offset: 1 }}
    sm={{ span: 8, offset: 2 }}
    md={{ span: 10, offset: 1 }}
    className="mb-3"
  >
    <Tabs
      defaultActiveKey="product-description"
      transition={false}
      id="product-info"
      fill
    >
      <Tab eventKey="product-description" title="Tuotekuvaus">
        <ProductPageInfo product={product} />
      </Tab>
      <Tab eventKey="product-seller" title="Tuottaja">
        <ProductPageInfoSeller seller={product.seller} />
      </Tab>
    </Tabs>
  </Col>
)

export default ProductPageTabs
