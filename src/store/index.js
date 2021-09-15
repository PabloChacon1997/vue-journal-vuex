import { createStore } from "vuex"
import journal from "../modules/daybook/store/journal"
import auth from "../modules/auth/store/auth"

const store = createStore({
  modules: {
    auth,
    journal,
  },
})

export default store
