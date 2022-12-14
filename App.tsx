import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SignInScreen from './src/pages/MainScreen/Auth/SignInScreen'
import SignUpScreen from './src/pages/MainScreen/Auth/SignUpScreen'
import ForgotPasswordScreen from './src/pages/MainScreen/ForgotPasswordScreen'
import HomeScreen from './src/pages/MainScreen/HomeScreen'
import CreateDishScreen from './src/pages/DishesScreen/CreateDishScreen'
import EditDishScreen from './src/pages/DishesScreen/EditDishScreen'
import SaveDishScreen from './src/pages/MainScreen/SaveDishScreen'
import SearchScreen from './src/pages/MainScreen/SearchScreen'
import NotificationScreen from './src/pages/MainScreen/NotificationScreen'
import DisplayDishScreen from './src/pages/DishesScreen/DisplayDishScreen'
import UserScreen from './src/pages/ProfileScreen/UserScreen'
import UserSettingScreen from './src/pages/ProfileScreen/UserSettingScreen'
import MainSplashScreen from './src/components/SplashScreens/MainSplashScreen'
import AboutScreen from './src/pages/MainScreen/Misc/AboutScreen'
import PrivacyPolicyScreen from './src/pages/MainScreen/Misc/PrivacyPolicyScreen'
import tw from 'twrnc'
import { useDeviceContext, useAppColorScheme } from 'twrnc'
import { AppStateStatus, Appearance, Platform, StatusBar } from 'react-native'
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from './src/utils/RootNavigation'
import { useAppState } from './src/hooks/useAppState'
import { useCheckOnline } from './src/hooks/useCheckOnline'
import { useOnlineManager } from './src/lib/ReactQuery'

const onAppStateChange = (status: AppStateStatus) => {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } }
})

const Stack = createNativeStackNavigator()

const App = () => {

  // Set default theme of the app (set both React Native and TailwindCSS)
 const colorScheme = Appearance.getColorScheme()
  
  // Set default theme of the app (set both React Native and TailwindCSS)
  useDeviceContext(tw, { withDeviceColorScheme: true })

  // checking the session
  const [session, setSession] = React.useState<string>()

  React.useEffect(() => {
    setInterval(async () => {
      const cookies: any = await AsyncStorage.getItem('COOKIES')
      setSession(cookies)
    }, 500)
  }, [])

  // check online and offline state for react-query
  useOnlineManager()

  // check appstate if the app is running in the background
  useAppState(onAppStateChange)

  // getting the online and offline state
  const checkOnline = useCheckOnline()

  if ((checkOnline !== null && !checkOnline)) return <MainSplashScreen />

  return (
    <React.Fragment>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer ref={navigationRef}>
          <StatusBar
            animated={false}
            backgroundColor={colorScheme === 'dark' ? '#262626' : '#FFFFFF'}
            barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
          />
          <Stack.Navigator>
            {session === null
              ? <>
                  <Stack.Screen
                    name="SignInScreen"
                    component={SignInScreen}
                    options={{
                      headerShown: false,
                      animation: 'none'
                    }}
                  />
                  <Stack.Screen
                    name="SignUpScreen"
                    component={SignUpScreen}
                    options={{
                      headerShown: false,
                      animation: 'none'
                    }}
                  />
                  <Stack.Screen
                    name="ForgotPasswordScreen"
                    component={ForgotPasswordScreen}
                    options={{
                      headerShown: false,
                      animation: 'none'
                    }}
                  />
                </>
              : <>
                  <Stack.Screen
                    name="HomeScreen"
                    component={HomeScreen}
                    options={{
                      headerShown: false,
                      animation: 'none'
                    }}
                  />
                  <Stack.Screen
                    name="SearchScreen"
                    component={SearchScreen}
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
                    name="EditDishScreen"
                    component={EditDishScreen}
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
                    name="NotificationScreen"
                    component={NotificationScreen}
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
                  <Stack.Screen
                    name="UserScreen"
                    component={UserScreen}
                    options={{
                      headerShown: false,
                      animation: 'none'
                    }}
                  />
                  <Stack.Screen
                    name="UserSettingScreen"
                    component={UserSettingScreen}
                    options={{
                      headerShown: false,
                      animation: 'none'
                    }}
                  />
                  <Stack.Screen
                    name="AboutScreen"
                    component={AboutScreen}
                    options={{
                      headerShown: false,
                      animation: 'none'
                    }}
                  />
                  <Stack.Screen
                    name="PrivacyPolicyScreen"
                    component={PrivacyPolicyScreen}
                    options={{
                      headerShown: false,
                      animation: 'none'
                    }}
                  />
                </>
            }
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App