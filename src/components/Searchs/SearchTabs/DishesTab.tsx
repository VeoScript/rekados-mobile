import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import SearchResultDisplay from '../SearchResultDisplay'
import SearchResultsLoader from '../../SkeletonLoaders/SearchResultsLoader'
import tw from 'twrnc'
import { fonts } from '../../../styles/global'
import { MaterialIcon } from '../../../utils/Icons'
import { TouchableOpacity, View, ScrollView, TextInput, Text, Alert } from 'react-native'
import { useGetDishSearch } from '../../../lib/ReactQuery'

const DishesTab = () => {

  const [search, setSearch] = React.useState<string>('')

  const { data: dishResults, isLoading, isError } = useGetDishSearch(search)

  const [dishRecentSearches, setDishRecentSearches] = React.useState<any>([])

  const clearRecentDishHistory = async () => {
    await AsyncStorage.removeItem('DISH_SEARCH_HISTORY')
    setDishRecentSearches([])
  }

  const getSearchHistory = async () => {
    const getDishSearchHistory: any = await AsyncStorage.getItem('DISH_SEARCH_HISTORY')
    setDishRecentSearches(JSON.parse(getDishSearchHistory))
  }
  
  dishRecentSearches?.sort((a: any, b: any) => {
    const date1 = new Date(a.updatedAt).getTime()
    const date2 = new Date(b.updatedAt).getTime()
    return date1 < date2 ? 1 : -1
  })

  React.useEffect(() => {
    getSearchHistory()
  }, [dishResults, clearRecentDishHistory])
  
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
                {dishRecentSearches && (
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
                              clearRecentDishHistory()
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
              {dishRecentSearches
                ? <React.Fragment>
                    {dishRecentSearches.slice(0, 5).map((history: any, i: number) => (
                      <SearchResultDisplay
                        key={i}
                        id={history.id}
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