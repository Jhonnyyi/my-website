import { useQuery } from '@tanstack/react-query'

import { getVisibleIconsAsync } from '@/lib/utils'
import {
  queryIconCollections,
  queryIcons,
  searchIcons,
} from '@/services/iconify'

import { QueryKey } from './query-key'

export const useIconCollections = () =>
  useQuery({
    queryFn: queryIconCollections,
    queryKey: [QueryKey.IconCollections],
  })

export const useIconCollection = (prefix: string) =>
  useQuery({
    queryKey: [QueryKey.IconCollection, prefix],
    queryFn: () => queryIcons(prefix),
  })

export const useIconCollectionWithNames = (prefix: string) =>
  useQuery({
    queryKey: [QueryKey.IconCollection, prefix],
    async queryFn() {
      const data = await queryIcons(prefix)
      const names = await getVisibleIconsAsync(data)
      return [data, names] as const
    },
  })

export const useIconSearch = (
  query: string,
  options?: {
    category?: string
    palette?: boolean
    prefix?: string
    prefixes?: string
    style?: 'fill' | 'stroke'
  },
) => {
  return useQuery({
    queryKey: [QueryKey.IconSearch, query, options],
    async queryFn() {
      return searchIcons({
        limit: 999,
        query,
        ...options,
      })
    },
  })
}
