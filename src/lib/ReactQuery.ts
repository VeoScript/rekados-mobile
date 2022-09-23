import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
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
  return useQuery(['dishes'],
    async () => {
      const dishes = await api.get(`/api/dishes`)
      return dishes.data
    },
    {
      refetchInterval: 1000
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
      onError: (error) => {
        console.error(error)
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
    image: string,
    title: string,
    category: string,
    location: string,
    description: string,
    youtube: string,
    authorId: string
  }) => api.post('/api/create-dish', {
    image: _args.image,
    title: _args.title,
    category: _args.category,
    location: _args.location,
    description: _args.description,
    youtube: _args.youtube,
    authorId: _args.authorId
  }),
  {
    onError: (error) => {
      console.error(error)
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['dishes'])
      useNavigate('HomeScreen')
    }
  })
}
