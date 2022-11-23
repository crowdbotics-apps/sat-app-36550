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
import Picker from "../components/Picker"
import DatePicker from "../components/DatePicker"

export default function CreateTimesheet({ navigation }) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(null)
  const [values, setValues] = React.useState({})
  const [image, setImage] = useState(null)
  const [date, setDate] = useState(new Date(1598051730000))
  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }
  const onSubmit = () => {
    console.log(values)
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
          onPress={() => navigation.goBack()}
          detail={true}
          title={"Create Timesheet"}
          width={"80%"}
        />
      </View>
      <ScrollView>
        <View
          style={{
            borderBottomColor: colors.grayColor,
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 10,
            marginTop: 20
          }}
        />

        <View style={styles.firstContainer}>
          <Input
            onChangeText={v => onChange("full_name", v)}
            value={values.full_name}
            title="Full Name"
            placeholder={"Pre Populated"}
          />
          <Input
            onChangeText={v => onChange("company_name", v)}
            value={values.company_name}
            title="Company Name"
            placeholder={"Lorem"}
          />
          <View>
            <Text
              style={{ marginLeft: 20, marginBottom: 10, fontWeight: "700" }}
            >
              Date
            </Text>
            <View style={styles.date}>
              <DatePicker date={date} onChange={onChangeDate} />
              <Image
                style={{ alignSelf: "center" }}
                resizeMode="contain"
                source={require("../assets/calendar.png")}
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                marginLeft: 20,
                marginBottom: 10,
                marginTop: 20,
                fontWeight: "700"
              }}
            >
              Hour
            </Text>
            <View style={styles.date}>
              <DatePicker date={date} onChange={onChangeDate} type={"time"} />
              <Image
                style={{ alignSelf: "center" }}
                resizeMode="contain"
                source={require("../assets/clock.png")}
              />
            </View>
          </View>
          <Text style={{ marginLeft: 15, fontWeight: "700" }}>
            Job Category
          </Text>
          <Picker
            value={type}
            setType={setType}
            setValue={setType}
            open={open}
            setOpen={setOpen}
            // width={"50%"}
            // color={colors.orange}
            placeholder={"Lorem"}
            options={[
              { label: "Football", value: "football" },
              { label: "Baseball", value: "baseball" },
              { label: "Hockey", value: "hockey" }
            ]}
          />
          <Input
            onChangeText={v => onChange("state", v)}
            value={values.state}
            title="Notes"
            placeholder={"Type here"}
            textArea={true}
          />

          <View style={{ justifyContent: "center" }}>
            <Button
              onPress={() => navigation.navigate("TimesheetSuccess")}
              name="Create Time Sheet"
              backgroundColor={colors.orange}
              borderRadius={30}
              width={"100%"}
              color={colors.white}
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
    marginTop: 20,
    alignSelf: "center"
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
  },
  date: {
    padding: 20,
    borderColor: colors.grayColor,
    borderWidth: 1,
    width: "90%",
    justifyContent: "space-between",
    alignSelf: "center",
    flexDirection: "row",
    height: 50,
    // marginLeft: 20,
    borderRadius: 5
  }
})
