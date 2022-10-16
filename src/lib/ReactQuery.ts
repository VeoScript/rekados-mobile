import React from 'react'
import { Platform } from 'react-native'
import { useNavigate } from '../utils/RootNavigation'
import { useQuery, useMutation, useInfiniteQuery, useQueryClient, onlineManager } from '@tanstack/react-query'
import AsyncStorage from '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo'
import api from './Axios'

// CHECK NETINFO STATE (Online / Offline) FOR REACT QUERY
export const useOnlineManager = () => {
  React.useEffect(() => {
    if (Platform.OS !== 'web') {
      return NetInfo.addEventListener((state) => {
        onlineManager.setOnline(
          state.isConnected != null && state.isConnected && Boolean(state.isInternetReachable)
        )
      })
    }
  }, [])
}


// FOR QUERIES
export const useGetUser = () => {
  return useQuery(['user'],
    async () => {
      const user = await api.get(`/api/user`)
      return user.data
    },
    {
      refetchInterval: 1000
    }
  )
}

export const useGetDishes = () => {
  return useInfiniteQuery(['dishes'],
    async ({ pageParam = ''}) => {
      const dishes = await api.get(`/api/dishes?cursor=${ pageParam }`)
      return dishes.data
    },
    {
      refetchInterval: 1000,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false
    }
  )
}

export const useGetDish = (slug: string) => {
  return useQuery(['dish', slug],
    async () => {
      const dish = await api.get(`/api/dish/${ slug }`)
      return dish.data
    },
    {
      enabled: !!slug,
      refetchInterval: 1000,
    }
  )
}

export const useGetSaveDishes = () => {
  return useInfiniteQuery(['saveDishes'],
    async ({ pageParam = ''}) => {
      const saveDishes = await api.get(`/api/save-dish?cursor=${ pageParam }`)
      return saveDishes.data
    },
    {
      refetchInterval: 1000,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false
    }
  )
}

export const useGetComments = (slug: string) => {
  return useQuery(['comments', slug],
    async () => {
      const comments = await api.get(`/api/comments?slug=${ slug }`)
      return comments.data
    },
    {
      enabled: !!slug
    }
  )
}

export const useGetDishSearch = (search: string) => {
  return useQuery(['dishSearch', search],
    async () => {
      const searchDishes = await api.get(`/api/search-dish/${ search }`)
      return searchDishes.data
    },
    {
      enabled: !!search,
      refetchInterval: 1000
    }
  )
}
// END FOR QUERIES


// FOR MUTATIONS
export const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { name: string, email: string, username: string, password: string }) =>
    api.post('/api/register', {
      name: _args.name,
      email: _args.email,
      username: _args.username,
      password: _args.password
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['user'])
        useNavigate('SignInScreen')
      }
    }
  )
}

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { email: string, password: string }) =>
    api.post('/api/login', {
      email: _args.email,
      password: _args.password
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: async (data) => {
        const cookies: any = data.headers['set-cookie']
        await AsyncStorage.setItem('COOKIES', cookies[0])
        queryClient.invalidateQueries(['user'])
        useNavigate('HomeScreen')
      }
    }
  )
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(() =>
    api.post('/api/logout'),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: async () => {
        await AsyncStorage.setItem('COOKIES', '')
        queryClient.invalidateQueries(['user'])
        useNavigate('SignInScreen')
      }
    }
  )
}

export const useCreateDishMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: {
    slug: string,
    image: string,
    title: string,
    category: string,
    location: string,
    description: string,
    youtube: string,
    authorId: string
  }) => api.post('/api/create-dish', {
    slug: _args.slug,
    image: _args.image,
    title: _args.title,
    category: _args.category,
    location: _args.location,
    description: _args.description,
    youtube: _args.youtube,
    authorId: _args.authorId
  }),
  {
    onError: (error: any) => {
      console.error(error.response.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['dishes'])
    }
  })
}

export const useUpdateDishMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: {
    slug: string,
    image: string,
    title: string,
    category: string,
    location: string,
    description: string,
    youtube: string,
    authorId: string
  }) => api.put('/api/update-dish', {
    slug: _args.slug,
    image: _args.image,
    title: _args.title,
    category: _args.category,
    location: _args.location,
    description: _args.description,
    youtube: _args.youtube,
    authorId: _args.authorId
  }),
  {
    onError: (error: any) => {
      console.error(error.response.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['dish'])
    }
  })
}

export const useCreateIngredientsMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { ingredient: string, slug: string }) =>
    api.post('/api/create-ingredient', {
      ingredient: _args.ingredient,
      slug: _args.slug
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['dishes'])
      }
    }
  )
}

export const useCreateProceduresMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { procedure: string, slug: string }) =>
    api.post('/api/create-procedure', {
      procedure: _args.procedure,
      slug: _args.slug
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['dishes'])
      }
    }
  )
}

export const useLikeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { slug: string }) =>
    api.post(`/api/like?slug=${ _args.slug }`),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['dishes'])
      }
    }
  )
}

export const useUnlikeMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { slug: string }) =>
    api.delete(`/api/unlike?slug=${ _args.slug }`),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['dishes'])
      }
    }
  )
}

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { comment: string, slug: string }) =>
    api.post('/api/create-comment', {
      comment: _args.comment,
      slug: _args.slug
    }),
    {
      onMutate: async (newComment) => {
        await queryClient.cancelQueries(['comments', newComment.comment])
        const previousComments = queryClient.getQueryData(['comments', newComment.comment])
        queryClient.setQueryData(['comments', newComment.comment], newComment)

        return { previousComments, newComment }
      },
      onError: (error: any, newComment, context: any) => {
        queryClient.setQueryData(['comments', context.newComment.comment], context.previousComments)
        console.error(error.response.data)
      },
      onSettled: (newComment: any) => {
        queryClient.invalidateQueries(['comments', newComment.comment])
      }
    }
  )
}

export const useDeleteDishMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { slug: string }) =>
    api.delete(`/api/delete-dish/${_args.slug}`),
    {
      onError: (error) => {
        console.error(error)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['dishes'])
        useNavigate('HomeScreen')
      }
    }
  )
}
// END FOR MUTATIONS
