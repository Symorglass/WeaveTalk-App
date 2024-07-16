import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import '../globals.css';

// specify different rules for the auth routes
// Search engine optimization (SEO)
export const metadata = {
    title: 'ThreadsBite',
    description: 'A Next.js 13 Meta Threads Mini Application'
}

const inter = Inter({ subsets: ['latin']}) // import font from next/font/google, call it as a function, get latin subset

export default function RootLayout({ children } : { children: React.ReactNode }) {  
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={`${inter.className} bg-dark-1`}>  {/* font inter is applied to whole body */}
                    <div className="w-full flex justify-center items-center min-h-screen"> 
                        {children}                      {/* render the children */}
                    </div>
                </body>
            </html>
        </ClerkProvider>
    )
}