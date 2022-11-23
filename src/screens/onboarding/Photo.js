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

const Photo = ({ navigation }) => {
  const dispatch = useDispatch()
  const [image, setImage] = useState(null)
  const [values, setValues] = React.useState({})
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: "none"
      }
    })
  }, [navigation])

  const onVaccine = async () => {
    if (image) {
      setIsLoading(true)
      const { url, fileName } = await uploadImage(image.path, `images`)
      onChange("image", url)
      setIsLoading(false)
      navigation.navigate("HomeDashboard")
    }
  }

  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header
          title="Driver License"
          onPress={() => navigation.goBack()}
          onboard={true}
          step={4}
        />
        <Image
          style={styles.icon}
          source={
            image ? { uri: image.path } : require("../../assets/avatar.png")
          }
        />
        <Text style={styles.title}>Please upload your Photo</Text>
        <Text style={styles.titleContent}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry.
        </Text>
        <ImageUploader onUpload={setImage}>
          <View style={styles.add}>
            <Image
              style={{ alignSelf: "center", marginRight: 20 }}
              resizeMode="contain"
              source={require("../../assets/plus.png")}
            />
            <Text style={styles.addText}>Upload Photo</Text>
          </View>
        </ImageUploader>
        <TouchableOpacity onPress={() => navigation.navigate("HomeDashboard")}>
          <Text style={styles.skipText}>Skip for Now</Text>
        </TouchableOpacity>
        <Button
          onPress={() => onVaccine()}
          name="Next"
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
    marginTop: "15%",
    width: 120,
    height: 120,
    borderRadius: 150 / 2,
    overflow: "hidden",
    borderWidth: 3,
    borderColor: "gray"
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
export default Photo
