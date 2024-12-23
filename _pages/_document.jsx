import Document, {
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';
import Script from 'next/script';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zxx">
        <Head>
          <link rel="apple-touch-icon" sizes="76x76" href="/favicon/favicon-76x76.png" />
          <link rel="apple-touch-icon" sizes="120x120" href="/favicon/favicon-120x120.png" />
          <link rel="apple-touch-icon" sizes="152x152" href="/favicon/favicon-152x152.png" />
          <link rel="apple-touch-icon" sizes="180x180" href="/favicon/favicon-180x180.png" />
          <link rel="icon" sizes="16x16" type="image/png" href="/favicon/favicon-16x16.png" />
          <link rel="icon" sizes="32x32" type="image/png" href="/favicon/favicon-32x32.png" />
          <link rel="icon" sizes="96x96" type="image/png" href="/favicon/favicon-96x96.png" />
          <link rel="icon" sizes="192x192" type="image/png" href="/favicon/favicon-192x192.png" />
          <link rel="icon" sizes="194x194" type="image/png" href="/favicon/favicon-194x194.png" />

          {/* Google tag (gtag.js) */}
          <Script async src="https://www.googletagmanager.com/gtag/js?id=G-QT0E964DP7" />
          <Script id="google-analytics">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            
              gtag('config', 'G-QT0E964DP7');
            `}
          </Script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
