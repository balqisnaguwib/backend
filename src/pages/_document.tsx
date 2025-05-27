import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/demo-community/logo.webp" />
        <link rel="apple-touch-icon" href="/demo-community/logo.webp" />
        <meta
          name="description"
          content="AI Community - A platform for AI enthusiasts to connect, learn and collaborate"
        />
        <meta name="keywords" content="AI, Community, Connect, Learn, Collaborate" />
        <meta name="author" content="AICOE-TM" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
