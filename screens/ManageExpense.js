import { View, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import ButtonCustom from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, storeExpense, updateExpense } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const ManageExpense = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isErrorMsgNeeded, setIsErrorMsgNeeded] = useState(false);

  const route = useRoute();
  const expensesContext = useContext(ExpensesContext);

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesContext.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense"
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    try {
      setIsLoading(true);
      await deleteExpense(editedExpenseId);
      expensesContext.deleteExpense(editedExpenseId);
      setIsLoading(false);
      navigation.goBack();
    } catch(error) {
      setIsLoading(false);
      setIsErrorMsgNeeded(true);
    }
  }

  const cancelHandler = () => {
    navigation.goBack();
  }

  const confirmHandler = async (expenseData) => {
    try {
      if(isEditing) {
        setIsLoading(true);
        expensesContext.updateExpense(editedExpenseId,expenseData);
        await updateExpense(editedExpenseId, expenseData);
        setIsLoading(false);
        navigation.goBack();
      } else {
        setIsLoading(true);
        const id = await storeExpense(expenseData);
        expensesContext.addExpense({...expenseData, id: id});
        setIsLoading(false);
        navigation.goBack();
      }
    } catch(error) {
      setIsLoading(false);
      setIsErrorMsgNeeded(true);
    }
  }

  return (
    <View style={styles.container}>
      {isLoading && isErrorMsgNeeded===false && (
        <LoadingOverlay/>
      )}
      {!isLoading && isErrorMsgNeeded === false && (
        <>
        <ExpenseForm 
            onCancel={cancelHandler}
            onSubmit={confirmHandler}
            selectedExpense={selectedExpense}
            submitButtonLabel={isEditing ? "Update" : "Add"}
          />
          {isEditing && (
            <View style={styles.deleteContainer}>
              <IconButton 
                icon="trash"
                color={GlobalStyles.colors.error500}
                size={24}
                onPress={deleteExpenseHandler}
              />
            </View>
          )}
        </>
      )}  
      {isErrorMsgNeeded && (
        <ErrorOverlay onConfirm={() => setIsErrorMsgNeeded(false)} text="We couldn't do your action. Please, try later"/>
      )}
    </View>
  )
};

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth:2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  }
});