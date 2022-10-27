import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SearchResultDisplay from '../SearchResultDisplay'
import SearchResultsLoader from '../../SkeletonLoaders/SearchResultsLoader'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { MaterialIcon } from '../../../utils/Icons'
import { TouchableOpacity, View, ScrollView, TextInput, Text, Alert } from 'react-native'
import { useGetUserSearch } from '../../../lib/ReactQuery'

const PeopleTab = () => {

  const [search, setSearch] = React.useState<string>('')

  const { data: userResults, isLoading, isError } = useGetUserSearch(search)

  const [peopleRecentSearches, setPeopleRecentSearches] = React.useState<any>([])

  const clearRecentPeopleHistory = async () => {
    await AsyncStorage.removeItem('DISH_PEOPLE_HISTORY')
    setPeopleRecentSearches([])
  }

  const getSearchHistory = async () => {
    const getPeopleSearchHistory: any = await AsyncStorage.getItem('DISH_PEOPLE_HISTORY')
    setPeopleRecentSearches(JSON.parse(getPeopleSearchHistory))
  }
  
  peopleRecentSearches?.sort((a: any, b: any) => {
    const date1 = new Date(a.updatedAt).getTime()
    const date2 = new Date(b.updatedAt).getTime()
    return date1 < date2 ? 1 : -1
  })

  React.useEffect(() => {
    getSearchHistory()
  }, [userResults, clearRecentPeopleHistory])
  
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
        {!search && (
            <React.Fragment>
              <View style={tw`flex-row items-center justify-between w-full pb-5`}>
                <Text style={[tw`text-sm text-neutral-500`, fonts.fontPoppinsBold]}>Recent</Text>
                {peopleRecentSearches && (
                  <TouchableOpacity
                    onPress={() => {
                      Alert.alert(
                        '',
                        'Are you sure you want to clear all of your recent searches?',
                        [
                          {
                            text: 'Cancel',
                            style: "cancel"
                          },
                          {
                            text: 'Yes',
                            onPress: async () => {
                              clearRecentPeopleHistory()
                            },
                            style: "default"
                          }
                        ],
                        {
                          cancelable: true
                        }
                      )
                    }}
                  >
                    <Text style={[tw`text-sm text-yellow-500`, fonts.fontPoppinsLight]}>Clear all</Text>
                  </TouchableOpacity>
                )}
              </View>
              {peopleRecentSearches
                ? <React.Fragment>
                    {peopleRecentSearches.slice(0, 5).map((history: any, i: number) => (
                      <SearchResultDisplay
                        key={i}
                        id={history.id}
                        image={history.image}
                        title={history.title}
                        description={history.description}
                      />
                    ))}
                  </React.Fragment> 
                : <View style={tw`flex-row items-center justify-center w-full`}>
                    <Text style={[tw`text-sm text-neutral-500`, fonts.fontPoppins]}>No Recent Searches</Text>
                  </View>
              }
            </React.Fragment>
          )}
          {search && (
            <React.Fragment>
              <View style={tw`flex-row items-center justify-between w-full pb-5`}>
                <Text style={[tw`text-sm text-neutral-500`, fonts.fontPoppinsBold]}>Results</Text>
              </View>
              {(isLoading || isError) && (
                <SearchResultsLoader />
              )}
              {!(isLoading || isError) && (
                <React.Fragment>
                  {userResults.length === 0 && (
                    <View style={tw`flex-row items-center justify-center w-full`}>
                      <Text style={[tw`text-sm text-neutral-500`, fonts.fontPoppins]}>No Results Found</Text>
                    </View>
                  )}
                  {userResults.map((user: { id: string, profile: string, name: string, username: string, location: string }) => (
                    <SearchResultDisplay
                      key={user.id}
                      id={user.id}
                      image={user.profile}
                      title={user.name}
                      description={user.username}
                    />
                  ))}
                </React.Fragment>
              )}
            </React.Fragment>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default PeopleTab