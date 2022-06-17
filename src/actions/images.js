import imageService from "../services/images"
import { NOTIFY_ERROR } from "./notification"

// upload image to an assigned folder at Cloudinary
export const uploadImageToCloudinary = (file, folder) => async (dispatch) => {
  const response = await imageService.addImage(file, folder)

  if (response.data.public_id) {
    return response.data.public_id
  } else {
    dispatch({ type: NOTIFY_ERROR, message: "Kuva ei tallentunut palvelimelle" })
  }
}
