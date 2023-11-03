import axios from "axios"

const BACKEND_URL = 'https://react-native-curso-162e0-default-rtdb.firebaseio.com'

export const storeExpense = async (expenseData) => {
    const response = await axios.post(
      BACKEND_URL + '/expenses.json',
      expenseData
    );
    const id = response.data.name;
    return id;
}

export const getExpenses = async () => {
    try {
        const response = await axios.get(BACKEND_URL + '/expenses.json');
        const expensesArray = [];

        for(const key in response.data) {
            const expenseObj = {
                id: key,
                amount: response.data[key].amount,
                date: new Date(response.data[key].date),
                description: response.data[key].description,
            };

            expensesArray.push(expenseObj);
        }

        return expensesArray;
    } catch(error) {
        throw new Error("Deu erro")
    }
}

export const updateExpense = (id, expenseData) => {
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`)
}