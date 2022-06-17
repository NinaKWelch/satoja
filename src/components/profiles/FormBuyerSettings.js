import { Field } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldCheckbox from "../FormFieldCheckbox"

const FormBuyerSettings = () => (
  <Col xs={{ span: 10, offset: 1 }}>
    <h5 className="mb-4 text-center">Sähköpostiasetukset</h5>
    <Field
      name="newsletter_check"
      id="user-newsletter"
      label="Uutiskirje (max. 1 per viikko)"
      component={FormFieldCheckbox}
    />
    <Field
      name="cancel_notification_check"
      id="user-cancel-notification"
      label="Muistutus tulevasta noutotilaisuudesta"
      component={FormFieldCheckbox}
    />
  </Col>
)

export default FormBuyerSettings
