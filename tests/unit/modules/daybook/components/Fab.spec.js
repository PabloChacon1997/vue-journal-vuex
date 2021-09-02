import { shallowMount } from "@vue/test-utils"
import Fab from "@/modules/daybook/components/Fab.vue"

describe("Pruebas en el Fab Component", () => {
  test("debe de mostrar el icono por defecto", () => {
    const wrapper = shallowMount(Fab)
    const iconPlus = wrapper.find("i")
    expect(iconPlus.classes("fa-plus")).toBeTruthy()
  })
  test("debe de mostrar el icono por argumento", () => {
    const wrapper = shallowMount(Fab, {
      props: {
        icon: "fa-save",
      },
    })
    const iconPlus = wrapper.find("i")
    expect(iconPlus.classes("fa-save")).toBeTruthy()
  })

  test("debe de emitir el evento onClick cuando se hace click", () => {
    const wrapper = shallowMount(Fab)
    wrapper.find("button").trigger("click")
    expect(wrapper.emitted("onClick")).toHaveLength(1)
  })
})
