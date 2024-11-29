import { Icon } from '@iconify/react'
import { motion } from 'motion/react'

import {
  LIST_ICON_SIZE,
  PREVIEW_ICON_PADDING,
  PREVIEW_ICON_SIZE,
} from '@/constants/icon-size'
import {
  cn,
  colorOrLinearGradient,
  getBorderRadiusCSS,
  getShadowCSS,
  scaleShadow,
  scaleValue,
} from '@/lib/utils'
import { useStore } from '@/store'

import type { BorderRadius } from '@/store/interface'

export interface IconCardProps {
  className?: string
  iconName?: string
  inPreview?: boolean
  previewType?: 'icon' | 'text' | 'upload'
  ref?: React.RefObject<HTMLDivElement>
  uploadNode?: React.ReactNode
}

export const IconCard = (props: IconCardProps) => {
  const {
    className,
    iconName,
    inPreview,
    previewType = 'icon',
    ref,
    uploadNode,
  } = props

  const [styles] = useStore((store) => store.styles)

  const setComponentsState = useStore((store) => store.componentsState[1])

  const {
    backgroundColors,
    backgroundRotation,
    borderColors,
    borderRadius,
    borderRotation,
    borderWidth,
    iconColor,
    iconOffset,
    iconRotation,
    iconSize,
    insetShadows,
    padding,
    shadows,
    textColorRotation,
    textColors,
    textOffset,
    textRotation,
    textSize,
    textValue,
  } = styles

  const paddingValue = inPreview && padding ? PREVIEW_ICON_PADDING : 0
  const sizeValue = inPreview ? PREVIEW_ICON_SIZE : LIST_ICON_SIZE
  const valueScale = inPreview
    ? padding
      ? (PREVIEW_ICON_SIZE - PREVIEW_ICON_PADDING) / LIST_ICON_SIZE
      : PREVIEW_ICON_SIZE / LIST_ICON_SIZE
    : 1

  const shadowCSS = getShadowCSS(shadows.map((v) => scaleShadow(v, valueScale)))
  const insetShadowCSS = getShadowCSS(
    insetShadows.map((v) => scaleShadow(v, valueScale)),
    true,
  )

  const setPreviewIconName = () => {
    if (inPreview || !iconName) return
    setComponentsState((draft) => {
      draft.previewIconName = iconName
    })
  }

  let content: React.ReactNode = null

  if (previewType === 'icon' && iconName) {
    content = (
      <Icon
        icon={iconName}
        style={{
          color: iconColor,
          height: scaleValue(iconSize, valueScale),
          transform: `rotate(${iconRotation}deg) translate(${scaleValue(iconOffset[0], valueScale)}px, ${scaleValue(iconOffset[1], valueScale)}px)`,
          width: scaleValue(iconSize, valueScale),
        }}
      />
    )
  } else if (previewType === 'text') {
    content = (
      <span
        style={{
          fontSize: scaleValue(textSize, valueScale),
          transform: `rotate(${textRotation}deg) translate(${scaleValue(textOffset[0], valueScale)}px, ${scaleValue(textOffset[1], valueScale)}px)`,
          ...(textColors.length > 1
            ? {
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundImage: colorOrLinearGradient(
                  textColors,
                  textColorRotation,
                ),
              }
            : {
                color: textColors[0],
              }),
        }}
      >
        {textValue}
      </span>
    )
  } else if (previewType === 'upload') {
    content = (
      <div
        style={{
          color: iconColor,
          fontSize: scaleValue(iconSize, valueScale),
          height: scaleValue(iconSize, valueScale),
          transform: `rotate(${iconRotation}deg) translate(${scaleValue(iconOffset[0], valueScale)}px, ${scaleValue(iconOffset[1], valueScale)}px)`,
          width: scaleValue(iconSize, valueScale),
        }}
      >
        {uploadNode}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      layoutId={iconName}
      style={{ height: sizeValue, padding: paddingValue, width: sizeValue }}
    >
      <div
        className={cn('size-full select-none', className)}
        role='button'
        style={{
          background: colorOrLinearGradient(borderColors, borderRotation),
          boxShadow: shadowCSS,
          padding: scaleValue(borderWidth, valueScale),
          borderRadius: getBorderRadiusCSS(
            borderRadius.map((v) => scaleValue(v, valueScale)) as BorderRadius,
          ),
        }}
        tabIndex={0}
        onClick={setPreviewIconName}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setPreviewIconName()
          }
        }}
      >
        <div
          className='flex size-full items-center justify-center'
          style={{
            boxShadow: insetShadowCSS,
            background: colorOrLinearGradient(
              backgroundColors,
              backgroundRotation,
            ),
            borderRadius: getBorderRadiusCSS(
              borderRadius.map((v) =>
                scaleValue(v - borderWidth, valueScale),
              ) as BorderRadius,
            ),
          }}
        >
          {content}
        </div>
      </div>
    </motion.div>
  )
}
