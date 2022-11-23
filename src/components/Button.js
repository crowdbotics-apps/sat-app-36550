import React from "react"
import { View, StyleSheet, TouchableOpacity, Text } from "react-native"

const Button = ({
  onPress,
  name,
  backgroundColor,
  color,
  width,
  borderRadius,
  borderWidth,
  borderColor,
  disabled
}) => (
  <View style={[styles.body, disabled ? { opacity: 0.5 } : {}]}>
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor,
          color,
          borderColor,
          borderWidth,
          width,
          borderRadius
        }
      ]}
    >
      <Text style={[styles.buttonText, { color }]}>{name}</Text>
    </TouchableOpacity>
  </View>
)
const styles = StyleSheet.create({
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold"
  },
  button: {
    borderRadius: 40,
    padding: 16
  },
  body: {
    padding: 10
  }
})
export default Button
