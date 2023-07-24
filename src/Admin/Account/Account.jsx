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
    // Set the position to 0 when login button is clicked
    axios.post("http://localhost:5000/login", admin).then((res) => {
      alert(res.data.message);
      resetForm();
      navigate("/admin/dashboard");
    });
  };

  const register = async () => {
    setLoginVisible(false);
    // Set the position to 100 when register button is clicked
    if (admin.username && admin.email && admin.password) {
      try {
        const response = await axios.post(
          "http://localhost:5000/register",
          admin
        );
        if (response.status === 200) {
          alert("You are registered successfully!");
          resetForm();
          navigate("/admin/dashboard");
        } else {
          console.log("Failed to register!");
        }
      } catch (error) {
        console.error("Error while registering new admin:", error);
      }
    } else {
      alert("Invalid input");
    }
  };

  function resetForm() {
    setAdmin({
      username: "",
      email: "",
      password: "",
    });
  }

  function logout() {
    resetForm(); // Clear the form fields
  }

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
                      type="username"
                      name="username"
                      placeholder="Username"
                      value={admin.username}
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
                    <a href="/">Forgot Password</a>
                    <br />
                    <button type="button" id="logout-btn" onClick={logout}>
                      Logout
                    </button>
                  </form>
                ) : (
                  <form>
                    <input
                      type="username"
                      name="username"
                      placeholder="Username"
                      value={admin.username}
                      onChange={handleChange}
                    />{" "}
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={admin.email}
                      onChange={handleChange}
                    />{" "}
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={admin.password}
                      onChange={handleChange}
                    />{" "}
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
