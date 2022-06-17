import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { useFormikContext, Formik, Form } from "formik"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import FormBuyerDetails from "./FormBuyerDetails"
//import FormBuyerSettings from "./FormBuyerSettings"
import { isEqual } from "lodash"

// Yup
const BuyerSchema = Yup.object().shape({
  firstname: Yup.string()
    .max(20, "Maksimipituus 20 kirjainta")
    .required("Etunimi edellytetään"),
  lastname: Yup.string()
    .max(20, "Maksimipituus 20 kirjainta")
    .required("Sukunimi edellytetään"),
  phonenumber: Yup.string()
    .min(6, "Minimipituus 6 numeroa")
    .max(14, "Maksimipituus 14 numeroa"),
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti edellytetään"),
  newsletter: Yup.boolean(),
  notification: Yup.boolean(),
})

const AutoSubmitForm = ({ user, buyer }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()
  const [changes, setChanges] = useState(false)
  //const [changesBuyer, setChangesBuyer] = useState(false)

  useEffect(() => {
    // check if basic user info has been changed
    const checkForChanges = () => {
      //console.log("check")
      const formFields = {
        firstname: values.firstname,
        lastname: values.lastname,
        phonenumber: values.phonenumber || null,
        email: values.email,
      }
      // const buyerFormFields = {
      //   newsletter_check: values.newsletter_check || false,
      //   cancel_notification_check: values.cancel_notification_check || false,
      // }
      const userFields = {
        firstname: user.firstname,
        lastname: user.lastname,
        phonenumber: user.phonenumber || null,
        email: user.email,
      }
      // const buyerFields = {
      //   newsletter_check: buyer.newsletter_check || false,
      //   cancel_notification_check: buyer.cancel_notification_check || false,
      // }

      try {
        const noChangeUserFields = isEqual(userFields, formFields)
        // const noChangeBuyerFields = isEqual(buyerFields, buyerFormFields)
        noChangeUserFields ? setChanges(false) : setChanges(true)
        //noChangeBuyerFields ? setChangesBuyer(false) : setChangesBuyer(true)
        //console.log("noChangeBuyerFields :", noChangeBuyerFields)
      } catch (err) {
        // if lodash fails, set changes to true just in case
        setChanges(true)
      }
    }
    // console.log("values: ", values)
    // check for when the first change will take place
    // the form will be submitted when component unmounts
    // and all changes will be saved

    user && changes === false && checkForChanges()
  }, [changes, user, buyer, values])

  // if there are changes, submit form on component unmount
  useEffect(() => {
    return () => {
      changes && submitForm() && setChanges(false)
    }
  }, [changes, submitForm])

  return null
}

const FormBuyer = ({ user, buyer, handleUpdateProfile }) => (
  <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 1 }}>
    <Formik
      initialValues={{
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phonenumber: user.phonenumber || "",
        email: user.email || "",
        newsletter_check: buyer.newsletter_check || false,
        cancel_notification_check: buyer.cancel_notification_check || false,
      }}
      enableReinitialize={true}
      validationSchema={BuyerSchema}
      onSubmit={(values) => {
        // check which value has been changed
        // by comparing each value to the saved value
        const updatedUser = () => {
          let changedValues = {}
          //console.log("user")

          Object.keys(values).forEach((valueKey) => {
            Object.keys(user).forEach((userKey) => {
              if (userKey === valueKey && user[userKey] !== values[valueKey]) {
                changedValues[valueKey] = values[valueKey]
              }
            })
          })
          // console.log("changedvalues ", changedValues)
          return { ...user, ...changedValues }
        }

        /*
        const updatedBuyer = () => {
          let changedValues2 = {}

          Object.keys(values).forEach((valueKey) => {
            Object.keys(buyer).forEach((buyerKey) => {
              if (buyerKey === valueKey && user[buyerKey] !== values[valueKey]) {
                changedValues2[valueKey] = values[valueKey]
              }
            })
          })
          //console.log("changedvalues2 ", changedValues2)
          return { ...buyer, ...changedValues2 }
        }
        */

        // update user info
        handleUpdateProfile(updatedUser())
      }}
    >
      {() => (
        <Form>
          <Row>
            <FormBuyerDetails />
            <Col xs={12} className="mb-2">
              <Button type="submit" variant="success" size="lg" className="w-100">
                Tallenna muutokset
              </Button>
            </Col>
            {/*<FormBuyerSettings />*/}
          </Row>
          <AutoSubmitForm user={user} buyer={buyer} />
        </Form>
      )}
    </Formik>
  </Col>
)

export default FormBuyer
