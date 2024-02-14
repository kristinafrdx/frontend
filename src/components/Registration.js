import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import _ from "lodash";
import { useAuth } from "../App.js";

const Registration = () => {
  const [name, setName] = useState("");
  const [login, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setError] = useState(false);
  const { setLogged } = useAuth();
  const [isSubmitting, setSubmitting] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    const dataUser = {
      name,
      login,
      password,
    };
    const response = await axios.post(
      "http://localhost:3030/registration",
      dataUser
    );
    if (response.data.message === false) {
      setError(true);
      setEmail("");
      setPassword("");
    } else {
      setLogged(true);
      navigate("/table", { state: { username: login } });
    }
  };

  const handleName = (event) => {
    setName(_.capitalize(event.target.value));
  };

  const handleMail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setSubmitting(false);
    setPassword(event.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div
        className="login-container bg-white p-4 rounded shadow-lg"
        style={{ width: "500px", height: "500px" }}
      >
        <h2 className="text-center mb-4 fs-5 mt-5 upper">Sign Up</h2>
        <form className="p-4 pt-2" onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="fw-bold mb-2">
              Your name:
            </label>
            <input
              type="text"
              className="form-control w-100 p-2"
              id="username"
              placeholder="Kristina"
              value={name}
              onChange={handleName}
              autoFocus
              required
            />
            <label htmlFor="username" className="fw-bold mb-2 mt-2">
              Your email:
            </label>
            <input
              type="text"
              className="form-control w-100 p-2"
              id="email"
              placeholder="siginur@mail.ru"
              value={login}
              onChange={handleMail}
              required
            />
            <label htmlFor="password" className="fw-bold mb-2 mt-2">
              Your password:
            </label>
            <input
              type="password"
              className="form-control w-100 p-2"
              id="password"
              placeholder="qwerty12345"
              value={password}
              onChange={handlePassword}
              required
            />
          </div>
          {err && (
            <p className="text-danger">
              That email is already taken. Try enother.
            </p>
          )}
          <div className="d-flex justify-content-between mt-4 flex-row gap-2">
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isSubmitting}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="btn btn-secondary w-100"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
