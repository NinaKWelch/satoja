import * as Yup from "yup"
import { Formik, Form } from "formik"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Button from "react-bootstrap/Button"
import FormPasswordResetDetails from "./FormPasswordResetDetails"
// Yup
const ResetSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Salasanan minimipituus on 8 merkkiä")
    .required("Salasana edellytetään"),
})

const FormPasswordReset = ({ handleChangePassword }) => (
  <Row className="g-0">
    <Col xs={12}>
      <Formik
        initialValues={{
          password: "",
        }}
        validationSchema={ResetSchema}
        onSubmit={(values) => {
          handleChangePassword(values.password)
        }}
      >
        {() => (
          <Form>
            <FormPasswordResetDetails />
            <Button type="submit" variant="success" size="lg" className="w-100">
              Vaihda salasana
            </Button>
          </Form>
        )}
      </Formik>
    </Col>
  </Row>
)

export default FormPasswordReset
