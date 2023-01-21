import React from 'react'
import TopHeader from '../../components/TopHeader'
import DishesTab from '../../components/Searchs/SearchTabs/DishesTab'
import PeopleTab from '../../components/Searchs/SearchTabs/PeopleTab'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { Appearance, View, Dimensions } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

interface TypedProps {
  userId: string
}

const Tab = createMaterialTopTabNavigator()

const SearchLayout: React.FC<TypedProps> = ({ userId }) => {

  // detect the default color scheme of devices (light mode or dark mode) *REACT NATIVE
  const colorScheme = Appearance.getColorScheme()

  const screen = Dimensions.get("screen")

  const DishesTabComponent = () => {
    return (
      <DishesTab userId={userId} />
    )
  }

  const PeopleTabComponent = () => {
    return (
      <PeopleTab userId={userId} />
    )
  }

  return (
    <View style={tw`flex-1 flex-col w-full`}>
      <TopHeader
        title="Search"
        subtitle="Browse and Explore"
      />
      <View style={{ flex: 1, marginTop: -10, height: screen.height }}>
        <Tab.Navigator
          initialRouteName="DishesTab"
          backBehavior='none'
          screenOptions={{
            tabBarActiveTintColor: `${colorScheme === 'dark' ? '#FFFFFF' : '#414143'}`,
            tabBarLabelStyle: [tw`text-[12px]`, fonts.fontPoppins],
            tabBarIndicatorStyle: [tw`bg-[#F3B900]`],
            tabBarStyle: [tw`bg-white dark:bg-[#262626]`],
            tabBarPressColor: '#F3B900'
          }}
        >
          <Tab.Screen
            name="DishesTab"
            component={DishesTabComponent}
            options={{ tabBarLabel: 'Dishes' }}
          />
          <Tab.Screen
            name="PeopleTab"
            component={PeopleTabComponent}
            options={{ tabBarLabel: 'People' }}
          />
        </Tab.Navigator>
      </View>
    </View>
  )
}

export default SearchLayout