import { useRef } from 'react'

import { XIcon } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'

import { downloadImage } from '@/lib/utils'
import { useStore } from '@/store'
import { Settings } from '@/store/constants'

import { DownloadButton } from '../download-button'
import { IconCard } from '../icon-card'
import { ThemeToggle } from '../theme-toggle'
import { Button } from '../ui/button'

export const PreviewDialog = () => {
  const [{ imageSize, previewIconName }, setComponentsState] = useStore(
    (store) => store.componentsState,
  )

  const iconCardRef = useRef<HTMLDivElement>(null)

  const closePreview = () => {
    setComponentsState((draft) => {
      draft.previewIconName = null
    })
  }

  return (
    <AnimatePresence>
      {previewIconName && (
        <motion.div
          animate={{ opacity: 1 }}
          className='absolute inset-0 flex flex-col items-center justify-center gap-16 overflow-hidden rounded-2xl bg-background'
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          onAnimationComplete={() => {
            setComponentsState((draft) => {
              if (previewIconName) {
                draft.selectedSettings = Settings.Download
              }
            })
          }}
          onClick={closePreview}
        >
          <div className='absolute right-2 top-2 flex gap-4'>
            <ThemeToggle />
            <Button className='p-4' size='icon' variant='ghost'>
              <XIcon />
            </Button>
          </div>
          <IconCard ref={iconCardRef} inPreview iconName={previewIconName} />
          <DownloadButton
            onClick={() => {
              downloadImage(
                imageSize,
                `${previewIconName}.png`,
                iconCardRef.current,
              )
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
