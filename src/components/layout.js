/* eslint-disable @next/next/no-img-element */

import Script from "next/script";
import { Open_Sans, Gochi_Hand } from "next/font/google";
import Head from "next/head";

const gochiHand = Gochi_Hand({ subsets: ["latin"], weight: "400" });
const OpenSans = Open_Sans({ subsets: ["latin"] });

export default function Layout({ children }) {
  return (
    <div className="h-full">
      <Head>
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-V9DVG78VWN" />
          <Script id="google-analytics">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-V9DVG78VWN');
        `}
          </Script>
          <title>Rifa do Luis Carlos 🐶</title>
          <meta name="title" content="Rifa do Luis Carlos" />
          <meta
            name="description"
            content="Luís Carlos foi resgatado depois de 4 dias abandonado numa estrada e precisa de ajuda para seus exames e tratamento."
          />

          <meta name="og:title" content="Rifa do Luis Carlos" />
          <meta
            name="og:description"
            content="Luís Carlos foi resgatado depois de 4 dias abandonado numa estrada e precisa de ajuda para seus exames e tratamento."
          />
          <meta property="og:image" content="/assets/thumbnail.jpg" />

          <meta
            property="og:url"
            content="https://www.rifadoluiscarlos.com.br/"
          />
          <meta name="keywords" content="rifa, cachorro, abandonado" />
          <meta name="robots" content="index, follow" />
          <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="language" content="Portuguese" />
        </>
      </Head>
      <header className={gochiHand.className}>
        <div className="max-w-4xl m-auto px-4 py-5 flex justify-between items-center">
          <h1 className="text-white text-3xl">Rifa do Luís Carlos</h1>
          <nav className="flex">
            <a className="text-white ml-3" href="#">
              Home
            </a>
          </nav>
        </div>
      </header>
      <section className={OpenSans.className}>
        <div className=" max-w-4xl m-auto px-4">{children}</div>
      </section>
    </div>
  );
}
