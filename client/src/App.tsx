// import { useState, useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
// import './index.css';

// import Header from './components/Header';

// import austin from "./images/austin.webp";
// import sanDiego from "./images/san-diego.jpg"
// import seattle from "./images/seattle.jpg";
// import stockholm from "./images/stockholm.jpg";
// import toronto from "./images/toronto.webp";
// import garden from "./images/zen-garden.jpg";

// const images = [
//   austin,
//   sanDiego,
//   seattle,
//   stockholm,
//   toronto,
//   garden
// ];

// const App: React.FC = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 30000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="app">
//       <Header />
//       {images.map((image, index) => (
//         <div
//           key={index}
//           className={`background-image ${index === currentImageIndex ? 'fade-in' : 'fade-out'}`}
//           style={{ backgroundImage: `url(${image})` }}
//         >
//           <Outlet />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;

import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./index.css";

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;
