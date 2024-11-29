import { useDeferredValue } from 'react'

import { useIconSearch } from '@/queries'

import { IconCard } from '../icon-card'
import { VirtualGrid } from '../virtual-grid'

interface SearchGridProps {
  searchQuery: string
}

export const SearchGrid = ({ searchQuery }: SearchGridProps) => {
  const deferredSearchQuery = useDeferredValue(searchQuery)
  const { data, isError, isLoading } = useIconSearch(deferredSearchQuery)

  const allRows = data ? data.icons : []

  return (
    <VirtualGrid
      className='flex-1 overflow-y-scroll pt-8'
      data={allRows}
      error={isError}
      loading={isLoading}
      renderItem={(iconName) => <IconCard iconName={iconName} />}
    />
  )
}
