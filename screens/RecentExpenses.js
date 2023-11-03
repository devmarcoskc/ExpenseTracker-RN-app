import ExpensesOutput from "../components/Expenses/ExpensesOutput";
import { useContext, useEffect, useState } from "react";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../utils/date";
import { getExpenses } from "../utils/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

const RecentExpenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(false);

  const expensesContext = useContext(ExpensesContext);

  const getExpensesData = async () => {
    try {
      setIsLoading(true);
      const response = await getExpenses();
      expensesContext.setExpenses(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(true);
    }
  }

  useEffect(() => {
    getExpensesData();
  }, []);

  const recentExpenses = expensesContext.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  })

  return (
    <>
      {isLoading ? (
        <LoadingOverlay/>
      ) : (
        <ExpensesOutput expenses={recentExpenses} expensesPeriod="Last 7 days" fallBackText="No expenses in last 7 days"/>
      )}
      {errorMessage && (
        <ErrorOverlay onConfirm={() => setErrorMessage(false)} text="We couldn't loading your expenses"/>
      )}
    </>
  )
};

export default RecentExpenses;