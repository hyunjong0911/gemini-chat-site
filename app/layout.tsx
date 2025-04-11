import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Gemini 채팅 앱',
  description: 'Gemini API를 이용한 채팅 애플리케이션',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
} 