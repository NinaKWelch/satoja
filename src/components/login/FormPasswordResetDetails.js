import { Field, ErrorMessage } from "formik"
//import FormFieldText from "../FormFieldText"
import FormErrorMessage from "../FormErrorMessage"
import FormFieldPassword from "../FormFieldPassword"
const FormPasswordResetDetails = () => (
  <>
    {/* <Field name="email" id="email" label="Sähköposti" component={FormFieldText} /> */}
    {/* <ErrorMessage name="email" component={FormErrorMessage} /> */}
    <Field
      name="password"
      id="user-password"
      label="Uusi salasana"
      component={FormFieldPassword}
    />
    <ErrorMessage name="password" component={FormErrorMessage} />
  </>
)

export default FormPasswordResetDetails
