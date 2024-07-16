import { ClerkProvider } from '@clerk/nextjs'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Topbar from '@/components/shared/Topbar'
import Bottombar from '@/components/shared/Bottombar'
import RightSidebar from '@/components/shared/RightSidebar'
import LeftSidebar from '@/components/shared/LeftSidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ThreadsBite',
  description: 'A Next.js 13 Meta Threads Mini Application'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Topbar />

          <main className='flex flex-row'> {/* let everything flow in a row */}
            <LeftSidebar />

            <section className='main-container'> {/* contain majority of the application */}
              <div className='w-full max-w-4xl'> {/* full width and on large divice, only go as far as max w4 xl */}
                {children}
              </div>
            </section>

            <RightSidebar />
          </main>

          <Bottombar />
        </body>
      </html>
    </ClerkProvider>

  )
}
