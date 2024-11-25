import { ShadowList } from '@/components/shadow-list'
import { StyleFieldSubgrid } from '@/components/ui/styled'

import type { StyleFieldProps } from './style-field'

export type ShadowFieldProps = Omit<StyleFieldProps, 'children'>

export const ShadowField = (props: ShadowFieldProps) => {
  return (
    <StyleFieldSubgrid {...props}>
      <ShadowList />
    </StyleFieldSubgrid>
  )
}
