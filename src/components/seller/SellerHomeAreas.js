import React, { useEffect, useState } from "react"
import { useFormikContext, Formik, Form /*, Field*/ } from "formik"
import * as Yup from "yup"
import { Link } from "react-router-dom"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Button from "react-bootstrap/Button"
import FormSellerAreas from "../profiles/FormSellerAreas"
//import FormFieldCheckbox from "../FormFieldCheckbox"
import { isEqual } from "lodash"

// Yup
const AreasSchema = Yup.object().shape({
  reko_areas: Yup.array().of(
    Yup.object().shape({
      id: Yup.number(),
      name: Yup.string(),
      belongs: Yup.boolean(),
    })
  ),
  //reko_areas_nil: Yup.boolean(),
  regions_nil: Yup.boolean(),
})

// clear area selection
const clearAreas = (areas) =>
  areas.map((area) => {
    if (area.belongs === null) {
      area.belongs = false
    }
    return area.belongs === true ? { ...area, belongs: false } : area
  })

const AutoSubmitForm = ({ user }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()
  const [changes, setChanges] = useState(false)

  useEffect(() => {
    // clear areas if user selects no areas option
    // if (values.reko_areas_nil === true) {
    //   values.reko_areas = clearAreas(values.reko_areas)
    // }
    if (values.regions_nil === true) {
      values.regions = clearAreas(values.regions)
    }
    // check if user areas have changed
    const checkForChanges = async () => {
      try {
        const noChange = await isEqual(user.regions, values.regions) //reko_areas -> regions
        noChange ? setChanges(false) : setChanges(true)
      } catch (err) {
        // if lodash fails, set changes to true just in case
        setChanges(true)
      }
    }

    // check for when the first change will take place
    // the form will be submitted when component unmounts
    // and all changes will be saved
    changes === false && checkForChanges()
  }, [changes, user, values])

  // if there are changes, submit form on component unmount
  useEffect(() => {
    return () => {
      changes && submitForm() && setChanges(false)
    }
  }, [changes, submitForm])

  return null
}

const SellerHomeAreas = ({ user, handleUpdateUserInfo }) => (
  <Col xs={12} sm={{ span: 10, offset: 1 }}>
    <Formik
      initialValues={{
        // reko_areas: user.reko_areas,
        // reko_areas_nil: false,
        regions: user.regions,
        regions_nil: false,
      }}
      validationSchema={AreasSchema}
      onSubmit={(values) => {
        // if no areas option is selected
        // clear all user areas on submit
        // else submit selected
        // if (values.reko_areas_nil === true) {
        //   handleUpdateUserInfo({ ...user, reko_areas: clearAreas(values.reko_areas) })
        // } else {
        //   handleUpdateUserInfo({ ...user, reko_areas: values.reko_areas })
        // }
        if (values.regions_nil === true) {
          //console.log("values.r first: ", values.regions)
          handleUpdateUserInfo({ ...user, regions: clearAreas(values.regions) })
        } else {
          //console.log("values.r: ", values.regions)
          handleUpdateUserInfo({ ...user, regions: values.regions })
        }
      }}
    >
      {({ values }) => (
        <Form>
          <Row>
            <FormSellerAreas values={values} />
            {/* <Col className="mb-1">
              <Field
                name="reko_areas_nil"
                id="user-areas-nil"
                label="En kuulu yhteenkään Facebookin Reko-ryhmään tuottajana"
                component={FormFieldCheckbox}
              />
            </Col> */}
            {values.reko_areas_nil === true && (
              <Col xs={12} className="mb-1">
                <a
                  href="https://satoja.fi/dokumentit/kuinka-liittya-tuottajana-facebookin-reko-ryhmaan.html"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button variant="link">
                    Lue lisää: Kuinka liittyä Reko-ryhmiin tuottajana
                  </Button>
                </a>
              </Col>
            )}
            {values.reko_areas_nil === false && (
              <Col xs={12}>
                <p style={{ fontSize: "1em" }}>
                  Puuttuko ryhmä listalta?
                  <Button as={Link} to="/contact" variant="link" className="px-1 pt-1">
                    Ota yhteyttä
                  </Button>
                </p>
              </Col>
            )}
          </Row>
          <AutoSubmitForm user={user} />
        </Form>
      )}
    </Formik>
  </Col>
)

export default SellerHomeAreas
