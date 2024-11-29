import { useImmer } from 'use-immer'

import {
  defaultBackgroundColor,
  defaultBorderColor,
  defaultIconColor,
  defaultShadowColor,
  defaultTextColor,
} from './default-value'

import type { Styles } from './interface'

export const useStyles = () => {
  const [styles, setStyles] = useImmer<Styles>({
    backgroundColors: [defaultBackgroundColor],
    backgroundRotation: 180,
    borderColors: [defaultBorderColor],
    borderRadius: [64, 64, 64, 64],
    borderRotation: 180,
    borderWidth: 0,
    iconColor: defaultIconColor,
    iconOffset: [0, 0],
    iconRotation: 0,
    iconSize: 128,
    insetShadows: [[0, 0, 0, 0, defaultShadowColor]],
    padding: true,
    shadows: [[0, 0, 0, 0, defaultShadowColor]],
    textColorRotation: 0,
    textColors: [defaultTextColor],
    textOffset: [0, 0],
    textRotation: 0,
    textSize: 128,
    textValue: '',
  })

  return [styles, setStyles] as const
}
