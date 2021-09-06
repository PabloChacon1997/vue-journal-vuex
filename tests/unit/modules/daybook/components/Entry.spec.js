import { shallowMount } from "@vue/test-utils"
import Entry from "@/modules/daybook/components/Entry"

describe("Pruebas en el Entry Component", () => {
  const mockRouter = {
    push: jest.fn(),
  }
  const entry = {
    id: "-MiT8xnGUDnzgo_9uAQs",
    date: 1630446008310,
    text: "Hola desde el mock de journal module",
  }

  const wrapper = shallowMount(Entry, {
    global: {
      mocks: {
        $router: mockRouter,
      },
    },
    props: {
      entry,
    },
  })
  test("debe de hacer match con el snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test("debe de redireccionar al hacer click en el entry-container", () => {
    const classEntryContainer = wrapper.find(".entry-container")
    classEntryContainer.trigger("click")
    expect(mockRouter.push).toHaveBeenCalledWith({
      name: "entry",
      params: {
        id: "-MiT8xnGUDnzgo_9uAQs",
      },
    })
  })

  test("pruebas en las propiedades computadas", () => {
    expect(typeof wrapper.vm.day).toBe("number")
    expect(typeof wrapper.vm.month).toBe("string")
    expect(typeof wrapper.vm.yearDay).toBe("string")
  })
})
