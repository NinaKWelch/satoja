import { Field, ErrorMessage } from "formik"
import FormFieldText from "../FormFieldText"
import FormFieldEmail from "../FormFieldEmail"
import FormFieldPassword from "../FormFieldPassword"
import FormErrorMessage from "../FormErrorMessage"

const FormUserDetails = ({ facebookUser }) => (
  <>
    <Field name="firstname" id="user-name" label="Etunimi*" component={FormFieldText} />
    <ErrorMessage name="firstname" component={FormErrorMessage} />
    <Field
      name="lastname"
      id="user-surname"
      label="Sukunimi*"
      component={FormFieldText}
    />
    <ErrorMessage name="lastname" component={FormErrorMessage} />
    <Field name="email" id="user-email" label="Sähköposti*" component={FormFieldEmail} />
    <ErrorMessage name="email" component={FormErrorMessage} />
    <Field
      name="phonenumber"
      id="user-phone"
      label="Puhelinnumero"
      component={FormFieldText}
    />
    <ErrorMessage name="phonenumber" component={FormErrorMessage} />
    {facebookUser === false && (
      <>
        <Field
          name="password"
          id="user-password"
          label="Salasana*"
          component={FormFieldPassword}
        />
        <ErrorMessage name="password" component={FormErrorMessage} />
      </>
    )}
  </>
)

export default FormUserDetails
