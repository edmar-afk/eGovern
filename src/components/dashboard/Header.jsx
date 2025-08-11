import React from "react";

function Header() {
  return (
    <div className="flex flex-col items-start">
      <div className="flex flex-row justify-end items-center pb-4 border-b border-b-gray-200 w-full">
        <img
          src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
          alt=""
          className="rounded-full w-8 h-8 mr-2"
        />
        <p className="text-gray-700 font-semibold">Administrator</p>
      </div>
      
    </div>
  );
}

export default Header;
