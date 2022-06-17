import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import SectionACenter from "./SectionACenter"

const BuyOrSellPage = () => {
  return (
    <Container xs={12} className="vh-100 home-section-a" fluid>
      <Row className="h-100 justify-content-md-center align-items-end">
        <SectionACenter />
      </Row>
    </Container>
  )
}

export default BuyOrSellPage
