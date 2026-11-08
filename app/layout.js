import './globals.css';

export const metadata = {
  title: 'Global Data Sanitizer & Currency Normalization',
  description: 'Zero Trust Enterprise PII Masking Engine',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-slate-100 font-sans antialiased m-0 p-0 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
