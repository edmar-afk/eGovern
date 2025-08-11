import Folders from "../components/dashboard/Folders";
import Header from "../components/dashboard/Header";
import Logs from "../components/dashboard/Logs";
import Welcome from "../components/dashboard/Welcome";
import Sidebar from "../components/Sidebar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
function Dashboard() {
  return (
    <>
      <div className="p-4 w-full">
        <div>
          <Sidebar />
        </div>
        <div className="pl-72 mt-6 pr-6">
          <Header />
          <Welcome />
          <div className="mt-8">
            <div className="flex flex-row items-center justify-between mb-4">
              <p className="text-xl font-bold">Folders</p>
              <p>See all</p>
            </div>
            <div className="flex flex-row items-center">
              <Folders />
              <Folders />
              <Folders />
              <Folders />
            </div>
          </div>
          <Logs />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
