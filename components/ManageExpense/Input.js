import {  View, Text, TextInput,
StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const Input = ({label, style, textInputConfig, invalid}) => {
  let inputStyles = [styles.inputStyle];

  if(textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if(invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.labelStyle, invalid && styles.invalidLabel]}>{label}</Text>
      <TextInput
        style={inputStyles}
        {...textInputConfig}
      />
    </View>
  )
}

export default Input;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  labelStyle: {
    fontSize: 14,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4
  },
  inputStyle: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top"
  },
  invalidLabel: {
    color: GlobalStyles.colors.error500,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50
  }
});