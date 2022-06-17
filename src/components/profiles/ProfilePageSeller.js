import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uploadImageToCloudinary } from "../../actions/images"
import {
  getSellerInfo,
  updateSellerProfile,
  changeSellerPhoto,
} from "../../actions/authedUser"
import { getUserFolder } from "../../helpers/imageUploadHelper"
import Row from "react-bootstrap/Row"
import TemplatePage from "../TemplatePage"
import ProfileHeader from "./ProfileHeader"
import FormSellerImage from "./FormSellerImage"
import FormSeller from "./FormSeller"

const ProfilePageSeller = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ authedUser }) => authedUser)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [seller, setSeller] = useState(false)

  useEffect(() => {
    // get seller info if it has not been fetched
    if (user) {
      const isSeller = Object.keys(user).includes("business_id")
      !isSeller ? dispatch(getSellerInfo(user)) : setSeller(true)
    }
  }, [dispatch, user])

  // close modal and scoll to top
  const resetModal = () => {
    setLoading(false)
    setShow(false)
    setTimeout(() => window.scroll(0, 0), 500)
  }

  // upload image to Cloudinary
  // and update profile photo
  const changeImage = async (file) => {
    // display loading icon during upload
    setLoading(true)

    // upload image to user's image folder
    const image_id = await dispatch(
      uploadImageToCloudinary(file, getUserFolder(user.email))
    )

    // update user if image upload was successful
    image_id && dispatch(changeSellerPhoto(user.id, image_id))
    resetModal()
  }

  const updateProfile = (changedUser) => dispatch(updateSellerProfile(changedUser))

  return (
    <TemplatePage pageHeader="Omat tiedot" pageColor="bg-basic">
      <Row className="gx-1 pt-3">
        <FormSellerImage
          show={show}
          loading={loading}
          handleChangeImage={changeImage}
          handleClose={() => setShow(false)}
        />
        <ProfileHeader
          imageUrl={user && user.sellers_image_url ? user.sellers_image_url : ""}
          handleShow={() => setShow(true)}
        />
        <FormSeller
          user={user ? user : {}}
          seller={seller}
          handleUpdateProfile={updateProfile}
        />
      </Row>
    </TemplatePage>
  )
}

export default ProfilePageSeller
