import axios from "axios"
import createVuexStore from "../../../mock-data/mock-store"

describe("Vuex - Pruebas en el auth-module", () => {
  test("estado incial", () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idToken: null,
      refreshToken: null,
    })

    const { status, user, idToken, refreshToken } = store.state.auth
    expect(status).toBe("authenticating")
    expect(user).toBe(null)
    expect(idToken).toBe(null)
    expect(refreshToken).toBe(null)
  })

  // Mutations

  test("Mutation: loginUser", () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idToken: null,
      refreshToken: null,
    })
    const payload = {
      user: { name: "Fernando", email: "fernando@gmail.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-456",
    }
    store.commit("auth/loginUser", payload)

    const { status, user, idToken, refreshToken } = store.state.auth
    expect(status).toBe("authenticated")
    expect(user).toEqual({ name: "Fernando", email: "fernando@gmail.com" })
    expect(idToken).toBe("ABC-123")
    expect(refreshToken).toBe("XYZ-456")
  })

  test("Mutation: logout", () => {
    localStorage.setItem("idToken", "ABC-123")
    localStorage.setItem("refreshToken", "XYZ-456")

    const store = createVuexStore({
      status: "authenticated",
      user: { name: "Fernando", email: "fernando@gmail.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-456",
    })

    store.commit("auth/logOut")

    const { status, user, idToken, refreshToken } = store.state.auth
    expect(status).toBe("not-authenticated")
    expect(user).toBeFalsy()
    expect(idToken).toBeFalsy()
    expect(refreshToken).toBeFalsy()

    expect(localStorage.getItem("idToken")).toBeFalsy()
    expect(localStorage.getItem("refreshToken")).toBeFalsy()
  })

  // Getters
  test("getters: currenState y username", () => {
    const store = createVuexStore({
      status: "authenticated",
      user: { name: "Fernando", email: "fernando@gmail.com" },
      idToken: "ABC-123",
      refreshToken: "XYZ-456",
    })

    expect(store.getters["auth/currentState"]).toBe("authenticated")
    expect(store.getters["auth/username"]).toBe("Fernando")
  })

  // Actions
  test("actions: createUser - Error: usuario existente", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    })

    const newUser = {
      name: "TestUser",
      email: "test@test.com",
      password: "1234567",
    }

    const resp = await store.dispatch("auth/createUser", newUser)
    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" })

    const { status, user, idToken, refreshToken } = store.state.auth
    expect(status).toBe("not-authenticated")
    expect(user).toBeFalsy()
    expect(idToken).toBeFalsy()
    expect(refreshToken).toBeFalsy()
  })

  test("Actions: createUser singInUser - Crea el usuario", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    })

    const newUser = {
      name: "Test2",
      email: "test2@test.com",
      password: "1234567",
    }
    // SignIn
    await store.dispatch("auth/signInUser", newUser)
    const { idToken } = store.state.auth

    const apiKey = "AIzaSyBirthtdX6QdYPU5JE6177EprjG24b5GGA"
    // Borrar el usuario

    await axios.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:delete?key=${apiKey}`,
      {
        idToken,
      }
    )

    // Crear el usuario
    const resp = await store.dispatch("auth/createUser", newUser)
    expect(resp).toEqual({ ok: true })

    const { status, user, idToken: token, refreshToken } = store.state.auth
    expect(status).toBe("authenticated")
    expect(user).toEqual({ name: "Test2", email: "test2@test.com" })
    expect(typeof token).toBe("string")
    expect(typeof refreshToken).toBe("string")
  })

  test("Actions: checkAuthentication - Positiva", async () => {
    const store = createVuexStore({
      status: "not-authenticated",
      user: null,
      idToken: null,
      refreshToken: null,
    })

    // Signin
    await store.dispatch("auth/signInUser", {
      email: "test@test.com",
      password: "1234567",
    })
    const { idToken } = store.state.auth
    store.commit("auth/logOut")
    localStorage.setItem("idToken", idToken)

    const checkResponse = await store.dispatch("auth/checkAuthentication")
    expect(checkResponse).toEqual({ ok: true })

    const { status, user, idToken: token } = store.state.auth
    expect(status).toBe("authenticated")
    expect(user).toEqual({ name: "TestUser", email: "test@test.com" })
    expect(typeof token).toBe("string")
  })

  test("Actions: checkAuthentication - Negativa", async () => {
    const store = createVuexStore({
      status: "authenticating",
      user: null,
      idToken: null,
      refreshToken: null,
    })

    localStorage.removeItem("idToken")
    const checkResponse1 = await store.dispatch("auth/checkAuthentication")
    expect(checkResponse1).toEqual({ ok: false, message: "No hay token" })
    expect(store.state.auth.status).toBe("not-authenticated")

    localStorage.setItem("idToken", "ABC-123")
    const checkResponse2 = await store.dispatch("auth/checkAuthentication")
    expect(checkResponse2).toEqual({ ok: false, message: "INVALID_ID_TOKEN" })
    expect(store.state.auth.status).toBe("not-authenticated")
  })
})
