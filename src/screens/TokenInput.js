import React, { useRef, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity
} from "react-native"
import { colors } from "../utils/colors"
import Header from "../components/Header"
import Input from "../components/Input"
import Button from "../components/Button"
import { useDispatch } from "react-redux"
import { resetPassword } from "../redux/auth/actions"
import { isWeb } from "../utils/isweb"
import CodeInputDisplay from "../components/CodeInputDisplay"

const { height } = Dimensions.get("window")

const TokenInput = ({ navigation, route }) => {
  const { itemEmail } = route.params
  const [code, setCode] = useState("")
  const inputRef = useRef()
  const [values, setValues] = useState({
    email: itemEmail.email,
    token: null
  })

  const onSubmit = () => {
    if (!code) {
      Alert.alert("Please enter token!")
    } else if (code.length !== 4) {
      Alert.alert("Please enter 4-digit token code!")
    } else {
      navigation.navigate("SetNewPassword", {
        item: { email: values.email, token: code }
      })
    }
  }
  return (
    <SafeAreaView style={styles.body}>
      <View>
        {isWeb() ? null : (
          <Header
            title="Submit Token"
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
              <Text style={styles.title}>Submit Token</Text>
              <Text style={{ alignSelf: "center", marginTop: 10 }}>
                We’ve sent the code at {values.email}
              </Text>
            </View>
          ) : null}
          <TextInput
            textStyle={styles.inputText}
            style={styles.input}
            value={code}
            onChangeText={newValue => setCode(newValue)}
            keyboardType="phone-pad"
            autoFocus
            maxLength={4}
            ref={inputRef}
          />
          <Text
            style={{
              marginLeft: isWeb() ? null : 15,
              marginBottom: 10,
              alignSelf: isWeb() ? "center" : null
            }}
          >
            Enter the 4-digit code
          </Text>
          <CodeInputDisplay
            code={code}
            onPress={() => inputRef?.current.focus()}
          />
          <View style={{ marginTop: isWeb() ? 20 : "50%" }} />
          <Button
            onPress={() => onSubmit()}
            name="Submit"
            backgroundColor={colors.orange}
            color={colors.white}
            borderRadius={30}
          />

          {isWeb() ? (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text
                style={{
                  color: colors.orange,
                  alignSelf: "center",
                  fontWeight: "700"
                }}
              >
                Resend Token
              </Text>
            </TouchableOpacity>
          ) : null}
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
  body: {
    padding: 15,
    backgroundColor: colors.backgroundColor,
    alignItems: isWeb() ? "center" : null,
    justifyContent: isWeb() ? "center" : null,
    width: isWeb() ? "100%" : null,
    height: isWeb() ? height : null
  },
  headerText: {
    color: colors.orange,
    fontSize: 36,
    fontWeight: "800",
    alignSelf: "center",
    marginBottom: 40
  },
  inputText: {
    height: 40,
    color: "#fff"
  },
  input: {
    height: 40,
    opacity: 0,
    // position: "absolute",
    zIndex: 100,
    width: "100%"
  }
})
export default TokenInput
