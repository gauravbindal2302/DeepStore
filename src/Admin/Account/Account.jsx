import React, { useState } from "react";
import "./Account.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const navigate = useNavigate();
  const [isLoginVisible, setLoginVisible] = useState(true);
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = async (event) => {
    const { name, value } = event.target;
    setAdmin({
      ...admin,
      [name]: value,
    });
  };

  const login = async (event) => {
    setLoginVisible(true);
    if (admin.email && admin.password) {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email: admin.email,
          password: admin.password,
        });
        if (response.data.message === "Login Successful") {
          alert("Login Successful");
          resetForm();
          navigate("/admin/dashboard");
        } else {
          alert("Invalid email or password");
        }
      } catch (error) {
        console.error("Error while logging in:", error);
      }
    } else {
      alert("Please provide all fields");
    }
  };

  const register = async () => {
    setLoginVisible(false);
    if (admin.username && admin.email && admin.password) {
      try {
        const response = await axios.post(
          "http://localhost:5000/register",
          admin
        );
        if (response.data.message === "Admin already registered") {
          alert("Admin already registered. Please log in.");
        } else if (
          response.data.message === "Successfully Registered, Please Login Now"
        ) {
          alert("Registration successful. Please log in.");
          resetForm();
          setLoginVisible(true);
        } else {
          console.log("Failed to register!");
        }
      } catch (error) {
        console.error("Error while registering new admin:", error);
      }
    } else {
      alert("Please provide all fields");
    }
  };

  function resetForm() {
    setAdmin({
      username: "",
      email: "",
      password: "",
    });
  }

  /*function logout() {resetForm();}*/

  return (
    <>
      <div className="account-page">
        <div className="container">
          <div className="row account-row">
            <div className="col-2 col-lg-6">
              <img alt="" src="Images/image1.png" width="100%" />
            </div>
            <div className="col-2 col-lg-6">
              <div className="form-container">
                <div className="form-btn">
                  <span
                    onClick={() => {
                      setLoginVisible(true);
                      resetForm();
                    }}
                  >
                    Login
                  </span>
                  <span
                    onClick={() => {
                      setLoginVisible(false);
                      resetForm();
                    }}
                  >
                    Register
                  </span>
                  <hr
                    className="Indicator"
                    style={{
                      transform:
                        "translateX(" + (isLoginVisible ? 0 : 100) + "px)",
                    }}
                  />
                </div>
                {isLoginVisible ? (
                  <form>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={admin.email}
                      onChange={handleChange}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={admin.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      className="btn"
                      onClick={() => login(setLoginVisible)}
                    >
                      Login
                    </button>
                    <br />
                    {/*<a href="/">Forgot Password</a>*/}
                    <br />
                    {/*<button type="button" id="logout-btn" onClick={logout}>Logout</button>*/}
                  </form>
                ) : (
                  <form>
                    <input
                      type="name"
                      name="username"
                      placeholder="Username"
                      value={admin.username}
                      onChange={handleChange}
                    />
                    <input
                      type="name"
                      name="email"
                      placeholder="Email"
                      value={admin.email}
                      onChange={handleChange}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={admin.password}
                      onChange={handleChange}
                    />
                    <button type="button" className="btn" onClick={register}>
                      Submit
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
