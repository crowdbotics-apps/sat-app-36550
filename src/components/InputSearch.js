import React from "react"
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image
} from "react-native"
import { colors } from "../utils/colors"
import { isWeb } from "../utils/isweb"

const InputSearch = ({
  placeholder,
  onChangeText,
  value,
  search,
  filter,
  onPress
}) => (
  <View style={styles.body}>
    <View style={styles.inputContainer}>
      <Image style={styles.icon} resizeMode="contain" source={search} />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
    <View style={styles.filter}>
      <TouchableOpacity onPress={onPress}>
        <Image style={styles.icon} resizeMode="contain" source={filter} />
      </TouchableOpacity>
    </View>
  </View>
)
const styles = StyleSheet.create({
  filter: {
    backgroundColor: colors.white,
    paddingVertical: 15
  },
  icon: {
    width: isWeb() ? 20 : 20,
    height: isWeb() ? 30 : 20,
    marginHorizontal: 20
  },
  inputContainer: {
    paddingVertical: isWeb() ? 10 : 0,
    borderRadius: isWeb() ? 3 : 5,
    backgroundColor: colors.white,
    flexDirection: "row",
    width: "90%",
    // justifyContent: 'space-between',
    alignItems: "center"
  },
  input: {
    padding: 12,
    width: isWeb() ? 420 : "65%",
    color: colors.black
  },
  body: {
    justifyContent: "space-between",
    padding: 10,
    flexDirection: "row",
    alignItems: "center"
  }
})
export default InputSearch
