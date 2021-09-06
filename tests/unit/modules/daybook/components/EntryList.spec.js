import { createStore } from "vuex"
import { shallowMount } from "@vue/test-utils"
import EntryList from "@/modules/daybook/components/EntryList"
import journal from "@/modules/daybook/store/journal"

import { journalState } from "../../../mock-data/test-journal-state"

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  })

describe("Pruebas en el EntryList Component", () => {
  const store = createVuexStore(journalState)

  const mockRouter = {
    push: jest.fn(),
  }

  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = shallowMount(EntryList, {
      global: {
        mocks: {
          $router: mockRouter,
        },
        plugins: [store],
      },
    })
  })

  test("debe de llamar el getEntriesByTer sin termino y mostrar 3 entradas", () => {
    expect(wrapper.findAll("entry-stub").length).toBe(3)
  })

  test("debe de llamar el getEntriesByTer y filtrar por el termino", async () => {
    const input = wrapper.find("input")
    await input.setValue("dicha")
    expect(wrapper.findAll("entry-stub").length).toBe(1)
  })

  test("el boton de nuevo debe de redireccionar a /new", () => {
    wrapper.find("button").trigger("click")
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: { id: "new" },
    })
  })
})
