import { useEffect, useState } from "react";
import Layout from "../components/layout";
import cx from "classnames";
import { createClient } from "@supabase/supabase-js";
import DogWalking from "../components/dog";
import Confetti from "../components/confetti";

export default function Sorteio(props) {
  const [start, setStart] = useState(false);
  const [result, setResult] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);
  const numbers = props.numbers.map((n) => n.number);

  const totalItems = new Set([...props.numbers.map((n) => n.name)]);

  console.log(totalItems);
  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        setRandomNumber(numbers[randomIndex]);
      }, 100);
      if (result?.number) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [numbers, result?.number, start]);

  const onSelectNumber = () => {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomNumber = numbers[randomIndex];
    const picketNumber = props.numbers.find((n) => n.number === randomNumber);
    setResult(picketNumber);
    setRandomNumber(null);
  };

  return (
    <Layout>
      <div className="pb-32">
        <div className="flex flex-col justify-center items-center">
          <p className="text-white mb-3">Números do sorteio</p>
          <div className="flex flex-wrap gap-3 mb-4">
            {props.numbers
              .sort((a, b) => a.number - b.number)
              .map((n) => {
                const numberClass = cx(
                  "p-1 w-9 text-center justify-between text-xs items-center rounded text-white bg-blue-500",
                  {
                    "bg-purple-600": n.number === result?.number,
                    "bg-white text-blue-400": n.number == randomNumber,
                  }
                );
                return (
                  <div className={numberClass} key={n.number}>
                    {n.number}
                  </div>
                );
              })}
          </div>
          {!start && (
            <button
              onClick={() => setStart(true)}
              className={`bg-blue-500 font-semibold py-2 px-4 hover:border-transparent rounded hover:bg-blue-700 disabled:opacity-20 disabled:pointer-events-none disabled:cursor-not-allowed text-white`}
            >
              Iniciar sorteio
            </button>
          )}
        </div>

        <div className="flex flex-col items-center">
          {start && !result && (
            <div className="flex items-center flex-col mt-4">
              <p className="text-white mb-3">Sorteando...</p>
              <DogWalking />
              <p className="text-white text-5xl random-number mb-6">
                {randomNumber}
              </p>
              <button
                onClick={onSelectNumber}
                className={`text-blue-500 font-semibold py-2 px-4 hover:border-transparent rounded hover:bg-blue-100 disabled:opacity-20 disabled:pointer-events-none disabled:cursor-not-allowed bg-white`}
              >
                Escolher número
              </button>
            </div>
          )}

          {result && (
            <div className="flex items-center flex-col">
              <p className="text-white mb-3">Número sorteado:</p>
              <p className="text-white bg-purple-600 p-5 rounded text-5xl mb-3">
                {result.number}
              </p>
              <p className="text-white text-3xl">
                {result.name.replace(/\d/g, "")}
              </p>
            </div>
          )}
        </div>
        {result?.number && <Confetti />}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
  );

  let { data: numbers } = await supabase.from("numbers").select("*");

  return {
    props: {
      numbers: numbers.map((n) => ({
        number: n.number,
        name: n.name,
      })),
    },
  };
}
