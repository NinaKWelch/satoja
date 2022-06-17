import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldText from "../FormFieldText"
import FormFieldPhone from "../FormFieldPhone"
import FormFieldEmail from "../FormFieldEmail"
import FormFieldUrl from "../FormFieldUrl"
import FormFieldTextArea from "../FormFieldTextArea"
import FormErrorMessage from "../FormErrorMessage"

const FormSellerDetails = () => (
  <Col xs={12} className="mb-4">
    <Field
      name="name"
      id="user-business-name"
      label="Yrityksen / Tilan nimi"
      component={FormFieldText}
    />
    <ErrorMessage name="name" component={FormErrorMessage} />
    <Field
      name="firstname"
      id="user-firstname"
      label="Etunimi*"
      component={FormFieldText}
    />
    <ErrorMessage name="firstname" component={FormErrorMessage} />
    <Field
      name="lastname"
      id="user-lastname"
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
    <Field
      name="address"
      id="user-address"
      label="Katuosoite"
      component={FormFieldText}
    />
    <ErrorMessage name="address" component={FormErrorMessage} />
    <Field
      name="zipcode"
      id="user-zipcode"
      label="Postinumero"
      component={FormFieldText}
    />
    <ErrorMessage name="zipcode" component={FormErrorMessage} />
    <Field name="city" id="user-city" label="Kunta" component={FormFieldText} />
    <ErrorMessage name="city" component={FormErrorMessage} />
    <Field
      name="business_id"
      id="user-business-id"
      label="Y-tunnus"
      component={FormFieldText}
    />
    <ErrorMessage name="business_id" component={FormErrorMessage} />
    <Field
      name="homepage"
      id="user-homepage"
      label="www-sivut"
      component={FormFieldUrl}
    />
    <ErrorMessage name="homepage" component={FormErrorMessage} />
    <Field
      name="description"
      id="user-description"
      label="Oma esittely..."
      rows="3"
      component={FormFieldTextArea}
    />
    <ErrorMessage name="description" component={FormErrorMessage} />
  </Col>
)

export default FormSellerDetails
