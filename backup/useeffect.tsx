// "use client";

// import { useEffect, useState, useRef } from "react";

// const BelajarHook = () => {
//   let [message, setMessage] = useState("tess");
//   let [count, setcount] = useState(0);
//   let [number, setNumber] = useState(0);
//   let [text, setText] = useState(false);
//   useEffect(() => {
//     setcount((c) => c + 1);
//     console.log("use berjalan");
//   }, [message, text, number]);
//   return (
//     <section>
//       <p>belajar hook {count}</p>
//       <p>{text ? "sudah" : "belum"}</p>
//       <div className="text-red-500 font-bold">{message}</div>
//       <InputText
//         id="1"
//         value={message}
//         onChange={(a) => {
//           setMessage(a.target.value);
//         }}
//       />

//       <Button
//         title="tes"
//         colorSchema="red"
//         variant="solid"
//         onClick={() => {
//           setText(!text);
//         }}
//       />

//       <Button
//         title="kurang"
//         colorSchema="red"
//         variant="solid"
//         onClick={() => {
//           setNumber((a) => a - 1)
//         }}
//       />
//     </section>
//   );
// };

// export default BelajarHook;
