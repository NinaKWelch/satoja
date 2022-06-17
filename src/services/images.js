import axios from "axios"
const resp = {
  status: 500,
}
const addImage = async (file, folder) => {
  var response = null
  try {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "ml_default")
    formData.append("folder", folder)

    response = await axios.post(
      "https://api.cloudinary.com/v1_1/dpk81nwou/image/upload",
      formData
    )
  } catch (err) {
    console.log("ERROR addImage :", err)
  }
  if (response === null || response === undefined) {
    return resp
  } else {
    return response
  }
}

export default { addImage }
