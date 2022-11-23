import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  Image,
  TouchableOpacity
} from "react-native"
import { useDispatch } from "react-redux"
import Header from "../components/Header"
import { colors } from "../utils/colors"
import { isWeb } from "../utils/isweb"
import { TabView, SceneMap, TabBar } from "react-native-tab-view"
import HomeScheduled from "./HomeScheduled"
import HomeRequest from "./HomeRequest"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import HomePast from "./HomePast"
import { logout } from "../redux/auth/actions"

const More = ({ navigation }) => {
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(logout())
  }

  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header
          onPress={() => onLogout()}
          onPress2={() => navigation.navigate("Profile")}
          home={true}
        />
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <View style={styles.menu}>
            <MaterialCommunityIcons
              name="account-outline"
              color={colors.orange}
              size={30}
            />
            <Text style={styles.menuText}>My Profile</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: colors.grayColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 15,
            marginTop: 15
          }}
        />

        <View style={styles.menu}>
          <MaterialCommunityIcons
            name="lock-reset"
            color={colors.orange}
            size={30}
          />
          <Text style={styles.menuText}>Reset Password</Text>
        </View>
        <View
          style={{
            borderBottomColor: colors.grayColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 15,
            marginTop: 15
          }}
        />

        <View style={styles.menu}>
          <MaterialCommunityIcons
            name="bell-outline"
            color={colors.orange}
            size={30}
          />
          <Text style={styles.menuText}>Notification</Text>
        </View>
        <View
          style={{
            borderBottomColor: colors.grayColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 15,
            marginTop: 15
          }}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Terms")}>
          <View style={styles.menu}>
            <MaterialCommunityIcons
              name="file-cog-outline"
              color={colors.orange}
              size={30}
            />
            <Text style={styles.menuText}>Terms and Conditions</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: colors.grayColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 15,
            marginTop: 15
          }}
        />

        <TouchableOpacity onPress={() => navigation.navigate("Privacy")}>
          <View style={styles.menu}>
            <MaterialCommunityIcons
              name="account-lock-outline"
              color={colors.orange}
              size={30}
            />
            <Text style={styles.menuText}>Privacy Policy</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: colors.grayColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 15,
            marginTop: 15
          }}
        />

        <TouchableOpacity onPress={() => onLogout()}>
          <View style={styles.menu}>
            <MaterialCommunityIcons
              name="logout"
              color={colors.orange}
              size={30}
            />
            <Text style={styles.menuText}>Log Out</Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            borderBottomColor: colors.grayColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 15,
            marginTop: 15
          }}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    marginTop: "20%"
  },
  menu: {
    flexDirection: "row",
    alignItems: "center"
  },
  menuContainer: {
    marginLeft: 20,
    marginTop: 40
  },
  menuText: {
    marginLeft: 20
    // color: colors.orange,
    // fontSize: 15
  },
  title: {
    fontSize: 24,
    color: colors.black,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 15
  },
  titleContent: {
    fontSize: 16,
    color: colors.textColor,
    textAlign: "left",
    paddingHorizontal: 20,
    marginBottom: 30
  },
  body: {
    padding: 15,
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: isWeb() ? "center" : null
  }
})
export default More
