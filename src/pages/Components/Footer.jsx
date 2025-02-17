import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
const Footer = () => {
<<<<<<< HEAD:src/Components/Footer.jsx
  return (
    <div className=" flex justify-between items-center h-20 w-full ">
      <div className="flex gap-20 items-center w-1/2">
        <img src="/Images/logo.jpg " className="h-12" alt="" />
        <h1> &copy; 2022 Company, Inc </h1>
      </div>
      <div className="flex justify-center gap-12 ml-20 items-center w-1/2">
        <FaInstagram />
        <FaFacebook />
        <FaLinkedin />
        <FaWhatsapp />
      </div>
    </div>
  );
=======
    
    return (
        <div className=' flex justify-between items-center px-20 h-32'>

            <div className='flex gap-20 items-center w-1/2'>
                <img src="/Images/logo.jpg " className='h-12' alt="" />
                <h1> &copy; 2022 Company, Inc </h1>
            </div>
            <div className='flex justify-center gap-12 ml-20 items-center w-1/2'>
                <FaInstagram className='cursor-pointer'/>
                <FaFacebook className='cursor-pointer'/>
                <FaLinkedin className='cursor-pointer'/>
                <FaWhatsapp className='cursor-pointer'/>
                
            </div>
        </div>
    );
>>>>>>> ef160900d768bc623b28d0097ad3d5cb8b0af59f:src/pages/Components/Footer.jsx
};

export default Footer;
