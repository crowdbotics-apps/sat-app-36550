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

export default function Profile({ navigation }) {
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header
          onPress={() => navigation.goBack()}
          detail={true}
          title={"Profile"}
          width={"75%"}
        />
      </View>
      <ScrollView>
        <View>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require("../assets/avatar1.png")}
          />
          <Text
            style={{
              margin: 20,
              marginBottom: 10,
              fontSize: 20,
              fontWeight: "800",
              alignSelf: "center"
            }}
          >
            Alex Davi Jones
          </Text>
          <View style={{ alignItems: "center" }}>
            <Button
              name={"Edit Profile"}
              width={"50%"}
              borderWidth={1}
              onPress={() => navigation.navigate("EditProfile")}
              backgroundColor={colors.whiteBackground}
              borderColor={colors.orange}
              borderRadius={5}
              color={colors.orange}
            />
          </View>
        </View>

        <View style={styles.labelHeader}>
          <Text style={styles.labelText}>Personal Info</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>First name</Text>
            <Text style={styles.subTitle}>Alex</Text>
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
            <Text style={styles.title}>Last name</Text>
            <Text style={styles.subTitle}>Jones</Text>
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
            <Text style={styles.subTitle}>Engineer</Text>
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
            <Text style={styles.title}>Department</Text>
            <Text style={styles.subTitle}>Construction</Text>
          </View>
        </View>

        <View style={styles.labelHeader}>
          <Text style={styles.labelText}>Address</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Street</Text>
            <Text style={styles.subTitle}>20W 34th St</Text>
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
            <Text style={styles.title}>City</Text>
            <Text style={styles.subTitle}>New York</Text>
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
            <Text style={styles.title}>Postal Code</Text>
            <Text style={styles.subTitle}>NY 10001</Text>
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
            <Text style={styles.title}>Province</Text>
            <Text style={styles.subTitle}>NY</Text>
          </View>
        </View>

        <View style={styles.labelHeader}>
          <Text style={styles.labelText}>Contact info</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Phone Number</Text>
            <Text style={styles.subTitle}>314-722-5818</Text>
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
            <Text style={styles.title}>Email</Text>
            <Text style={styles.subTitle}>jon.mobbin@gmail.com</Text>
          </View>
        </View>

        <View style={styles.labelHeader}>
          <Text style={styles.labelText}>Other info</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>My Certificates</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Certificates")}
            >
              <Text style={[styles.subTitle, { color: colors.orange }]}>
                See Details
              </Text>
            </TouchableOpacity>
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
            <Text style={styles.title}>My Timsheets</Text>
            <TouchableOpacity onPress={() => navigation.navigate("TimeSheets")}>
              <Text style={[styles.subTitle, { color: colors.orange }]}>
                See Details
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginTop: 50 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "400",
    fontSize: 15,
    color: colors.grayColor
  },
  subTitle: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "700"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  icon: {
    marginTop: 20,
    alignSelf: "center"
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
  },
  labelHeader: {
    marginTop: 20,
    marginLeft: 20
  },
  labelText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: "bold",
    textTransform: "uppercase"
  }
})
