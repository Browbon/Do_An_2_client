import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthConext.js";
import { CircularProgress } from "@mui/material";
import {
  RemoveRedEyeOutlined,
  DriveFolderUploadOutlined,
  VisibilityOffOutlined,
} from "@mui/icons-material";
import "./register.css";
import { useRef } from "react";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
    city: undefined,
    country: undefined,
    phone: undefined,
  });
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const [hide, setHide] = useState(false);
  const [type, setType] = useState("password");

  const passwordAgain = useRef();

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    if (passwordAgain.current.value !== credentials.password)
      setMessage("Password don't match!");
    else {
      try {
        const uploadRes = await axios.post(
          "https://api.cloudinary.com/v1_1/pixelbooking/image/upload",
          data
        );
        const { url } = uploadRes.data;
        const newUser = { ...credentials, img: url };
        await axios.post("/auth/register", newUser);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleHide = () => {
    setHide(!hide);
  };

  useEffect(() => {
    const setTypePassword = () => {
      if (hide) setType("text");
      else setType("password");
    };
    setTypePassword();
  }, [hide]);

  return (
    <div className="login">
      <img
        src="https://images.pexels.com/photos/315998/pexels-photo-315998.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="Image"
      />
      <div className="loginWrapper">
        <div className="loginLeft"></div>
        <div className="loginRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              type="text"
              className="loginInput"
              id="username"
              onChange={handleChange}
              required
            />
            <input
              placeholder="Email"
              type="email"
              className="loginInput"
              id="email"
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
            <div className="passAgainInput">
              <input
                placeholder="Password Again"
                type={type}
                minLength="4"
                ref={passwordAgain}
                required
              />
              <div
                onClick={handleHide}
                style={{ display: "flex", aligncontent: "center" }}
              >
                {type === "password" ? (
                  <RemoveRedEyeOutlined />
                ) : (
                  <VisibilityOffOutlined />
                )}
              </div>
            </div>
            <input
              placeholder="City"
              type="text"
              className="loginInput"
              id="city"
              onChange={handleChange}
            />
            <input
              placeholder="Country"
              type="text"
              className="loginInput"
              id="country"
              onChange={handleChange}
            />
            <input
              placeholder="Phone"
              type="text"
              className="loginInput"
              id="phone"
              onChange={handleChange}
            />
            <div className="uploadInput">
              <label htmlFor="file">
                Image:{" "}
                <DriveFolderUploadOutlined
                  className="icon"
                  style={{ marginLeft: "15px" }}
                />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
            {message && message}
            <button className="loginButton" type="submit" disabled={loading}>
              {loading ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
            <Link
              to="/login"
              style={{
                display: "flex",
                justifyContent: "center",
                textDecoration: "none",
              }}
            >
              <button className="loginRegisterButton">
                {loading ? (
                  <CircularProgress color="white" size="20px" />
                ) : (
                  "Login"
                )}
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
