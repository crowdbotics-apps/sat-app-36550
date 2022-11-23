import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import React from "react"
import { colors } from "../utils/colors"
import Header from "../components/Header"
import Button from "../components/Button"

export default function Certificates({ navigation }) {
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header
          onPress={() => navigation.goBack()}
          detail={true}
          title={"My Certificates"}
          width={"80%"}
        />
      </View>
      <ScrollView>
        <View style={styles.add}>
          <TouchableOpacity onPress={() => navigation.navigate("AddCred")}>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Image
                style={{ alignSelf: "center", marginRight: 10 }}
                resizeMode="contain"
                source={require("../assets/plus.png")}
              />
              <Text style={{ color: colors.orange, fontSize: 15 }}>
                Add Credentials
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require("../assets/history.png")}
            />
            <View>
              <Text style={styles.subTitle}>Date Issued: 4th Feb, 22</Text>
              <Text style={styles.subTitle}>Exp Date: 12th Nov, 22</Text>
            </View>
          </View>
          <Text style={styles.title}>My Certficate name here</Text>
          <Text style={styles.content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry.
          </Text>
          <View
            style={[
              styles.dateBlock,
              { backgroundColor: colors.backOrange, marginTop: 20 }
            ]}
          >
            <Text
              style={[
                styles.dateText,
                { color: colors.orange, alignSelf: "center" }
              ]}
            >
              Certificate Link
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <Button
              name={"Edit"}
              width={150}
              borderRadius={40}
              borderWidth={1}
              backgroundColor={colors.white}
              borderColor={colors.orange}
              color={colors.orange}
            />
            <Button
              name={"Delete"}
              width={150}
              borderRadius={40}
              backgroundColor={colors.orange}
              borderColor={colors.orange}
              color={colors.white}
            />
          </View>
        </View>

        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require("../assets/history.png")}
            />
            <View>
              <Text style={styles.subTitle}>Date Issued: 4th Feb, 22</Text>
              <Text style={styles.subTitle}>Exp Date: 12th Nov, 22</Text>
            </View>
          </View>
          <Text style={styles.title}>My Certficate name here</Text>
          <Text style={styles.content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry.
          </Text>
          <View
            style={[
              styles.dateBlock,
              { backgroundColor: colors.backOrange, marginTop: 20 }
            ]}
          >
            <Text
              style={[
                styles.dateText,
                { color: colors.orange, alignSelf: "center" }
              ]}
            >
              Certificate Link
            </Text>
          </View>

          <View style={styles.btnContainer}>
            <Button
              name={"Edit"}
              width={150}
              borderRadius={40}
              borderWidth={1}
              backgroundColor={colors.white}
              borderColor={colors.orange}
              color={colors.orange}
            />
            <Button
              name={"Delete"}
              width={150}
              borderRadius={40}
              backgroundColor={colors.orange}
              borderColor={colors.orange}
              color={colors.white}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 18
  },
  subTitle: {
    color: colors.textColor,
    fontSize: 12
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
    marginTop: 10,
    fontSize: 12
  },
  dateBlock: {
    backgroundColor: "#F1F1F1",
    padding: 8,
    borderRadius: 5,
    width: "50%"
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
    justifyContent: "center",
    // marginBottom: 10,
    marginTop: 20
  },
  add: {
    borderColor: colors.orange,
    borderWidth: 1.5,
    width: "90%",
    padding: 20,
    marginTop: 30,
    // height: 85,
    // flexDirection: "row",
    backgroundColor: colors.backgroundOrange,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 3,
    borderStyle: "dashed"
  }
})
