import React from 'react'
import SearchResultDisplay from '../SearchResultDisplay'
import SearchResultsLoader from '../../SkeletonLoaders/SearchResultsLoader'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { MaterialIcon } from '../../../utils/Icons'
import { TouchableOpacity, View, ScrollView, TextInput, Text, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useGetUserSearch, useGetSearchHistory, useDeletePeopleSearchHistory } from '../../../lib/ReactQuery'

interface TypedProps {
  userId: string
}

const PeopleTab: React.FC<TypedProps> = ({ userId }) => {

  const route = useRoute()
  
  const deletePeopleSearchHistory = useDeletePeopleSearchHistory()

  // getting the type of search history by useRoute
  const searchHistoryType = route.name === 'DishesTab' ? 'DISHES' : 'PEOPLE'

  const [search, setSearch] = React.useState<string>('')

  const { data: userResults, isLoading, isError } = useGetUserSearch(search)
  const { data: searchHistory, isLoading: searchHistoryLoading, isError: searchHistoryError } = useGetSearchHistory(userId, searchHistoryType)
  

  const clearAllPeopleSearchHistory = async () => {
    await deletePeopleSearchHistory.mutateAsync({
      userId: String(userId)
    })
  }
  
  return (
    <View style={tw`flex-1 bg-white dark:bg-[#262626]`}>
      <ScrollView>
        <View style={tw`flex-col items-start justify-center w-full px-3`}>
          <View style={tw`flex-row items-center justify-between w-full overflow-hidden mt-3 px-3 rounded-xl border border-neutral-200 dark:border-[#383838] bg-white dark:bg-[#383838]`}>
            <TextInput
              style={[tw`text-sm text-black dark:text-white w-full`, fonts.fontPoppins]}
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
                <Text style={[tw`text-base text-neutral-500 dark:text-neutral-400`, fonts.fontPoppinsBold]}>Recent</Text>
                {(!searchHistoryLoading && searchHistory.length > 0) && (
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
                              clearAllPeopleSearchHistory()
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
                    <Text style={[tw`text-base text-yellow-500`, fonts.fontPoppinsLight]}>Clear all</Text>
                  </TouchableOpacity>
                )}
              </View>
              {(searchHistoryLoading || searchHistoryError) && (
                <SearchResultsLoader />
              )}
              {!(searchHistoryLoading || searchHistoryError) && (
                <React.Fragment>
                  {searchHistory.length > 0
                    ? <React.Fragment>
                        {searchHistory.map((history: any, i: number) => (
                          <SearchResultDisplay
                            key={i}
                            userId={userId}
                            id={history.searchId}
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
                      userId={userId}
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