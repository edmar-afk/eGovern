import React, { useEffect, useState } from "react";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import api from "../../assets/api";
import FileUpload from "./FileUpload";
import { getUserInfoFromToken } from "../../utils/auth";
import { Link, useLocation } from "react-router-dom";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Swal from "sweetalert2";
function FilesTable({ folderId }) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("access");
  const userInfo = getUserInfoFromToken(token);

  const location = useLocation();
  const folderName = location.state?.folderName;

  const fetchFiles = () => {
    setLoading(true);
    api
      .get(`/api/folders/${folderId}/files/`)
      .then((res) => {
        setFiles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch files", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (folderId) {
      fetchFiles();
    }
  }, [folderId]);

  const handleArchive = (fileId) => {
  Swal.fire({
    title: "Archive this file?",
    text: "You can restore it later from the archive.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#6b21a8",
    cancelButtonColor: "#6b7280",
    confirmButtonText: "Yes, archive it",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      api
        .patch(`/api/files/${fileId}/archive/`, {}, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          Swal.fire("Success!", "The file has been moved to archive.", "success");
          fetchFiles();
        })
        .catch(() => {
          Swal.fire("Error!", "Failed to archive the file.", "error");
        });
    }
  });
};


  return (
    <div className="w-full flex items-center justify-center min-h-full p-2">
      <div className="container">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  <Link to={"/folders"}>Folders</Link> &gt;{" "}
                  {folderName || "Loading..."}
                </h2>
                <p className="text-gray-500 mt-1">
                  Manage your Files inside {folderName || "Loading..."} here.
                </p>
              </div>
              <FileUpload
                userId={userInfo.id}
                folderId={folderId}
                onUploadSuccess={fetchFiles}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    File Size
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Uploaded By
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      Loading Files...
                    </td>
                  </tr>
                ) : files.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No files found.
                    </td>
                  </tr>
                ) : (
                  files.map((file) => {
                    const fileParts = file.file_name.split(".");
                    const extension =
                      fileParts.length > 1 ? fileParts.pop() : "";
                    const nameWithoutExt = fileParts.join(".");

                    return (
                      <tr
                        key={file.id}
                        className="hover:bg-gray-50 transition-colors duration-150"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <InsertDriveFileIcon
                              className="text-blue-500"
                              fontSize="large"
                            />
                            <a
                              href={file.file}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="ml-4 text-sm font-medium text-indigo-600 hover:underline"
                            >
                              {nameWithoutExt}
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {extension.toUpperCase()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {file.file_size}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {file.uploaded_by.first_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(file.date_creation)
                            .toLocaleString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "2-digit",
                              hour12: true,
                            })
                            .replace(/^([A-Za-z]{3})/, "$1.")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="flex flex-row ">
                            <Tooltip
                              title="Delete"
                              arrow
                              placement="top"
                              componentsProps={{
                                tooltip: {
                                  sx: {
                                    backgroundColor: "#6b21a8",
                                    color: "#fff",
                                    fontSize: "0.75rem",
                                    borderRadius: "6px",
                                  },
                                },
                                arrow: {
                                  sx: { color: "#6b21a8" },
                                },
                              }}
                            >
                              <DeleteForeverIcon
                                className="cursor-pointer text-red-600"
                                onClick={() => handleArchive(file.id)}
                              />
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilesTable;
