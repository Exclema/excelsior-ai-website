import './globals.css'

export const metadata = {
  title: 'Excelsior AI Solutions | AI Automation & Chatbot Consulting',
  description: 'Advanced AI automation, chatbots, and workflow systems designed to optimize your business operations. Professional AI consulting services.',
  keywords: 'AI consulting, AI automation, chatbots, AI strategy, business automation, Excelsior AI',
  authors: [{ name: 'Excelsior AI Solutions' }],
  openGraph: {
    title: 'Excelsior AI Solutions',
    description: 'Smarter Solutions. Stronger Business.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  )
}