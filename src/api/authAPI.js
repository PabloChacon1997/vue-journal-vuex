import axios from "axios"

const authAPI = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/accounts",
  params: {
    key: "AIzaSyBirthtdX6QdYPU5JE6177EprjG24b5GGA",
  },
})

export default authAPI
