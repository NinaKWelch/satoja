import { Field, ErrorMessage } from "formik"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormFieldCheckboxInline from "../FormFieldCheckboxInline"
import FormErrorMessage from "../FormErrorMessage"

const FormSignUpTerms = () => (
  <Col xs={12} className="pl-0 mb-2">
    <Field
      name="terms_ok"
      id="user-terms"
      label="Hyväksyn"
      component={FormFieldCheckboxInline}
    />
    <a
      href="https://satoja.fi/dokumentit/sopimusehdot.html"
      target="_blank"
      rel="noreferrer"
    >
      <Button variant="link" className="px-0 py-1">
        sopimusehdot
      </Button>
    </a>
    <ErrorMessage name="terms_ok" component={FormErrorMessage} />
  </Col>
)

export default FormSignUpTerms
