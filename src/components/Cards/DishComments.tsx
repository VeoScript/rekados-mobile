import React from 'react'
import CommentSkeletonLoader from '../SkeletonLoaders/CommentSkeletonLoader'
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

  const { data: comments, isLoading, isError }: any = useGetComments(slug)

  const [comment, setComment] = React.useState<string>('')
  const [commentHeight, setCommentHeight] = React.useState<number>(10)

  const onComment = async () => {
    await createCommentMutation.mutateAsync({
      comment: comment,
      slug: slug
    },
    {
      onError: (error) => {
        console.error(error.response.data)
        setComment('')
      },
      onSuccess: () => {
        setComment('')
      }
    })
  }

  return (
    <View style={tw`flex-col w-full px-5 py-3`}>
      <View style={tw`flex-row items-center justify-between w-full`}>
        <Text style={[tw`text-lg`, fonts.fontPoppinsBold]}>Comments</Text>
        <View style={tw`flex-row items-center`}>
          <Text style={[tw`text-sm mx-1`, fonts.fontPoppins]}>{ comments && comments.length }</Text>
          <FeatherIcon
            name="message-square"
            size="small"
            color="#676767"
          />
        </View>
      </View>
      <View style={tw`flex-row-reverse items-center w-full my-3 overflow-hidden rounded-xl border border-neutral-200`}>
        {(comment !== '' && !(/^\s*$/.test(comment))) && (
          <TouchableOpacity
            style={tw`px-2`}
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
          style={[tw`flex-1 w-full px-3 py-2 text-sm bg-white`, { height: commentHeight }, fonts.fontPoppins]}
          placeholder="Write your comment..."
          value={comment}
          multiline={true}
          onChangeText={(value: string) => {
            setComment(value)
          }}
          onContentSizeChange={(e) => {
            setCommentHeight(e.nativeEvent.contentSize.height)
          }}
        />
      </View>
      {(isLoading || isError) && (
        <CommentSkeletonLoader />
      )}
      {!isLoading && (
        <React.Fragment>
          {comments.map((comment: { content: string, createdAt: Date, user: any }, i: number) => (
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
                <Text style={[tw`text-base text-neutral-600`, fonts.fontPoppinsBold]}>{ comment.user.name }</Text>
                <Text style={[tw`text-sm text-neutral-600 mt-1`, fonts.fontPoppins]}>{ comment.content }</Text>
                <Text style={[tw`text-xs text-neutral-400 mt-3`, fonts.fontPoppinsLight]}>{ moment(comment.createdAt).fromNow() }</Text>
              </View>
            </View>
          ))}
        </React.Fragment>
      )}
    </View>
  )
}

export default DishComments