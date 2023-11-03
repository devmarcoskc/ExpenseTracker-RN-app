import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons'

import ExpensesContextProvider from './store/expenses-context';
import ManageExpense from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import IconButton from './components/UI/IconButton';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const ExpensesOverview = () => {
  return (
    <BottomTab.Navigator screenOptions={({ navigation }) => ({
      headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
      headerTintColor: 'white',
      tabBarStyle: {backgroundColor: GlobalStyles.colors.primary500},
      tabBarActiveTintColor: GlobalStyles.colors.accent500,
      headerRight: ({tintColor}) => (
        <IconButton 
          icon="add"
          size={24}
          color={tintColor}
          onPress={() => {
            navigation.navigate("ManageExpense");
          }}
        />
      )
    })}>
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title:"Recent Expenses",
          tabBarLabel: "Recent",
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons 
              name="hourglass"
              size={size}
              color={color}
            />
          )
        }}
      />
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title:"All Expenses",
          tabBarLabel: "Expenses",
          tabBarLabelStyle: {
            fontSize: 14
          },
          tabBarIcon: ({color, size}) => (
            <Ionicons 
              name="calendar"
              size={size}
              color={color}
            />
          )
        }}
      />
    </BottomTab.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style="light"/>
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator 
            initialRouteName='ExpensesOverview'
            screenOptions={{
              headerStyle: {backgroundColor: GlobalStyles.colors.primary500},
              headerTintColor: "white",
            }}
          >
            <Stack.Screen 
              name="ExpensesOverview" 
              component={ExpensesOverview}
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen 
              name="ManageExpense" 
              component={ManageExpense}
              options={{
                title:"Manage Expense",
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
