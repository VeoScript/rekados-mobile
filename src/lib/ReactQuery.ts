import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from './Axios'

export const useGetDishes = () => {
  return useQuery(['dishes'],
    async () => {
      const dishes = await api.get('/api/dishes')
      return dishes.data
    },
    {
      refetchInterval: 1000
    }
  )
}
