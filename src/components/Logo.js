import React from "react"
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import { colors } from "../utils/colors"

const Logo = ({ imageLogo, color }) => (
  <>
    <View style={styles.body}>
      <Image style={styles.icon} resizeMode="contain" source={imageLogo} />
      <Text style={[styles.textOne, { color }]}> Prof.</Text>
    </View>
  </>
)
const styles = StyleSheet.create({
  suggestContainer: {
    width: "100%",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 30
  },
  suggest: {
    fontSize: 13,
    color: colors.blue,
    textDecorationLine: "underline",
    fontWeight: "bold"
  },
  icon: {
    width: 80,
    height: 50
  },
  text: {
    fontSize: 20,
    margin: 0,
    color: colors.white,
    letterSpacing: 8
  },
  textOne: {
    marginTop: 25,
    fontSize: 36,
    color: colors.white,
    letterSpacing: 14,
    fontWeight: "bold"
  },
  body: {
    justifyContent: "center",
    alignItems: "center"
  }
})
export default Logo
