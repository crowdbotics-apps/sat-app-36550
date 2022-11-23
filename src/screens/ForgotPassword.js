import React, { useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  Dimensions
} from "react-native"
import { colors } from "../utils/colors"
import Header from "../components/Header"
import Input from "../components/Input"
import Button from "../components/Button"
import { useDispatch } from "react-redux"
import { resetPassword } from "../redux/auth/actions"
import { isWeb } from "../utils/isweb"

const { height } = Dimensions.get("window")

const ForgotPassword = ({ navigation }) => {
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
      Alert.alert("Please enter email")
    } else {
      dispatch(resetPassword(values, navigation))
    }
  }
  return (
    <SafeAreaView style={styles.body}>
      <View>
        {isWeb() ? null : (
          <Header
            title="Forgot Password"
            onPress={() => navigation.goBack()}
            back={true}
            width={"83%"}
          />
        )}
        {isWeb() ? <Text style={styles.headerText}>Prof.</Text> : null}
        <View
          style={{
            backgroundColor: isWeb() ? colors.white : null,
            padding: isWeb() ? 40 : null,
            marginTop: 20,
            width: isWeb() ? 500 : null
          }}
        >
          {isWeb() ? <Text style={styles.title}>Forgot Password</Text> : null}
          <Input
            onChangeText={v => onChange("email", v)}
            value={values.email}
            title="Email"
            placeholder="Enter email"
          />
          <View style={{ marginTop: isWeb() ? null : "50%" }} />
          <Button
            onPress={() => onReset()}
            name="Reset Password"
            backgroundColor={colors.orange}
            color={colors.white}
            borderRadius={30}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    // color: colors.blue,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 15
  },
  titleContent: {
    fontSize: 16,
    color: colors.textColor,
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 30
  },
  headerText: {
    color: colors.orange,
    fontSize: 36,
    fontWeight: "800",
    alignSelf: "center",
    marginBottom: 40
  },
  body: {
    // padding: 15,
    backgroundColor: colors.backgroundColor,
    alignItems: isWeb() ? "center" : null,
    justifyContent: isWeb() ? "center" : null,
    width: isWeb() ? "100%" : null,
    height: isWeb() ? height : null
  }
})
export default ForgotPassword
