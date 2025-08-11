import React from "react";
import StorageIcon from "@mui/icons-material/Storage";
import HelpIcon from "@mui/icons-material/Help";
function Storage() {
  const max = 500;
  const used = 500;
  const percent = (used / max) * 100;
  return (
    <>
      <div className="mt-8">
        <div className="flex flex-row items-center mb-2">
          <StorageIcon fontSize="small" className="mr-1" />
          <p className="font-semibold text-sm">Storage</p>
        </div>

        <p className="text-xs my-1 mr-2 text-gray-600 text-right flex justify-end items-center">
          {used}MB of {max}MB used{" "}
          <HelpIcon
            fontSize="small"
            className="text-purple-600 ml-2 mb-0.5 animate-pulse"
          />
        </p>
        <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: `${percent}%`,
              background: `linear-gradient(to right, #22c55e, #facc15, #ef4444)`,
            }}
          ></div>
        </div>
      </div>
    </>
  );
}

export default Storage;
