import * as React from "react"
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
  Alert,
  SafeAreaView
} from "react-native"

// import BouncyCheckbox from "react-native-bouncy-checkbox"
import { colors } from "../utils/colors"
import Logo from "../components/Logo"
import Input from "../components/Input"
import Button from "../components/Button"
import { useDispatch } from "react-redux"
import { login } from "../redux/auth/actions"
import { isWeb } from "../utils/isweb"

const Form = props => {
  const { navigation } = props
  const dispatch = useDispatch()
  const [values, setValues] = React.useState({})

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
        <View>
          <Text style={styles.signIn}>Sign Up</Text>
        </View>
        <View style={styles.firstContainer}>
          <Input
            onChangeText={v => onChange("first_name", v)}
            value={values.first_name}
            title="First Name"
            placeholder="Enter first name"
          />
          <Input
            onChangeText={v => onChange("last_name", v)}
            value={values.last_name}
            title="Last Name"
            placeholder="Enter last name"
          />
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
          <Input
            onChangeText={v => onChange("confrim_password", v)}
            value={values.confirm_password}
            title="Confirm Password"
            placeholder="Enter confrim password"
            password={true}
          />

          <Button
            onPress={() => onSubmit()}
            name="Sign Up"
            backgroundColor={colors.orange}
            color={colors.white}
          />
          <View style={styles.containerForget}>
            <View />
            <TouchableOpacity
              styles={styles.forgetButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text>
                Already have an account?
                <Text style={styles.forgetText}> Log in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const SignUp = ({ navigation }) => {
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
    alignItems: isWeb() ? "center" : null
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 15,
    marginLeft: 20
  }
})
export default SignUp
