import { createStore } from "vuex"
import journal from "@/modules/daybook/store/journal"
import { journalState } from "../../../../mock-data/test-journal-state"

const createVuexStore = (initialState) =>
  createStore({
    modules: {
      journal: {
        ...journal,
        state: { ...initialState },
      },
    },
  })

describe("Vuex - Pruebas en el Journal Module", () => {
  // Basicas
  test('este es el estado inicial, debe de tener este "state"', () => {
    const store = createVuexStore(journalState)
    const { isLoading, entries } = store.state.journal

    expect(isLoading).toBeFalsy()
    expect(entries).toEqual(journalState.entries)
  })

  // Muatations
  test("mutations: setEntries", () => {
    const store = createVuexStore({ isLoading: true, entries: [] })
    store.commit("journal/setEntries", journalState.entries)
    expect(store.state.journal.entries.length).toBe(3)
    expect(store.state.journal.isLoading).toBeFalsy()
  })

  test("mutations: updateEntry", () => {
    const store = createVuexStore(journalState)
    const updateEntry = {
      id: "-MiT8xnGUDnzgo_9uAQs",
      date: 1630446008310,
      text: "Hola mundo desde el mock de pruebas de journal module",
    }
    store.commit("journal/updateEntry", updateEntry)
    const storeEntries = store.state.journal.entries
    expect(storeEntries.length).toBe(3)
    expect(storeEntries.find((e) => e.id === updateEntry.id)).toEqual(
      updateEntry
    )
  })

  test("mutations: addEntry adn deleteEntry", () => {
    const store = createVuexStore(journalState)
    const addEntry = {
      id: "ABC-123",
      text: "Hola mundo",
    }
    store.commit("journal/addEntry", addEntry)
    const storeEntries = store.state.journal.entries

    expect(storeEntries.length).toBe(4)
    expect(storeEntries.find((e) => e.id === "ABC-123")).toBeTruthy()

    store.commit("journal/deleteEntry", "ABC-123")

    expect(store.state.journal.entries.length).toBe(3)
    expect(
      store.state.journal.entries.find((e) => e.id === "ABC-123")
    ).toBeFalsy()
  })

  // Getters
  test("getters: getEntriesByTerm and getEntriesById", () => {
    const store = createVuexStore(journalState)

    const [entry1, entry2] = journalState.entries

    expect(store.getters["journal/getEntriesByTerm"]("").length).toBe(3)
    expect(store.getters["journal/getEntriesByTerm"]("2").length).toBe(1)
    expect(store.getters["journal/getEntriesByTerm"]("2")).toEqual([entry2])

    expect(
      store.getters["journal/getEntryById"]("-MiT8xnGUDnzgo_9uAQs")
    ).toEqual(entry1)
  })

  // Actions
  test("actions: loadEntries", async () => {
    const store = createVuexStore({ isLoading: true, entries: [] })
    await store.dispatch("journal/loadEntries")
    expect(store.state.journal.entries.length).toBe(3)
  })

  test("actions: updateEntry", async () => {
    const store = createVuexStore(journalState)
    const updateEntry = {
      id: "-MiT8xnGUDnzgo_9uAQs",
      date: 1630446008310,
      text: "Hola desde el mock de journal module",
    }
    await store.dispatch("journal/updateEntry", updateEntry)
    expect(store.state.journal.entries.length).toBe(3)
    expect(
      store.state.journal.entries.find((e) => e.id === updateEntry.id)
    ).toEqual({
      id: "-MiT8xnGUDnzgo_9uAQs",
      date: 1630446008310,
      text: "Hola desde el mock de journal module",
    })
  })

  test("actions: createEntry and deleteEntry", async () => {
    const store = createVuexStore(journalState)
    const newEntry = {
      date: 1631446008310,
      text: "Nueva entrada desde las pruebas",
    }
    const idF = await store.dispatch("journal/createEntry", newEntry)
    expect(typeof idF).toBe("string")
    expect(store.state.journal.entries.find((e) => e.id === idF)).toBeTruthy()
    await store.dispatch("journal/deleteEntry", idF)
    expect(store.state.journal.entries.find((e) => e.id === idF)).toBeFalsy()
  })
})
