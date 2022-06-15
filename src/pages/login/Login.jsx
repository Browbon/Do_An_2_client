import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthConext.js";
import { CircularProgress } from "@mui/material";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/");
    } catch (error) {
      console.log(error);
      dispatch({ type: "LOGIN_FAILURE", payload: error.response.data });
    }
  };

  return (
    <div className="login">
      <img
        src="https://images.pexels.com/photos/315998/pexels-photo-315998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="Image"
      />
      <div className="loginWrapper">
        <div className="loginLeft">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              type="text"
              className="loginInput"
              id="username"
              onChange={handleChange}
              required
            />
            <input
              placeholder="Password"
              type="password"
              minLength="4"
              className="loginInput"
              id="password"
              onChange={handleChange}
              required
            />
            {error && <span>{error.message}</span>}
            <button className="loginButton" type="submit" disabled={loading}>
              {loading ? <CircularProgress /> : "Login"}
            </button>
            <Link
              to="/register"
              style={{
                display: "flex",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <button className="loginRegisterButton">
                {loading ? <CircularProgress /> : "Create a New Account"}
              </button>
            </Link>
          </form>
        </div>
        <div className="loginRight"></div>
      </div>
    </div>
  );
};

export default Login;
