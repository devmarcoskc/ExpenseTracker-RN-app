import { View, Text, TextInput,
StyleSheet, Alert } from "react-native";
import Input from "./Input";
import { useState } from "react";
import ButtonCustom from "../UI/Button";
import { GlobalStyles } from "../../constants/styles";

const ExpenseForm = ({onCancel, selectedExpense, onSubmit, submitButtonLabel}) => {
  const [inputs, setInputs] = useState({
    amount: {
      value: selectedExpense ? selectedExpense.amount.toString() : '',
      isValid: true
    },
    date: {
      value: selectedExpense ? selectedExpense.date.toISOString().slice(0, 10) : '',
      isValid: true
    },
    description: {
      value: selectedExpense ? selectedExpense.description.toString() : '',
      isValid: true
    },
  });

  const inputChangeHandler = (inputIdentifier, enteredText) => {
    setInputs((currentInputs) => {
      return {
        ...currentInputs,
        [inputIdentifier]: {value: enteredText, isValid: true},
      }
    })
  }

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    }

    const amountIsValid =!isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if(!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: {
            value: currentInputs.amount.value, 
            isValid: amountIsValid
          },
          date: {
            value: currentInputs.date.value, 
            isValid: dateIsValid
          },
          description: {
            value: currentInputs.description.value, 
            isValid: descriptionIsValid
          }
        }
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid = !inputs.amount.isValid || !inputs.date.isValid || !inputs.description.isValid;
  
  return (
    <View style={styles.formContainer}>
      <Text style={styles.titleStyle}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input 
          style={styles.rowInputStyle}
          label="Amount"
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, 'amount'),
            value: inputs.amount.value
          }}
        />
        <Input 
          style={styles.rowInputStyle}
          label="Date"
          invalid={!inputs.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, 'date'),
            value: inputs.date.value
          }}
        />
      </View>
      <Input 
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChangeHandler.bind(this, 'description'),
          value: inputs.description.value
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid values, please check it!</Text>
      )}
      <View style={styles.buttonsArea}>
        <ButtonCustom
          style={styles.buttonStyle}
          mode="flat"
          onPress={onCancel}
        >
          Cancel
        </ButtonCustom>
        <ButtonCustom
          style={styles.buttonStyle}
          onPress={submitHandler}
        >
          {submitButtonLabel}
        </ButtonCustom>
      </View>
    </View>
  )
}

export default ExpenseForm;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: 40,
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center"
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rowInputStyle: {
    flex: 1
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttonsArea: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    minWidth: 120,
    marginHorizontal: 8
  },
})