import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import { useFormikContext, Formik, Form } from "formik"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import FormSellerDetails from "./FormSellerDetails"
import FormSellerAreas from "./FormSellerAreas"
//import FormSellerSettings from "./FormSellerSettings"
import { isEqual } from "lodash"

// validation for url
const re =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g

/* const re =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/gm */
// Yup
const SellerSchema = Yup.object().shape({
  name: Yup.string().max(25, "Maksimipituus 50 kirjainta"),
  firstname: Yup.string()
    .max(25, "Maksimipituus 25 kirjainta")
    .required("Etunimi edellytetään"),
  lastname: Yup.string()
    .max(25, "Maksimipituus 25 kirjainta")
    .required("Sukunimi edellytetään"),
  phonenumber: Yup.string()
    .min(6, "Minimipituus 6 numeroa")
    .max(14, "Maksimipituus 14 numeroa"),
  email: Yup.string()
    .email("Virheellinen sähköposti")
    .required("Sähköposti edellytetään"),
  address: Yup.string().max(40, "Maksimipituus 40 merkkiä"),
  zipcode: Yup.string().max(7, "Maksimipituus 7 merkkiä"),
  city: Yup.string().max(30, "Maksimipituus 30 merkkiä"),
  business_id: Yup.string().max(14, "Maksimipituus 14 numeroa"),
  homepage: Yup.string()
    .min(5, "Minimipituus 5 merkkiä")
    .max(50, "Maksimipituus 50 merkkiä")
    .matches(re, "Täytyy olla URL-osoite"),
  description: Yup.string().max(1200, "Maksimipituus 1200 merkkiä"),
  reko_areas: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      name: Yup.string(),
      belongs: Yup.boolean(),
    })
  ),
  //salesreport_check: Yup.boolean(),
})

// check which value has been changed
// by comparing each value to the saved value
// (change empty string to null)
const updateUser = (user, values) => {
  let changedValues = {}

  Object.keys(values).forEach((valueKey) => {
    if (!Object.keys(user).includes(valueKey) && values[valueKey]) {
      changedValues[valueKey] = values[valueKey]
    } else if (Object.keys(user).includes(valueKey) && !values[valueKey]) {
      changedValues[valueKey] = null
    } else {
      Object.keys(user).forEach((userKey) => {
        if (userKey === valueKey) {
          if (!values[valueKey]) {
            changedValues[valueKey] = null
          } else {
            changedValues[valueKey] = values[valueKey]
          }
        }
      })
    }
  })

  return { ...user, ...changedValues }
}

const AutoSubmitForm = ({ user, seller }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()
  const [changes, setChanges] = useState(false)

  useEffect(() => {
    // check if user info has been changed
    const checkForChanges = async () => {
      const userProfile = updateUser(user, values)

      try {
        const noChange = await isEqual(user, userProfile)
        noChange ? setChanges(false) : setChanges(true)
      } catch (err) {
        // if lodash fails, set changes to true just in case
        setChanges(true)
      }
    }

    // check for when the first change will take place
    // the form will be submitted when component unmounts
    // and all changes will be saved
    user && changes === false && checkForChanges()
  }, [changes, user, values])

  // submit form on component unmount
  useEffect(() => {
    //console.log("NO CHANGE: ", seller, changes)
    return () => {
      seller && changes && submitForm() && setChanges(false)
    }
  }, [seller, changes, submitForm])

  return null
}

const FormSeller = ({ user, seller, handleUpdateProfile }) => (
  <Col xs={12} sm={{ span: 10, offset: 1 }} md={{ span: 6, offset: 1 }}>
    <Formik
      initialValues={{
        name: user.name || "",
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        phonenumber: user.phonenumber || "",
        email: user.email || "",
        address: user.address || "",
        zipcode: user.zipcode || "",
        city: user.city || "",
        business_id: user.business_id || "",
        homepage: user.homepage || "",
        description: user.description || "",
        reko_areas: user.reko_areas,
        regions: user.regions,
        //salesreport_check: user.salesreport_check || false,
      }}
      enableReinitialize={true}
      validationSchema={SellerSchema}
      onSubmit={(values) => {
        // update user info
        handleUpdateProfile(updateUser(user, values))
      }}
    >
      {({ values }) => (
        <Form>
          <Row>
            <FormSellerDetails />
            <FormSellerAreas values={values} />
            {/*<Col xs={12} className="text-center mb-1">
              <p>
                Puuttuko ryhmä listalta?
                <Button
                  as={Link}
                  to="/contact"
                  variant="link"
                  size="lg"
                  className="px-1 pt-1"
                >
                  Ota yhteyttä
                </Button>
              </p>
            </Col>*/}
            <Col xs={12} className="mb-3">
              <Button type="submit" variant="success" size="lg" className="w-100">
                Tallenna muutokset
              </Button>
            </Col>
            {/*<FormSellerSettings />*/}
          </Row>
          <AutoSubmitForm user={user} seller={seller} />
        </Form>
      )}
    </Formik>
  </Col>
)

export default FormSeller
