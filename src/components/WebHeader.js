import React, { useState } from "react"
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native"
import { useDispatch } from "react-redux"
import { logout } from "../redux/auth/actions"
import { colors } from "../utils/colors"

const WebHeader = ({ navigation }) => {
  const [onProfile, setOnProfile] = useState(false)
  const [onNotification, setOnNotification] = useState(false)
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(logout())
  }

  function DropdownItem(props) {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20
          }}
          onPress={props.onPress}
        >
          <Image
            style={[styles.icon, { width: 24, height: 24 }]}
            resizeMode="contain"
            source={props.img}
          />
          <Text style={{ marginLeft: 20 }}>{props.text}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  function NotificationItem(props) {
    return (
      <View>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 20,
            marginBottom: 20
          }}
          onPress={props.onPress}
        >
          <View
            style={{
              backgroundColor: props.read ? colors.orange : colors.backOrange,
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
              marginLeft: 20,
              borderRadius: 150 / 2,
              overflow: "hidden",
              borderWidth: 3,
              borderColor: props.read ? colors.orange : colors.backOrange
            }}
          >
            <Image
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
              source={
                props.read
                  ? require("../assets/alarm.png")
                  : require("../assets/alarm-orange.png")
              }
            />
          </View>
          <View>
            <Text
              style={{
                marginLeft: 20,
                fontSize: 16,
                width: 247,
                // letterSpacing: 2,
                fontWeight: "500",
                color: colors.textColor
              }}
            >
              {props.text}
            </Text>
            <Text
              style={{
                marginLeft: 20,
                marginTop: 20,
                color: colors.grayColor,
                fontSize: 12
              }}
            >
              {props.time} - {props.type}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={styles.body}>
      <View style={{ alignItems: "center", paddingLeft: "15%" }}>
        <TouchableOpacity onPress={() => navigation.navigate("HomeDashboard")}>
          <Text style={styles.textOne}>Prof.</Text>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", paddingRight: "15%" }}>
        <View style={{}}>
          <View>
            <TouchableOpacity
              onPress={() => setOnNotification(!onNotification)}
            >
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={require("../assets/bell.png")}
              />
            </TouchableOpacity>

            {onNotification ? (
              <View
                style={{
                  position: "absolute",
                  width: 376,
                  height: 454,
                  backgroundColor: colors.white,
                  right: "15%",
                  top: 60,
                  zIndex: 15,
                  display: "flex",
                  elevation: 50
                }}
              >
                <View>
                  <Text
                    style={{
                      // textAlign: "center",
                      color: colors.orange,
                      fontSize: 16,
                      fontWeight: "700",
                      marginTop: 20,
                      marginLeft: 20
                    }}
                  >
                    Mark all as read
                  </Text>
                  <View
                    style={{
                      borderBottomColor: "#e5e5e5",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginTop: 20,
                      marginLeft: 20,
                      marginRight: 20
                    }}
                  />
                  <View>
                    <NotificationItem
                      text={
                        "Welcome to Prof! It’s time to get started uploading and sharing"
                      }
                      time={"6 seconds ago"}
                      type={"Personal"}
                      read={true}
                    />
                    <NotificationItem
                      text={
                        "Welcome to Prof! It’s time to get started uploading and sharing"
                      }
                      time={"6 minutes ago"}
                      type={"Personal"}
                      read={false}
                    />
                    <NotificationItem
                      text={
                        "Welcome to Prof! It’s time to get started uploading and sharing"
                      }
                      time={"10 minutes ago"}
                      type={"Personal"}
                      read={false}
                    />
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
        <View style={{}}>
          <View>
            <TouchableOpacity onPress={() => setOnProfile(!onProfile)}>
              <Image
                style={styles.icon}
                resizeMode="contain"
                source={require("../assets/profile.png")}
              />
            </TouchableOpacity>

            {onProfile ? (
              <View
                style={{
                  position: "absolute",
                  width: 376,
                  height: 340,
                  backgroundColor: colors.white,
                  right: "15%",
                  top: 60,
                  zIndex: 15,
                  display: "flex",
                  elevation: 50
                }}
              >
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      color: colors.orange,
                      fontSize: 16,
                      fontWeight: "700",
                      marginTop: 20
                    }}
                  >
                    User Settings
                  </Text>
                  <View
                    style={{
                      borderBottomColor: "#e5e5e5",
                      borderBottomWidth: StyleSheet.hairlineWidth,
                      marginTop: 20,
                      marginLeft: 20,
                      marginRight: 20
                    }}
                  />
                  <View>
                    <DropdownItem
                      img={require("../assets/reset.png")}
                      text={"Reset Password"}
                    />
                    <DropdownItem
                      img={require("../assets/control.png")}
                      text={"Terms and Conditions"}
                      onPress={() => navigation.navigate("Terms")}
                    />
                    <DropdownItem
                      img={require("../assets/account.png")}
                      text={"Privacy Policy"}
                      onPress={() => navigation.navigate("Privacy")}
                    />
                    <DropdownItem
                      img={require("../assets/logout.png")}
                      text={"Log Out"}
                      onPress={() => onLogout()}
                    />
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  text2: {
    textAlign: "center",
    fontSize: 12,
    color: colors.blue,
    letterSpacing: 4,
    fontWeight: "bold"
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#fff",
    width: "100%",
    shadowColor: "#000000",
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5
  },
  textOne: {
    // marginTop: 10,
    fontSize: 32,
    color: colors.orange,
    letterSpacing: 5,
    textAlign: "center",
    fontWeight: "bold"
  },
  text: {
    fontSize: 14,
    textAlign: "center",
    color: colors.blue,
    letterSpacing: 4,
    fontWeight: "bold"
  },
  icon: {
    width: 40,
    height: 40,
    marginLeft: 20,
    resizeMode: "contain"
  },
  body: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 20,
    backgroundColor: "white",
    position: "absolute"
  }
})
export default WebHeader
