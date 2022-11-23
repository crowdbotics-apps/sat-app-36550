import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native"
import React from "react"
import { colors } from "../utils/colors"
import Header from "../components/Header"
import Button from "../components/Button"

export default function Hazard({ navigation }) {
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header
          onPress={() => navigation.goBack()}
          detail={true}
          title={"Hazard Details"}
          width={"80%"}
        />
      </View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Company Name</Text>
            <Text style={styles.subTitle}>Google Inc</Text>
          </View>
          <View
            style={{
              borderBottomColor: colors.grayColor,
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 10,
              marginTop: 10
            }}
          />
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Job Category</Text>
            <Text style={styles.subTitle}>Construction</Text>
          </View>
          <View
            style={{
              borderBottomColor: colors.grayColor,
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 10,
              marginTop: 10
            }}
          />

          <View style={styles.titleContainer}>
            <Text style={styles.title}>Role</Text>
            <Text style={styles.subTitle}>Sr Engineer</Text>
          </View>
        </View>

        <View style={{ alignItems: "center" }}>
          <Button
            name={"List of Hazards"}
            width={"50%"}
            // borderWidth={1}
            backgroundColor={colors.backOrange}
            // borderColor={colors.orange}
            borderRadius={40}
            color={colors.orange}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={[styles.title, { fontSize: 16, color: colors.black }]}>
              <Text>1. </Text>Hazard Type
            </Text>
            <View
              style={{
                alignItems: "center",
                backgroundColor: colors.backOrange,
                borderRadius: 10,
                padding: 10
              }}
            >
              <Text
                style={{
                  color: colors.orange,
                  fontWeight: "bold",
                  fontSize: 12
                }}
              >
                Type Here
              </Text>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: colors.grayColor,
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 10,
              marginTop: 10
            }}
          />
          <Text style={[styles.title, { fontSize: 14 }]}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "400",
    fontSize: 12,
    color: colors.grayColor
  },
  subTitle: {
    color: colors.orange,
    fontSize: 12,
    fontWeight: "900"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
