import React, { useEffect, useState } from "react";
import api from "../../assets/api";
import Swal from "sweetalert2";

function StaffsTable() {
  const [users, setUsers] = useState([]);
  console.log(users);
  useEffect(() => {
    api.get("/api/non-staff-users/").then((res) => {
      setUsers(res.data);
    });
  }, []);

  const handleDelete = (userId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete(`/api/users/${userId}/delete/`)
          .then(() => {
            setUsers(users.filter((u) => u.id !== userId));
            Swal.fire("Deleted!", "User has been deleted.", "success");
          })
          .catch(() => {
            Swal.fire("Error", "Failed to delete user.", "error");
          });
      }
    });
  };

  const BASE_URL = import.meta.env.VITE_API_URL;

  return (
    <>
      <div className="w-full flex items-center justify-center min-h-full p-2">
        <div className="container">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Staff Members</h2>
                  <p className="text-gray-500 mt-1">
                    Manage your team staff and their account permissions here.
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                  
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={
                                user.profile_picture
                                  ? `${BASE_URL}${user.profile_picture}`
                                  : "https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png"
                              }
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.first_name}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">User</div>
                      </td>

                   

                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between flex-col sm:flex-row">
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{users.length}</span>{" "}
                  results
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StaffsTable;
