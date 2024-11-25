import { Icon } from '@iconify/react'
import { Separator } from '@radix-ui/react-separator'
import { useTranslation } from 'react-i18next'

import { useIconCollections } from '@/queries'
import { useStore } from '@/store'

import { Error } from '../error'
import { Loading } from '../loading'

export const Collections = () => {
  const { data, error, isLoading } = useIconCollections()
  const { t } = useTranslation()
  const setComponentsState = useStore((store) => store.componentsState[1])
  if (isLoading) return <Loading />
  if (error) return <Error />

  if (!data) return null

  return (
    <div className='grid h-full grid-cols-1 gap-4 overflow-y-scroll xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4'>
      {Object.entries(data).map(([key, value]) => (
        <div
          key={key}
          className='flex cursor-pointer flex-col gap-4 rounded-md bg-muted p-4 transition-colors hover:bg-muted/50'
          role='button'
          tabIndex={0}
          onClick={() =>
            setComponentsState((draft) => {
              draft.selectedCollection = {
                ...value,
                prefix: key,
              }
            })
          }
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              setComponentsState((draft) => {
                draft.selectedCollection = {
                  ...value,
                  prefix: key,
                }
              })
            }
          }}
        >
          <h4 className='flex items-center justify-between'>
            <span className='font-semibold'>{value.name}</span>
            <small>{t('collections.count', { count: value.total })}</small>
          </h4>
          <div className='flex min-h-4 gap-2'>
            {value.samples
              ?.slice(0, 3)
              .map((sample) => (
                <Icon
                  key={sample}
                  className='size-4'
                  icon={`${key}:${sample}`}
                />
              ))}
          </div>
          <div className='flex justify-between text-sm font-semibold text-muted-foreground underline '>
            <a className='hover:text-foreground' href={value.author.url}>
              {value.author.name}
            </a>
            <Separator orientation='vertical' />
            <a className='hover:text-foreground' href={value.license.url}>
              {value.license.title}
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
