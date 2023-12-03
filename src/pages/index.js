/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import { Open_Sans, Gochi_Hand } from "next/font/google";
import { useState } from "react";
import cx from "classnames";

const OpenSans = Open_Sans({ subsets: ["latin"] });
const gochiHand = Gochi_Hand({ subsets: ["latin"], weight: "400" });

export default function Home() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);

  const onAddNumber = (number) => {
    setSelectedNumbers([...selectedNumbers, number]);
  };

  const onRemoveNumber = (number) => {
    setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
  };

  const whatsappMessage = `Olá! Estou participando da sua rifa do Luís Carlos e escolhi os números ${selectedNumbers.join(
    ", "
  )}. Segue o comprovante de pagamento.`;

  return (
    <div className="h-full">
      <header className={gochiHand.className}>
        <div className="max-w-4xl m-auto px-4 py-5 flex justify-between items-center">
          <h1 className="text-white text-5xl">Rifa do Luis</h1>
          <nav className="flex">
            <a className="text-white ml-3" href="#">
              Home
            </a>
            <a className="text-white ml-3" href="#">
              Prestação de contas
            </a>
          </nav>
        </div>
      </header>
      <section className={OpenSans.className}>
        <div className=" max-w-4xl m-auto px-4">
          <div className="relative">
            <div className="grid gap-4 justify-between grid-cols-3 sm:grid-cols-5 md:grid-cols-6">
              {Array(301)
                .fill(1)
                .map((_, i) => {
                  const isSelected = selectedNumbers.includes(i);
                  const callback = isSelected ? onRemoveNumber : onAddNumber;
                  const btnClass = cx({
                    "bg-white hover:bg-red-400 hover:text-white text-blue-700":
                      isSelected,
                    "text-white": !isSelected,
                  });

                  if (i == 0) return null;

                  return (
                    <button
                      onClick={() => callback(i)}
                      disabled={i == 3}
                      key={i}
                      className={`bg-blue-500 font-semibold py-2 px-4 hover:border-transparent rounded hover:bg-blue-700 disabled:opacity-20 disabled:pointer-events-none disabled:cursor-not-allowed ${btnClass}`}
                    >
                      {i}
                    </button>
                  );
                })}
            </div>
            {!!selectedNumbers.length && (
              <div className="sticky max-w-md rounded-md bg-white left-0 right-0 bottom-6 m-auto p-3 shadow-sm border">
                <div className="flex justify-between">
                  <div className="w-full max-w-[calc(100%_-_110px)]">
                    <p className="text-base text-gray-600">
                      Números escolhidos:
                    </p>
                    <p className="mb-2 font-bold text-lg overflow-hidden text-ellipsis whitespace-nowrap">
                      {[...selectedNumbers].reverse().join(", ")}
                    </p>
                    <p className="text-base text-gray-600">Total</p>
                    <p className="font-bold text-lg mb-2">
                      R${selectedNumbers.length * 10}
                    </p>
                    <Link
                      className="text-blue-500 hover:text-blue-700"
                      target="_blank"
                      href={`https://api.whatsapp.com/send/?phone=5511973836084&text=${whatsappMessage}&type=phone_number&app_absent=0`}
                    >
                      🔗 Enviar comprovante por whatsapp 🔗
                    </Link>
                  </div>
                  <div className="w-[100px]">
                    <p className="font-bold text-lg text-center">PIX</p>
                    <Image
                      alt="QR Code PIX"
                      className="w-full"
                      src="/assets/qrcode-luis-carlos.png"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <footer>
        <p>Footer</p>
      </footer>
    </div>
  );
}
