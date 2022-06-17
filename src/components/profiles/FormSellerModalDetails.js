import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import FormFieldText from "../FormFieldText"
import FormFieldUrl from "../FormFieldUrl"
import FormFieldTextArea from "../FormFieldTextArea"
import FormErrorMessage from "../FormErrorMessage"

const FormSellerModalDetails = () => (
  <Col xs={12} className="mb-5">
    <Field
      name="company"
      id="user-company-name"
      label="Yrityksen / Tilan nimi*"
      component={FormFieldText}
    />
    <ErrorMessage name="company" component={FormErrorMessage} />
    <Field
      name="address"
      id="user-address"
      label="Katuosoite*"
      component={FormFieldText}
    />
    <ErrorMessage name="address" component={FormErrorMessage} />
    <Field
      name="zipCode"
      id="user-zip-code"
      label="Postinumero*"
      component={FormFieldText}
    />
    <ErrorMessage name="zipCode" component={FormErrorMessage} />
    <Field
      name="municipality"
      id="user-municipality"
      label="Kunta*"
      component={FormFieldText}
    />
    <ErrorMessage name="municipality" component={FormErrorMessage} />
    <Field
      name="businessId"
      id="user-business-id"
      label="Y-tunnus"
      component={FormFieldText}
    />
    <ErrorMessage name="businessId" component={FormErrorMessage} />
    <Field
      name="businessUrl"
      id="user-business-url"
      label="www-sivut"
      component={FormFieldUrl}
    />
    <ErrorMessage name="businessUrl" component={FormErrorMessage} />
    <Field
      name="businessInfo"
      id="user-business-info"
      label="Oma esittely..."
      component={FormFieldTextArea}
    />
    <ErrorMessage name="businessInfo" component={FormErrorMessage} />
  </Col>
)

export default FormSellerModalDetails
