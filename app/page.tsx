/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState } from "react";
// import Button from "@/component/button";

const Home = () => {
  const [calcu, setcalcu] = useState("0");
  const [hasil, setHasil] = useState("");
  const [showResult, setShowResult] = useState(false); 

  const buttononklik = (title: any) => {
    if (title === "=") {
      jumlah();
    } else if (title === "c") {
      setcalcu("0");
      setHasil("");
      setShowResult(false); 
    } else if (title === ",") {
      if (!calcu.includes(",")) {
        setcalcu((prevcalcu) => prevcalcu + title);
      }
    } else {
      if (calcu === "0") {
        setcalcu(title);
        setShowResult(false); 
      } else {
        setcalcu((prevcalcu) => prevcalcu + title);
      }
    }
  };

  const deleteangka = () => {
    setcalcu((prevcalcu) => prevcalcu.slice(0, -1));
  };

  const jumlah = () => {
  if (calcu !== "" && /[0-9]$/.test(calcu)) {
    const result = eval(calcu);
    setHasil(result.toString());
    setShowResult(true);
  } else {
    setHasil("");
    setShowResult(false); 
  }
};
  
  useEffect(() => {
    jumlah();
  }, [calcu]);
  
  
  return (
    <>
      <main className="flex justify-center my-10">
        <section className="w-[700px] flex flex-col gap-10 p-5 h-full bg-slate-300 rounded-md">
          <span className="flex justify-center items-center">
            <h1 className="font-medium text-center text-xl w-[40%]">
              Penilaian tengah semester front-end developer
            </h1>
          </span>
          <div className="bg-white w-full font-semibold text-3xl flex justify-between h-[100px] border-2 p-3 border-gray-500/50 rounded">
            <span id="calcu">{calcu}</span>
            <span className="items-end flex">{showResult ? hasil : ""}</span>
          </div>
          {/* <div className="grid grid-cols-4 gap-5">
            <Button title="7" warna="grey" onClick={() => buttononklik("7")} />
            <Button title="8" warna="grey" onClick={() => buttononklik("8")} />
            <Button title="9" warna="grey" onClick={() => buttononklik("9")} />
            <Button title="DEL" warna="merah" onClick={deleteangka} />
            <Button title="4" warna="grey" onClick={() => buttononklik("4")} />
            <Button title="5" warna="grey" onClick={() => buttononklik("5")} />
            <Button title="6" warna="grey" onClick={() => buttononklik("6")} />
            <Button title="+" warna="biru" onClick={() => buttononklik("+")} />
            <Button title="1" warna="grey" onClick={() => buttononklik("1")} />
            <Button title="2" warna="grey" onClick={() => buttononklik("2")} />
            <Button title="3" warna="grey" onClick={() => buttononklik("3")} />
            <Button title="-" warna="biru" onClick={() => buttononklik("-")} />
            <Button
              title="c"
              warna="merah"
              height={48}
              onClick={() => {
                setcalcu("0");
                setHasil("");
                setShowResult(false);
              }}
            />

            <Button title="0" warna="grey" onClick={() => buttononklik("0")} />

            <Button title="x" warna="biru" onClick={() => buttononklik("*")} />
            <Button title="/" warna="biru" onClick={() => buttononklik("/")} />
            <Button
              title=","
              warna="kuning"
              onClick={() => buttononklik(",")}
            />

            <Button title="=" warna="biru" width={80} onClick={() => buttononklik("=")}/>
          </div> */}
        </section>
      </main>
    </>
  );
};

export default Home;
