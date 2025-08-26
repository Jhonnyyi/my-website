import { LoaderCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Loading = () => {
  const { t } = useTranslation()

  return (
    <div className='flex size-full flex-col items-center justify-center gap-8 py-12 text-secondary-foreground'>
      <LoaderCircle className='size-8 animate-spin' />
      <span className='text-lg'>{t('search.loading')}</span>
    </div>
  )
}
