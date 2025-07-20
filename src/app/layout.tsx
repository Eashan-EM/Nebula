import localFont from 'next/font/local'
import { Providers } from "./providers"
import type { Metadata } from "next"
import "./globals.css"
import Nav from '@/components/Nav'
import background from '@/../public/background.jpg'

const poppins = localFont({
    src: '../../public/Poppins-Regular.ttf',
})

export const metadata: Metadata = {
    title: "Nebula",
    description: "Hackathon Submission for Nebula Nexus 2025.",
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className="dark">
    <head>
      </head>
    <body className={`${poppins.className} antialiased min-h-screen w-full flex flex-col`}  style={{ backgroundImage: `url(${background.src})`}}>
            <Providers>
                <Nav />
                <main className="flex-1 flex flex-col p-3">{children}</main>
            </Providers>
        </body>
    </html>
}
