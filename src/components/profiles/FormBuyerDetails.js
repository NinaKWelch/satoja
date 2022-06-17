import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldText from "../FormFieldText"
import FormFieldPhone from "../FormFieldPhone"
import FormFieldEmail from "../FormFieldEmail"
import FormErrorMessage from "../FormErrorMessage"

const FormBuyerDetails = () => (
  <Col xs={12} className="mb-2">
    <Field name="firstname" id="user-name" label="Etunimi*" component={FormFieldText} />
    <ErrorMessage name="firstname" component={FormErrorMessage} />
    <Field
      name="lastname"
      id="user-surname"
      label="Sukunimi*"
      component={FormFieldText}
    />
    <ErrorMessage name="lastname" component={FormErrorMessage} />
    <Field
      name="phonenumber"
      id="user-phone"
      label="Puhelinnumero"
      component={FormFieldPhone}
    />
    <ErrorMessage name="phonenumber" component={FormErrorMessage} />
    <Field
      name="email"
      id="user-email"
      label="Sähköposti*"
      component={FormFieldEmail}
      disabled={true}
    />
    <ErrorMessage name="email" component={FormErrorMessage} />
  </Col>
)

export default FormBuyerDetails
