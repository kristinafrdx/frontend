import "./App.css";
import React, { createContext, useContext, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login.js";
import Registration from "./components/Registration.js";
import Table from "./components/Table.js";

const AuthContext = createContext();

function App() {
  const [isLogged, setLogged] = useState(false);

  return (
    <div className="App">
      <AuthContext.Provider value={{ isLogged, setLogged }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route
            path="/table"
            element={isLogged ? <Table /> : <Navigate to={"/login"} />}
          />
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}
export const useAuth = () => useContext(AuthContext);

export default App;
