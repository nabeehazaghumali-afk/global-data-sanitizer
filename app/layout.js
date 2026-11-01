import './globals.css';

export const metadata = {
  title: 'Global Data Sanitizer & Currency Normalization',
  description: 'Enterprise Zero Trust PII Masking & Compliance Engine',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
