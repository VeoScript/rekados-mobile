import React from 'react'
import SearchResultDisplay from '../SearchResultDisplay'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { MaterialIcon } from '../../../utils/Icons'
import { Toast } from '../../../utils/Toast'
import { TouchableOpacity, View, ScrollView, TextInput, Text } from 'react-native'

const PeopleTab = () => {

  const [search, setSearch] = React.useState<string>('')
  
  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView>
        <View style={tw`flex-col items-start justify-center w-full px-3`}>
          <View style={tw`flex-row items-center justify-between w-full overflow-hidden mt-3 px-3 rounded-xl border border-neutral-200 bg-white`}>
            <TextInput
              style={[tw`text-sm w-full`, fonts.fontPoppins]}
              placeholder="Search people..."
              value={search}
              onChangeText={(value: string) => {
                setSearch(value)
              }}
            />
            <TouchableOpacity
              style={tw`flex-row w-full -ml-3`}
              onPress={() => {
                setSearch('')
              }}
            >
              <MaterialIcon
                size="small"
                name="x"
                color="#7c7c7c"
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`flex-col w-full px-3 py-3`}>
          <View style={tw`flex-row items-center justify-between w-full pb-5`}>
            <Text style={[tw`text-sm text-neutral-500`, fonts.fontPoppinsBold]}>Recent</Text>
            <TouchableOpacity
              onPress={() => {
                Toast('You pressed clear all recent search history.')
              }}
            >
              <Text style={[tw`text-sm text-yellow-500`, fonts.fontPoppinsLight]}>Clear all</Text>
            </TouchableOpacity>
          </View>
          <SearchResultDisplay
            image="https://i.pinimg.com/originals/15/8c/51/158c5113e3001ede9b0c05afc76eace7.jpg"
            title="People Name"
            description="People Description"
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default PeopleTab