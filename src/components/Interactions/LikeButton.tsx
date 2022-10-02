import React from 'react'
import { TouchableOpacity } from 'react-native'
import { MaterialIcon } from '../../utils/Icons'
import { useLikeMutation, useUnlikeMutation } from '../../lib/ReactQuery'

interface TypedProps {
  user: any
  slug: string
  likes: any
}

const LikeButton: React.FC<TypedProps> = ({ slug, user, likes }) => {

  const likeMutation = useLikeMutation()
  const unlikeMutation = useUnlikeMutation()

  const userId = user.id

  // useState check if the post is liked
  const [like, setLike] = React.useState(false)

  // i am using useEffect hook for update the likes state if there is a new post...
  React.useEffect(() => {
    // if this (likes.some) is true, setLike state will turn to true...
    setLike(likes.some((liked: { userId: string }) => liked.userId === userId))
  }, [userId, likes])

  // function for liking the post
  async function onLike(slug: string) {
    await likeMutation.mutateAsync({ slug })
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
            color="#FF0404"
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