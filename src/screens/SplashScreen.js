import React, { useEffect } from "react"
import { View, StyleSheet, Dimensions } from "react-native"
import { colors } from "../utils/colors"
import Logo from "../components/Logo"
import { useDispatch, useSelector } from "react-redux"
import { getApplications } from "../redux/app/actions"
const { height } = Dimensions.get("window")

const SplashScreen = ({ navigation }) => {
  const profile = useSelector(state => state.App.profile)
  const dispatch = useDispatch()

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: navigation.isFocused() == true ? "none" : undefined
      }
    })
    if (profile.id) {
      // dispatch(getApplications());
      if (profile?.active_subscription !== null) {
        navigation.navigate("DriverLicense")
      } else {
        navigation.navigate("HomeDashboard")
      }
    }
  }, [profile, navigation])

  return (
    <View style={styles.body}>
      <Logo color={colors.white} />
    </View>
  )
}
const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    margin: 22,
    color: colors.white,
    letterSpacing: 12,
    fontWeight: "bold"
  },
  body: {
    backgroundColor: colors.orange,
    justifyContent: "center",
    alignItems: "center",
    height
  }
})
export default SplashScreen
