import { Field, ErrorMessage } from "formik"
import Form from "react-bootstrap/Form"
import FormFieldText from "../FormFieldText"
import FormFieldEmail from "../FormFieldEmail"
import FormFieldPassword from "../FormFieldPassword"
import FormErrorMessage from "../FormErrorMessage"

const SignUpFormFields = ({ facebookSignUp }) => (
  <>
    <Field
      name="firstname"
      id="sign-up-name"
      label="Etunimi*"
      component={FormFieldText}
    />
    <ErrorMessage name="firstname" component={FormErrorMessage} />
    <Field
      name="lastname"
      id="sign-up-surname"
      label="Sukunimi*"
      component={FormFieldText}
    />
    <ErrorMessage name="lastname" component={FormErrorMessage} />
    <Field
      name="email"
      id="sign-up-email"
      label="Sähköposti*"
      component={FormFieldEmail}
    />
    <ErrorMessage name="email" component={FormErrorMessage} />
    <Field
      name="phonenumber"
      id="sign-up-phone"
      label="Puhelinnumero"
      component={FormFieldText}
    />
    <ErrorMessage name="phonenumber" component={FormErrorMessage} />
    <Form.Text className="mb-2 pl-1 text-muted">
      Numeron näkee ainoastaan myyjä, jolta varaat tuotteet.
    </Form.Text>
    {facebookSignUp === false && (
      <>
        <Field
          name="password"
          id="sign-up-password"
          label="Salasana*"
          component={FormFieldPassword}
        />
        <ErrorMessage name="password" component={FormErrorMessage} />
      </>
    )}
  </>
)

export default SignUpFormFields
