import { Slider } from '@/components/ui/slider'
import { StyleFieldSubgrid } from '@/components/ui/styled'

import type { StyleFieldProps } from './style-field'

interface SliderFieldProps extends Omit<StyleFieldProps, 'children'> {
  max?: number
  min?: number
  sliderClassName?: string
}

export const SliderField = (props: SliderFieldProps) => {
  const { max, min, sliderClassName, ...rest } = props
  return (
    <StyleFieldSubgrid
      eventName='onValueChange'
      normalizeValue={(value) => [value]}
      normalizeValueFromEvent={(event) => (event as number[])[0]}
      {...rest}
    >
      <Slider className={sliderClassName} max={max} min={min} />
    </StyleFieldSubgrid>
  )
}
