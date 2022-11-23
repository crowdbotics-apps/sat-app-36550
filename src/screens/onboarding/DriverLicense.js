import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  Image
} from "react-native"
import Button from "../../components/Button"
import Header from "../../components/Header"
import { colors } from "../../utils/colors"
import { isWeb } from "../../utils/isweb"
import { useDispatch } from "react-redux"

const DriverLicense = ({ navigation }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    })
  }, [navigation])

  const onUpload = () => {
    navigation.navigate("AddLicense")
  }
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header
          title="Driver License"
          onPress={() => navigation.goBack()}
          onboard={true}
        />
        <Image
          style={styles.icon}
          resizeMode="contain"
          source={require("../../assets/upload.png")}
        />
        <Text style={styles.title}>
          Upload & Verify {"\n"}Your Driving License
        </Text>
        <Text style={styles.titleContent}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s.
          {"\n"}
          {"\n"}When an unknown printer took a galley of type and scrambled it
          to make a type.
        </Text>
        <Button
          onPress={() => onUpload()}
          name="Upload"
          backgroundColor={colors.orange}
          color={colors.white}
          borderRadius={30}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    margin: "20%"
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
    backgroundColor: colors.backgroundColor,
    alignItems: isWeb() ? "center" : null
  }
})
export default DriverLicense
