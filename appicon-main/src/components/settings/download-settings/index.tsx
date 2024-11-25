import { useTranslation } from 'react-i18next'

import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SettingsContainer } from '@/components/ui/styled'
import { useStore } from '@/store'

export const DownloadSettings = () => {
  const [{ imageSize }, setComponentsState] = useStore(
    (store) => store.componentsState,
  )
  const [{ padding }, setStyles] = useStore((store) => store.styles)

  const { t } = useTranslation()

  const cls = 'col-span-2 grid grid-cols-subgrid items-center'

  return (
    <SettingsContainer>
      <div className={cls}>
        <Label htmlFor='imageSize'>{t('settings.download.size')}</Label>
        <Input
          className='max-w-[180px]'
          id='imageSize'
          type='number'
          value={imageSize}
          onChange={(e) =>
            setComponentsState((draft) => {
              draft.imageSize = +e.target.value
            })
          }
        />
      </div>
      <div className={cls}>
        <Label htmlFor='includePadding'>{t('settings.download.padding')}</Label>
        <Checkbox
          checked={padding}
          id='includePadding'
          onCheckedChange={(value) =>
            setStyles((draft) => {
              draft.padding = value as boolean
            })
          }
        />
      </div>
    </SettingsContainer>
  )
}
