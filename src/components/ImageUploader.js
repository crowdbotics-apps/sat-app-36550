import React, { useState } from "react"
import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native"
import ActionSheet from "./ActionSheet"
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker, { ImageOrVideo } from "react-native-image-crop-picker"

import { colors } from "../utils/colors"

const ImageUploader = ({ onUpload, children }) => {
  const [optionsVisible, setVisible] = useState(false)
  const options = ["Take a Picture", "Choose from Photos", "Cancel"]

  const onPress = (o, buttonIndex) => {
    if (buttonIndex === 0) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        if (image) {
          setVisible(false)
          onUpload(image)
        }
      })
    } else if (buttonIndex === 1) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        if (image) {
          setVisible(false)
          onUpload(image)
        }
      })
    } else {
      setVisible(false)
    }
  }

  if (children) {
    return (
      <>
        <TouchableOpacity onPress={() => setVisible(true)}>
          {children}
        </TouchableOpacity>
        <ActionSheet
          isModalVisible={optionsVisible}
          setModalVisible={setVisible}
          onPress={onPress}
          options={options}
        />
      </>
    )
  }

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.uploadContainer}>
        <Text style={styles.upload}>Upload photo</Text>
      </TouchableOpacity>
      <ActionSheet
        isModalVisible={optionsVisible}
        setModalVisible={setVisible}
        onPress={onPress}
        options={options}
      />
    </>
  )
}

const { width } = Dimensions.get("window")

const styles = StyleSheet.create({
  uploadContainer: {
    backgroundColor: colors.grayLight,
    borderRadius: 10,
    padding: 15,
    marginTop: 15,
    width: width * 0.5,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center"
  },
  upload: {
    color: colors.white,
    backgroundColor: colors.blue,
    padding: 16,
    paddingHorizontal: 25,
    fontWeight: "bold",
    borderRadius: 40,
    textAlign: "center",
    fontSize: 16
  }
})

export default ImageUploader
