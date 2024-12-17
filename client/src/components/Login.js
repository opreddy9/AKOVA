import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        let res = await axios.post("http://localhost:5000/api/auth", formData);

        localStorage.setItem("token", res.data.token);

        const role_response = await axios.get("http://localhost:5000/api/auth", {
          headers: {
            "x-auth-token": res.data.token,
          },
        });
        localStorage.setItem("profession", role_response.data.profession);

        if (role_response.data.profession === "student") {
          navigate("/student_dashboard");
        }
        if (role_response.data.profession === "entrepreneur") {
          navigate("/entrepreneur_dashboard");
        }
        if (role_response.data.profession === "investor") {
          navigate("/investor_dashboard");
        }
      } catch (err) {
        for (let i = 0; i < err.response.data.error.length; i++) {
          window.alert(err.response.data.error[i].msg);
        }
      }
    } else {
      if (!email || !password) {
        window.alert("Fill all details");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    const passwordInput = document.getElementById("typePasswordX-2");
    passwordInput.type = showPassword ? "password" : "text";
  };

  return (
    <Fragment>
      <>
        <section className="vh-100" style={{ backgroundColor: "#ffffff" }}>
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card shadow-2-strong"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <h3 className="mb-5">Sign in</h3>
                    <div className="form-outline mb-4">
                      <input
                        type="email"
                        id="typeEmailX-2"
                        className="form-control form-control-lg"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={onChange}
                      />
                    </div>
                    <div className="form-outline mb-4">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="typePasswordX-2"
                        className="form-control form-control-lg"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={onChange}
                      />
                      <i
                        className={`bi bi-eye${showPassword ? "-slash" : ""}`}
                        id="togglePassword"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      ></i>
                    </div>
                    <button
                      className="btn btn-primary btn-lg btn-block"
                      type="submit"
                      onClick={(e) => {
                        onSubmit(e);
                      }}
                    >
                      Login
                    </button>
                    <hr className="my-4" />
                    <Link to="/register">
                      <button
                        className="btn btn-lg btn-block btn-primary mb-2"
                        style={{ backgroundColor: "#3b5998" }}
                        type="submit"
                      >
                        <i className="fab fa-facebook-f me-2" />
                        Register
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Fragment>
  );
};

export default Login;
