import { useEffect } from 'react'

import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Button } from '../ui/button'

export const LanguageToggle = () => {
  const { i18n } = useTranslation()

  useEffect(() => {
    const lang = navigator.language
    i18n.changeLanguage(lang)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='p-4' size='icon' variant='ghost'>
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            i18n.changeLanguage('en')
          }}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            i18n.changeLanguage('zh')
          }}
        >
          中文
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
