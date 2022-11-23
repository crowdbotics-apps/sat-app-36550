import {
  FlatList,
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
import Button from "../components/Button"
import WebHeader from "../components/WebHeader"
import { isWeb } from "../utils/isweb"
import MetricModal from "../components/Modal"

const DATA = [
  {
    title: "A job title here with one line on..",
    company: "Company Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...",
    date: "19th Jun, 22",
    time: "10:30 AM",
    type: "Admin"
  },
  {
    title: "A job title here with one line on..",
    company: "Company Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...",
    date: "19th Jun, 22",
    time: "10:30 AM",
    type: "Admin"
  },
  {
    title: "A job title here with one line on..",
    company: "Company Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...",
    date: "19th Jun, 22",
    time: "10:30 AM",
    type: "Admin"
  }
]

export default function Profile({ navigation }) {
  const [openModal, setOpenModal] = useState(false)
  return (
    <SafeAreaView style={styles.body}>
      <View
        style={{
          paddingLeft: isWeb() ? "15%" : null,
          paddingRight: isWeb() ? "15%" : null,
          marginTop: isWeb() ? "5%" : null
        }}
      >
        <View style={{ marginTop: isWeb() ? 10 : null }}>
          <Header
            onPress={() => navigation.goBack()}
            detail={true}
            title={"Worker Profile"}
            width={"80%"}
          />
        </View>

        {isWeb() ? (
          <>
            <View
              style={{
                borderBottomColor: colors.grayColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20
              }}
            />
          </>
        ) : null}
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.titleContainer}>
              {isWeb() ? (
                <>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={styles.icon}
                      resizeMode="contain"
                      source={require("../assets/avatar.png")}
                    />

                    <Text style={[styles.subTitle, { fontSize: 20 }]}>
                      Alex Davi Jones
                    </Text>
                  </View>
                  <View style={styles.btnContainer}>
                    <Button
                      name={"Contact Worker"}
                      width={120}
                      // onPress={() => navigation.navigate("Hazard")}
                      borderWidth={1}
                      backgroundColor={colors.white}
                      borderColor={colors.orange}
                      color={colors.orange}
                      borderRadius={5}
                    />
                    <Button
                      name={"Remove from Job"}
                      width={120}
                      onPress={() => setOpenModal(!openModal)}
                      borderWidth={1}
                      backgroundColor={colors.white}
                      borderColor={colors.orange}
                      color={colors.orange}
                      borderRadius={5}
                    />
                    {openModal ? (
                      <MetricModal
                        title={"Confirm Removing"}
                        content={
                          "Please enter a reason for removing the worker. The reason will be sent to the worker."
                        }
                        btn={"Confirm & Remove"}
                        textArea={true}
                        placeholder={"Type in the reason for removing "}
                        onCancel={() => setOpenModal(false)}
                      />
                    ) : null}
                  </View>
                </>
              ) : null}
            </View>

            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between"
                }}
              >
                <Text style={styles.content}>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </Text>
                <View style={styles.verticleLine} />
                <View style={{ width: "50%", padding: 20 }}>
                  <View
                    style={{
                      borderBottomColor: "#e5e5e5",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginBottom: 10,
                      marginTop: 10
                    }}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Profession</Text>
                    <Text style={styles.subTitle}>Worker</Text>
                  </View>

                  <View
                    style={{
                      borderBottomColor: "#e5e5e5",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginBottom: 10,
                      marginTop: 10
                    }}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Phone Number</Text>
                    <Text style={styles.subTitle}>+884249416541</Text>
                  </View>

                  <View
                    style={{
                      borderBottomColor: "#e5e5e5",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginBottom: 10,
                      marginTop: 10
                    }}
                  />
                  <View style={styles.titleContainer}>
                    <Text style={styles.title}>Email </Text>
                    <Text style={styles.subTitle}>alexjone@gmail.com</Text>
                  </View>
                  <View
                    style={{
                      borderBottomColor: "#e5e5e5",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginBottom: 10,
                      marginTop: 10
                    }}
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={[styles.subTitle, { fontSize: 20 }]}>
                Credentials
              </Text>
            </View>

            <FlatList
              data={DATA}
              numColumns={3}
              keyExtractor={(item, index) => item.id}
              renderItem={item => (
                <View style={styles.container1}>
                  <View style={styles.titleContainer1}>
                    <Image
                      style={[styles.icon, { height: 40, width: 40 }]}
                      resizeMode="contain"
                      source={require("../assets/history.png")}
                    />
                    <View>
                      <Text style={styles.subTitle1}>
                        Date Issued: 4th Feb, 22
                      </Text>
                      <Text style={styles.subTitle1}>
                        Exp Date: 12th Nov, 22
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.title,
                      { color: colors.black, fontWeight: "700" }
                    ]}
                  >
                    My Certficate name here
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: 12,
                        color: colors.textColor,
                        marginBottom: 10,
                        marginTop: 10
                      }
                    ]}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry.
                  </Text>
                  <View style={styles.btnContainer}>
                    <Button
                      name={"See Document"}
                      width={150}
                      borderRadius={40}
                      borderWidth={1}
                      backgroundColor={colors.white}
                      borderColor={colors.orange}
                      color={colors.orange}
                    />
                  </View>
                </View>
              )}
            />
          </View>

          <View style={styles.container}>
            <View style={styles.titleContainer}>
              <Text style={[styles.subTitle, { fontSize: 20 }]}>
                COVID Vaccines
              </Text>
            </View>

            <FlatList
              data={DATA}
              numColumns={3}
              keyExtractor={(item, index) => item.id}
              renderItem={item => (
                <View style={styles.container1}>
                  <View style={styles.titleContainer1}>
                    <Image
                      style={[styles.icon, { height: 40, width: 40 }]}
                      resizeMode="contain"
                      source={require("../assets/injection.png")}
                    />
                    <View>
                      <Text style={styles.subTitle1}>
                        Last Vaccine Date: 12th Nov, 22
                      </Text>
                    </View>
                  </View>
                  <Text
                    style={[
                      styles.title,
                      { color: colors.black, fontWeight: "700" }
                    ]}
                  >
                    My Certficate name here
                  </Text>
                  <Text
                    style={[
                      {
                        fontSize: 12,
                        color: colors.textColor,
                        marginBottom: 10,
                        marginTop: 10
                      }
                    ]}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry.
                  </Text>
                  <View style={styles.btnContainer1}>
                    <Button
                      name={"See Document"}
                      width={150}
                      borderRadius={40}
                      borderWidth={1}
                      backgroundColor={colors.white}
                      borderColor={colors.orange}
                      color={colors.orange}
                    />
                  </View>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
      {isWeb() ? (
        <>
          <WebHeader navigation={navigation} />
        </>
      ) : null}
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
  subTitle1: {
    color: colors.textColor,
    fontSize: 12
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  titleContainer1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10
  },
  icon: {
    marginRight: 20,
    width: 90,
    height: 90
  },
  content: {
    color: colors.textColor,
    marginTop: 15,
    width: "50%",
    lineHeight: 29
    // letterSpacing: 0.5
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
  container1: {
    padding: 20,
    backgroundColor: colors.whiteBackground,
    margin: 20,
    width: isWeb() ? 327 : null,
    height: isWeb() ? 248 : null,
    marginBottom: 10,
    borderRadius: 10,
    borderColor: colors.cancelColor,
    borderWidth: 1
  },
  address: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  verticleLine: {
    height: "100%",
    width: 1,
    backgroundColor: "#e5e5e5"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  btnContainer1: {
    alignSelf: "center"
  }
})
