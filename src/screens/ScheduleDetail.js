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
import WebHeader from "../components/WebHeader"
import { isWeb } from "../utils/isweb"

export default function ScheduleDetail({ navigation }) {
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
            title={"Job Details"}
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
                      source={require("../assets/google.png")}
                    />

                    <Text style={styles.subTitle}>Company Name</Text>
                  </View>
                  <View style={styles.btnContainer}>
                    <Button
                      name={"Hazards"}
                      width={120}
                      onPress={() => navigation.navigate("Hazard")}
                      borderWidth={1}
                      backgroundColor={colors.white}
                      borderColor={colors.orange}
                      color={colors.orange}
                      borderRadius={5}
                    />
                    <Button
                      name={"Tickets"}
                      width={120}
                      onPress={() => navigation.navigate("Requirements")}
                      borderWidth={1}
                      backgroundColor={colors.white}
                      borderColor={colors.orange}
                      color={colors.orange}
                      borderRadius={5}
                    />
                  </View>
                </>
              ) : (
                <>
                  <Image
                    style={styles.icon}
                    resizeMode="contain"
                    source={require("../assets/google.png")}
                  />
                  <View>
                    <Text style={styles.subTitle}>Company Name</Text>
                  </View>
                </>
              )}
            </View>
            <Text style={styles.title}>
              A job title here with two line here because it can happen..
            </Text>
            <Text style={styles.content}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </Text>

            {isWeb() ? (
              <View style={{ marginTop: 20 }}>
                <View
                  style={{
                    borderBottomColor: colors.grayColor,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginBottom: 10
                  }}
                />
                <View style={styles.address}>
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        color: colors.grayColor,
                        marginBottom: 5,
                        fontSize: 12
                      }}
                    >
                      Address
                    </Text>
                    <Text
                      style={{
                        color: colors.orange,
                        fontWeight: "bold",
                        fontSize: 12
                      }}
                    >
                      7B Brooklyn
                    </Text>
                  </View>
                  <View style={styles.verticleLine} />
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        color: colors.grayColor,
                        marginBottom: 5,
                        fontSize: 12
                      }}
                    >
                      State
                    </Text>
                    <Text
                      style={{
                        color: colors.orange,
                        fontWeight: "bold",
                        fontSize: 12
                      }}
                    >
                      New York
                    </Text>
                  </View>
                  <View style={styles.verticleLine} />
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        color: colors.grayColor,
                        marginBottom: 5,
                        fontSize: 12
                      }}
                    >
                      Zip
                    </Text>
                    <Text
                      style={{
                        color: colors.orange,
                        fontWeight: "bold",
                        fontSize: 12
                      }}
                    >
                      33658
                    </Text>
                  </View>
                  <View style={styles.verticleLine} />
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        color: colors.grayColor,
                        marginBottom: 5,
                        fontSize: 12
                      }}
                    >
                      Starting Date
                    </Text>
                    <Text
                      style={{
                        color: colors.orange,
                        fontWeight: "bold",
                        fontSize: 12
                      }}
                    >
                      19th Jun, 22
                    </Text>
                  </View>
                  <View style={styles.verticleLine} />
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        color: colors.grayColor,
                        marginBottom: 5,
                        fontSize: 12
                      }}
                    >
                      Shift Starts
                    </Text>
                    <Text
                      style={{
                        color: colors.orange,
                        fontWeight: "bold",
                        fontSize: 12
                      }}
                    >
                      2hr 54min
                    </Text>
                  </View>
                  <View style={styles.verticleLine} />
                  <View style={{ alignItems: "center" }}>
                    <Text
                      style={{
                        color: colors.grayColor,
                        marginBottom: 5,
                        fontSize: 12
                      }}
                    >
                      Shift Ends
                    </Text>
                    <Text
                      style={{
                        color: colors.orange,
                        fontWeight: "bold",
                        fontSize: 12
                      }}
                    >
                      9hr 24min
                    </Text>
                  </View>
                </View>
              </View>
            ) : (
              <>
                <View style={{ marginTop: 20 }}>
                  <View
                    style={{
                      borderBottomColor: colors.grayColor,
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginBottom: 10
                    }}
                  />
                  <View style={styles.address}>
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: colors.grayColor,
                          marginBottom: 5,
                          fontSize: 12
                        }}
                      >
                        Address
                      </Text>
                      <Text
                        style={{
                          color: colors.orange,
                          fontWeight: "bold",
                          fontSize: 12
                        }}
                      >
                        7B Brooklyn
                      </Text>
                    </View>
                    <View style={styles.verticleLine} />
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: colors.grayColor,
                          marginBottom: 5,
                          fontSize: 12
                        }}
                      >
                        State
                      </Text>
                      <Text
                        style={{
                          color: colors.orange,
                          fontWeight: "bold",
                          fontSize: 12
                        }}
                      >
                        New York
                      </Text>
                    </View>
                    <View style={styles.verticleLine} />
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: colors.grayColor,
                          marginBottom: 5,
                          fontSize: 12
                        }}
                      >
                        Zip
                      </Text>
                      <Text
                        style={{
                          color: colors.orange,
                          fontWeight: "bold",
                          fontSize: 12
                        }}
                      >
                        33658
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={{ marginTop: 20 }}>
                  <View
                    style={{
                      borderBottomColor: colors.grayColor,
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginBottom: 10
                    }}
                  />
                  <View style={styles.address}>
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: colors.grayColor,
                          marginBottom: 5,
                          fontSize: 12
                        }}
                      >
                        Starting Date
                      </Text>
                      <Text
                        style={{
                          color: colors.orange,
                          fontWeight: "bold",
                          fontSize: 12
                        }}
                      >
                        19th Jun, 22
                      </Text>
                    </View>
                    <View style={styles.verticleLine} />
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: colors.grayColor,
                          marginBottom: 5,
                          fontSize: 12
                        }}
                      >
                        Shift Starts
                      </Text>
                      <Text
                        style={{
                          color: colors.orange,
                          fontWeight: "bold",
                          fontSize: 12
                        }}
                      >
                        2hr 54min
                      </Text>
                    </View>
                    <View style={styles.verticleLine} />
                    <View style={{ alignItems: "center" }}>
                      <Text
                        style={{
                          color: colors.grayColor,
                          marginBottom: 5,
                          fontSize: 12
                        }}
                      >
                        Shift Ends
                      </Text>
                      <Text
                        style={{
                          color: colors.orange,
                          fontWeight: "bold",
                          fontSize: 12
                        }}
                      >
                        9hr 41min
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}

            {isWeb() ? null : (
              <View>
                <View
                  style={{
                    borderBottomColor: colors.grayColor,
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    marginTop: 20
                  }}
                />

                <View style={styles.dateContainer}>
                  <View style={styles.dateBlock}>
                    <Text style={styles.dateText}>19th Jun, 22</Text>
                  </View>
                  <View style={styles.dateBlock}>
                    <Text style={styles.dateText}>10:30 AM</Text>
                  </View>
                  <View
                    style={[
                      styles.dateBlock,
                      { backgroundColor: colors.backOrange }
                    ]}
                  >
                    <Text style={[styles.dateText, { color: colors.orange }]}>
                      Admin
                    </Text>
                  </View>
                </View>
              </View>
            )}

            <View
              style={{
                borderBottomColor: colors.grayColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 20
              }}
            />

            {isWeb() ? null : (
              <View style={styles.btnContainer}>
                <Button
                  name={"Hazards"}
                  width={120}
                  onPress={() => navigation.navigate("Hazard")}
                  borderWidth={1}
                  backgroundColor={colors.white}
                  borderColor={colors.orange}
                  color={colors.orange}
                  borderRadius={5}
                />
                <Button
                  name={"Requirements"}
                  // width={120}
                  onPress={() => navigation.navigate("Requirements")}
                  borderWidth={1}
                  backgroundColor={colors.white}
                  borderColor={colors.orange}
                  color={colors.orange}
                />
              </View>
            )}

            {isWeb() ? (
              <>
                <Text
                  style={{
                    fontSize: 12,
                    marginTop: 40,
                    color: colors.textColor
                  }}
                >
                  Worker
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center"
                  }}
                >
                  <Image
                    style={styles.icon}
                    resizeMode="contain"
                    source={require("../assets/avatar.png")}
                  />

                  <Text style={{ fontSize: 18, fontWeight: "600" }}>
                    Jhon Doe
                  </Text>
                  <Button
                    name={"See Profile"}
                    width={120}
                    onPress={() => navigation.navigate("Profile")}
                    borderWidth={1}
                    backgroundColor={colors.white}
                    borderColor={colors.orange}
                    color={colors.orange}
                    borderRadius={30}
                  />
                </View>
              </>
            ) : null}
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
    fontWeight: "600"
  },
  subTitle: {
    color: colors.orange
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: isWeb() ? "space-between" : null,
    marginBottom: 10
  },
  icon: {
    marginRight: 20,
    width: 40,
    height: 40
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
