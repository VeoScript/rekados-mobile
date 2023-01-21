import React from 'react'
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
import { useDeviceContext } from 'twrnc'
import { AppStateStatus, Appearance, Platform, StatusBar } from 'react-native'
import { focusManager, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from './src/utils/RootNavigation'
import { useGuard } from './src/hooks/useGuard'
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

  // checking if the user is logged in...
  const isAuth = useGuard()

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
          <Stack.Navigator screenOptions={{ headerShown: false, animation: 'none' }}>
            {!isAuth
              ? <>
                  <Stack.Screen name="SignInScreen" component={SignInScreen} />
                  <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
                  <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} />
                </>
              : <>
                  <Stack.Screen name="HomeScreen" component={HomeScreen} />
                  <Stack.Screen name="SearchScreen" component={SearchScreen} />
                  <Stack.Screen name="CreateDishScreen" component={CreateDishScreen} />
                  <Stack.Screen name="EditDishScreen" component={EditDishScreen} />
                  <Stack.Screen name="SaveDishScreen" component={SaveDishScreen} />
                  <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
                  <Stack.Screen name="DisplayDishScreen" component={DisplayDishScreen} />
                  <Stack.Screen name="UserScreen" component={UserScreen} />
                  <Stack.Screen name="UserSettingScreen" component={UserSettingScreen} />
                  <Stack.Screen name="AboutScreen" component={AboutScreen} />
                  <Stack.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />
                </>
            }
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </React.Fragment>
  )
}

export default App