import { cn } from '@/lib/utils'

import { Slider } from '../ui/slider'

interface PointProps {
  className?: string
  onChange?: (value: number[]) => void
  value?: number[]
}

export const Point = (props: PointProps) => {
  const { className, onChange, value = [] } = props

  const onValueChange = (newValue: number[], index: number) => {
    const newValues = [...value]
    newValues[index] = newValue[0]
    onChange?.(newValues)
  }

  return (
    <div className={cn('flex gap-4', className)}>
      <Slider
        max={128}
        min={-128}
        value={[value[0]]}
        onValueChange={(v) => onValueChange(v, 0)}
      />
      <Slider
        max={128}
        min={-128}
        value={[value[1]]}
        onValueChange={(v) => onValueChange(v, 1)}
      />
    </div>
  )
}
