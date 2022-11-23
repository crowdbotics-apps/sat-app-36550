import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native"
import React from "react"
import { colors } from "../utils/colors"
import Header from "../components/Header"
import Button from "../components/Button"
import WebHeader from "../components/WebHeader"
import { isWeb } from "../utils/isweb"

export default function Privacy({ navigation }) {
  return (
    <SafeAreaView style={styles.body}>
      <View
        style={{
          paddingLeft: isWeb() ? "15%" : null,
          paddingRight: isWeb() ? "15%" : null,
          marginTop: isWeb() ? "5%" : null
        }}
      >
        <View style={{ marginTop: isWeb() ? 10 : null }}>
          <Header
            onPress={() => navigation.goBack()}
            detail={true}
            title={"Privacy Policy"}
            width={"80%"}
          />
        </View>

        {isWeb() ? (
          <>
            <View
              style={{
                borderBottomColor: colors.grayColor,
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginTop: 20,
                marginLeft: 20,
                marginRight: 20
              }}
            />
          </>
        ) : null}
        <ScrollView>
          <View style={styles.container}>
            <Text style={styles.title}>My Prof Privacy Policy</Text>
            <Text style={styles.subTitle}>
              Most people have headaches from time to time. But if you have a
              headache more days than not, you might have chronic daily
              headaches.
              {"\n"}
              {"\n"}Rather than a specific headache type, chronic daily
              headaches include a variety of headache subtypes. Chronic refers
              to how often the headaches occur and how long the condition lasts.
              {"\n"}
              {"\n"}
              <Text style={{ fontWeight: "bold" }}>Chronic migraine</Text> :
              This type typically occurs in people with a history of episodic
              migraines.
              {"\n"}
              {"\n"}Affect one side or both sides of your head
              {"\n"}Have a pulsating, throbbing sensation
              {"\n"}Cause moderate to severe pain
              {"\n"}And they cause at least one of the following:
              {"\n"}
              {"\n"}Nausea, vomiting or both
              {"\n"}Sensitivity to light and sound
            </Text>

            <Text style={styles.subTitle}>
              Most people have headaches from time to time. But if you have a
              headache more days than not, you might have chronic daily
              headaches.
              {"\n"}
              {"\n"}Rather than a specific headache type, chronic daily
              headaches include a variety of headache subtypes. Chronic refers
              to how often the headaches occur and how long the condition lasts.
              {"\n"}
              {"\n"}
              <Text style={{ fontWeight: "bold" }}>Chronic migraine</Text> :
              This type typically occurs in people with a history of episodic
              migraines.
              {"\n"}
              {"\n"}Affect one side or both sides of your head
              {"\n"}Have a pulsating, throbbing sensation
              {"\n"}Cause moderate to severe pain
              {"\n"}And they cause at least one of the following:
              {"\n"}
              {"\n"}Nausea, vomiting or both
              {"\n"}Sensitivity to light and sound
            </Text>
          </View>
        </ScrollView>
      </View>
      {isWeb() ? (
        <>
          <WebHeader navigation={navigation} />
        </>
      ) : null}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "600",
    fontSize: 24,
    marginBottom: 10
  },
  subTitle: {
    color: colors.textColor,
    marginTop: 20,
    marginBottom: 20
  },
  container: {
    padding: 20,
    backgroundColor: colors.whiteBackground,
    margin: 20,
    marginBottom: 10,
    borderRadius: 10
  }
})
