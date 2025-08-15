import React from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import Tooltip from "@mui/material/Tooltip";

function RecentUploads() {
  const files = [
    { name: "Sample_File.docx", size: "200 MB" },
    { name: "Annual_Report_2024.pdf", size: "3.4 MB" },
    { name: "Presentation_Slides.pptx", size: "8.1 MB" },
    { name: "Budget_Plan.xlsx", size: "1.2 MB" },
    { name: "Meeting_Notes.txt", size: "500 KB" },
  ];

  return (
    <div className="bg-purple-950 p-3 pt-4 rounded-t-xl mt-4">
      <div className="flex items-center justify-between pb-4 border-b border-b-gray-500 text-white">
        <p className="font-semibold">Top 5 Recent Uploads</p>
        <Tooltip title="Refresh" arrow placement="top">
          <RefreshIcon
            className="cursor-pointer"
            style={{
              display: "inline-block",
              transition: "transform 0.3s ease-in-out",
              transform: "rotate(0deg)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "rotate(195deg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotate(0deg)";
            }}
          />
        </Tooltip>
      </div>

      <ul className="mt-6">
        {files.map((file, index) => (
          <li
            key={index}
            className="flex items-center justify-between py-3 px-2 hover:bg-purple-900/50 rounded-lg transition"
          >
            <div className="flex items-center gap-3">
              <InsertDriveFileIcon className="bg-purple-700 p-1 text-white rounded-full" />
              <div>
                <p className="text-white text-sm truncate">{file.name}</p>
                <p className="text-gray-400 text-xs">{file.size}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecentUploads;
