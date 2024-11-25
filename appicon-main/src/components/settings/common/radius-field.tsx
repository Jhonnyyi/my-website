import { clsx } from 'clsx'
import { ChevronsDown, ChevronsDownUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/lib/utils'
import { useStore } from '@/store'

import { SliderField } from './slider-field'

export interface RadiusFieldProps {
  className?: string
}

export const RadiusField = (props: RadiusFieldProps) => {
  const { className } = props

  const { t } = useTranslation()
  const [componentsState, setComponentsState] = useStore(
    (store) => store.componentsState,
  )
  const { isSeparateBorderRadius } = componentsState

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const normalizeValueToSetAll = (value: number[]) => [value[0]]
  // eslint-disable-next-line unicorn/consistent-function-scoping
  const normalizeValueFromEventToSetAll = (value: number[]) => {
    const [firstValue] = value
    return [firstValue, firstValue, firstValue, firstValue]
  }

  const extraProps = {
    label: t('settings.background.radius.default'),
    normalizeValue: normalizeValueToSetAll,
    normalizeValueFromEvent: normalizeValueFromEventToSetAll,
    path: 'borderRadius',
  }

  return (
    <Collapsible
      className={cn('grid grid-cols-[auto_1fr_1fr_auto] gap-x-4', className)}
      open={isSeparateBorderRadius}
      onOpenChange={(value) =>
        setComponentsState((draft) => {
          draft.isSeparateBorderRadius = value
        })
      }
    >
      <SliderField
        className='col-span-3 grid-cols-subgrid'
        max={128}
        sliderClassName='col-span-2'
        {...(isSeparateBorderRadius
          ? {
              label: t('settings.background.radius.top'),
              path: 'borderRadius[0]',
            }
          : extraProps)}
      />
      <CollapsibleTrigger asChild>
        <Button size='icon' variant='outline'>
          {isSeparateBorderRadius ? <ChevronsDownUp /> : <ChevronsDown />}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent
        className={clsx(
          'col-span-4 overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down',
          isSeparateBorderRadius && 'grid grid-cols-subgrid ',
        )}
      >
        <div className='col-span-3 grid grid-cols-subgrid grid-rows-[repeat(3,28px)]'>
          {[
            ['right', 1],
            ['bottom', 2],
            ['left', 3],
          ].map(([label, index]) => (
            <SliderField
              key={index}
              className='col-span-3'
              label={t(`settings.background.radius.${label}`)}
              max={128}
              path={`borderRadius[${index}]`}
              sliderClassName='col-span-2'
            />
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}
