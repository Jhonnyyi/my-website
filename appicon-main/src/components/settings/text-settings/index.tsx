'use client'
import { useTranslation } from 'react-i18next'

import { Input } from '@/components/ui/input'
import { SettingsContainer, StyleFieldSubgrid } from '@/components/ui/styled'

import { ColorsField } from '../common/colors-field'
import { PointField } from '../common/point-field'
import { SliderField } from '../common/slider-field'

export const TextSettings = () => {
  const { t } = useTranslation()
  return (
    <SettingsContainer>
      <StyleFieldSubgrid
        label={t('settings.text.value.text')}
        normalizeValueFromEvent={(e) => e.target.value}
        path='textValue'
      >
        <Input placeholder={t('settings.text.value.placeholder')} />
      </StyleFieldSubgrid>
      <SliderField label={t('settings.text.size')} max={256} path='textSize' />
      <SliderField
        label={t('settings.text.rotation')}
        max={360}
        path='textRotation'
      />
      <PointField label={t('settings.text.offset')} path='textOffset' />
      <ColorsField label={t('settings.text.colors.text')} path='textColors' />
      <SliderField
        label={t('settings.text.colors.rotation')}
        max={360}
        path='textColorRotation'
      />
    </SettingsContainer>
  )
}
