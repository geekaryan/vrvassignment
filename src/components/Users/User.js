import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./User.module.css";
import Detail from "../Detail/Detail";

const User = () => {
  const auth = useSelector((state) => state.auth.logged);
  const id = useSelector((state) => state.url.id);

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (auth && id) {
        try {
          const response = await fetch(`/api/company/${id}`);
          const apidata = await response.json();
          console.log(apidata.data.company);
          setData(apidata.data.company);
          setFilteredData(apidata.data.company[0]?.workers || []); // Initialize filteredData with workers if available
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
      // If workers is not available, do nothing
      setFilteredData([]);
      return;
    }
    if (!value) {
      setFilteredData(data[0].workers); // Reset to all workers if search query is empty
      return;
    }
    const filtered = data[0].workers.filter(
      (row) =>
        row.name.toLowerCase().includes(value) ||
        row.email.toLowerCase().includes(value) ||
        row.role.toLowerCase().includes(value)
    );
    setFilteredData(filtered);
    console.log(filtered);
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
