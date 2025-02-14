import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
const Footer = () => {
    
    return (
        <div className=' flex justify-between items-center px-20 h-32'>

            <div className='flex gap-20 items-center w-1/2'>
                <img src="/Images/logo.jpg " className='h-12' alt="" />
                <h1> &copy; 2022 Company, Inc </h1>
            </div>
            <div className='flex justify-center gap-12 ml-20 items-center w-1/2'>
                <FaInstagram/>
                <FaFacebook/>
                <FaLinkedin/>
                <FaWhatsapp/>
                
            </div>
        </div>
    );
};

export default Footer;
