import React, { useState } from "react"
import {
  View,
  StyleSheet,
  TextInput,
  Text,
  Image,
  TouchableOpacity
} from "react-native"
import { colors } from "../utils/colors"

const Input = ({
  width,
  placeholder,
  password,
  title,
  textArea,
  onChangeText,
  value,
  keyboardType
}) => {
  const [show, setShow] = useState(true)
  if (password === true) {
    return (
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { width: width ? width : "90%" }]}
            placeholder={placeholder}
            secureTextEntry={show}
            onChangeText={onChangeText}
            value={value}
          />
          <TouchableOpacity
            style={styles.buttonContainer}
            onPress={() => setShow(!show)}
          >
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require("../assets/eye.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
  } else if (textArea === true) {
    return (
      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              { width: width ? width : "90%", paddingBottom: 110 }
            ]}
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
          />
        </View>
      </View>
    )
  }
  return (
    <View style={styles.body}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { width: width ? width : "90%" }]}
          placeholder={placeholder}
          onChangeText={onChangeText}
          value={value}
          autoCapitalize={"none"}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 20
  },
  inputContainer: {
    borderRadius: 5,
    backgroundColor: colors.white,
    borderColor: colors.grayColor,
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  input: {
    color: colors.black,
    // fontWeight: 'bold',
    padding: 12
    // width: '90%',
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    paddingBottom: 10
  },
  body: {
    padding: 15
  }
})
export default Input
