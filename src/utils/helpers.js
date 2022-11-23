import "react-native-get-random-values"
import { nanoid } from "nanoid"
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable
} from "firebase/storage"
import { storage } from "./firebase"

export async function uploadImage(uri, path, fName) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function (e) {
      console.log(e)
      reject(new TypeError("Network request failed"))
    }
    xhr.responseType = "blob"
    xhr.open("GET", uri, true)
    xhr.send(null)
  })

  const fileName = fName || nanoid()
  const target = `${path}/${fileName}.jpeg`
  const imageRef = ref(storage, target)
  console.log(imageRef)
  const snapshot = await uploadBytesResumable(imageRef, blob, {
    contentType: "image/jpeg"
  })

  blob.close()

  const url = await getDownloadURL(snapshot.ref)

  return { url, fileName }
}

export async function uploadFile(uri, path, fName) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function () {
      resolve(xhr.response)
    }
    xhr.onerror = function (e) {
      console.log(e)
      reject(new TypeError("Network request failed"))
    }
    xhr.responseType = "blob"
    xhr.open("GET", uri, true)
    xhr.send(null)
  })

  const fileName = fName || nanoid()
  const target = `${path}/${fileName}.pdf`
  const fileRef = ref(storage, target)
  const snapshot = await uploadBytes(fileRef, blob, {
    contentType: "application/pdf"
  })

  blob.close()

  const url = await getDownloadURL(snapshot.ref)

  return { url, fileName }
}

export const getServerError = (errorObject, errorMessage) => {
  if (errorObject) {
    try {
      if (typeof errorObject === "string") {
        return "Something went wrong. Please try again."
      }

      const fields = Object.keys(errorObject)
      const messages = []

      fields.forEach(fieldName => {
        const message = errorObject[fieldName]
        if (fieldName === "non_field_errors") {
          if (typeof message === "string") {
            messages.push(`${message}`)
          } else if (typeof message === "object") {
            const messageContentData = Object.values(message)
            const messageContent = messageContentData && messageContentData[0]

            messages.push(`${messageContent}`)
          }
        } else {
          const displayName = fieldName
          if (typeof message === "string") {
            messages.push(
              !Number.isNaN(Number(displayName))
                ? message
                : `${message} (${displayName})`
            )
          } else if (typeof message === "object") {
            const messageContentData = Object.values(message)
            const messageContent = messageContentData && messageContentData[0]

            messages.push(
              !Number.isNaN(Number(displayName))
                ? messageContent
                : `${messageContent} (${displayName})`
            )
          }
        }
      })

      return messages.join(" ~ ")
    } catch (e) {
      console.log("e :>> ", e)
      return errorMessage
    }
  }

  return null
}
