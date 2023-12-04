/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { Open_Sans, Gochi_Hand } from "next/font/google";
import { useState } from "react";
import cx from "classnames";
import { createClient } from "@supabase/supabase-js";
import Head from "next/head";

const OpenSans = Open_Sans({ subsets: ["latin"] });
const gochiHand = Gochi_Hand({ subsets: ["latin"], weight: "400" });

export default function Home({ reservedNumbers }) {
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const [isShowingVideos, setIsShowingVideos] = useState(false);

  const [search, setSearch] = useState("");

  const onAddNumber = (number) => {
    setSelectedNumbers([...selectedNumbers, number]);
  };

  const onToggleVideo = () => {
    setIsShowingVideos((p) => !p);
  };

  const onRemoveNumber = (number) => {
    setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
  };

  const onChangeSeqrch = (e) => {
    setSearch(e.target.value);
  };

  const whatsappMessage = `Olá! Estou participando da sua rifa do Luís Carlos e escolhi os números ${selectedNumbers.join(
    ", "
  )}. Segue o comprovante de pagamento.`;

  const filteredNumbers = Array(301)
    .fill(1)
    .map((_, i) => i.toString())
    .filter((_, i) => i !== 0)
    .filter((n) => n.includes(search));

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
        <div className=" max-w-4xl m-auto px-4">
          <div className="relative">
            <p className="text-white mb-3">
              Luís Carlos foi resgatado na estrada entre Sabaúna e a vila de
              Luís Carlos, em Mogi das Cruzes, depois de ficar abandonado no
              mesmo lugar por 4 dias. Ele ficou internado por 4 dias na clínica
              vetinária e agora está num lugar temporario recebendo cuidado e
              amor.
            </p>
            <div className="flex justify-center">
              <button
                onClick={onToggleVideo}
                className="p-2 bg-gray-500 mb-4 text-white text-sm rounded"
              >
                {isShowingVideos ? "Ocultar" : "Ver"} Vídeos do Luís Carlos
              </button>
            </div>
            {isShowingVideos && (
              <div className="grid grid-cols-3 gap-2 mb-2">
                <div>
                  <video className="h-60 w-full" controls>
                    <source src="/assets/video-1.mp4" type="video/mp4" />
                  </video>
                  {/* <p className="text-gray-400 text-center py-1 text-sm">
                    Vídeo feito em 21/11/23
                  </p> */}
                </div>
                <div>
                  <video className="h-60 w-full" controls>
                    <source src="/assets/video-2.mp4" type="video/mp4" />
                  </video>
                  {/* <p className="text-gray-400 text-center py-1 text-sm">
                    Vídeo feito em 30/11/23
                  </p> */}
                </div>
                <div>
                  <video className="h-60 w-full" controls>
                    <source src="/assets/video-3.mp4" type="video/mp4" />
                  </video>
                  {/* <p className="text-gray-400 text-center py-1 text-sm">
                    Vídeo feito em 02/12/23
                  </p> */}
                </div>
              </div>
            )}
            <p className="text-white mb-3">
              Foram retiradas muitas larvas de bicheira do seu corpo, ele estava
              com infecção, anemia e teve 3 convulsões na primeira noite
              internado. Após o início do tratamento ele ficou estável e está se
              recuperando bem.
            </p>
            <p className="text-white mb-3">
              A meta da rifa é arrecadar R$3.000 para pagar os custos da
              internação, exames e remédios.
            </p>
            <p className="text-white text-center mb-4 text-2xl">
              Escolha os números da rifa
            </p>
            <div className="flex">
              <input
                onChange={onChangeSeqrch}
                placeholder="Pesquisar número"
                type="number"
                value={search}
                className="w-full mb-4 p-2 rounded max-w-lg m-auto bg-slate-700 text-white"
              />
            </div>
            <div className="grid gap-4 justify-between grid-cols-3 sm:grid-cols-5 md:grid-cols-6">
              {filteredNumbers.map((n) => {
                const isSelected = selectedNumbers.includes(n);
                const callback = isSelected ? onRemoveNumber : onAddNumber;
                const btnClass = cx({
                  "bg-white hover:bg-red-400 hover:text-white text-blue-700":
                    isSelected,
                  "text-white": !isSelected,
                });

                return (
                  <button
                    onClick={() => callback(n)}
                    disabled={reservedNumbers.includes(n)}
                    key={n}
                    className={`bg-blue-500 font-semibold py-2 px-4 hover:border-transparent rounded hover:bg-blue-700 disabled:opacity-20 disabled:pointer-events-none disabled:cursor-not-allowed ${btnClass}`}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
            {!!selectedNumbers.length && (
              <div className="sticky max-w-md rounded-md bg-white left-0 right-0 bottom-6 m-auto p-3 shadow-sm border">
                <div className="flex justify-between">
                  <div className="w-full max-w-[calc(100%_-_90px)]">
                    <p className="text-sm text-gray-600">Números escolhidos:</p>
                    <p className="mb-2 font-bold_ text-gray-800 text-base overflow-hidden text-ellipsis whitespace-nowrap">
                      {[...selectedNumbers].reverse().join(", ")}
                    </p>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="font-bold text-base mb-2">
                      R${selectedNumbers.length * 10}
                    </p>
                    <Link
                      className="text-blue-500 text-sm hover:text-blue-700 flex items-center gap-1"
                      target="_blank"
                      href={`https://api.whatsapp.com/send/?phone=5511973836084&text=${whatsappMessage}&type=phone_number&app_absent=0`}
                    >
                      <img
                        className="w-7"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/WhatsApp_icon.png/479px-WhatsApp_icon.png"
                        alt="whatsapp logo"
                      />{" "}
                      Enviar comprovante
                    </Link>
                  </div>
                  <div className="w-[80px]">
                    <p className="font-bold text-xs text-center">QR Code Pix</p>
                    <Image
                      alt="QR Code PIX"
                      className="w-full"
                      src="/assets/qrcode-luis-carlos.png"
                      width={80}
                      height={80}
                    />
                    <p className="text-xs text-center ">
                      Chave Pix 11973836084
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export async function getServerSideProps() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  let { data: numbers } = await supabase.from("numbers").select("*");
  const mockedNumbers = [1, 254, 71];

  const reservedNumbers = numbers.map((n) => n.number);

  return {
    props: {
      reservedNumbers: [...reservedNumbers, ...mockedNumbers],
    },
  };
}
