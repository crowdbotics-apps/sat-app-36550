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
import Button from "../../components/Button"
import Header from "../../components/Header"
import { colors } from "../../utils/colors"
import { isWeb } from "../../utils/isweb"
import { useDispatch } from "react-redux"

const Vaccine = ({ navigation }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    })
  }, [navigation])

  const onVaccine = () => {
    navigation.navigate("Photo")
  }
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header
          title="Driver License"
          onPress={() => navigation.goBack()}
          onboard={true}
          step={3}
        />
        <Image
          style={styles.icon}
          resizeMode="contain"
          source={require("../../assets/vaccine.png")}
        />
        <Text style={styles.title}>
          Upload COVID Vaccine {"\n"}Proof{" "}
          <Text style={{ color: colors.textColor, fontSize: 14 }}>
            (Optional)
          </Text>
        </Text>
        <Text style={styles.titleContent}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry.
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddVaccine")}>
          <View style={styles.add}>
            <Image
              style={{ alignSelf: "center", marginRight: 20 }}
              resizeMode="contain"
              source={require("../../assets/plus.png")}
            />
            <Text style={styles.addText}>Add Vaccine Proof</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onVaccine()}>
          <Text style={styles.skipText}>Skip for Now</Text>
        </TouchableOpacity>
        <Button
          onPress={() => navigation.navigate("AddVaccine")}
          name="Next"
          backgroundColor={colors.grayColor}
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
    marginTop: "20%"
  },
  skipText: {
    color: colors.orange,
    alignSelf: "center",
    marginTop: "55%",
    marginBottom: 20,
    fontSize: 17,
    fontWeight: "bold"
  },
  add: {
    borderColor: colors.orange,
    borderWidth: 1.5,
    width: "90%",
    height: 50,
    flexDirection: "row",
    backgroundColor: colors.backgroundOrange,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 3,
    borderStyle: "dashed"
  },
  addText: {
    alignSelf: "center",
    color: colors.orange,
    fontSize: 15
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
export default Vaccine
