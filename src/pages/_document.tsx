import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(): JSX.Element {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=Inter:wght@400;500;600;700&family=Noto+Serif+Devanagari:wght@400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#f4a023" />
        <link rel="icon" type="image/png" href="/logo.png" />
      </Head>
      <body className="bg-background text-on-background overflow-x-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
