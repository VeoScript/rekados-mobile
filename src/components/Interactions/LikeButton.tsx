import React from 'react'
import io from 'socket.io-client';
import { TouchableOpacity } from 'react-native'
import { MaterialIcon } from '../../utils/Icons'
import { useLikeMutation, useUnlikeMutation, useStoreNotification } from '../../lib/ReactQuery'
import { API_URL } from '@env';

interface TypedProps {
  user: any
  author: any
  title: string
  slug: string
  likes: any
}

const socket = io(API_URL);

const LikeButton: React.FC<TypedProps> = ({ user, author, title, slug, likes }) => {

  const likeMutation = useLikeMutation()
  const unlikeMutation = useUnlikeMutation()
  const storeNotification = useStoreNotification()

  const userId = user.id
  const authorId = author.id

  // useState check if the post is liked
  const [like, setLike] = React.useState(false)

  // i am using useEffect hook for update the likes state if there is a new post...
  React.useEffect(() => {
    // if this (likes.some) is true, setLike state will turn to true...
    setLike(likes.some((liked: { userId: string }) => liked.userId === userId))
  }, [userId, likes])

  // function for liking the post
  async function onLike(slug: string) {
    await likeMutation.mutateAsync({ slug },
    {
      onError: (error: any) => {
        console.error('ON LIKE', error.response.data)
      },
      onSuccess: async () => {
        // send like notification to socket.io (for push-notification)
        socket.emit('send_notification', {
          title: 'Rekados',
          message: `${user.name} likes your dish ${title}.`,
          userId: userId,
          userLoggedIn: userId
        }, true)
        //send like notification
        if (userId !== authorId) {
          const message = `likes your dish`
          await storeNotification.mutateAsync({
            type: 'LIKE',
            message: message,
            dishSlug: slug,
            notificationFromId: userId,
            notificationToId: authorId
          },
          {
            onError: (error: any) => {
              console.error('ON NOTIFICATION', error.response.data)
            }
          })
        }
      }
    })
  }

  // function for unliking the post
  async function onUnlike(slug: string) {
    await unlikeMutation.mutateAsync({ slug })
  }

  return (
    <TouchableOpacity
      onPress={async () => {
        setLike(!like)
        like ? await onUnlike(slug) : await onLike(slug)
      }}
    >
      {like ? (
          <MaterialIcon
            name="heart-fill"
            size="medium"
            color="#FF4F4F"
          />
        ) : (
          <MaterialIcon
            name="heart"
            size="medium"
            color="#c3c3c3"
          />
        )
      }
    </TouchableOpacity>
  )
}

export default LikeButton