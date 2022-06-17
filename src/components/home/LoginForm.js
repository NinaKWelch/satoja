import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormFieldEmail from "../FormFieldEmail"
import FormFieldPassword from "../FormFieldPassword"
import FormErrorMessage from "../FormErrorMessage"

// Yup
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti edellytetään"),
  password: Yup.string().required("Salasana edellytetään"),
})

const LoginForm = ({ handleSignUp, handleCheckCredentials, handleGetNewPassword }) => (
  <Row>
    <Col xs={12}>
      {/*<div className="text-center">
        <h4>Tai sähköpostilla:</h4>
      </div>*/}
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          const credentials = {
            email: values.email,
            password: values.password,
          }

          handleCheckCredentials(credentials)
        }}
      >
        {() => (
          <Form>
            <Field
              name="email"
              id="login-email"
              label="Sähköposti*"
              component={FormFieldEmail}
            />
            <ErrorMessage name="email" component={FormErrorMessage} />
            <Field
              name="password"
              id="login-password"
              label="Salasana*"
              component={FormFieldPassword}
            />
            <ErrorMessage name="password" component={FormErrorMessage} />
            <Button
              type="button"
              variant="link"
              className="w-100 mb-2"
              id="password-reset-button"
              onClick={() => handleGetNewPassword()}
            >
              Unohtuiko salasana?
            </Button>
            <Button
              type="submit"
              variant="success"
              size="lg"
              className="w-100 mb-2"
              id="login-button"
            >
              Kirjaudu
            </Button>
            <div className="pt-3 text-center">
              <h4>Uusi asiakas? Rekisteröidy alla</h4>
            </div>
            <Button
              type="button"
              variant="outline-success"
              size="lg"
              className="w-100 mb-2"
              id="signup-button"
              onClick={handleSignUp}
            >
              Rekisteröidy
            </Button>
          </Form>
        )}
      </Formik>
    </Col>
  </Row>
)

export default LoginForm
