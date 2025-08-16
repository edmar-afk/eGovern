import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./routes/Login";
import Register from "./routes/Register";
import Dashboard from "./routes/Dashboard";
import Staffs from "./routes/Staffs";
import Folders from "./routes/Folders";
import NotFound from "./routes/NotFound";
import OpenFolder from "./routes/OpenFolder";
import SbDashboard from "./routes/SbDashboard";
import SbFiles from "./components/members/SbFiles";
import Archives from "./routes/Archives";
import Confidentials from "./routes/Confidentials";
function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sb-dashboard" element={<SbDashboard />} />
        <Route path="/sb-files/:folderId" element={<SbFiles />} />
        <Route path="/staffs" element={<Staffs />} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/archives" element={<Archives />} />
        <Route path="/confidentials" element={<Confidentials />} />
        <Route path="/open-folder/:id" element={<OpenFolder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
