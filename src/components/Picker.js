import React from "react"
import { StyleSheet, View, Text } from "react-native"
import DropDownPicker from "react-native-dropdown-picker"
import { colors } from "../utils/colors"

const Picker = ({
  value,
  setValue,
  options,
  open,
  setOpen,
  placeholder,
  width,
  color
}) => (
  <DropDownPicker
    open={open}
    value={value}
    items={options}
    setOpen={setOpen}
    setValue={setValue}
    setItems={options}
    style={{
      width: width ? width : "92%",
      alignSelf: "center",
      marginTop: 10,
      borderColor: color ? color : colors.grayColor
    }}
    textStyle={{ color: color ? color : colors.grayColor }}
    dropDownContainerStyle={{
      width: width ? width : "92%",
      alignSelf: "center",
      borderColor: color ? color : colors.grayColor
    }}
    dropDownDirection={"TOP"}
    placeholder={placeholder ? placeholder : null}
  />
)
const styles = StyleSheet.create({
  input: {
    borderRadius: 5
  }
})
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    color: colors.black
  },
  inputAndroid: {
    color: colors.black
  }
})
export default Picker
