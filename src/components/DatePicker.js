import React from "react"
import { StyleSheet, View, Text } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { colors } from "../utils/colors"

const DatePicker = ({ date, onChange, type }) => (
  <DateTimePicker
    testID="dateTimePicker"
    value={date}
    mode={type ? type : "date"}
    is24Hour={true}
    onChange={onChange}
    style={{ alignSelf: "center" }}
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
export default DatePicker
