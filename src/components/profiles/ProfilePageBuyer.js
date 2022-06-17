import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { uploadImageToCloudinary } from "../../actions/images"
import { updateBuyerProfile, changeBuyerPhoto } from "../../actions/authedUser"
import { getBuyersInfo } from "../../services/buyers"
import { getUserFolder } from "../../helpers/imageUploadHelper"
import Row from "react-bootstrap/Row"
import TemplatePage from "../TemplatePage"
import ProfileHeader from "./ProfileHeader"
import FormBuyerImage from "./FormBuyerImage"
import FormBuyer from "./FormBuyer"

const ProfilePageBuyer = () => {
  const dispatch = useDispatch()
  const user = useSelector(({ authedUser }) => authedUser)
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [buyerInfo, setBuyerInfo] = useState({})

  useEffect(() => {
    const getBuyer = async () => {
      const buyerinfo = await getBuyersInfo(user.id)
      setBuyerInfo(buyerinfo)
    }
    user && getBuyer()
  }, [user])

  // close modal and scoll to top
  const resetModal = () => {
    setLoading(false)
    setShow(false)
    window.scrollTo(0, 0)
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
    image_id && dispatch(changeBuyerPhoto(user.id, image_id))
    resetModal()
  }

  const updateProfile = (changedUser) => dispatch(updateBuyerProfile(changedUser))

  return (
    <TemplatePage pageHeader="Omat tiedot" pageColor="bg-basic">
      <Row className="gx-1 pt-3">
        <FormBuyerImage
          show={show}
          loading={loading}
          handleChangeImage={changeImage}
          handleClose={() => setShow(false)}
        />
        <ProfileHeader
          imageUrl={buyerInfo && buyerInfo.image_url ? buyerInfo.image_url : ""}
          handleShow={() => setShow(true)}
        />
        {buyerInfo && (
          <FormBuyer
            user={user ? user : {}}
            buyer={buyerInfo}
            handleUpdateProfile={updateProfile}
          />
        )}
      </Row>
    </TemplatePage>
  )
}

export default ProfilePageBuyer
