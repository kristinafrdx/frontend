import React, { useState, useEffect } from "react";
import axios from "axios";
import imageLock from "../icons/lock.svg";
import imageOpen from "../icons/unlock.svg";
import imageDelete from "../icons/delete.svg";
import { useNavigate, useLocation } from "react-router-dom";

const Table = () => {
  const [users, setUsers] = useState([]);
  const [err, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const username = location?.state?.username || "Guest";

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:3030/users");
      setUsers(response.data.reverse());
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { id, checked } = e.target;
    if (id === "selectAll") {
      const update = users.map((user) => {
        return { ...user, isChecked: checked };
      });
      setUsers(update);
      setError(false);
    } else {
      const update = users.map((user) =>
        user.id === Number(id) ? { ...user, isChecked: checked } : user
      );
      setUsers(update);
      setError(false);
    }
  };

  const selectedUsers = users.filter((use) => use.isChecked);
  const selectCurrent = selectedUsers.find((el) => el.login === username);
  console.log(selectCurrent)
  const handleDelete = async () => {
    if (selectedUsers.length > 0) {
      if (selectCurrent) {
        await axios.post("http://localhost:3030/table/delete", selectedUsers);
        const updateUsers = await axios.get("http://localhost:3030/users");
        setUsers(updateUsers.data.reverse());
        navigate('/login');
      } else {
        await axios.post("http://localhost:3030/table/delete", selectedUsers);
        const updateUsers = await axios.get("http://localhost:3030/users");
        setUsers(updateUsers.data.reverse());
      }
    } else {
      setError(true);
    }
  };

  const blockUser = async () => {
    if (selectedUsers.length > 0) {
      console.log(selectCurrent)
      if (selectCurrent) {
        await axios.post("http://localhost:3030/table/block", selectedUsers);
        const updateUsers = await axios.get("http://localhost:3030/users");
        setUsers(updateUsers.data.reverse());
        navigate('/login');
      } else {
        await axios.post("http://localhost:3030/table/block", selectedUsers);
        const updateUsers = await axios.get("http://localhost:3030/users");
        setUsers(updateUsers.data.reverse());
      }
    } else {
      setError(true);
    }
  };

  const unLockUser = async () => {
    if (selectedUsers.length > 0) {
      await axios.post("http://localhost:3030/table/unlock", selectedUsers);
      const updateUsers = await axios.get("http://localhost:3030/users");
      setUsers(updateUsers.data.reverse());
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      <div
        className="rounded pt-2 pb-2 d-flex justify-content-center align-items-center"
        style={{ height: "auto" }}>
        <h3
          className="text-center fs-6 mt-1 pb-2 upper d-flex bold"
          style={{
            width: "70%",
            justifyContent: "flex-end",
            color: "rgb(130, 25, 169)",
            fontFamily: "sans-serif",
            letterSpacing: "1px",
            fontWeight: "600",
          }}>Hello, {username}!</h3>
      </div>
      <div className="d-flex flex-column align-items-center justifi-content-center mt-2 pb-3">
        <div
          className="logout d-flex flex-row justify-content-between align-items-start pb-3"
          style={{ width: "70%" }}>
          <div
            className="d-flex justify-content-f-start"
            style={{ width: "70%", gap: "30px" }}>
            <button
              className="btn btn-primary"
              onClick={blockUser}
              type="button"
              style={{ padding: "5px 40px" }}>
              <img
                alt="lock"
                src={imageLock}
                style={{ paddingRight: "10px" }}/>
              Block
            </button>
            <button
              className="btn btn-primary"
              onClick={unLockUser}
              type="button"
              style={{ padding: "5px 40px" }}>
              <img alt="unlock" src={imageOpen} />
            </button>
            <button
              className="btn btn-danger"
              onClick={handleDelete}
              type="button"
              style={{ padding: "5px 40px" }}>
              <img alt="delete" src={imageDelete}></img>
            </button>
          </div>
          <div>
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="btn"
              style={{ border: "1px solid gray", backgroundColor: "#ccc" }}
            >
              LOGOUT
            </button>
          </div>
        </div>
        {err && (
            <div className="d-flex, justify-content-f-start" style={{width: '70%'}}>
              <p className="text-danger">
              Select user.
            </p>
            </div> 
          )}
        <div
          className="d-flex flex-row"
          style={{ width: "70%", maxHeight: "100%" }}
        >
          <table className="table p-2" style={{ border: "1px solid #d8d1d1" }}>
            <thead className="m-2">
              <tr>
                <th>
                  <label style={{ paddingLeft: "30px" }}>
                    <input
                      id="selectAll"
                      type="checkbox"
                      onChange={handleChange}
                      checked={
                        users.length > 0 &&
                        users.filter((user) => user?.isChecked !== true)
                          .length < 1
                      }
                    />
                  </label>
                </th>
                <th style={{ color: "#8219a9" }}>Name</th>
                <th style={{ color: "#8219a9" }}>Login</th>
                <th style={{ color: "#8219a9" }}>Status</th>
                <th style={{ color: "#8219a9" }}>ID</th>
              </tr>
            </thead>
            <tbody className="mb-5">
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <label style={{ paddingLeft: "30px" }}>
                      <input
                        id={user.id}
                        type="checkbox"
                        onChange={handleChange}
                        checked={user?.isChecked || false}
                      />
                    </label>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.login}</td>
                  <td>{user.status}</td>
                  <td className="pb-1">{user.id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
