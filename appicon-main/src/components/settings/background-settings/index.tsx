import { useTranslation } from 'react-i18next'

import { SettingsContainer } from '@/components/ui/styled'

import { ColorsField } from '../common/colors-field'
import { SliderField } from '../common/slider-field'

export const BackgroundSettings = () => {
  const { t } = useTranslation()
  return (
    <SettingsContainer className='grid-cols-[auto_1fr]'>
      <SliderField
        label={t('settings.background.rotation')}
        max={360}
        path='backgroundRotation'
      />
      <ColorsField
        label={t('settings.background.colors')}
        path='backgroundColors'
      />
    </SettingsContainer>
  )
}
