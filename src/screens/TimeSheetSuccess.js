import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  Image
} from "react-native"
import { colors } from "../utils/colors"
import Header from "../components/Header"
import Input from "../components/Input"
import Button from "../components/Button"
import { useDispatch } from "react-redux"
import { resetPassword } from "../redux/auth/actions"
import { isWeb } from "../utils/isweb"

const TimesheetSuccess = ({ navigation }) => {
  const dispatch = useDispatch()
  const [values, setValues] = useState({})

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }

  const onReset = () => {
    if (!values.email) {
      Alert.alert("Please enter all fields")
    } else {
      dispatch(resetPassword(values, navigation))
    }
  }
  return (
    <SafeAreaView style={styles.body}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: "40%"
        }}
      >
        <Image
          style={styles.icon}
          // resizeMode="contain"
          source={require("../assets/check.png")}
        />
        <Text style={styles.title}>Timesheet Created</Text>
        <Text style={styles.titleContent}>Successfully</Text>
      </View>
      <Button
        onPress={() => navigation.navigate("CreateTimesheet")}
        name="Create Another Timesheet"
        backgroundColor={colors.whiteBackground}
        borderRadius={30}
        color={colors.orange}
        borderColor={colors.orange}
        borderWidth={1}
      />
      <Button
        onPress={() => navigation.navigate("HomeDashboard")}
        name="Close"
        backgroundColor={colors.orange}
        borderRadius={30}
        color={colors.white}
      />
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: colors.orange,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10
  },
  titleContent: {
    fontSize: 15,
    color: colors.textColor,
    textAlign: "center",
    // paddingHorizontal: 20,
    marginBottom: "10%"
  },
  body: {
    padding: 15,
    backgroundColor: colors.backgroundColor,
    alignItems: isWeb() ? "center" : null
  }
})
export default TimesheetSuccess
