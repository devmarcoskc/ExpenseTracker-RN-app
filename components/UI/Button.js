import { View, TouchableOpacity, Text,
StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

const ButtonCustom = ({children, onPress, mode, style}) => {
  return (
    <View style={style}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.buttonStyle, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

export default ButtonCustom;

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  flat: {
    backgroundColor: "transparent"
  },
  buttonText: {
    color: "white",
    textAlign: "center"
  },
  flatText: {
    color: GlobalStyles.colors.primary200
  }
})