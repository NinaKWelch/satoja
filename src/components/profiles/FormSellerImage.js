import { useEffect } from "react"
import * as Yup from "yup"
import { useFormikContext, Formik, Form, Field, ErrorMessage } from "formik"
import AddImageModal from "../AddImageModal"
import FormFieldImageFile from "../FormFieldImageFile"
import FormErrorMessage from "../FormErrorMessage"

// Yup
const ImageSchema = Yup.object().shape({
  sellers_image_url: Yup.string(),
})

const AutoSubmitFrom = ({ handleClose }) => {
  // get values and submitForm from context
  const { values, submitForm } = useFormikContext()

  useEffect(() => {
    // submit the form imperatively as soon as value change
    if (values.sellers_image_url !== "") {
      submitForm()
      handleClose()
    }
  }, [values, submitForm, handleClose])

  return null
}

const FormSellerImage = ({ show, loading, handleChangeImage, handleClose }) => (
  <Formik
    initialValues={{
      sellers_image_url: "",
    }}
    validationSchema={ImageSchema}
    onSubmit={({ resetForm }) => {
      resetForm()
    }}
  >
    {() => (
      <Form>
        <AddImageModal show={show} loading={loading} handleClose={handleClose}>
          <Field
            name="sellers_image_url"
            id="user-image-seller"
            label="Lisää kuvatiedosto"
            handleChangeImage={handleChangeImage}
            component={FormFieldImageFile}
          />
          <ErrorMessage name="sellers_image_url" component={FormErrorMessage} />
        </AddImageModal>
        <AutoSubmitFrom handleClose={handleClose} />
      </Form>
    )}
  </Formik>
)

export default FormSellerImage
