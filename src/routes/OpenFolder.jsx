import React from "react";
import { useParams } from "react-router-dom";
import FilesTable from "../components/folder/FilesTable";
import Sidebar from "../components/Sidebar";

function OpenFolder() {
  const { id } = useParams();

  return (
    <>
      <Sidebar />
      <div className="ml-4 sm:pl-72 mt-6 pr-6">
        <FilesTable folderId={id} />
      </div>
    </>
  );
}

export default OpenFolder;
