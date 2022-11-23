import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native"
import React, { useState } from "react"
import { colors } from "../utils/colors"
import Header from "../components/Header"
import { WebView } from "react-native-webview"

export default function SigningScreen({ navigation, route }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header
        onPress={() => navigation.goBack()}
        detail={true}
        title={"Sign Document"}
        width={"80%"}
      />
      <WebView style={{ marginTop: 20 }} source={{ uri: route.params.item }} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 18
  },
  subTitle: {
    color: colors.orange
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  icon: {
    marginRight: 20
  },
  content: {
    color: colors.textColor,
    marginTop: 15
  },
  dateBlock: {
    backgroundColor: "#F1F1F1",
    padding: 8,
    borderRadius: 5
  },
  dateText: {
    color: colors.black,
    fontWeight: "500",
    fontSize: 12
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  container: {
    padding: 20,
    backgroundColor: colors.whiteBackground,
    margin: 20,
    marginBottom: 10,
    borderRadius: 10
  },
  address: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: colors.grayColor
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center"
  }
})
