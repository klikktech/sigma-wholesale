// "use client";
// import React, { useState } from "react";

// type Props = {
//   height?: string;
//   elements: React.ReactNode[];
// };

// const Carousel = ({ height, elements }: Props) => {
//   const [active, setActive] = useState(0);
//   const totalElements = elements.length;

//   const handleNext = () => {
//     if (active < totalElements - 1) {
//       setActive((prev) => prev + 1);
//     } else {
//       setActive(0);
//     }
//   };

//   const handlePrev = () => {
//     if (active === 0) {
//       setActive(totalElements - 1);
//     } else {
//       setActive((prev) => prev - 1);
//     }
//   };

//   return (
//     <div className="container mx-auto">
//       <div className="flex justify-center items-center gap-4">
//         <span className="material-symbols-rounded" onClick={handlePrev}>
//           chevron_left
//         </span>
//         {elements.map((element, index) => (
//           <>
//             {active === index && (
//               <div
//                 key={`carousel-${index}`}
//                 className={`carousel-content items-center flex h-200`}
//               >
//                 {element}
//               </div>
//             )}
//           </>
//         ))}
//         <span className="material-symbols-rounded" onClick={handleNext}>
//           chevron_right
//         </span>
//       </div>
//     </div>
//   );
// };

// export default Carousel;