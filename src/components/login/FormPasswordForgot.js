import * as Yup from "yup"
import { Formik, Form } from "formik"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormPasswordResetDetails from "./FormPasswordForgotDetails"

// Yup

const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti edellytetään"),
})

const FormPasswordForgot = ({ handleChangePassword }) => (
  <Row className="g-0">
    <Col xs={12}>
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={ResetSchema}
        onSubmit={(values) => {
          handleChangePassword(values.email)
        }}
      >
        {() => (
          <Form>
            <FormPasswordResetDetails />
            <Button type="submit" variant="success" size="lg" className="w-100">
              Lähetä
            </Button>
          </Form>
        )}
      </Formik>
    </Col>
  </Row>
)

export default FormPasswordForgot
