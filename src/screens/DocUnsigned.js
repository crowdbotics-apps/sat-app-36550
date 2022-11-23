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

export default function DocUnsigned({ navigation }) {
  return (
    <SafeAreaView style={styles.body}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.navigate("DocDetail")}>
          <View style={styles.container}>
            <Text style={styles.title}>Document Title</Text>

            <View style={{ marginTop: 20, marginBottom: 20 }}>
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
                    Date
                  </Text>
                  <Text
                    style={{
                      color: colors.orange,
                      fontWeight: "bold",
                      fontSize: 12
                    }}
                  >
                    4-12-22
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
                    ID
                  </Text>
                  <Text
                    style={{
                      color: colors.orange,
                      fontWeight: "bold",
                      fontSize: 12
                    }}
                  >
                    55478
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
                    Type
                  </Text>
                  <Text
                    style={{
                      color: colors.orange,
                      fontWeight: "bold",
                      fontSize: 12
                    }}
                  >
                    Mandatory
                  </Text>
                </View>
              </View>
            </View>

            <Button
              name={"Sign Document"}
              // width={120}
              // onPress={() => navigation.navigate("Requirements")}
              borderWidth={1}
              backgroundColor={colors.white}
              borderColor={colors.orange}
              borderRadius={30}
              color={colors.orange}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.title}>Document Title</Text>

          <View style={{ marginTop: 20, marginBottom: 20 }}>
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
                  Date
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  4-12-22
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
                  ID
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  55478
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
                  Type
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  Mandatory
                </Text>
              </View>
            </View>
          </View>

          <Button
            name={"Sign Document"}
            // width={120}
            // onPress={() => navigation.navigate("Requirements")}
            borderWidth={1}
            backgroundColor={colors.white}
            borderColor={colors.orange}
            borderRadius={30}
            color={colors.orange}
          />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Document Title</Text>

          <View style={{ marginTop: 20, marginBottom: 20 }}>
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
                  Date
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  4-12-22
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
                  ID
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  55478
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
                  Type
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  Mandatory
                </Text>
              </View>
            </View>
          </View>

          <Button
            name={"Sign Document"}
            // width={120}
            // onPress={() => navigation.navigate("Requirements")}
            borderWidth={1}
            backgroundColor={colors.white}
            borderColor={colors.orange}
            borderRadius={30}
            color={colors.orange}
          />
        </View>
      </ScrollView>
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
