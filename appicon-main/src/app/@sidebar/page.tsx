'use client'

import { useTranslation } from 'react-i18next'

import { BackgroundSettings } from '@/components/settings/background-settings'
import { BorderSettings } from '@/components/settings/border-settings'
import { DownloadSettings } from '@/components/settings/download-settings'
import { IconSettings } from '@/components/settings/icon-settings'
import { ShadowSettings } from '@/components/settings/shadow-settings'
import { TextSettings } from '@/components/settings/text-settings'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useStore } from '@/store'
import { Settings, Tab } from '@/store/constants'

export default function Sidebar() {
  const { t } = useTranslation()
  const [componentsState, setComponentsState] = useStore(
    (store) => store.componentsState,
  )
  const { selectedSettings, selectedTab } = componentsState
  return (
    <aside className='h-full overflow-y-scroll rounded-2xl border p-4 shadow-sm'>
      <Accordion
        collapsible
        type='single'
        value={selectedSettings}
        onValueChange={(value) =>
          setComponentsState((draft) => {
            draft.selectedSettings = value as Settings
          })
        }
      >
        {(selectedTab === Tab.Icon || selectedTab === Tab.Upload) && (
          <AccordionItem value={Settings.Icon}>
            <AccordionTrigger>{t('icon settings')}</AccordionTrigger>
            <AccordionContent>
              <IconSettings />
            </AccordionContent>
          </AccordionItem>
        )}
        {selectedTab === Tab.Text && (
          <AccordionItem value={Settings.Text}>
            <AccordionTrigger>{t('text settings')}</AccordionTrigger>
            <AccordionContent>
              <TextSettings />
            </AccordionContent>
          </AccordionItem>
        )}
        <AccordionItem value={Settings.Background}>
          <AccordionTrigger>{t('background settings')}</AccordionTrigger>
          <AccordionContent>
            <BackgroundSettings />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={Settings.Border}>
          <AccordionTrigger>{t('border settings')}</AccordionTrigger>
          <AccordionContent>
            <BorderSettings />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={Settings.Shadow}>
          <AccordionTrigger>{t('shadow settings')}</AccordionTrigger>
          <AccordionContent>
            <ShadowSettings path='shadows' />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={Settings.InsetShadow}>
          <AccordionTrigger>{t('inset shadow settings')}</AccordionTrigger>
          <AccordionContent>
            <ShadowSettings path='insetShadows' />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value={Settings.Download}>
          <AccordionTrigger>{t('download settings')}</AccordionTrigger>
          <AccordionContent>
            <DownloadSettings />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </aside>
  )
}
