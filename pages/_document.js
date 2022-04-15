import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

const METADATA = {
  APP_NAME: "Boilerplate",
  APP_DESCRIPTION:
    "A boilerplate for Reactjs app using nextjs, redux, redux-thunk, antd, less",
  FB_APP_ID: "",
  IMG_SHARE: "",
  KEY_WORDS: "",
  PRIMARY_COLOR: "red",
};

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en" dir="ltr">
        <Head>
          <meta charSet="utf-8" />
          {/* PWA */}
          {/* <link rel="manifest" href="/manifest.json" />

          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />

          <meta name="application-name" content={METADATA.APP_NAME} />
          <meta name="apple-mobile-web-app-title" content={METADATA.APP_NAME} />

          <meta
            name="apple-mobile-web-app-status-bar-style"
            content={"white-" + METADATA.PRIMARY_COLOR}
          />
          <meta name="msapplication-starturl" content="/" />

          <meta
            name="msapplication-navbutton-color"
            content={METADATA.PRIMARY_COLOR}
          />
          <meta name="theme-color" content={METADATA.PRIMARY_COLOR} />

          <link
            rel="shortcut icon"
            type="image/x-icon"
            sizes="512x512"
            href="/favicon.ico"
          />
          <link rel="shortcut icon" href="/favicon.ico" />

          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/icons/512x512.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="512x512"
            href="/icons/512x512.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/icons/192x192.png"
          />
          <link
            rel="apple-touch-icon"
            type="image/png"
            sizes="192x192"
            href="/icons/192x192.png"
          /> */}

          {/* END PWA */}

          <meta name="description" content={METADATA.APP_DESCRIPTION} />
          <meta content={METADATA.KEY_WORDS} name="keywords" />
          {/* Twitter */}
          <meta name="twitter:card" content="summary" />
          <meta
            name="twitter:site"
            content={"@" + METADATA.APP_NAME.toLowerCase()}
          />
          <meta name="twitter:title" content={METADATA.APP_NAME} />
          <meta name="twitter:description" content={METADATA.APP_DESCRIPTION} />
          <meta name="twitter:image" content={METADATA.IMG_SHARE} />
          {/* Facebook */}
          <meta property="fb:app_id" content={METADATA.FB_APP_ID} />
          <meta property="og:type" content="website" />
          <meta property="og:title" content={METADATA.APP_NAME} />
          <meta property="og:description" content={METADATA.APP_DESCRIPTION} />
          <meta property="og:image" content={METADATA.IMG_SHARE} />
          <meta property="og:image:width" content="200" />
          <meta property="og:image:height" content="200" />
          <meta property="og:locale" content="en_EN" />
          <meta property="og:url" content={METADATA.WEB_URL} />

          {/* <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" /> */}
          {/* <link href="https://fonts.googleapis.com/css2?family=Updock&display=swap" rel="stylesheet" /> */}
          <link
            href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
