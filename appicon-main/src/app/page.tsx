'use client'

import { Icon } from '@iconify/react'
import { useTranslation } from 'react-i18next'

import { IconsGrid } from '@/components/icons-grid'
import { LanguageToggle } from '@/components/language-toggle'
import { PreviewDialog } from '@/components/preview-icon-dialog'
import { PreviewText } from '@/components/preview-text'
import { PreviewUpload } from '@/components/preview-upload'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useStore } from '@/store'
import { Settings, Tab } from '@/store/constants'

export default function Home() {
  const { t } = useTranslation()
  const [{ selectedTab }, setComponentsState] = useStore(
    (store) => store.componentsState,
  )

  return (
    <div className='relative rounded-2xl border p-4 shadow-sm'>
      <Tabs
        className='flex h-full flex-col'
        value={selectedTab}
        onValueChange={(value) => {
          setComponentsState((draft) => {
            draft.selectedTab = value as Tab
          })
          if (value === Tab.Icon || value === Tab.Upload) {
            setComponentsState((draft) => {
              draft.selectedSettings = Settings.Icon
            })
          } else if (value === Tab.Text) {
            setComponentsState((draft) => {
              draft.selectedSettings = Settings.Text
            })
          }
        }}
      >
        <div className='grid grid-cols-[1fr_auto_auto_auto] gap-4'>
          <TabsList className='justify-self-start'>
            <TabsTrigger value={Tab.Icon}>{t('tabs.icon')}</TabsTrigger>
            <TabsTrigger value={Tab.Text}>{t('tabs.text')}</TabsTrigger>
            <TabsTrigger value={Tab.Upload}>{t('tabs.upload')}</TabsTrigger>
          </TabsList>
          <Button asChild className='p-4' size='icon' variant='ghost'>
            <a
              href='https://github.com/zhangyu1818/appicon-forge'
              rel='noreferrer'
              target='_blank'
            >
              <Icon icon='octicon:mark-github-24' />
            </a>
          </Button>
          <LanguageToggle />
          <ThemeToggle />
        </div>
        <TabsContent className='flex-1 overflow-hidden' value={Tab.Icon}>
          <IconsGrid />
        </TabsContent>
        <TabsContent className='flex-1 overflow-hidden' value={Tab.Text}>
          <PreviewText />
        </TabsContent>
        <TabsContent className='flex-1 overflow-hidden' value={Tab.Upload}>
          <PreviewUpload />
        </TabsContent>
      </Tabs>
      <PreviewDialog />
    </div>
  )
}
