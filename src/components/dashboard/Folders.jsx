import React from "react";
import cursorBg from "../../assets/images/cursor.png";

function Folders() {
  return (
    <div className="duration-300 cursor-pointer bg-white hover:bg-purple-950 shadow-sm w-80 border-2 border-gray-200 hover:border-purple-200 rounded-2xl mx-2 group">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm bg-gray-200 py-3 px-12 rounded-tl-2xl rounded-br-2xl shadow-[inset_-5px_-5px_5px_rgba(0,0,0,0.1)] group-hover:shadow-[inset_-5px_-5px_5px_rgba(255,255,255,0.1)] group-hover:text-white group-hover:bg-purple-900">
          My Images
        </p>

        <p className="text-gray-400 text-xs mr-10 group-hover:text-white">
          1,649 files
        </p>
      </div>

      <div className="mt-4 px-4 flex flex-row items-center justify-between relative">
        <div>
          <p className="text-gray-500 text-xs mb-2 group-hover:text-white">
            Created by:
          </p>
          <div className="flex items-center">
            <img
              src="https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
              alt="User"
              draggable="false"
              className="w-8 h-8 rounded-full border-2 border-white"
            />
            <div className="flex items-center justify-center text-xs font-medium text-gray-600 ml-2 group-hover:text-white">
              Sample name
            </div>
          </div>
        </div>

        <img
          src={cursorBg}
          alt=""
          draggable="false"
          className="w-24 absolute -top-3 right-5"
        />
      </div>

      <div className="mt-6 pb-3 flex items-center justify-between text-gray-400 text-xs px-4 group-hover:text-white">
        <p>File added 8m ago</p>
        <p>300 MB</p>
      </div>
    </div>
  );
}

export default Folders;
