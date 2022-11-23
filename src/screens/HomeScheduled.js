import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native"
import React, { useState } from "react"
import { colors } from "../utils/colors"
import { isWeb } from "../utils/isweb"
import Button from "../components/Button"
import Picker from "../components/Picker"

const DATA = [
  {
    title: "A job title here with one line on..",
    company: "Company Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...",
    date: "19th Jun, 22",
    time: "10:30 AM",
    type: "Admin"
  },
  {
    title: "A job title here with one line on..",
    company: "Company Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...",
    date: "19th Jun, 22",
    time: "10:30 AM",
    type: "Admin"
  },
  {
    title: "A job title here with one line on..",
    company: "Company Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...",
    date: "19th Jun, 22",
    time: "10:30 AM",
    type: "Admin"
  },
  {
    title: "A job title here with one line on..",
    company: "Company Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...",
    date: "19th Jun, 22",
    time: "10:30 AM",
    type: "Admin"
  },
  {
    title: "A job title here with one line on..",
    company: "Company Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...",
    date: "19th Jun, 22",
    time: "10:30 AM",
    type: "Admin"
  },
  {
    title: "A job title here with one line on..",
    company: "Company Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...",
    date: "19th Jun, 22",
    time: "10:30 AM",
    type: "Admin"
  },
  {
    title: "A job title here with one line on..",
    company: "Company Name",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry...",
    date: "19th Jun, 22",
    time: "10:30 AM",
    type: "Admin"
  }
]

export default function HomeScheduled({ navigation }) {
  const [values, setValues] = React.useState({})
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(null)
  const onChange = (key, value) => {
    setValues({
      ...values,
      [key]: value
    })
  }
  return (
    <View>
      {isWeb() ? (
        <View>
          <View>
            <View style={styles.inputContainer}>
              <Image
                style={styles.iconSearch}
                resizeMode="contain"
                source={require("../assets/search.png")}
              />
              <TextInput
                style={styles.input}
                placeholder={"Search here"}
                onChangeText={v => onChange("text", v)}
                value={values.text}
              />
            </View>
            {/*
            <View
              style={
                {
                  //borderWidth: 1,
                  //borderColor: "red",
                  //width: 151,
                  //alignItems: "center",
                  //height: 50
                }
              }
            >
              <Picker
                value={type}
                setType={setType}
                setValue={setType}
                open={open}
                setOpen={setOpen}
                width={151}
                color={colors.orange}
                placeholder={"Last Week"}
                options={[
                  { label: "Football", value: "football" },
                  { label: "Baseball", value: "baseball" },
                  { label: "Hockey", value: "hockey" }
                ]}
              />
              </View> */}
          </View>
          {DATA.length > 1 ? (
            <FlatList
              data={DATA}
              numColumns={3}
              keyExtractor={(item, index) => item.id}
              renderItem={item => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("ScheduleDetail")}
                >
                  <View style={styles.container}>
                    <View style={styles.titleContainer}>
                      <Image
                        style={styles.icon}
                        resizeMode="contain"
                        source={require("../assets/google.png")}
                      />
                      <View>
                        <Text style={styles.title}>{item.item.title}</Text>
                        <Text style={styles.subTitle}>{item.item.company}</Text>
                      </View>
                    </View>
                    <Text style={styles.content}>{item.item.description}</Text>
                    <View style={styles.dateContainer}>
                      <View style={styles.dateBlock}>
                        <Text style={styles.dateText}>{item.item.date}</Text>
                      </View>
                      <View style={styles.dateBlock}>
                        <Text style={styles.dateText}>{item.item.time}</Text>
                      </View>
                      <View
                        style={[
                          styles.dateBlock,
                          { backgroundColor: colors.backOrange }
                        ]}
                      >
                        <Text
                          style={[styles.dateText, { color: colors.orange }]}
                        >
                          {item.item.type}
                        </Text>
                      </View>
                    </View>
                    {isWeb() ? (
                      <View style={{ marginTop: 30 }}>
                        <Button
                          name={"See Details"}
                          // width={120}
                          // onPress={() => navigation.navigate("Hazard")}
                          borderWidth={1}
                          backgroundColor={colors.white}
                          borderColor={colors.orange}
                          color={colors.orange}
                          borderRadius={30}
                        />
                      </View>
                    ) : null}
                  </View>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: "10%"
                // alignSelf: "center"
              }}
            >
              <Image
                style={[styles.icon, { width: 124, height: 124 }]}
                resizeMode="contain"
                source={require("../assets/searchbar.png")}
              />
              <Text style={{ fontSize: 20, fontWeight: "700", marginTop: 10 }}>
                Sorry! No results found.
              </Text>
              <Text
                style={{ fontSize: 15, color: colors.textColor, marginTop: 10 }}
              >
                We're sorry, we can't find what you're looking for. Please try a
                different search
              </Text>
            </View>
          )}
        </View>
      ) : (
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => item.id}
          renderItem={item => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ScheduleDetail")}
            >
              <View style={styles.container}>
                <View style={styles.titleContainer}>
                  <Image
                    style={styles.icon}
                    resizeMode="contain"
                    source={require("../assets/google.png")}
                  />
                  <View>
                    <Text style={styles.title}>{item.item.title}</Text>
                    <Text style={styles.subTitle}>{item.item.company}</Text>
                  </View>
                </View>
                <Text style={styles.content}>{item.item.description}</Text>
                <View style={styles.dateContainer}>
                  <View style={styles.dateBlock}>
                    <Text style={styles.dateText}>{item.item.date}</Text>
                  </View>
                  <View style={styles.dateBlock}>
                    <Text style={styles.dateText}>{item.item.time}</Text>
                  </View>
                  <View
                    style={[
                      styles.dateBlock,
                      { backgroundColor: colors.backOrange }
                    ]}
                  >
                    <Text style={[styles.dateText, { color: colors.orange }]}>
                      {item.item.type}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600"
  },
  subTitle: {
    color: colors.orange,
    marginTop: 4
  },
  titleContainer: {
    flexDirection: "row"
  },
  icon: {
    marginRight: 20,
    height: 40,
    width: 40
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
    fontWeight: "500"
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25
  },
  container: {
    padding: 20,
    width: isWeb() ? 356 : null,
    height: isWeb() ? 315 : null,
    backgroundColor: colors.whiteBackground,
    margin: 20,
    marginBottom: 10,
    borderRadius: isWeb() ? null : 10
  },
  inputContainer: {
    paddingVertical: isWeb() ? 5 : 0,
    borderRadius: isWeb() ? 3 : 5,
    backgroundColor: colors.whiteBackground,
    flexDirection: "row",
    width: "100%",
    marginTop: 20,
    // justifyContent: 'space-between',
    alignItems: "center"
  },
  iconSearch: {
    width: isWeb() ? 20 : 20,
    height: isWeb() ? 30 : 20,
    marginHorizontal: 20
  },
  input: {
    padding: 12,
    width: isWeb() ? 420 : "65%",
    color: colors.black
  }
})
