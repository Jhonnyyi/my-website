import { ColorList } from '@/components/color-list'
import { StyleFieldSubgrid } from '@/components/ui/styled'

import type { StyleFieldProps } from './style-field'

export type ColorsFieldProps = Omit<StyleFieldProps, 'children'>

export const ColorsField = (props: ColorsFieldProps) => {
  return (
    <StyleFieldSubgrid {...props}>
      <ColorList className='col-span-3' />
    </StyleFieldSubgrid>
  )
}
