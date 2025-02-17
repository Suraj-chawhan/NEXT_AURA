import React, { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const navitem = ["About", "Services", "Condtions", "Feedback"];
  const navitem2 = ["Login", "Singup"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div className="h-20 bg-zinc-800 flex justify-between items-center px-20">
        <div>
          <img src="/Images/logo.jpg" className="w-10 cursor-pointer" alt="" />
        </div>
        <div className="flex justify-between items-center  gap-10">
          {navitem.map((item, idx) => {
            return (
              <Link className="cursor-pointer" href={`/Components/${item}`} key={idx}>
                {item}
              </Link>
            );
          })}
        </div>
        <div className=" flex justify-between items-center gap-5">
          {navitem2.map((item, idx) => {
            return (
              <Link className="cursor-pointer" href={`/Components/${item}`} key={idx}>
                {item}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;
