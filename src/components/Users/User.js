import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./User.module.css";

const User = () => {
  const auth = useSelector((state) => state.auth.logged);
  const id = useSelector((state) => state.url.id);
  const currentUserRole = useSelector((state) => state.role.role); // Assuming role is stored in Redux

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null); // For the popup
  const [newRole, setNewRole] = useState(""); // For role editing
  const [isPopupVisible, setIsPopupVisible] = useState(false); // Popup visibility state

  useEffect(() => {
    const fetchData = async () => {
      if (auth && id) {
        try {
          const response = await fetch(`/api/company/${id}`);
          const apidata = await response.json();
          setData(apidata.data.company);
          setFilteredData(apidata.data.company[0]?.workers || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setData([]);
        setFilteredData([]);
      }
    };

    fetchData();
  }, [auth, id]);

  const HandleInputData = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setQuery(value);
    filterRowFunction(value);
  };

  const filterRowFunction = (value) => {
    if (!data[0]?.workers) {
      setFilteredData([]);
      return;
    }
    if (!value) {
      setFilteredData(data[0].workers);
      return;
    }
    const filtered = data[0].workers.filter(
      (row) =>
        row.name.toLowerCase().includes(value) ||
        row.email.toLowerCase().includes(value) ||
        row.role.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setNewRole(user.role); // Initialize with the current role
    setIsPopupVisible(true);
  };

  const handleUpdateRole = async () => {
    if (selectedUser) {
      try {
        const response = await fetch(`/api/user/${selectedUser.email}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ role: newRole }),
        });
        if (response.ok) {
          alert("User role updated successfully!");
          // Update the data locally
          setFilteredData((prev) =>
            prev.map((user) =>
              user.email === selectedUser.email
                ? { ...user, role: newRole }
                : user
            )
          );
          setIsPopupVisible(false); // Close the popup
        } else {
          alert("Failed to update user role!");
        }
      } catch (error) {
        console.error("Error updating user role:", error);
      }
    }
  };

  return (
    <div>
      <div className={`mb-5 ${styles.text}`}>User Management</div>
      <div className="flex items-center mb-5">
        <div>
          <input
            className={styles.inputbox}
            type="text"
            placeholder="Search User"
            alt="user"
            value={query}
            onChange={HandleInputData}
          />
        </div>
        <div>
          <button className={`ml-5 ${styles.btn}`}>Search User</button>
        </div>
      </div>
      <div>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border border-gray-200">Name</th>
              <th className="p-2 border border-gray-200">Email</th>
              <th className="p-2 border border-gray-200">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr
                key={row.email}
                className="cursor-pointer hover:bg-gray-200"
                onClick={() => handleRowClick(row)}
              >
                <td className="p-2 border border-gray-200">{row.name}</td>
                <td className="p-2 border border-gray-200">{row.email}</td>
                <td className="p-2 border border-gray-200">{row.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Box */}
      {isPopupVisible && selectedUser && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">User Details</h2>
            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>
            <div>
              <strong>Role:</strong>{" "}
              {currentUserRole === "admin" ? (
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="ml-2 border rounded p-1"
                >
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                </select>
              ) : (
                selectedUser.role
              )}
            </div>
            {currentUserRole === "admin" && (
              <button
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleUpdateRole}
              >
                Update Role
              </button>
            )}
            <button
              className="mt-4 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              onClick={() => setIsPopupVisible(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;
