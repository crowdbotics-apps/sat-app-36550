import {
  Image,
  Linking,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native"
import React, { useCallback, useEffect, useLayoutEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import Header from "../components/Header"
import { colors } from "../utils/colors"
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot
} from "firebase/firestore"
import { auth, db } from "../utils/firebase"
import DocumentPicker from "react-native-document-picker"
import {
  GiftedChat,
  InputToolbar,
  Send,
  Bubble
} from "react-native-gifted-chat"
import { uploadFile } from "../utils/helpers"

export default function ChatScreen({ navigation, route }) {
  const [messages, setMessages] = useState([])
  const sender = useSelector(state => state.App.profile)
  const [otherUser, setOtherUser] = useState(route.params.item)

  const onSend = useCallback(
    (messages = []) => {
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages)
      )
      const { _id, createdAt, text, user } = messages[0]
      const tag = sender.id + otherUser.id

      addDoc(collection(db, "chats"), { _id, createdAt, tag, text, user })
    },
    [otherUser.id, sender.id]
  )

  useLayoutEffect(() => {
    const q = query(
      collection(db, "chats"),
      where("tag", "==", sender.id + otherUser.id),
      orderBy("createdAt", "desc")
    )
    const unsubscribe = onSnapshot(q, snapshot =>
      setMessages(
        snapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          image: doc.data().image,
          file: doc.data().file,
          user: doc.data().user
        }))
      )
    )

    return () => {
      unsubscribe()
    }
  }, [otherUser.id, sender.id])

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: undefined
      }
    })
  }, [navigation])

  const renderSend = props => {
    return (
      <View style={{ alignItems: "center" }}>
        <Send {...props}>
          <Image
            style={{ alignSelf: "center", marginBottom: 10 }}
            resizeMode="contain"
            source={require("../assets/send.png")}
          />
        </Send>
      </View>
    )
  }

  async function sendFile(uri, roomPath, size) {
    const { url, fileName } = await uploadFile(uri, `files`)
    console.log(url, fileName, size)

    const user = {
      _id: sender?.email,
      name: sender.username,
      avatar: sender.profile
        ? sender.profile.avatar
        : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    }

    const message = {
      _id: sender.email,
      text: "",
      createdAt: new Date(),
      tag: sender.id + otherUser.id,
      user: user,
      file: {
        name: fileName,
        url: url,
        size: size
      }
    }
    addDoc(collection(db, "chats"), message)
  }

  const pickFiles = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      })
      console.log(res)
      sendFile(res[0].uri, `files/chats/${res[0].name}`, res[0].size)
    } catch (err) {
      console.log("err :>> ", err)
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  }

  const renderCustomView = props => {
    if (props.currentMessage.file) {
      return (
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(props.currentMessage.file.url)
          }}
          style={{ flexDirection: "row", marginTop: 5 }}
        >
          <View
            style={{
              backgroundColor: colors.backOrange,
              padding: 10,
              width: 80,
              height: 70,
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                color: colors.orange,
                fontSize: 24,
                fontWeight: "bold"
              }}
            >
              PDF
            </Text>
          </View>
          <View style={{ marginLeft: 20, justifyContent: "center" }}>
            <Text style={{ marginBottom: 5 }}>
              {props.currentMessage.file.name}
            </Text>
            <Text style={{}}>
              {props.currentMessage.file.size / 100000 + " MB"}
            </Text>
          </View>
        </TouchableOpacity>
      )
    }
    return null
  }

  const renderInputToolbar = props => {
    return (
      <View
        style={{
          flexDirection: "row"
        }}
      >
        <TouchableOpacity
          onPress={() => pickFiles()}
          style={{
            marginBottom: 10,
            marginLeft: 10
          }}
        >
          <Image
            style={{ width: 30, height: 30, marginRight: 20 }}
            resizeMode="contain"
            source={require("../assets/attachment.png")}
          />
        </TouchableOpacity>
        <View style={{ flex: 1, marginHorizontal: 0 }}>
          <InputToolbar
            containerStyle={{
              //backgroundColor: "rgba(55, 55, 55, 1)",
              //borderRadius: 10
              paddingLeft: 20,
              paddingRight: 10
            }}
            {...props}
          />
        </View>
      </View>
    )
  }

  const renderBubble = props => (
    <Bubble
      {...props}
      containerStyle={
        {
          //left: { zIndex: -1, marginLeft: 10, marginTop: 20 },
          //right: { zIndex: -1, marginRight: 10, marginTop: 50 }
        }
      }
      timeTextStyle={{
        right: { color: "#fff" },
        left: { color: "#000" }
      }}
      wrapperStyle={{
        left: {
          backgroundColor: colors.whiteBackground,
          //   borderWidth: 1,
          borderColor: "#34AF66",
          padding: 5
        },
        right: {
          backgroundColor: colors.orange,
          borderColor: "#F5C25B",
          padding: 5
        }
      }}
      bottomContainerStyle={{
        left: {},
        right: {}
      }}
      tickStyle={{}}
      usernameStyle={{}}
      containerToNextStyle={{
        left: {},
        right: {}
      }}
      containerToPreviousStyle={{
        left: {},
        right: {}
      }}
    />
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View>
        <Header
          chatscreen={true}
          onPress={() => navigation.goBack()}
          title={otherUser.username}
        />
      </View>
      <View
        style={{
          borderBottomColor: colors.grayColor,
          borderBottomWidth: StyleSheet.hairlineWidth,
          //  marginBottom: 20,
          marginTop: 20
        }}
      />
      <View style={{ flex: 1 }}>
        <GiftedChat
          renderInputToolbar={renderInputToolbar}
          renderBubble={renderBubble}
          alignTop
          renderSend={renderSend}
          // showUserAvatar
          renderCustomView={renderCustomView}
          messages={messages}
          onSend={messages => onSend(messages)}
          user={{
            _id: sender?.email,
            name: sender.username,
            avatar: sender.profile
              ? sender.profile.avatar
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          }}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})
