import React from 'react'
import TopHeader from '../../components/TopHeader'
import DishesTab from '../../components/Searchs/SearchTabs/DishesTab'
import PeopleTab from '../../components/Searchs/SearchTabs/PeopleTab'
import tw from 'twrnc'
import { fonts } from '../../styles/global'
import { View, Dimensions } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

const SearchLayout = () => {

  const screen = Dimensions.get("screen")

  const DishesTabComponent = () => {
    return (
      <DishesTab
        image="https://i.pinimg.com/originals/15/8c/51/158c5113e3001ede9b0c05afc76eace7.jpg"
        title="Dishes Name"
        description="Dishes Description"
      />
    )
  }

  const PeopleTabComponent = () => {
    return (
      <PeopleTab
        image="https://i.pinimg.com/originals/15/8c/51/158c5113e3001ede9b0c05afc76eace7.jpg"
        title="People Name"
        description="People Description"
      />
    )
  }

  return (
    <View style={tw`flex-1 flex-col w-full`}>
      <TopHeader
        title="Search"
        subtitle="Browse and Explore"
      />
      <View style={{ flex: 1, height: screen.height }}>
        <Tab.Navigator
          initialRouteName="SearchTab"
          screenOptions={{
            tabBarActiveTintColor: '#414143',
            tabBarLabelStyle: [tw`text-[12px]`, fonts.fontPoppins],
            tabBarIndicatorStyle: [tw`bg-[#F3B900]`],
            tabBarStyle: [tw`bg-neutral-50`],
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