import authAPI from "@/api/authAPI"
// export const myActions = async ({commit}) => {

// }
export const createUser = async ({ commit }, user) => {
  const { name, email, password } = user
  try {
    const { data } = await authAPI.post(":signUp", {
      email,
      password,
      returnSecureToken: true,
    })
    const { idToken, refreshToken } = data

    await authAPI.post(":update", {
      displayName: name,
      idToken,
    })

    delete user.password
    commit("loginUser", { user, idToken, refreshToken })

    return { ok: true }
  } catch (error) {
    return { ok: false, message: error.response.data.error.message }
  }
}
