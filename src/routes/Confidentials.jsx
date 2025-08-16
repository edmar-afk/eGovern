import React from "react";
import Sidebar from "../components/Sidebar";
import ConfidentialTable from "../components/confidentials/ConfidentialTable";
function Confidentials() {
  return (
    <>
      <Sidebar />
      <div className="ml-4 sm:pl-72 mt-6 pr-6">
        <ConfidentialTable />
      </div>
    </>
  );
}

export default Confidentials;
