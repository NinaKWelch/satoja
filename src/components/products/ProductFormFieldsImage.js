import React, { useState } from "react"
import { useSelector } from "react-redux"
import { Field, ErrorMessage } from "formik"
import imageService from "../../services/images"
import { getUserFolder } from "../../helpers/imageUploadHelper"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import FormErrorMessage from "../FormErrorMessage"
import AddImageModal from "../AddImageModal"
import FormFieldImageFile from "../FormFieldImageFile"

const ProductFormFieldsImage = ({ values, setFieldValue }) => {
  const [show, setShow] = useState(false)
  const [error, setError] = useState(false)
  const [loading, setLoading] = useState(false)

  const folder = useSelector(({ authedUser }) => getUserFolder(authedUser.email))

  // when image upload was successfull
  // set field value and close modal
  const handleSetFieldValue = (value) => {
    setFieldValue("image_url", value)
    setLoading(false)
    setShow(false)
  }

  const handleImageUrlError = () => setFieldValue("image_url", "")

  // upload image to Cloudinary
  const changeImage = async (file) => {
    // remove error message for new uplaod
    setError(false)
    // display loading icon during upload
    setLoading(true)

    // upload image to user's image folder
    const response = await imageService.addImage(file, folder)

    // check if image upload was successful
    if (response.status === 200) {
      handleSetFieldValue(response.data.public_id)
    } else {
      setLoading(false)
      // display an error message on failed upload
      setError(true)
    }
  }

  return (
    <>
      <AddImageModal
        show={show}
        loading={loading}
        error={error}
        handleClose={() => setShow(false)}
      >
        <Field
          name="image_url"
          id="product-image"
          label="Lisää kuvatiedosto"
          handleChangeImage={changeImage}
          component={FormFieldImageFile}
        />
        <ErrorMessage name="image_url" component={FormErrorMessage} />
      </AddImageModal>
      {values.image_url && (
        <Card className="mb-2">
          {/* fallback added for broken image link */}
          <Card.Img
            src={`https://res.cloudinary.com/dpk81nwou/image/upload/w_800/${values.image_url}`}
            onError={() => handleImageUrlError()}
            alt="Tuotekuva"
          />
        </Card>
      )}
      {values.image_url ? (
        <Button
          variant="secondary"
          size="lg"
          className="mb-2 w-100"
          onClick={() => setShow(true)}
        >
          Vaihda kuva
        </Button>
      ) : (
        <Button
          variant="primary"
          size="lg"
          className="mb-2 w-100"
          onClick={() => setShow(true)}
        >
          Lisää kuva
        </Button>
      )}
    </>
  )
}

export default ProductFormFieldsImage
