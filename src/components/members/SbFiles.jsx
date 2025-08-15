import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import api from "../../assets/api";
import wordImg from "../../assets/images/filesImg/word.png";
import pdfImg from "../../assets/images/filesImg/pdf.png";
import pptImg from "../../assets/images/filesImg/ppt.png";
import xlsImg from "../../assets/images/filesImg/xls.png";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Header from "./Header";
import Search from "./Search";

function SbFiles() {
  const { folderId } = useParams();
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const folderName = location.state?.folderName;

  useEffect(() => {
    api
      .get(`/api/folders/${folderId}/files/`)
      .then((res) => {
        setFiles(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [folderId]);

  const getFileIcon = (fileName, fileUrl) => {
    const ext = fileName.split(".").pop().toLowerCase();
    if (ext === "doc" || ext === "docx") return wordImg;
    if (ext === "pdf") return pdfImg;
    if (ext === "ppt" || ext === "pptx") return pptImg;
    if (ext === "xls" || ext === "xlsx") return xlsImg;
    return fileUrl; // for images, show actual file
  };

  return (
    <>
      <Header />
      <div class="mb-5 flex justify-between text-sm px-5 sm:px-10 md:px-16 pt-24">
        <div class="text-purple-600 flex items-center pb-2 pr-2 uppercase">
          <div class="font-semibold flex flex-row items-center text-2xl">
            <Link to={"/sb-dashboard"}>HOME</Link>{" "}
            <NavigateNextIcon fontSize="small" className="text-gray-800" />{" "}
            <p className="text-gray-800">Folder</p>
            <NavigateNextIcon fontSize="small" className="text-gray-800" />{" "}
            <p className="text-gray-800">{folderName}</p>
          </div>
        </div>
        <Search />
      </div>
      <div className="flex flex-wrap gap-5 px-5 sm:px-10 md:px-16">
        {files.map((file) => (
          <div
            key={file.id}
            className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
          >
            <div className="flex flex-col items-center pb-10 py-8">
              <img
                className="w-24 h-24 mb-3"
                src={getFileIcon(file.file_name, file.file)}
                alt={file.file_name}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 break-all text-center mx-12">
                {file.file_name}
              </h5>

              <span className="text-sm text-gray-500">
                Uploaded by: {file.uploaded_by.username}
              </span>
              <div className="flex mt-4 md:mt-6">
                <a
                  href={file.file}
                  download
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800"
                >
                  Download
                </a>
                <button className="ml-3 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                  View
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SbFiles;
