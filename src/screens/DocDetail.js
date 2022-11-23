import {
  Alert,
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
import MetricModal from "../components/Modal"
import { useSelector, useDispatch } from "react-redux"
import { signDoc } from "../redux/app/actions"

export default function DocDetail({ navigation }) {
  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [value, setValue] = useState("")

  const onSave = () => {
    if (!value) {
      Alert.alert("Please sign name")
    } else {
      // dispatch(login(values))
      //navigation.navigate("SigningScreen")
      dispatch(signDoc(value, navigation))
      setOpenModal(false)
    }
  }
  return (
    <SafeAreaView style={styles.body}>
      <Header
        onPress={() => navigation.goBack()}
        detail={true}
        title={"Document Details"}
        width={"80%"}
      />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.title}>Document Title</Text>

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

          <View
            style={{
              borderBottomColor: colors.grayColor,
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 10,
              marginTop: 10
            }}
          />

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View
              style={{
                backgroundColor: colors.backOrange,
                padding: 10,
                width: 80,
                height: 70,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: colors.orange,
                  fontSize: 24,
                  fontWeight: "bold"
                }}
              >
                PDF
              </Text>
            </View>
            <View style={{ marginLeft: 20, justifyContent: "center" }}>
              <Text style={{ marginBottom: 5 }}>document name here</Text>
              <Text>2.45 MB</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginTop: 20 }}>
            <View
              style={{
                backgroundColor: colors.backOrange,
                padding: 10,
                width: 80,
                height: 70,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text
                style={{
                  color: colors.orange,
                  fontSize: 24,
                  fontWeight: "bold"
                }}
              >
                PDF
              </Text>
            </View>
            <View style={{ marginLeft: 20, justifyContent: "center" }}>
              <Text style={{ marginBottom: 5 }}>document name here</Text>
              <Text>2.45 MB</Text>
            </View>
          </View>
        </View>

        <View style={{ width: "80%", alignSelf: "center" }}>
          <Button
            name={"Enter Sign"}
            // width={120}
            onPress={() => setOpenModal(!openModal)}
            borderWidth={1}
            backgroundColor={colors.whiteBackground}
            borderColor={colors.orange}
            borderRadius={30}
            color={colors.orange}
          />
          {openModal ? (
            <MetricModal
              title={"Type your Name"}
              onCancel={() => setOpenModal(false)}
              onSave={() => onSave()}
              onChangeText={v => setValue(v)}
              value={value}
            />
          ) : null}
          <Button
            name={"Download"}
            // width={120}
            // onPress={() => navigation.navigate("Requirements")}
            // borderWidth={1}
            backgroundColor={colors.orange}
            // borderColor={colors.orange}
            borderRadius={30}
            color={colors.white}
          />
        </View>
      </ScrollView>
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
