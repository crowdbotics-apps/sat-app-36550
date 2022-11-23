import React from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { colors } from "../utils/colors"
import { isWeb } from "../utils/isweb"

// import { ViewStyle } from 'react-native-phone-input';
// import { fontFamily } from '../styles/typography';

const CodeInputDisplay = ({ code, style = {}, onPress }) => {
  console.log(onPress)
  return (
    <Pressable onPress={onPress}>
      <View style={[styles.container, style]}>
        <View
          style={[
            styles.codeNumber,
            { backgroundColor: code[0] ? colors.orange : null }
          ]}
        >
          <Text style={styles.codeNumberText}>{code[0] || ""}</Text>
        </View>
        <View
          style={[
            styles.codeNumber,
            { backgroundColor: code[1] ? colors.orange : null }
          ]}
        >
          <Text style={styles.codeNumberText}>{code[1] || ""}</Text>
        </View>
        <View
          style={[
            styles.codeNumber,
            { backgroundColor: code[2] ? colors.orange : null }
          ]}
        >
          <Text style={styles.codeNumberText}>{code[2] || ""}</Text>
        </View>
        <View
          style={[
            styles.codeNumber,
            { backgroundColor: code[3] ? colors.orange : null }
          ]}
        >
          <Text style={styles.codeNumberText}>{code[3] || ""}</Text>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 10,
    justifyContent: isWeb() ? "center" : null
  },
  codeNumber: {
    // backgroundColor: '#F3F3FA',
    width: 50,
    height: 50,
    marginHorizontal: 9,

    justifyContent: "center",
    alignItems: "center",

    borderWidth: 1,
    borderRadius: 5,
    borderColor: colors.grayColor
    // shadowColor: '#2e5bff',
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.07,
    // shadowRadius: 2.22,
    // elevation: 3,
  },
  codeNumberText: {
    // fontSize: Typography.FONT_SIZE_18,
    // fontFamily: Typography.FONT_FAMILY_Montserrat_REGULAR,
    color: "#fff",
    fontSize: 16,
    fontWeight: "900"
    // ...fontFamily.Demi,
  }
})

export default CodeInputDisplay
