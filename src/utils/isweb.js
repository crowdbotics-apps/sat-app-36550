import { Dimensions } from "react-native"

const { width } = Dimensions.get("window")

export const isWeb = () => {
  if (width > 500) {
    return true
  }

  return false
}
