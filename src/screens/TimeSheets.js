import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import React, { useState } from "react"
import { colors } from "../utils/colors"
import Header from "../components/Header"
import Button from "../components/Button"
import Picker from "../components/Picker"

export default function TimeSheets({ navigation }) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(null)
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header
          onPress={() => navigation.goBack()}
          detail={true}
          title={"My Timesheets"}
          width={"80%"}
        />
      </View>
      <ScrollView>
        <View style={styles.add}>
          <TouchableOpacity
            onPress={() => navigation.navigate("CreateTimesheet")}
          >
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <Image
                style={{ alignSelf: "center", marginRight: 10 }}
                resizeMode="contain"
                source={require("../assets/plus.png")}
              />
              <Text style={{ color: colors.orange, fontSize: 15 }}>
                Create Timesheets
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            width: "90%",
            justifyContent: "space-around",
            alignSelf: "center",
            marginTop: 20
          }}
        >
          <View>
            <Picker
              value={type}
              setType={setType}
              setValue={setType}
              open={open}
              setOpen={setOpen}
              width={"50%"}
              color={colors.orange}
              placeholder={"Last Week"}
              options={[
                { label: "Football", value: "football" },
                { label: "Baseball", value: "baseball" },
                { label: "Hockey", value: "hockey" }
              ]}
            />
          </View>
          <View>
            <Picker
              value={type}
              setType={setType}
              setValue={setType}
              open={open}
              setOpen={setOpen}
              width={"50%"}
              color={colors.orange}
              placeholder={"Latest"}
              options={[
                { label: "Football", value: "football" },
                { label: "Baseball", value: "baseball" },
                { label: "Hockey", value: "hockey" }
              ]}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Company Name here</Text>
          <Text style={styles.content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry.
          </Text>

          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <View
              style={{
                borderBottomColor: colors.grayColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 20
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
                  Category
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  Engnr
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
                  Time
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  15min
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Company Name here</Text>
          <Text style={styles.content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry.
          </Text>

          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <View
              style={{
                borderBottomColor: colors.grayColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 20
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
                  Category
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  Engnr
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
                  Time
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  15min
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Company Name here</Text>
          <Text style={styles.content}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry.
          </Text>

          <View style={{ marginTop: 20, marginBottom: 20 }}>
            <View
              style={{
                borderBottomColor: colors.grayColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 20
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
                  Category
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  Engnr
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
                  Time
                </Text>
                <Text
                  style={{
                    color: colors.orange,
                    fontWeight: "bold",
                    fontSize: 12
                  }}
                >
                  15min
                </Text>
              </View>
            </View>
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
