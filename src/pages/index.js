import React, { useEffect } from "react";
import Slidebar from "./Components/Slidebar";
import Navbar from "./Components/Navbar";
import Gamebox from "./Components/Gamebox";
import Footer from "./Components/Footer";
import ImageYesNo from './ImageYesNo/indes';
import LocomotiveScroll from 'locomotive-scroll';

export default function Home() {
  useEffect(() => {
    // Initialize Locomotive Scroll once the component is mounted
    const scroll = new LocomotiveScroll({
      el: document.querySelector('[data-scroll-container]'), // Specify the container with scroll effects
      smooth: true,  // Enable smooth scrolling
    });

    // Cleanup the scroll instance when the component unmounts
    return () => {
      if (scroll) {
        scroll.destroy();
      }
    };
  }, []); // Empty dependency array, so this effect runs only once on mount

  return (
    <>
      {/* Uncomment to use the components */}
      
      
      {/* The scroll container */}
      <div data-scroll-container>
      <Navbar />
      <Gamebox />
      <Footer />
        {/* <ImageYesNo /> */}
        {/* Add other components or sections inside the scroll container */}
      </div>
    </>
  );
}
