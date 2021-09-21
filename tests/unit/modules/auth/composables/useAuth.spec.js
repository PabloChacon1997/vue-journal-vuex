import useAuth from "@/modules/auth/composables/useAuth"

const mockStore = {
  dispatch: jest.fn(),
  commit: jest.fn(),
  getters: {
    "auth/currentState": "authenticated",
    "auth/username": "Andy",
  },
}

jest.mock("vuex", () => ({
  useStore: () => mockStore,
}))

describe("Pruebas en el composable useAuth", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test("createUser exitoso", async () => {
    const { createUser } = useAuth()
    const newUser = {
      name: "Andres",
      email: "andy@test.com",
    }
    mockStore.dispatch.mockReturnValue({ ok: true })
    const resp = await createUser(newUser)
    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", {
      email: "andy@test.com",
      name: "Andres",
    })
    expect(resp).toEqual({ ok: true })
  })

  test("createUser fallido por email existente", async () => {
    const { createUser } = useAuth()
    const newUser = {
      name: "Andres",
      email: "andy@test.com",
    }
    mockStore.dispatch.mockReturnValue({ ok: false, message: "EMAIL_EXISTS" })
    const resp = await createUser(newUser)
    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", newUser)
    expect(resp).toEqual({ ok: false, message: "EMAIL_EXISTS" })
  })

  test("login exitoso", async () => {
    const { loginUser } = useAuth()
    const loginForm = {
      email: "andy@test.com",
      password: "1234567",
    }
    mockStore.dispatch.mockReturnValue({ ok: true })
    const resp = await loginUser(loginForm)
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/signInUser",
      loginForm
    )
    expect(resp).toEqual({ ok: true })
  })
  test("login fallido", async () => {
    const { loginUser } = useAuth()
    const loginForm = {
      email: "andy@tes.com",
      password: "12345",
    }
    mockStore.dispatch.mockReturnValue({
      ok: false,
      message: "EMAIL/PASSWORD do not exist",
    })
    const resp = await loginUser(loginForm)
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      "auth/signInUser",
      loginForm
    )
    expect(resp).toEqual({ ok: false, message: "EMAIL/PASSWORD do not exist" })
  })

  test("checkAuthStatus", async () => {
    const { checkAuthStatus } = useAuth()
    mockStore.dispatch.mockReturnValue({ ok: true })
    const resp = await checkAuthStatus()
    expect(mockStore.dispatch).toHaveBeenCalledWith("auth/checkAuthentication")
    expect(resp).toEqual({ ok: true })
  })

  test("logout", async () => {
    const { logout } = useAuth()
    logout()
    expect(mockStore.commit).toHaveBeenCalledWith("auth/logOut")
    expect(mockStore.commit).toHaveBeenCalledWith("journal/clearEntries")
  })

  test("Computed: authStatus, username", () => {
    const { authStatus, username } = useAuth()
    expect(authStatus.value).toBe("authenticated")
    expect(username.value).toBe("Andy")
  })
})
