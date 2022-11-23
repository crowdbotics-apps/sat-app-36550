import React, { useEffect, useState } from "react"
import {
  View,
  StyleSheet,
  Text,
  Alert,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native"
import Button from "../../components/Button"
import Header from "../../components/Header"
import { colors } from "../../utils/colors"
import { isWeb } from "../../utils/isweb"
import { useDispatch } from "react-redux"
import Input from "../../components/Input"
import Picker from "../../components/Picker"
import DatePicker from "../../components/DatePicker"
import ImageUploader from "../../components/ImageUploader"
import { uploadImage } from "../../utils/helpers"

const AddVaccine = ({ navigation }) => {
  const dispatch = useDispatch()
  const [values, setValues] = React.useState({})
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(null)
  const [date, setDate] = useState(new Date(1598051730000))
  const [image, setImage] = useState(null)
  const [image2, setImage2] = useState(null)
  const [image3, setImage3] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onSubmit = async () => {
    if (image || image2 || image3) {
      // Alert.alert("Please enter all fields")
      if (image) {
        setIsLoading(true)
        const { url, fileName } = await uploadImage(image.path, `images`)
        onChange("image1", url)
        setIsLoading(false)
        navigation.navigate("Photo")
      } else if (image2) {
        setIsLoading(true)
        const { url, fileName } = await uploadImage(image2.path, `images`)
        onChange("image2", url)
        setIsLoading(false)
      } else if (image3) {
        setIsLoading(true)
        const { url, fileName } = await uploadImage(image3.path, `images`)
        onChange("image3", url)
        setIsLoading(false)
      }
    } else {
      // dispatch(login(values))
    }
  }

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

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate
    // setShow(false);
    setDate(currentDate)
  }
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header
          title="Add Vaccine Proof"
          onPress={() => navigation.goBack()}
          onboard={true}
          step={3}
        />
        <ScrollView style={{ marginTop: 20 }}>
          <Input
            onChangeText={v => onChange("institution", v)}
            value={values.institution}
            title="Institution"
            placeholder="Enter Institution"
          />
          <Input
            onChangeText={v => onChange("description", v)}
            value={values.description}
            title="Description"
            placeholder="Enter Description"
            textArea={true}
          />
          <View>
            <Text
              style={{ marginLeft: 20, marginBottom: 10, fontWeight: "700" }}
            >
              Date Issued
            </Text>
            <View style={styles.date}>
              <Image
                style={{ alignSelf: "center" }}
                resizeMode="contain"
                source={require("../../assets/calendar.png")}
              />
              <DatePicker date={date} onChange={onChangeDate} />
            </View>
          </View>

          <View style={{ marginBottom: "30%", marginTop: 20 }}>
            <Text
              style={{ marginLeft: 15, marginBottom: 15, fontWeight: "700" }}
            >
              Upload Images
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
                alignSelf: "center"
              }}
            >
              <ImageUploader onUpload={setImage}>
                <View style={styles.add}>
                  {image ? (
                    <View>
                      <Image
                        style={{ width: 100, height: 85 }}
                        resizeMode="contain"
                        source={{ uri: image.path }}
                      />
                    </View>
                  ) : (
                    <View>
                      <Image
                        style={{ alignSelf: "center" }}
                        resizeMode="contain"
                        source={require("../../assets/cloud.png")}
                      />
                      <Text style={styles.addText}>Upload</Text>
                    </View>
                  )}
                </View>
              </ImageUploader>
              <ImageUploader onUpload={setImage2}>
                <View style={styles.add}>
                  {image2 ? (
                    <View>
                      <Image
                        style={{ width: 100, height: 85 }}
                        resizeMode="contain"
                        source={{ uri: image2.path }}
                      />
                    </View>
                  ) : (
                    <View>
                      <Image
                        style={{ alignSelf: "center" }}
                        resizeMode="contain"
                        source={require("../../assets/cloud.png")}
                      />
                      <Text style={styles.addText}>Upload</Text>
                    </View>
                  )}
                </View>
              </ImageUploader>
              <ImageUploader onUpload={setImage3}>
                <View style={styles.add}>
                  {image3 ? (
                    <View>
                      <Image
                        style={{ width: 100, height: 85 }}
                        resizeMode="contain"
                        source={{ uri: image3.path }}
                      />
                    </View>
                  ) : (
                    <View>
                      <Image
                        style={{ alignSelf: "center" }}
                        resizeMode="contain"
                        source={require("../../assets/cloud.png")}
                      />
                      <Text style={styles.addText}>Upload</Text>
                    </View>
                  )}
                </View>
              </ImageUploader>
            </View>
          </View>
          <Button
            onPress={() => onSubmit()}
            name="Save"
            backgroundColor={isLoading ? colors.grayColor : colors.orange}
            color={isLoading ? colors.black : colors.white}
            borderRadius={30}
          />
          <View style={{ marginTop: 100 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
    marginTop: "20%"
  },
  date: {
    padding: 20,
    borderColor: colors.grayColor,
    borderWidth: 1,
    width: "90%",
    // justifyContent: "center",
    alignSelf: "center",
    flexDirection: "row",
    height: 50,
    // marginLeft: 20,
    borderRadius: 5
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
    width: 100,
    height: 85,
    // flexDirection: "row",
    backgroundColor: colors.backgroundOrange,
    alignSelf: "center",
    justifyContent: "center",
    borderRadius: 3,
    borderStyle: "dashed"
  },
  addText: {
    alignSelf: "center",
    color: colors.orange,
    fontSize: 12
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
export default AddVaccine
