import { createStore } from "vuex"
import { shallowMount } from "@vue/test-utils"

import journal from "@/modules/daybook/store/journal"
import { journalState } from "../../../mock-data/test-journal-state"
import EntryView from "@/modules/daybook/views/EntryView.vue"
import Swal from "sweetalert2"

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  })

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
  showLoading: jest.fn(),
  clase: jest.fn(),
}))

describe("Pruebas en el EntryView", () => {
  const store = createVuexStore(journalState)

  store.dispatch = jest.fn()

  const mockRouter = {
    push: jest.fn(),
  }

  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = shallowMount(EntryView, {
      props: {
        id: "-MiYEXtERnaai8G6-lgg",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })
  })
  test("debe de sacar al usuario por que el id no existe", () => {
    wrapper = shallowMount(EntryView, {
      props: {
        id: "Noexiste",
      },
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })
    expect(mockRouter.push).toHaveBeenCalledWith({ name: "no-entry" })
  })
  test("debe de mostrar la entrada correctamente", () => {
    expect(wrapper.html()).toMatchSnapshot()
    expect(mockRouter.push).not.toHaveBeenCalled()
  })
  test("debe de borrar la entrada y salir", (done) => {
    Swal.fire.mockReturnValueOnce(Promise.resolve({ isConfirmed: true }))
    wrapper.find(".btn-danger").trigger("click")
    expect(Swal.fire).toHaveBeenCalledWith({
      title: "¿Esta seguro?",
      text: "Una vez borrado no se puede recuperar",
      showDenyButton: true,
      confirmButtonText: "Si, estoy seguro",
    })
    setTimeout(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        "journal/deleteEntry",
        "-MiYEXtERnaai8G6-lgg"
      )
      expect(mockRouter.push).toHaveBeenCalled()
      done()
    }, 1)
  })
})
