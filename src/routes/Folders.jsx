import React from "react";
import FoldersTable from "../components/folder/FoldersTable";
import Sidebar from "../components/Sidebar";
function Folders() {
  return (
    <>
      <Sidebar />
      <div className="ml-4 sm:pl-72 mt-6 pr-6">
        <FoldersTable />
      </div>
    </>
  );
}

export default Folders;
