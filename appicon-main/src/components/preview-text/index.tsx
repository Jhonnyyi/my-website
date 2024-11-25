import { useRef } from 'react'

import { Separator } from '@/components/ui/separator'
import { downloadImage } from '@/lib/utils'
import { useStore } from '@/store'

import { DownloadButton } from '../download-button'
import { IconCard } from '../icon-card'

export const PreviewText = () => {
  const [{ imageSize }] = useStore((store) => store.componentsState)

  const iconCardRef = useRef<HTMLDivElement>(null)

  return (
    <div className='flex flex-col items-center gap-16'>
      <Separator />
      <IconCard ref={iconCardRef} inPreview previewType='text' />
      <DownloadButton
        onClick={() => {
          downloadImage(imageSize, `text.png`, iconCardRef.current)
        }}
      />
    </div>
  )
}
