import { useState } from "react";
import styles from "./User.module.css";
import Detail from "../Detail/Detail";

const User = () => {
  const rows = [
    { name: "John Doe", email: "john@example.com", role: "Admin" },
    { name: "Jane Smith", email: "jane@example.com", role: "Editor" },
    { name: "Michael Johson", email: "michael@example.com", role: "Viewer" },
    { name: "Emily Brown", email: "emilyb@example.com", role: "Editor" },
    { name: "David Wilson", email: "davidw@example.com", role: "Admin" },
  ];

  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState(rows);
  const HandleInputData = (e) => {
    const value = e.target.value.toLowerCase().trim();
    setQuery(value);
    filterRowFunction(value);
  };

  const filterRowFunction = (value) => {
    if (!value) {
      setFilteredData(rows);
      return;
    }
    const filtered = rows.filter(
      (row) =>
        row.name.toLocaleLowerCase().includes(value) ||
        row.email.toLocaleLowerCase().includes(value) ||
        row.role.toLocaleLowerCase().includes(value)
    );
    setFilteredData(filtered);
  };
  return (
    <div>
      <div className={`mb-5 ${styles.text}`}>User Managment</div>
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
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row) => (
              <tr key={row.email}>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Detail />
      </div>
    </div>
  );
};

export default User;
