import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import TemplatePage from "./TemplatePage"
import SEO from "./home/SEO"
import ContactForm from "./ContactForm"

const ContactPage = ({ user }) => (
  <TemplatePage pageHeader="Ota yhteyttä" pageColor="bg-basic">
    <Row className="pt-4">
      <SEO title="Ota yhteyttä" description="Lähetä meille kysymuyksiä tai palautetta." />
      <Col
        xs={12}
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
        className="text-center"
      >
        <p>
          Lähetä viesti tai soita numeroon{" "}
          <span itemProp="telephone">
            <a href="tel:+358452094027">0452094027</a>
          </span>
          .
        </p>
        <ContactForm user={user ? user : {}} />
      </Col>
    </Row>
  </TemplatePage>
)

export default ContactPage
