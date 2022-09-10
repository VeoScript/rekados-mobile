import api from './Axios'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '../utils/RootNavigation'

export const useAuthGuard = () => {
  return useQuery(['auth'],
    async () => {
      const isLoggedin = await api.get('/api/check-login')
      return isLoggedin.data.message
    },
    {
      refetchInterval: 1000
    }
  )
}

export const useGetUsers = () => {
  return useQuery(['users'],
    async () => {
      const users = await api.get('/api/users')

      if (users.statusText === "OK") {
        return users.data
      } else {
        const json = await users
        throw String(json.statusText)
      }
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
        useNavigate('SignInScreen', null)
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
      onSuccess: () => {
        queryClient.invalidateQueries(['auth'])
      }
    }
  )
}

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  return useMutation(() =>
    api.post('/api/logout'),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['users'])
        useNavigate('SignInScreen', null)
      }
    }
  )
}

