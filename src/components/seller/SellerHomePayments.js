import React, { useEffect } from "react"
import { useFormikContext, Formik, Form } from "formik"
import * as Yup from "yup"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import FormSellerPayments from "../profiles/FormSellerPayments"
import { isEqual } from "lodash"

// Yup
const PaymentSchema = Yup.object().shape({
  payment_options: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      name: Yup.string(),
      selected: Yup.boolean(),
    })
  ),
})

const AutoSubmitForm = ({ options }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()

  useEffect(() => {
    const checkForChanges = async () => {
      // submit form if payment options have changed
      const noChange = await isEqual(options, values.payment_options)

      noChange === false && submitForm()
    }

    checkForChanges()
  }, [options, values, submitForm])

  return null
}

const SellerHomePayments = ({ user, options, handleUpdatePayments }) => (
  <Col xs={12} sm={{ span: 10, offset: 1 }}>
    <Formik
      initialValues={{
        payment_options: options,
      }}
      validationSchema={PaymentSchema}
      onSubmit={(values) => {
        // submit selected options
        handleUpdatePayments(user.id, values.payment_options)
      }}
    >
      {({ values }) => (
        <Form>
          <Row>
            <FormSellerPayments values={values} />
          </Row>
          <AutoSubmitForm options={options} />
        </Form>
      )}
    </Formik>
  </Col>
)

export default SellerHomePayments
