import React from "react"
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions
} from "react-native"
import { colors } from "../utils/colors"
import { isWeb } from "../utils/isweb"

const { width } = Dimensions.get("screen")
// console.log(width)
const Header = ({
  title,
  back,
  onPress,
  onPress2,
  onboard,
  step,
  chatscreen,
  width,
  home,
  close,
  detail,
  detail2,
  chat
}) => (
  <View style={[styles.headers, { width: width ? width : "90%" }]}>
    {back ? (
      <View style={[styles.header, { width: width }]}>
        <TouchableOpacity onPress={onPress}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require("../assets/back.png")}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{title}</Text>
      </View>
    ) : null}
    {chat ? (
      <View style={styles.container}>
        <Text style={{ fontSize: 28, fontWeight: "700", marginLeft: 20 }}>
          {title ? title : "Chats"}
        </Text>
        <TouchableOpacity onPress={onPress2}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require("../assets/more.png")}
          />
        </TouchableOpacity>
      </View>
    ) : null}
    {chatscreen ? (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require("../assets/back.png")}
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", right: "30%" }}>
          <Image
            style={{ width: 44, height: 44, alignSelf: "center" }}
            // resizeMode="contain"
            source={require("../assets/avatar.png")}
          />
          <Text
            style={{ fontSize: 18, fontWeight: "700", alignSelf: "center" }}
          >
            {title}
          </Text>
        </View>
      </View>
    ) : null}
    {onboard ? (
      <View style={styles.header}>
        <TouchableOpacity onPress={onPress}>
          <Image
            style={[
              styles.icon,
              { width: close ? 14 : 24, height: close ? 14 : 24 }
            ]}
            resizeMode="contain"
            source={
              close
                ? require("../assets/back-white.png")
                : require("../assets/back.png")
            }
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "row", alignSelf: "center" }}>
          <View
            style={{
              borderBottomWidth: 4,
              borderBottomColor: colors.orange,
              width: 35,
              marginRight: 10
            }}
          />
          <View
            style={{
              borderBottomWidth: 4,
              borderBottomColor:
                step == 2 || step == 3 || step == 4
                  ? colors.orange
                  : colors.cancelColor,
              width: 35,
              marginRight: 10
            }}
          />
          <View
            style={{
              borderBottomWidth: 4,
              borderBottomColor:
                step == 3 || step == 4 ? colors.orange : colors.cancelColor,
              width: 35,
              marginRight: 10
            }}
          />
          <View
            style={{
              borderBottomWidth: 4,
              borderBottomColor: step == 4 ? colors.orange : colors.cancelColor,
              width: 35
            }}
          />
        </View>
      </View>
    ) : null}

    {home ? (
      <View style={styles.container}>
        <TouchableOpacity onPress={onPress}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require("../assets/bell.png")}
          />
        </TouchableOpacity>

        <Text style={styles.textOne}> Prof.</Text>
        <TouchableOpacity onPress={onPress2}>
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require("../assets/profile.png")}
          />
        </TouchableOpacity>
      </View>
    ) : null}

    {detail ? (
      <View style={[styles.header, { width: isWeb() ? 600 : width }]}>
        <TouchableOpacity
          style={{ flexDirection: isWeb() ? "row" : null }}
          onPress={onPress}
        >
          <Image
            style={styles.icon}
            resizeMode="contain"
            source={require("../assets/back.png")}
          />
          {isWeb() ? (
            <Text style={{ marginLeft: 10, fontSize: 15, alignSelf: "center" }}>
              {"Go Back"}
            </Text>
          ) : null}
        </TouchableOpacity>
        <Text style={[styles.headerTitle]}>{title}</Text>
        {detail2 ? (
          <TouchableOpacity onPress={onPress}>
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={require("../assets/more.png")}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    ) : null}
  </View>
)
const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 30,
    color: isWeb() ? colors.orange : colors.black
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: isWeb() ? 470 : "80%",
    marginTop: 10
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 20
  },
  textOne: {
    // marginTop: 25,
    fontSize: 24,
    color: colors.orange,
    letterSpacing: 5,
    textAlign: "center",
    fontWeight: "bold"
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
})
export default Header
