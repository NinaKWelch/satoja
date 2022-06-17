import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import HomePageBusiness from "./HomePageBusiness"
import HomePageSocial from "./HomePageSocial"
//import HomePageBrand from "./HomePageBrand"

const HomePageFooter = () => (
  <Row as="footer" className="bg-dark align-items-center">
    <Col xs={12} md={{ span: 6, order: "last" }} className="py-4">
      <HomePageSocial />
    </Col>
    <Col xs={12} md={{ span: 3, order: "first" }} className="py-4">
      <HomePageBusiness />
    </Col>
    <Col xs={12} md={3} className="text-end pb-4">
      <a href="/#home">Vie takaisin ylös</a>
    </Col>
    {/*<Col xs={12} md={4} className="py-5">
      <HomePageBrand />
    </Col>*/}
  </Row>
)

export default HomePageFooter
