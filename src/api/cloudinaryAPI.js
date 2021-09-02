import axios from "axios"

const cloudinaryAPI = axios.create({
  baseURL: "https://api.cloudinary.com/v1_1/drhbbhxwg/image/",
})

export default cloudinaryAPI
