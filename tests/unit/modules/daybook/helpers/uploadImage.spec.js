import cloudinary from "cloudinary"
import axios from "axios"

import uploadImage from "@/modules/daybook/helpers/uploadImage"

cloudinary.config({
  cloud_name: "drhbbhxwg",
  api_key: "769386879373892",
  api_secret: "i7FBOJEU8zr4-GolgUrA09b4aaw",
})

describe("Pruebas en el uploadImage del helpers", () => {
  test("debe de cargar un archivo y retorna el url", async (done) => {
    jest.setTimeout(30000)
    const { data } = await axios.get(
      "https://res.cloudinary.com/drhbbhxwg/image/upload/v1630531850/j10hjvququa2lnnk2tts.png",
      {
        responseType: "arraybuffer",
      }
    )

    const file = new File([data], "foto.png")
    const url = await uploadImage(file)
    expect(typeof url).toBe("string")

    // Tomar el id
    const segments = url.split("/")
    const imageId = segments[segments.length - 1].replace(".png", "")
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done()
    })
  })
})
