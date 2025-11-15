import React from "react";
import FoldersTable from "../components/folder/FoldersTable";
import Sidebar from "../components/Sidebar";
import BackupTable from "../components/Archives/BackupTable";
function Backups() {
  return (
    <>
      <Sidebar />
      <div className="ml-4 sm:pl-72 mt-6 pr-6">
        <BackupTable />
      </div>
    </>
  );
}

export default Backups;
