import * as Yup from "yup"
import { Formik, Form } from "formik"
import Row from "react-bootstrap/Row"
import FormSellerModalDetails from "./FormSellerModalDetails"

// Yup
const SellerSchema = Yup.object().shape({
  company: Yup.string().required(),
  address: Yup.string().required(),
  zipCode: Yup.string().required(),
  municipality: Yup.string().required(),
  businessId: Yup.string(),
  businessUrl: Yup.string().url(),
  businessInfo: Yup.string(),
})

const FormSellerModal = () => (
  <Formik
    initialValues={{
      company: "",
      address: "",
      zipCode: "",
      municipality: "",
      businessId: "",
      businessUrl: "",
      businessInfo: "",
    }}
    validationSchema={SellerSchema}
    onSubmit={console.log}
  >
    {() => (
      <Form>
        <Row>
          <FormSellerModalDetails />
        </Row>
      </Form>
    )}
  </Formik>
)

export default FormSellerModal
