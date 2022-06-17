// get user's image folder
// if folder has not been created
// Cloudinary will create one
export const getUserFolder = (str) => {
  // set the folder name to the first part of user's email
  const userFolder = str.split("@")
  return userFolder[0]
}
