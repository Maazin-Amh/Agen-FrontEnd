// "use client";

// import { useState } from "react";
// import Home from "../page";

// type Identitas = {
//   nama: string;
//   sekolah: string;
//   umur: number | null;
// };

// type Hasil = {
//   mata_pelajaran: string;
//   nilai: number | null;
// };

// const home = () => {
//   let [message, setMessage] = useState("haii");
//   let [count, setCount] = useState(0);
//   let [isLogin, setIsLogin] = useState(false);

//   let [profile, setProfile] = useState<Identitas>({
//     nama: "ariiq",
//     sekolah: "smk mq",
//     umur: 16,
//   });

//   let [hasil, setHasil] = useState<Hasil[]>([
//     {
//       mata_pelajaran: "matematika",
//       nilai: 80,
//     },
//     {
//       mata_pelajaran: "fisika",
//       nilai: 90,
//     },
//     {
//       mata_pelajaran: "kimia",
//       nilai: 95,
//     },
//   ]);

//   return (
//     <main className="space-y-5">
//       <h1>Hello World</h1>
//       <p>message addalah {message}</p>{" "}
//       <Button
//         title="Hello"
//         variant="solid"
//         colorSchema="blue"
//         onClick={() => {
//           setMessage("Hello");
//         }}
//       />
//       <Button
//         title="Salam"
//         variant="outline"
//         colorSchema="blue"
//         onClick={() => {
//           setMessage("Assalamualaikum");
//         }}
//       />
//       <p>Count adalah {count}</p>
//       <Button
//         title="Tambah"
//         variant="solid"
//         colorSchema="blue"
//         onClick={() => {
//           setCount((prevCount) => prevCount + 1);
//         }}
//       />
//       <Button
//         title="Kurang"
//         isDisabled={count < 1}
//         variant="solid"
//         colorSchema="red"
//         onClick={() => {
//           setCount((prevCount) => prevCount - 1);
//         }}
//       />
//       <p> {isLogin ? "Sudah Login" : "Belum Login"}</p>
//       <Button
//         title="Login"
//         isDisabled={isLogin === true}
//         variant="solid"
//         colorSchema="blue"
//         onClick={() => {
//           setIsLogin(true);
//         }}
//       />
//       <Button
//         title="Logout"
//         isDisabled={isLogin === false}
//         variant="solid"
//         colorSchema="red"
//         onClick={() => {
//           setIsLogin(false);
//         }}
//       />
//       <div className="flex flex-col">
//         <h5>Nama : {profile.nama}</h5>
//         <h5>Sekolah : {profile.sekolah}</h5>
//         <h5>Umur : {profile.umur}</h5>
//       </div>
//       <Button
//         title="Ubah Nama"
//         variant="solid"
//         colorSchema="blue"
//         onClick={() => {
//           setProfile((prevProfile) => {
//             return {
//               ...prevProfile,
//               nama: "Ilham Maulana Fikri",
//             };
//           });
//         }}
//       />
//       <Button
//         title="Update"
//         variant="solid"
//         colorSchema="blue"
//         onClick={() => {
//           setProfile((prevProfile) => {
//             return {
//               ...prevProfile,
//               sekolah: "SMP MADINATULQURAN",
//             };
//           });
//         }}
//       />
//       <div>
//         <h2>Daftar Nilai</h2>
//         {hasil.map((n, index) => (
//           <section key={index}>
//             <h5>Nama Mata pelajaran : {n.mata_pelajaran} </h5>
//             <h5>Nilai : {n.nilai} </h5>
//           </section>
//         ))}

//         <Button
//           title="Tambah"
//           variant="solid"
//           colorSchema="blue"
//           onClick={() => {
//             setHasil((prevHasil) => {
//               return [
//                 ...prevHasil,
//                 {
//                   mata_pelajaran: "B. Indonesia",
//                   nilai: 100,
//                 },
//               ];
//             });
//           }}
//         />
//         <Button
//           title="Kurang"
//           isDisabled={hasil.length <= 1}
//           variant="solid"
//           colorSchema="red"
//           onClick={() => {
//             setHasil((prevHasil) => {
//               prevHasil.pop();
//               return [...prevHasil];
//             });
//           }}
//         />
//       </div>
//     </main>
//   );
// };

// export default Home;
