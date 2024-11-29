import { Point } from '@/components/point'
import { StyleFieldSubgrid } from '@/components/ui/styled'

import type { StyleFieldProps } from './style-field'

export type PointFieldProps = Omit<StyleFieldProps, 'children'>

export const PointField = (props: PointFieldProps) => {
  return (
    <StyleFieldSubgrid {...props}>
      <Point />
    </StyleFieldSubgrid>
  )
}
