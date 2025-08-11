import React from "react";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function Logs() {
  const logs = [
    { action: "Admin has logged in to the system", size: " ", date: "Sun, 10 Aug 2025" },
    { action: "User John uploaded a file (PDF)", size: "2.4 MB", date: "Mon, 11 Aug 2025" },
    { action: "User Sarah uploaded a file (JPEG)", size: "3.2 MB", date: "Tue, 12 Aug 2025" },
    { action: "Moderator Mike logged in to the system", size: " ", date: "Wed, 13 Aug 2025" },
    { action: "Admin uploaded a file (DOCX)", size: "1.1 MB", date: "Thu, 14 Aug 2025" },
    { action: "User Anna logged in to the system", size: " ", date: "Fri, 15 Aug 2025" },
  ];

  return (
    <>
      <p className="font-bold text-xl mt-8 mb-4">System Logs</p>

      <div className="flex flex-col space-y-4">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`p-4 rounded-2xl flex flex-row items-center justify-between ${
              index % 2 === 0 ? "bg-purple-950 text-white" : "bg-purple-200 text-black"
            }`}
          >
            <div className="flex flex-row items-center">
              <DescriptionIcon
                className={`p-2 rounded-full ${
                  index % 2 === 0 ? "text-white bg-purple-800" : "text-purple-800 bg-purple-200"
                }`}
                fontSize="large"
              />
              <div className="flex flex-col ml-2">
                <p className="text-xs">{log.action}</p>
              </div>
            </div>
            <div className="text-xs">{log.size}</div>
            <div className="text-xs">{log.date}</div>
            <button className="cursor-pointer hover:scale-125 duration-300">
              <DeleteForeverIcon
                className={`rounded-full p-2 ${
                  index % 2 === 0 ? "text-red-700 bg-white" : "text-red-700 bg-purple-100"
                }`}
                fontSize="large"
              />
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Logs;
