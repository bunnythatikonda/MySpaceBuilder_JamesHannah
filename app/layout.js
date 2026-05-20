import './globals.css'
import { Toaster } from '@/components/ui/sonner'

export const metadata = {
  title: 'James Hannah Auto Body & Collision Center | Wichita, KS',
  description: 'Wichita\'s premier auto body & collision repair center. Certified technicians, insurance approved, lifetime paint warranty. Book your free estimate today.',
  keywords: 'auto body shop wichita, collision repair, paint repair, dent removal, insurance collision center, auto paint shop, james hannah auto body',
  openGraph: {
    title: 'James Hannah Auto Body & Collision Center',
    description: 'Precision Repairs. Trusted Craftsmanship. Certified collision repair in Wichita, KS.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Bebas+Neue&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AutoBodyShop',
              name: 'James Hannah Auto Body & Collision Center',
              image: 'https://images.unsplash.com/photo-1512080482556-ea648017576c',
              address: {
                '@type': 'PostalAddress',
                streetAddress: '2418 S Seneca St',
                addressLocality: 'Wichita',
                addressRegion: 'KS',
                postalCode: '67213',
                addressCountry: 'US',
              },
              telephone: '+1-316-555-0142',
              priceRange: '$$',
              openingHours: 'Mo-Fr 08:00-18:00 Sa 09:00-14:00',
            }),
          }}
        />
      </head>
      <body className="bg-[#0a0a0a] text-white font-sans antialiased">
        {children}
        <Toaster theme="dark" position="top-right" richColors />
      </body>
    </html>
  )
}
