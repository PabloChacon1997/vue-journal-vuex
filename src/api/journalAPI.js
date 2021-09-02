import axios from "axios"

const journalAPI = axios.create({
  baseURL: "https://vue-demos-cc0d7-default-rtdb.firebaseio.com",
})

export default journalAPI
