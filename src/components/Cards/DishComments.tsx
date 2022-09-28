import React from 'react'
import tw from 'twrnc'
import moment from 'moment'
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import { fonts } from '../../styles/global'
import { FeatherIcon } from '../../utils/Icons'
import { useGetComments, useCreateCommentMutation } from '../../lib/ReactQuery'

interface TypedProps {
  slug: string
}

const DishComments: React.FC<TypedProps> = ({ slug }) => {

  const createCommentMutation = useCreateCommentMutation()

  const { data: comments, isLoading, isError, error }: any = useGetComments(slug)

  // const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [comment, setComment] = React.useState<string>('')

  const onComment = async () => {
    // setIsLoading(true)
    await createCommentMutation.mutateAsync({
      comment: comment,
      slug: slug
    },
    {
      onError: (error) => {
        setComment('')
        // setIsLoading(false)
        console.error(error.response.data)
      },
      onSuccess: () => {
        setComment('')
        // setIsLoading(false)
      }
    })
  }

  return (
    <View style={tw`flex-col w-full px-5 py-3`}>
      <View style={tw`flex-row items-center justify-between w-full`}>
        <Text style={[tw`text-lg`, fonts.fontPoppinsBold]}>Comments</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={[tw`text-base mx-1`, fonts.fontPoppins]}>10</Text>
          <FeatherIcon
            name="message-square"
            size="small"
            color="#676767"
          />
        </View>
      </View>
      <View style={tw`flex-1 flex-row-reverse items-center w-full my-3 overflow-hidden rounded-xl border border-neutral-200`}>
        {comment !== '' && (
          <TouchableOpacity
            style={tw`px-3`}
            onPress={onComment}
          >
            <FeatherIcon
              name="send"
              size="medium"
              color="#ABABAB"
            />
          </TouchableOpacity>
        )}
        <TextInput
          style={[tw`flex-1 w-full px-3 py-2 text-sm bg-white`, fonts.fontPoppins]}
          placeholder="Your comment here..."
          value={comment}
          onChangeText={(value: string) => {
            setComment(value)
          }}
        />
      </View>
      {comments && comments.map((comment: { content: string, createdAt: Date, user: any }, i: number) => (
        <View key={i} style={tw`flex-row items-start w-full`}>
          <View style={tw`overflow-hidden rounded-full my-3 bg-neutral-200 p-2`}>
            {comment.user.profile
              ? <Image
                  style={tw`flex rounded-full w-[3rem] h-[3rem]`}
                  resizeMode="cover"
                  source={{
                    uri: `${ comment.user.profile }`
                  }}
                />
              : <FeatherIcon
                  name="user"
                  size="medium"
                  color="#676767"
                />
            }
          </View>
          <View style={tw`flex-1 flex-col mx-3 my-3`}>
            <Text style={[tw`text-base`, fonts.fontPoppinsBold]}>{ comment.user.name }</Text>
            <Text style={[tw`text-sm mt-1`, fonts.fontPoppins]}>{ comment.content }</Text>
            <Text style={[tw`text-xs mt-3`, fonts.fontPoppinsLight]}>{ moment(comment.createdAt).startOf('hour').fromNow() }</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default DishComments