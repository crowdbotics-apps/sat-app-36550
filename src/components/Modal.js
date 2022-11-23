import React from "react"
import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native"
import { colors } from "../utils/colors"
import { isWeb } from "../utils/isweb"
import Button from "./Button"
import Input from "./Input"

const MetricModal = ({
  onCancel,
  onSave,
  isModalVisible,
  title,
  value,
  onChangeText,
  rightButton,
  placeholder,
  textArea,
  content,
  btn,
  hideInput
}) => (
  <Modal transparent={true} visible={isModalVisible} animationType="fade">
    <View style={styles.modal}>
      <View style={styles.modalContainer}>
        <View style={{ padding: 20, width: "100%" }}>
          <Text style={styles.modalTitle}>{title}</Text>
          {content ? <Text style={styles.content}>{content}</Text> : null}
          {hideInput === true ? (
            <Text style={styles.content}>{content}</Text>
          ) : (
            <Input
              value={value}
              onChangeText={onChangeText}
              placeholder={placeholder ? placeholder : "Sign here"}
              textArea={textArea ? textArea : null}
            />
          )}
        </View>
        <View style={{ width: "70%", alignSelf: "center", marginBottom: 20 }}>
          <Button
            name={btn ? btn : "Save"}
            // width={"50%"}
            onPress={onSave}
            // borderWidth={1}
            backgroundColor={colors.orange}
            // borderColor={colors.orange}
            borderRadius={30}
            color={colors.white}
          />
          <Button
            name={"Cancel"}
            // width={"50%"}
            onPress={onCancel}
            borderWidth={1}
            backgroundColor={colors.whiteBackground}
            borderColor={colors.orange}
            borderRadius={30}
            color={colors.orange}
          />
        </View>
      </View>
    </View>
  </Modal>
)
const styles = StyleSheet.create({
  buttonText: {
    color: colors.blue,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    padding: 10
  },
  button: {
    padding: 10,
    borderColor: colors.border,
    flex: 1,
    fontSize: 12
  },
  containerButton: {
    borderTopWidth: 1,
    borderColor: colors.border,
    // flexWrap: 'wrap',
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalInput: {
    color: colors.white
  },
  modalTitle: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 16,
    paddingTop: 10,
    textAlign: "center"
  },
  modalContainer: {
    backgroundColor: colors.white,
    alignItems: "center",
    borderRadius: 15
  },
  modal: {
    padding: 15,
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
    justifyContent: "center",
    alignItems: isWeb() ? "center" : null
  },
  content: {
    color: colors.textColor,
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
    fontSize: 16
  }
})

export default MetricModal
