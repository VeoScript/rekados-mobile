import React from 'react'
import HomeScreen from './src/pages/MainScreen/HomeScreen'
import CreateDishScreen from './src/pages/MainScreen/CreateDishScreen'
import SaveDishScreen from './src/pages/MainScreen/SaveDishScreen'
import LocationScreen from './src/pages/MainScreen/LocationScreen'
import DisplayDishScreen from './src/pages/DishesScreen/DisplayDishScreen'
import { StatusBar } from 'react-native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const queryClient = new QueryClient()

const Stack = createNativeStackNavigator()

const App = () => {
  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <StatusBar
            animated={false}
            backgroundColor="#FFFFFF"
            barStyle="dark-content"
          />
          <Stack.Navigator>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
                animation: 'none'
              }}
            />
            <Stack.Screen
              name="CreateDishScreen"
              component={CreateDishScreen}
              options={{
                headerShown: false,
                animation: 'none'
              }}
            />
            <Stack.Screen
              name="SaveDishScreen"
              component={SaveDishScreen}
              options={{
                headerShown: false,
                animation: 'none'
              }}
            />
            <Stack.Screen
              name="LocationScreen"
              component={LocationScreen}
              options={{
                headerShown: false,
                animation: 'none'
              }}
            />
            <Stack.Screen
              name="DisplayDishScreen"
              component={DisplayDishScreen}
              options={{
                headerShown: false,
                animation: 'none'
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App