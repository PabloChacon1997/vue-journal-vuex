import { shallowMount } from "@vue/test-utils"
import Navbar from "@/modules/daybook/components/Navbar"
import createVuexStore from "../../../mock-data/mock-store"

// const mockRouter = {
//   push: jest.fn(),
// }

// jest.mock("vue-router", () => ({
//   useRoutes: () => mockRouter,
// }))

describe("Pruebas en el Navbar Component", () => {
  const store = createVuexStore({
    user: {
      name: "Juan Cralos",
      email: "juan@gmail.com",
    },
    status: "authenticated",
    idToken: "ABC",
    refreshToken: "XYZ",
  })

  beforeEach(() => jest.clearAllMocks())

  test("debe de mostrar el componente correctamente", () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  test("click en logout - debe de cerrar sesion y redireccionar", async () => {
    const wrapper = shallowMount(Navbar, {
      global: {
        plugins: [store],
      },
    })

    await wrapper.find("button").trigger("click")

    expect(wrapper.router.push).toHaveBeenCalledWith({ name: "login" })

    // expect(mockRouter.push).toHaveBeenCalledTimes(1)
    // expect(mockRouter.push).toHaveBeenCalledWith({ name: "login" })

    expect(store.state.auth).toEqual({
      user: null,
      status: "not-authenticated",
      idToken: null,
      refreshToken: null,
    })
  })
})
