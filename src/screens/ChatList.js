import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import React, { useEffect } from "react"
import { colors } from "../utils/colors"
import Header from "../components/Header"
import Button from "../components/Button"
import { useSelector, useDispatch } from "react-redux"
import { getUsers } from "../redux/app/actions"

const user = [
  {
    name: "Charles Wilson",
    photo: require("../assets/avatar.png"),
    time: "09:41",
    // read: "3",
    comment: "Can’t wait to try it out",
    active: true
  }
]

export default function ChatList({ navigation }) {
  const dispatch = useDispatch()
  const users = useSelector(state => state.App.users)
  useEffect(() => {
    dispatch(getUsers())
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: undefined
      }
    })
  }, [navigation, dispatch])
  console.log(users)
  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header chat={true} />
      </View>
      <View
        style={{
          borderBottomColor: colors.grayColor,
          borderBottomWidth: StyleSheet.hairlineWidth,
          marginBottom: 20,
          marginTop: 20
        }}
      />
      <FlatList
        style={
          {
            //marginBottom: 20,
            //marginTop: "10%"
          }
        }
        //contentContainerStyle={{ paddingRight: 10 }}
        //numColumns={1}
        data={users}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("ChatScreen", { item: item })}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
                alignSelf: "center",
                marginBottom: 25
              }}
            >
              <View>
                <Image
                  style={styles.icon}
                  // resizeMode="contain"
                  source={{
                    uri: item.profile
                      ? item.profile.avatar
                      : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }}
                />
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 20,
                    backgroundColor: item.active
                      ? colors.green
                      : colors.grayColor,
                    position: "absolute",
                    alignSelf: "flex-end",
                    right: 5,
                    bottom: 0
                  }}
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{item.username}</Text>
                <Text style={styles.content}>{user[0].comment}</Text>
              </View>
              <View style={styles.dateContainer}>
                {item.read === "" ? (
                  <View style={styles.readContainer}>
                    <Text style={styles.read}>{user[0].read}</Text>
                  </View>
                ) : null}
                <Text style={styles.dateText}>{user[0].time}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 17,
    color: colors.black
  },
  subTitle: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "700"
  },
  titleContainer: {
    right: "90%",
    alignSelf: "center"
  },
  icon: {
    //marginTop: 20,
    //alignSelf: "center"
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
    overflow: "hidden"
    //borderWidth: 3,
    //borderColor: "red"
  },
  content: {
    color: colors.textColor,
    marginTop: 5
  },
  read: {
    textAlign: "right",
    color: colors.white,
    fontSize: 10
  },
  readContainer: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    left: "50%",
    width: 15,
    height: 15,
    borderRadius: 20
  },
  dateText: {
    color: colors.grayColor,
    fontWeight: "500",
    fontSize: 14,
    marginTop: 5
  },
  dateContainer: {
    //flexDirection: "row",
    //justifyContent: "space-between",
    // marginTop: 10,
    alignSelf: "center"
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
