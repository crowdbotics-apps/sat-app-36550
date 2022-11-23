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
import Input from "../components/Input"
import ImageUploader from "../components/ImageUploader"
import { uploadImage } from "../utils/helpers"

export default function EditProfile({ navigation }) {
  const [values, setValues] = React.useState({})
  const [image, setImage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }
  const onSubmit = async () => {
    console.log(values, image)
    if (image) {
      setIsLoading(true)
      const { url, fileName } = await uploadImage(image.path, `images`)
      onChange("image", url)
      setIsLoading(false)
      navigation.navigate("Profile")
    }
  }
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header
          onPress={() => navigation.goBack()}
          detail={true}
          title={"Edit Profile"}
          width={"80%"}
        />
      </View>
      <ScrollView>
        <ImageUploader onUpload={setImage}>
          <Image
            style={styles.icon}
            source={
              image ? { uri: image.path } : require("../assets/avatar1.png")
            }
          />
        </ImageUploader>

        <View style={styles.firstContainer}>
          <Input
            onChangeText={v => onChange("first_name", v)}
            value={values.first_name}
            title="First Name"
          />
          <Input
            onChangeText={v => onChange("last_name", v)}
            value={values.last_name}
            title="Last Name"
          />
          <Input
            onChangeText={v => onChange("street", v)}
            value={values.street}
            title="Street"
          />
          <Input
            onChangeText={v => onChange("city", v)}
            value={values.city}
            title="City"
          />
          <Input
            onChangeText={v => onChange("zip", v)}
            value={values.zip}
            title="Zip"
          />
          <Input
            onChangeText={v => onChange("state", v)}
            value={values.state}
            title="State"
          />
          <Input
            onChangeText={v => onChange("phone", v)}
            value={values.phone}
            title="Phone Number"
          />
          <Input
            onChangeText={v => onChange("email", v)}
            value={values.email}
            title="Email"
          />

          <View style={{ justifyContent: "center" }}>
            <Button
              onPress={() => onSubmit()}
              name="Save Changes"
              backgroundColor={isLoading ? colors.grayColor : colors.orange}
              color={isLoading ? colors.black : colors.white}
              borderRadius={30}
              width={"100%"}
            />
          </View>
        </View>
        <View style={{ marginTop: 50 }} />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "400",
    fontSize: 15,
    color: colors.grayColor
  },
  subTitle: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "700"
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10
  },
  icon: {
    alignSelf: "center",
    marginTop: 20,
    width: 120,
    height: 120,
    borderRadius: 150 / 2,
    overflow: "hidden"
    // borderWidth: 3,
    // borderColor: "gray"
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
  },
  labelHeader: {
    marginTop: 20,
    marginLeft: 20
  },
  labelText: {
    fontSize: 12,
    color: colors.black,
    fontWeight: "bold",
    textTransform: "uppercase"
  }
})
