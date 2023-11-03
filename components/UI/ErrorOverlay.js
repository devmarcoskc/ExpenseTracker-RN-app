import { View, Text ,StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import ButtonCustom from "./Button";

const ErrorOverlay = ({text, onConfirm}) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.textStyle, styles.titleStyle]}>An Error occurred!</Text>
      <Text style={styles.textStyle}>{text}</Text>
      <ButtonCustom onPress={onConfirm}>Okay</ButtonCustom>
    </View>
  )
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700
  },
  textStyle: {
    textAlign: "center",
    marginBottom:  8,
    color: "white",
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
})