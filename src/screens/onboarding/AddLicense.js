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
import ImageUploader from "../../components/ImageUploader"
import { uploadImage } from "../../utils/helpers"

const AddLicense = ({ navigation }) => {
  const dispatch = useDispatch()
  const [values, setValues] = React.useState({})
  const [image, setImage] = useState(null)
  const [image2, setImage2] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    })
  }, [navigation])

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }

  const onUpload = async () => {
    if (image && !image2) {
      setIsLoading(true)
      const { url, fileName } = await uploadImage(image.path, `images`)
      onChange("licenseFront", url)
      setIsLoading(false)
    } else if (image && image2) {
      setIsLoading(true)
      const { url, fileName } = await uploadImage(image2.uri, `images`)
      onChange("licenseBack", url)
      setIsLoading(false)
      navigation.navigate("Credentials")
      console.log(values)
    }
  }
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header
          title="Driver License"
          onPress={() => navigation.goBack()}
          onboard={true}
          close={true}
        />
        <ImageUploader onUpload={!image ? setImage : setImage2}>
          {!values.licenseFront ? (
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={
                image
                  ? { uri: image.path }
                  : require("../../assets/license.jpeg")
              }
            />
          ) : (
            <Image
              style={styles.icon}
              resizeMode="contain"
              source={
                image2
                  ? { uri: image2.uri }
                  : require("../../assets/license.jpeg")
              }
            />
          )}
        </ImageUploader>
        <Text style={styles.title}>
          {!values.licenseFront ? "Front of Your ID" : "Back of Your ID"}
        </Text>
        <Text style={styles.titleContent}>
          Hold up your ID and take a picture. Your entire ID must be in the
          frame.
        </Text>
        <Button
          onPress={() => onUpload()}
          name="Capture"
          backgroundColor={isLoading ? colors.grayColor : colors.orange}
          color={isLoading ? colors.black : colors.white}
          borderRadius={30}
        />
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    width: 300,
    height: 200,
    borderRadius: 20,
    margin: "40%"
  },
  title: {
    fontSize: 24,
    color: colors.white,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 40,
    marginLeft: 20,
    marginBottom: 15
  },
  titleContent: {
    fontSize: 14,
    color: "#BCBCBC",
    textAlign: "left",
    paddingHorizontal: 20,
    marginBottom: 30
  },
  body: {
    padding: 15,
    flex: 1,
    backgroundColor: colors.black,
    alignItems: isWeb() ? "center" : null
  }
})
export default AddLicense
