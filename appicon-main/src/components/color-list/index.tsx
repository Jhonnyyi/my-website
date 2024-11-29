import { MinusIcon, PlusIcon } from 'lucide-react'

import { ColorPicker } from '@/components/ui/color-picker'
import { changeValueFromArray, cn, removeValueFromArray } from '@/lib/utils'
import { defaultBackgroundColor } from '@/store/default-value'

import { Button } from '../ui/button'

export interface ColorListProps {
  className?: string
  onChange?: (value: string[]) => void
  value?: string[]
}

export const ColorList = (props: ColorListProps) => {
  const { className, onChange, value = [] } = props

  const colorLens = value.length

  const onColorChange = (newValue: string, index: number) => {
    onChange?.(changeValueFromArray(value, newValue, index))
  }

  const onRemoveColor = (index: number) => {
    onChange?.(removeValueFromArray(value, index))
  }

  return (
    <div className={cn('flex gap-2 flex-wrap', className)}>
      {value.map((color, index) => {
        const isLast = index === colorLens - 1
        return (
          <ColorPicker
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            // eslint-disable-next-line react/no-unstable-nested-components
            colorBlockRender={(node) => (
              <div className='relative size-7'>
                {node}
                {!isLast && (
                  <Button
                    className='absolute right-0 top-0 size-3 -translate-y-1/3 translate-x-1/3 p-0'
                    variant='destructive'
                    onClick={() => onRemoveColor(index)}
                  >
                    <MinusIcon className='!size-2' />
                  </Button>
                )}
              </div>
            )}
            value={color}
            onChange={(value) => onColorChange(value, index)}
          />
        )
      })}
      <Button
        size='icon'
        onClick={() => onChange?.([defaultBackgroundColor, ...value])}
      >
        <PlusIcon />
      </Button>
    </div>
  )
}
