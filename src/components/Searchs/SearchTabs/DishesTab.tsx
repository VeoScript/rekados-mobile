import React from 'react'
import SearchResultDisplay from '../SearchResultDisplay'
import SearchResultsLoader from '../../SkeletonLoaders/SearchResultsLoader'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { MaterialIcon } from '../../../utils/Icons'
import { TouchableOpacity, View, ScrollView, TextInput, Text, Alert } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { useGetDishSearch, useGetSearchHistory, useDeleteDishesSearchHistory } from '../../../lib/ReactQuery'

interface TypedProps {
  userId: string
}

const DishesTab: React.FC<TypedProps> = ({ userId }) => {

  const route = useRoute()
  
  const deleteDishesSearchHistory = useDeleteDishesSearchHistory()

  // getting the type of search history by useRoute
  const searchHistoryType = route.name === 'DishesTab' ? 'DISHES' : 'PEOPLE'

  const [search, setSearch] = React.useState<string>('')

  const { data: dishResults, isLoading, isError } = useGetDishSearch(search)
  const { data: searchHistory, isLoading: searchHistoryLoading, isError: searchHistoryError } = useGetSearchHistory(userId, searchHistoryType)

  const clearAllDishesSearchHistory = async () => {
    await deleteDishesSearchHistory.mutateAsync({
      userId: String(userId)
    })
  }

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView>
        <View style={tw`flex-col items-start justify-center w-full px-3`}>
          <View style={tw`flex-row items-center justify-between w-full overflow-hidden mt-3 px-3 rounded-xl border border-neutral-200 bg-white`}>
            <TextInput
              style={[tw`text-sm w-full`, fonts.fontPoppins]}
              placeholder="Search dishes..."
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
                              clearAllDishesSearchHistory()
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
                            slug={history.slug}
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
                  {dishResults.length === 0 && (
                    <View style={tw`flex-row items-center justify-center w-full`}>
                      <Text style={[tw`text-sm text-neutral-500`, fonts.fontPoppins]}>No Results Found</Text>
                    </View>
                  )}
                  {dishResults.map((dish: { id: string, slug: string, image: string, title: string, description: string }) => (
                    <SearchResultDisplay
                      key={dish.id}
                      userId={userId}
                      id={dish.id}
                      slug={dish.slug}
                      image={dish.image}
                      title={dish.title}
                      description={dish.description}
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

export default DishesTab