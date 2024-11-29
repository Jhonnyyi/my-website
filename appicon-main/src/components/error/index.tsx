import { AlertTriangle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export const Error = () => {
  const { t } = useTranslation()

  return (
    <div className='flex size-full flex-col items-center justify-center gap-8 py-12 text-secondary-foreground'>
      <AlertTriangle className='size-8' />
      <span className='text-lg'>{t('search.error')}</span>
    </div>
  )
}
