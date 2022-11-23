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
import { passConfirm, resetPassword } from "../redux/auth/actions"
import { isWeb } from "../utils/isweb"

const { height } = Dimensions.get("window")

const SetNewPassword = ({ navigation, route }) => {
  const { item } = route.params
  const dispatch = useDispatch()
  const [values, setValues] = useState({
    email: item.email,
    otp: item.token
  })

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }

  const onNewPassword = () => {
    if (!values.new_password1 || !values.new_password2) {
      Alert.alert("Please enter password ")
    } else if (values.new_password1 !== values.new_password2) {
      Alert.alert("Password don`t match! ")
    } else {
      // console.log("object", values)
      dispatch(passConfirm(values, navigation))
    }
  }
  return (
    <SafeAreaView style={styles.body}>
      <View>
        {isWeb() ? null : (
          <Header
            title="New Password"
            onPress={() => navigation.goBack()}
            back={true}
            width={"80%"}
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
          {isWeb() ? (
            <View>
              <Text style={styles.title}>Reset Password</Text>
            </View>
          ) : null}
          <Input
            onChangeText={v => onChange("new_password1", v)}
            value={values.new_password1}
            title="New password"
            placeholder="Minimum 8 characters"
            password={true}
          />
          <Input
            onChangeText={v => onChange("new_password2", v)}
            value={values.new_password2}
            title="Confirm password"
            placeholder="Minimum 8 characters"
            password={true}
          />
          <View style={{ marginTop: isWeb() ? 20 : "50%" }} />
          <Button
            onPress={() => onNewPassword()}
            name="Submit"
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
  headerText: {
    color: colors.orange,
    fontSize: 36,
    fontWeight: "800",
    alignSelf: "center",
    marginBottom: 40
  },
  titleContent: {
    fontSize: 16,
    color: colors.textColor,
    textAlign: "center",
    paddingHorizontal: 20,
    marginBottom: 30
  },
  body: {
    padding: 15,
    backgroundColor: colors.backgroundColor,
    alignItems: isWeb() ? "center" : null,
    justifyContent: isWeb() ? "center" : null,
    width: isWeb() ? "100%" : null,
    height: isWeb() ? height : null
  }
})
export default SetNewPassword
