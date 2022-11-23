import * as React from "react"
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView,
  Dimensions
} from "react-native"

import CheckBox from "@react-native-community/checkbox"
import { CheckBox as MyCheckBox } from "react-native-web"
import { colors } from "../utils/colors"
import Logo from "../components/Logo"
import Input from "../components/Input"
import Button from "../components/Button"
import { useDispatch } from "react-redux"
import { login } from "../redux/auth/actions"
import { isWeb } from "../utils/isweb"

const { height } = Dimensions.get("window")

const Form = props => {
  const { navigation } = props
  const dispatch = useDispatch()
  const [values, setValues] = React.useState({})
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false)

  const onSubmit = () => {
    if (!values.email || !values.password) {
      Alert.alert("Please enter all fields")
    } else {
      dispatch(login(values))
    }
  }

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }

  return (
    <ScrollView>
      <View style={styles.body}>
        {isWeb() ? <Text style={styles.headerText}>Prof.</Text> : null}
        <View
          style={{
            backgroundColor: isWeb() ? colors.white : null,
            padding: isWeb() ? 20 : null
          }}
        >
          <View>
            <Text style={styles.signIn}>Sign In</Text>
          </View>
          <View style={styles.firstContainer}>
            <Input
              onChangeText={v => onChange("email", v)}
              value={values.email}
              title="Email"
              placeholder="Enter email"
            />
            <Input
              onChangeText={v => onChange("password", v)}
              value={values.password}
              title="Password"
              placeholder="Enter password"
              password={true}
            />
            <View style={styles.checkboxContainer}>
              {isWeb() ? (
                <MyCheckBox
                  disabled={false}
                  color={colors.orange}
                  value={toggleCheckBox}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
              ) : (
                <CheckBox
                  disabled={false}
                  value={toggleCheckBox}
                  // tintColor={colors.orange}
                  // onFillColor={colors.orange}
                  onCheckColor={colors.orange}
                  onTintColor={colors.orange}
                  style={{ width: 20, height: 20 }}
                  onValueChange={newValue => setToggleCheckBox(newValue)}
                />
              )}

              <Text style={{ alignSelf: "center", marginLeft: 15 }}>
                Remmember Me
              </Text>
            </View>
            <Button
              onPress={() => onSubmit()}
              name="Sign In"
              backgroundColor={colors.orange}
              color={colors.white}
              borderRadius={30}
            />
            <View style={styles.containerForget}>
              <View />
              <TouchableOpacity
                styles={styles.forgetButton}
                onPress={() => navigation.navigate("ForgotPassword")}
              >
                <Text style={styles.forgetText}> Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const Login = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.whiteBackground
      }}
    >
      <View style={{ padding: 10 }}>
        <Form navigation={navigation} />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  loginWitch: {
    fontSize: 15,
    fontWeight: "bold"
  },
  loginWitchContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20
  },
  textContainerSignUp: {
    fontSize: 15,
    color: colors.blue,
    fontWeight: "bold",
    textDecorationLine: "underline"
  },
  textContainer: {
    fontWeight: "bold",
    fontSize: 15
  },
  signIn: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: "center",
    marginTop: 20
  },
  signupContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    color: colors.orange,
    fontSize: 36,
    fontWeight: "800",
    marginBottom: 40
  },
  forgetText: {
    marginHorizontal: 20,
    fontSize: 15,
    color: colors.orange,
    fontWeight: "bold"
  },
  containerForget: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 20
  },
  firstContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    width: isWeb() ? 500 : null
  },
  logoContainer: {
    backgroundColor: colors.whiteBackground,
    justifyContent: "center",
    alignItems: "center",
    padding: 25
  },
  body: {
    backgroundColor: colors.backgroundColor,
    alignItems: isWeb() ? "center" : null,
    justifyContent: isWeb() ? "center" : null,
    width: isWeb() ? "100%" : null,
    height: isWeb() ? height : null
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 15,
    marginLeft: 20
  }
})
export default Login
