import { Field, ErrorMessage } from "formik"
import FormFieldText from "../FormFieldText"
import FormErrorMessage from "../FormErrorMessage"

const FormPasswordResetDetails = () => (
  <>
    <Field name="email" id="email" label="Sähköposti" component={FormFieldText} />
    <ErrorMessage name="email" component={FormErrorMessage} />
  </>
)

export default FormPasswordResetDetails
