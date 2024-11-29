import { useDarkToggle } from 'dark-toggle/react'
import { Moon, Sun } from 'lucide-react'

import { Button } from '../ui/button'

export function ThemeToggle() {
  const { isDark, toggle } = useDarkToggle()
  return (
    <Button
      className='p-4'
      size='icon'
      variant='ghost'
      onClick={(e) => {
        e.stopPropagation()
        toggle()
      }}
    >
      {isDark ? <Moon /> : <Sun />}
    </Button>
  )
}
