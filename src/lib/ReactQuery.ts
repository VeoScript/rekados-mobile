import { useQuery, useMutation, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '../utils/RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from './Axios'


// QUERIES
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


// MUTATIONS
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
        useNavigate('HomeScreen')
      }
    }
  )
}
