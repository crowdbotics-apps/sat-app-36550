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
import { logout } from "../redux/auth/actions"
import DocSigned from "./DocSigned"
import DocUnsigned from "./DocUnsigned"

const DocScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const onLogout = () => {
    dispatch(logout())
  }
  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: undefined
      }
    })
  }, [navigation])
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: "first", title: "Signed" },
    { key: "second", title: "Pending Sign" }
  ])

  const renderScene = SceneMap({
    first: props => <DocSigned navigation={navigation} {...props} />,
    second: props => <DocUnsigned navigation={navigation} {...props} />
  })

  const renderTabBar = props => (
    <View
      style={{
        marginTop: 20
      }}
    >
      <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: colors.orange }}
        style={{
          backgroundColor: colors.backgroundColor,
          color: "#000"
          //width: isWeb() ? 500 : null,
        }}
        getLabelText={({ route }) => route.title}
        renderLabel={({ route }) => (
          <View>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textAlign: "center",
                color:
                  route.key ===
                  props.navigationState.routes[props.navigationState.index].key
                    ? colors.orange
                    : "gray"
              }}
            >
              {route.title}
            </Text>
          </View>
        )}
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.body}>
      <View>
        <Header chat={true} title={"Docs"} />
      </View>
      <TabView
        navigationState={{ index, routes }}
        renderTabBar={renderTabBar}
        renderScene={renderScene}
        onIndexChange={setIndex}
        //initialLayout={{ width: layout.width }}
      />
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
    flex: 1,
    backgroundColor: colors.backgroundColor,
    alignItems: isWeb() ? "center" : null
  }
})
export default DocScreen
