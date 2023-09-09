// "use client";
// import { useEffect, useState } from "react";
// import Button from "./component/button";
// import { type } from "os";

// type Nilai = {
//   mata_pelajaran: "Fisika" | "Kimia" | "Biologi" | "Matematika" | "";
//   nilai: 70 | 80 | 90 | 100 | "";
// };

// const Home = () => {
//   let [nilai, setNilai] = useState<Nilai[]>([
//     {
//       mata_pelajaran: "Matematika",
//       nilai: 80,
//     },
//   ]);

//   let [save, setSave] = useState(true);

//   const [backup, setBackup] = useState<Nilai>({
//     mata_pelajaran: "",
//     nilai: "",
//   });

//   useEffect(() => {
//     if (backup.mata_pelajaran != "" || backup.nilai != "") {
//       setSave(false);
//     }
//   }, [save]);

//   return (
//     <main className="space-y-5 m-2">
//       {/* {JSON.stringify(backup)} */}
//       {nilai.map((u, index) => (
//         <section
//           key={index}
//           className="bg-white w-auto mt-10 flex gap-2 shadow-xl backdrop-blur-lg rounded-xl p-5 flex-col"
//         >
//           <h1>Mata pelajaran: {u.mata_pelajaran}</h1>
//           <h1>Nilai: {u.nilai}</h1>
//           <Button
//             title="Delete"
//             colorSchema="red"
//             variant="solid"
//             onClick={() => {
//               setNilai((prevnilai) => {
//                 prevnilai.pop();
//                 return [...prevnilai];
//               });
//             }}
//           />
//         </section>
//       ))}
//       <div>
//         <Button
//           title="Fisika"
//           variant="solid"
//           colorSchema="green"
//           isDisabled={backup.mata_pelajaran === "Fisika"}
//           onClick={() => {
//             setBackup((prev) => {
//               return {
//                 ...prev,
//                 mata_pelajaran: "Fisika",
//               };
//             });
//           }}
//         />
//         <Button
//           title="Kimia"
//           variant="solid"
//           colorSchema="purple"
//           isDisabled={backup.mata_pelajaran === "Kimia"}
//           onClick={() => {
//             setBackup((prev) => {
//               return {
//                 ...prev,
//                 mata_pelajaran: "Kimia",
//               };
//             });
//           }}
//         />
//         <Button
//           title="Biologi"
//           variant="solid"
//           colorSchema="blue"
//           isDisabled={backup.mata_pelajaran === "Biologi"}
//           onClick={() => {
//             setBackup((prev) => {
//               return {
//                 ...prev,
//                 mata_pelajaran: "Biologi",
//               };
//             });
//           }}
//         />
//       </div>
//       <div>
//         <Button
//           title="70"
//           variant="solid"
//           colorSchema="green"
//           isDisabled={backup.nilai === 70}
//           onClick={() => {
//             setBackup((prev) => {
//               return {
//                 ...prev,
//                 nilai: 70,
//               };
//             });
//           }}
//         />
//         <Button
//           title="80"
//           variant="solid"
//           colorSchema="purple"
//           isDisabled={backup.nilai === 80}
//           onClick={() => {
//             setBackup((prev) => {
//               return {
//                 ...prev,
//                 nilai: 80,
//               };
//             });
//           }}
//         />
//         <Button
//           title="90"
//           variant="solid"
//           colorSchema="blue"
//           isDisabled={backup.nilai === 90}
//           onClick={() => {
//             setBackup((prev) => {
//               return {
//                 ...prev,
//                 nilai: 90,
//               };
//             });
//           }}
//         />
//         <Button
//           title="100"
//           variant="solid"
//           colorSchema="sky"
//           isDisabled={backup.nilai === 100}
//           onClick={() => {
//             setBackup((prev) => {
//               return {
//                 ...prev,
//                 nilai: 100,
//               };
//             });
//           }}
//         />
//       </div>
//       <Button
//         title="Simpan"
//         variant="solid"
//         colorSchema="red"
//         isDisabled={backup.mata_pelajaran === "" || backup.nilai === ""}
//         onClick={() => {
//           setNilai((prevNilai) => {
//             return [
//               ...prevNilai,
//               {
//                 mata_pelajaran: backup.mata_pelajaran,
//                 nilai: backup.nilai,
//               },
//             ];
//           });

//           setBackup((prevbackup) => {
//             return {
//               mata_pelajaran: "",
//               nilai: "",
//             };
//           });
//           setSave(true);
//         }}
//       />
//     </main>
//   );
// };

// export default Home;

// "use client";
// import { useState } from "react";
// import Tambah from "./component/tambah";
// import Kurang from "./component/kurang";

// const App = () => {
//   let [count, setCount] = useState(0);
//   return (
//     <div>
//       <h1 className="text-lg">{count}</h1>
//       <section>
//         <Tambah count={count} setCount={setCount} />
//         <Kurang />
//       </section>
//     </div>
//   );
// };

// export default App;

