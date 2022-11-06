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

export const useGetUserById = (id: string) => {
  return useQuery(['userById', id],
    async () => {
      const user = await api.get(`/api/user/${id}`)
      return user.data
    },
    {
      enabled: !!id,
      refetchOnMount: true
    }
  )
}

export const useGetDishes = (userId: string) => {
  return useInfiniteQuery(['dishes', userId],
    async ({ pageParam = ''}) => {
      const dishes = await api.get(`/api/dishes?cursor=${ pageParam }`)
      return dishes.data
    },
    {
      enabled: !!userId,
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

export const useGetSaveDishes = (userId: string) => {
  return useInfiniteQuery(['saveDishes', userId],
    async ({ pageParam = ''}) => {
      const saveDishes = await api.get(`/api/save-dish?cursor=${ pageParam }`)
      return saveDishes.data
    },
    {
      enabled: !!userId,
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
      enabled: !!search
    }
  )
}

export const useGetUserSearch = (search: string) => {
  return useQuery(['userSearch', search],
    async () => {
      const searchUsers = await api.get(`/api/search-user/${ search }`)
      return searchUsers.data
    },
    {
      enabled: !!search
    }
  )
}

export const useGetSearchHistory = (userId: string, type: string) => {
  return useQuery(['userSearchHistory', userId, type],
    async () => {
      const userSearchHistory = await api.get(`/api/search-history/${userId}/${type}`)
      return userSearchHistory.data
    },
    {
      enabled: !!userId && !!type
    }
  )
}

export const useGetCountNotifications = (userId: string) => {
  return useQuery(['countNotifications', userId],
    async () => {
      const countNotifications = await api.get(`/api/count-notifications`)
      return countNotifications.data
    },
    {
      enabled: !!userId,
      refetchInterval: 1000
    }
  )
}

export const useGetNotifications = (userId: string) => {
  return useInfiniteQuery(['notifications', userId],
    async ({ pageParam = ''}) => {
      const notifications = await api.get(`/api/notifications?cursor=${ pageParam }`)
      return notifications.data
    },
    {
      enabled: !!userId,
      refetchInterval: 1000,
      getNextPageParam: (lastPage) => lastPage.nextId ?? false
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

export const useForgotPasswordMutation = () => {
  return useMutation((_args: { email: string }) =>
    api.post('/api/forgot-password', {
      email: _args.email
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      }
    }
  )
}

export const useResetPasswordMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { userId: string, newpassword: string }) =>
    api.post('/api/reset-password', {
      userId: _args.userId,
      newpassword: _args.newpassword
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

export const useChangeProfile = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { id: string, profileURL: string }) =>
    api.put(`/api/change-profile/${_args.id}`, {
      profileURL: _args.profileURL
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['userById'])
      }
    }
  )
}

export const useUpdateAccount = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { id: string, name: string, username: string, email: string, location: string, bio: string }) =>
    api.put(`/api/update-account/${_args.id}`, {
      name: _args.name,
      username: _args.username,
      email: _args.email,
      location: _args.location,
      bio: _args.bio
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['userById'])
      }
    }
  )
}

export const useChangePassword = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { id: string, oldPassword: string, newPassword: string }) =>
    api.put(`/api/change-password/${_args.id}`, {
      oldPassword: _args.oldPassword,
      newPassword: _args.newPassword
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['userById'])
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
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['comments']);
      }
    }
  )
}

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { id: string }) =>
    api.delete(`/api/delete-comment/${_args.id}`),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: async () => {
        queryClient.invalidateQueries(['comments']);
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

export const useStoreDishesSearchHistory = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { searchId: string, slug: string, image: string, title: string, description: string, userId: string }) =>
    api.post(`/api/search-dish-history`, {
      searchId: _args.searchId,
      slug: _args.slug,
      image: _args.image,
      title: _args.title,
      description: _args.description,
      userId: _args.userId
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['userSearchHistory'])
      }
    }
  )
}

export const useStorePeopleSearchHistory = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { searchId: string, slug: string, image: string, title: string, description: string, userId: string }) =>
    api.post(`/api/search-people-history`, {
      searchId: _args.searchId,
      slug: _args.slug,
      image: _args.image,
      title: _args.title,
      description: _args.description,
      userId: _args.userId
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['userSearchHistory'])
      }
    }
  )
}

export const useDeleteDishesSearchHistory = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { userId: string }) =>
    api.delete(`/api/search-dish-history/${_args.userId}`),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['userSearchHistory'])
      }
    }
  )
}

export const useDeletePeopleSearchHistory = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { userId: string }) =>
    api.delete(`/api/search-people-history/${_args.userId}`),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['userSearchHistory'])
      }
    }
  )
}

export const useStoreNotification = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { type: string, message: string, dishSlug: string, notificationFromId: string, notificationToId: string }) =>
    api.post('/api/send-notifications', {
      type: _args.type,
      message: _args.message,
      dishSlug: _args.dishSlug,
      notificationFromId: _args.notificationFromId,
      notificationToId: _args.notificationToId
    }),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['notifications', 'countNotifications'])
      }
    }
  )
}

export const useReadNotification = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { notificationId: string }) =>
    api.put(`/api/read-notification/${_args.notificationId}`),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['notifications', 'countNotifications'])
      }
    }
  )
}

export const useMarkAllReadNotification = () => {
  const queryClient = useQueryClient()
  return useMutation(() =>
    api.put('/api/read-all-notifications'),
    {
      onError: (error: any) => {
        console.error(error.response.data)
      },
      onSuccess: () => {
        queryClient.invalidateQueries(['notifications', 'countNotifications'])
      }
    }
  )
}
// END FOR MUTATIONS
