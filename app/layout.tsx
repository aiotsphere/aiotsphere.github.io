import '../app/globals.css'
import Navbar from '../components/Navbar'

export const metadata = {
  title: 'Starter Template',
  description: 'Minimal template matching aiotsphere style'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container mx-auto py-12">{children}</main>
      </body>
    </html>
  )
}
