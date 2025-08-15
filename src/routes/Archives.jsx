import React from "react";
import FoldersTable from "../components/folder/FoldersTable";
import Sidebar from "../components/Sidebar";
import ArchiveTable from "../components/Archives/ArchiveTable";
function Archives() {
  return (
    <>
      <Sidebar />
      <div className="ml-4 sm:pl-72 mt-6 pr-6">
        <ArchiveTable />
      </div>
    </>
  );
}

export default Archives;
