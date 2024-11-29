'use client'

import { useState } from 'react'

import { clsx } from 'clsx'
import { useTranslation } from 'react-i18next'

import { Separator } from '@/components/ui/separator'
import { useStore } from '@/store'

import { Input } from '../ui/input'
import { CollectionGrid } from './collection-grid'
import { Collections } from './collections'
import { SearchGrid } from './search-grid'

export const IconsGrid = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [componentsState] = useStore((store) => store.componentsState)

  const { t } = useTranslation()

  const { selectedCollection } = componentsState

  let content: React.ReactNode = null

  const isSearchQueryValid = /^[a-z]{2,}$/i.test(searchQuery)

  if (isSearchQueryValid) {
    content = <SearchGrid searchQuery={searchQuery} />
  } else {
    content = selectedCollection ? <CollectionGrid /> : <Collections />
  }

  return (
    <div className='flex h-full flex-col gap-4'>
      <Separator />
      {!selectedCollection && (
        <Input
          className={clsx(
            !isSearchQueryValid && !!searchQuery && '!border-destructive',
          )}
          placeholder={t('search.query')}
          value={searchQuery}
          onChange={(e) => {
            const value = e.target.value.trim()
            setSearchQuery(value)
          }}
        />
      )}
      {content}
    </div>
  )
}
