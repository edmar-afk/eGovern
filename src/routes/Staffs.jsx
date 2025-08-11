import React from "react";
import Sidebar from "../components/Sidebar";
import StaffsTable from "../components/staffs/StaffsTable";
function Staffs() {
  return (
    <>
      <Sidebar />
      <div className="ml-4 sm:pl-72 mt-6 pr-6">
        <StaffsTable />
      </div>
    </>
  );
}

export default Staffs;
