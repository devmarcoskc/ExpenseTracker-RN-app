import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expenses-context";

const AllExpenses = () => {
  const expensesContext = useContext(ExpensesContext);
  return (
    <ExpensesOutput expenses={expensesContext.expenses} expensesPeriod="total" fallBackText="No expenses finded"/>
  )
};

export default AllExpenses;