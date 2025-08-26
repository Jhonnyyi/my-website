import type { Metadata } from 'next'
import localFont from 'next/font/local'

import { DarkToggleProvider, DarkToggleScript } from 'dark-toggle/react'

import { ClientProvider } from '@/providers/client'
import { StoreProvider } from '@/store'

import './globals.css'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  authors: [{ name: 'zhangyu1818' }],
  title: 'AppIcon Forge - Create & Customize Stunning App Icons Online',
  description:
    'AppIcon Forge is a powerful online tool for creating and customizing app icons with adjustable borders, colors, shadows, and more. Design beautiful app icons effortlessly.',
  keywords:
    'app icon generator, icon design tool, custom icon maker, app icon creator, macOS icon design, icon customization tool',
  openGraph: {
    title: 'AppIcon Forge - Create & Customize Stunning App Icons Online',
    type: 'website',
    url: 'https://zhangyu1818.github.io/appicon-forge',
    description:
      'AppIcon Forge is a powerful online tool for creating and customizing app icons with adjustable borders, colors, shadows, and more.',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
  sidebar: React.ReactNode
}

export default async function RootLayout(props: RootLayoutProps) {
  const { children, sidebar } = props
  return (
    <html suppressHydrationWarning lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientProvider>
          <StoreProvider>
            <DarkToggleProvider>
              <main className='grid h-screen w-screen grid-cols-[minmax(auto,400px)_1fr] grid-rows-1 gap-4 p-4'>
                {sidebar}
                {children}
              </main>
            </DarkToggleProvider>
          </StoreProvider>
        </ClientProvider>
        <DarkToggleScript />
      </body>
    </html>
  )
}
