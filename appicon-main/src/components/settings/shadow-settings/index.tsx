import { SettingsContainer } from '@/components/ui/styled'

import { ShadowField } from '../common/shadow-field'

interface ShadowSettingsProps {
  path: string
}

export const ShadowSettings = (props: ShadowSettingsProps) => {
  const { path } = props

  return (
    <SettingsContainer className='grid-cols-1 px-0 py-2'>
      <ShadowField className='col-span-full grid-cols-1' path={path} />
    </SettingsContainer>
  )
}
