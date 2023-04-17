// // @ts-nocheck
// // // @ts-nocheck
// // export function Home() {
// //   return <div className="text-3xl underline">



// //   </div>;
// // }


// import { ToastContainer, toast } from 'react-toastify';
// import React, { useState, useEffect } from 'react';

// import './Home.css'

// import HomeHeader from '../components/layouts/header/Header'
// import BackgroudLayout from '../components/layouts/background/Layout'


// export function Home() {
//   const [dataSearch, setDataSearch] = useState([]);
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/users')
//       .then(response => response.json())
//       .then(data => {
//         setDataSearch(data.filter(user => user.name.toLowerCase().includes(filter.toLowerCase())));
//       });
//   }, [filter]);

//   const handleSearchChange = (e) => {
//     setFilter(e.target.value)
//   }

//   const handleClickItemSearch = (filtedKey) => {
//     setFilter(filtedKey)
//   }

//   return (
//     <div className='my-container'>
//       <HomeHeader />

//       <BackgroudLayout>
//         <div className='w-4/5 text-Poppins my-container container mx-auto py-0 px-2 flex items-center'>
//           <label className='my-child mt-48 text-4xl text-center block text-white'>1+ Job posted last week</label>
//           {/* to create menu for combobox */}
//           <div className="relative">
//             <div style={{ top: '66px', left: '32px' }} className="absolute">
//               <div className='h-56 w-80 flex flex-col overflow-y-auto scrollbar-hide'>
//                 {filter && dataSearch.map(user => (
//                   <div onClick={() => handleClickItemSearch(user.name)} key={user.id} className='flex bg-white p-2 hover:bg-gray-200'>{user.name}</div>
//                 ))}
//               </div>
//             </div>

//             {/* for create taskbar search in home page */}
//             <div className='flex my-child space-x-10 bg-home_search_transparent_purple pt-3 pb-3 pl-8 pr-8 text-Poppins mt-2 text-normal text-center'>
//               <input
//                 type="text"
//                 value={filter}
//                 onChange={handleSearchChange}
//                 autoFocus
//                 placeholder='What are you looking for?'
//                 className="border w-80 h-11 border-slate-200 focus:outline-none p-1.5"
//               />

//               <select className='w-32 h-11 flex items-center justify-center'>
//                 <option value="option1">Option 1</option>
//                 <option value="option2">Option 2</option>
//                 <option value="option3">Option 3</option>
//               </select>

//               <button className="p-4 h-11 flex items-center justify-center bg-background_color hover:bg-background_color_hover">
//                 Search
//               </button>
//             </div>
//           </div>

//         </div>
//       </BackgroudLayout>

//       <div className='relative bg-white h-1/2 w-full'>
//         <div style={{ top: '-70px', left: '0px' }} className="absolute w-full h-auto p-2">
//           <div className='w-full h-auto'>
//             <div className='flex space-x-20 items-center justify-center display-linebreak'>
//               <label className='shadow-md shadow-purple-500 rounded-xl flex flex-col items-center justify-center w-52 h-32 bg-white'>
//                 <div className='flex flex-col items-center justify-center p-2 text-center'>
//                   <p className='text-2xl'><b>Searching</b></p>
//                   <p className='text-xl mt-2'>Find jobs which you are suitable</p>
//                 </div>
//               </label>
//               <label className='shadow-md shadow-purple-500 rounded-xl flex flex-col items-center justify-center w-52 h-32 bg-white'>
//                 <div className='flex flex-col items-center justify-center p-2 text-center'>
//                   <p className='text-2xl'><b>Apply</b></p>
//                   <p className='text-xl mt-2'>Enter for{"\n"} the job</p>
//                 </div>
//               </label>
//               <label className='shadow-md shadow-purple-500 rounded-xl flex flex-col items-center justify-center w-52 h-32 bg-white'>
//                 <div className='flex flex-col items-center justify-center p-2 text-center'>
//                   <p className='text-2xl'><b>Contact</b></p>
//                   <p className='text-xl mt-2'>Connect you to the company</p>
//                 </div>
//               </label>
//               <label className='shadow-md shadow-purple-500 rounded-xl flex flex-col items-center justify-center w-52 h-32 bg-white'>
//                 <div className='flex flex-col items-center justify-center p-2 text-center'>
//                   <p className='text-2xl'><b>Success</b></p>
//                   <p className='text-xl mt-2'>Have your dream {"\n"}job </p>
//                 </div>
//               </label>
//             </div>
//           </div>
//         </div>
//       </div>

//       <label className='w-full h-12 mt-40'>
//         <p className='text-5xl text-center'><b>Feature Job Categories</b></p>
//       </label>

//       <div className='w-full h-auto bg-red-800 mt-36 flex space-x-20 items-center justify-center'>
//         <label className='rounded-xl flex flex-col items-center justify-center w-40 h-32 bg-yellow-800'>
//           <div className='flex flex-col items-center justify-center p-2 text-center'>
//             <img
//             className='w-12 h-12'
//             src='https://cdn-icons-png.flaticon.com/512/1552/1552545.png'
//             />
//             <p className='text-2xl mt-2'><b>Success</b></p>
//           </div>
//         </label>
//         <label className='rounded-xl flex flex-col items-center justify-center w-40 h-32 bg-yellow-800'>
//           <div className='flex flex-col items-center justify-center p-2 text-center'>
//             <p className='text-2xl'><b>Success</b></p>
//             <p className='text-xl mt-2'>Have your dream {"\n"}job </p>
//           </div>
//         </label>
//         <label className='rounded-xl flex flex-col items-center justify-center w-40 h-32 bg-yellow-800'>
//           <div className='flex flex-col items-center justify-center p-2 text-center'>
//             <p className='text-2xl'><b>Success</b></p>
//             <p className='text-xl mt-2'>Have your dream {"\n"}job </p>
//           </div>
//         </label>
//         <label className='rounded-xl flex flex-col items-center justify-center w-40 h-32 bg-yellow-800'>
//           <div className='flex flex-col items-center justify-center p-2 text-center'>
//             <p className='text-2xl'><b>Success</b></p>
//             <p className='text-xl mt-2'>Have your dream {"\n"}job </p>
//           </div>
//         </label>
//         <label className='rounded-xl flex flex-col items-center justify-center w-40 h-32 bg-yellow-800'>
//           <div className='flex flex-col items-center justify-center p-2 text-center'>
//             <p className='text-2xl'><b>Success</b></p>
//             <p className='text-xl mt-2'>Have your dream {"\n"}job </p>
//           </div>
//         </label>
//       </div>
//     </div>
//   );
// }


// export default Home;