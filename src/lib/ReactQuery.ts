import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '../utils/RootNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'
import api from './Axios'

export const useGetUser = () => {
  return useQuery(['user'],
    async () => {
      return await api.get(`/api/user`)
    },
    {
      refetchInterval: 1000
    }
  )
}

export const useRegisterMutation = () => {
  const queryClient = useQueryClient()
  return useMutation((_args: { name: string, email: string, password: string }) =>
    api.post('/api/register', {
      name: _args.name,
      email: _args.email,
      password: _args.password
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
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
        queryClient.invalidateQueries(['auth'])
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
        queryClient.invalidateQueries(['users'])
        useNavigate('SignInScreen')
      }
    }
  )
}
