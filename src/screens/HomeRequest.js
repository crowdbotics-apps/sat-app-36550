import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import React from "react"
import { colors } from "../utils/colors"
import Button from "../components/Button"

export default function HomeRequest({ navigation }) {
  return (
    <ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate("RequestDetail")}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require("../assets/google.png")}
            />
            <View>
              <Text style={styles.title}>
                A job title here with one line on..
              </Text>
              <Text style={styles.subTitle}>Company Name</Text>
            </View>
          </View>
          <Text style={styles.content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry...
          </Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateBlock}>
              <Text style={styles.dateText}>19th Jun, 22</Text>
            </View>
            <View style={styles.dateBlock}>
              <Text style={styles.dateText}>10:30 AM</Text>
            </View>
            <View
              style={[styles.dateBlock, { backgroundColor: colors.backOrange }]}
            >
              <Text style={[styles.dateText, { color: colors.orange }]}>
                Admin
              </Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button
              name={"Decline"}
              width={120}
              borderRadius={40}
              borderWidth={1}
              backgroundColor={colors.white}
              borderColor={colors.orange}
              color={colors.orange}
            />
            <Button
              name={"Accept"}
              width={120}
              borderRadius={40}
              backgroundColor={colors.orange}
              borderColor={colors.orange}
              color={colors.white}
            />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("RequestDetail")}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require("../assets/google.png")}
            />
            <View>
              <Text style={styles.title}>
                A job title here with one line on..
              </Text>
              <Text style={styles.subTitle}>Company Name</Text>
            </View>
          </View>
          <Text style={styles.content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry...
          </Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateBlock}>
              <Text style={styles.dateText}>19th Jun, 22</Text>
            </View>
            <View style={styles.dateBlock}>
              <Text style={styles.dateText}>10:30 AM</Text>
            </View>
            <View
              style={[styles.dateBlock, { backgroundColor: colors.backOrange }]}
            >
              <Text style={[styles.dateText, { color: colors.orange }]}>
                Admin
              </Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button
              name={"Decline"}
              width={120}
              borderRadius={40}
              borderWidth={1}
              backgroundColor={colors.white}
              borderColor={colors.orange}
              color={colors.orange}
            />
            <Button
              name={"Accept"}
              width={120}
              borderRadius={40}
              backgroundColor={colors.orange}
              borderColor={colors.orange}
              color={colors.white}
            />
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("RequestDetail")}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require("../assets/google.png")}
            />
            <View>
              <Text style={styles.title}>
                A job title here with one line on..
              </Text>
              <Text style={styles.subTitle}>Company Name</Text>
            </View>
          </View>
          <Text style={styles.content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry...
          </Text>
          <View style={styles.dateContainer}>
            <View style={styles.dateBlock}>
              <Text style={styles.dateText}>19th Jun, 22</Text>
            </View>
            <View style={styles.dateBlock}>
              <Text style={styles.dateText}>10:30 AM</Text>
            </View>
            <View
              style={[styles.dateBlock, { backgroundColor: colors.backOrange }]}
            >
              <Text style={[styles.dateText, { color: colors.orange }]}>
                Admin
              </Text>
            </View>
          </View>
          <View style={styles.btnContainer}>
            <Button
              name={"Decline"}
              width={120}
              borderRadius={40}
              borderWidth={1}
              backgroundColor={colors.white}
              borderColor={colors.orange}
              color={colors.orange}
            />
            <Button
              name={"Accept"}
              width={120}
              borderRadius={40}
              backgroundColor={colors.orange}
              borderColor={colors.orange}
              color={colors.white}
            />
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600"
  },
  subTitle: {
    color: colors.orange,
    marginTop: 4
  },
  titleContainer: {
    flexDirection: "row"
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
    fontWeight: "500"
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25
  },
  container: {
    padding: 20,
    backgroundColor: colors.whiteBackground,
    margin: 20,
    marginBottom: 10,
    borderRadius: 10
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20
  }
})
