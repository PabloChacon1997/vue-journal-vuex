import cloudinaryAPI from "@/api/cloudinaryAPI"

const uploadImage = async (file) => {
  if (!file) return

  try {
    const formData = new FormData()
    formData.append("upload_preset", "curso-vue")
    formData.append("file", file)

    // const url = "https://api.cloudinary.com/v1_1/drhbbhxwg/image/upload"
    // const { data } = await axios.post(url, formData)
    const { data } = await cloudinaryAPI.post("upload", formData)
    return data.secure_url
  } catch (error) {
    console.log("Error al subir la imagen: ", error)
    return null
  }
}

export default uploadImage
