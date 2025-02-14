import React from "react";
import Space from "./(components)/spacemodel/page";
import Assistant from "./(components)/Assistant/page";
import Quiz from "./(components)/Quiz/page";
import FlipCardGame from "./(components)/Flip/page";

function index() {
  return (
    <div className="w-[100%] h-[100vh]">
      <Assistant />
    </div>
  );
}

export default index;
