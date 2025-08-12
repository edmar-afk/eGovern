import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import api from "../assets/api";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    class AuthAnimation {
      constructor() {
        this.createParticles();
      }
      createParticles() {
        const container = document.getElementById("particles-container");
        setInterval(() => {
          const particle = document.createElement("div");
          particle.className =
            "particle absolute w-1 h-1 bg-white/30 rounded-full";
          particle.style.left = Math.random() * 100 + "%";
          particle.style.animationDelay = Math.random() * 2 + "s";
          container.appendChild(particle);
          setTimeout(() => particle.remove(), 6000);
        }, 300);
      }
    }
    new AuthAnimation();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/login/", formData);
      const accessToken = res.data.access;
      const refreshToken = res.data.refresh;

      localStorage.setItem("access", accessToken);
      localStorage.setItem("refresh", refreshToken);

      const payload = JSON.parse(atob(accessToken.split(".")[1]));
      if (payload.is_superuser && payload.is_staff) {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Redirecting to SB Dashboard...",
          allowOutsideClick: false,
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/sb-dashboard");
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Redirecting to Admin Dashboard...",
          allowOutsideClick: false,
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/dashboard");
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.detail || "Invalid username or password",
        confirmButtonText: "OK",
        allowOutsideClick: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="floating-shapes absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full blur-sm"></div>
        <div className="floating-shapes absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg blur-sm"></div>
        <div className="floating-shapes absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-r from-green-500/30 to-emerald-500/30 rounded-full blur-sm"></div>
        <div className="floating-shapes absolute top-1/2 right-10 w-16 h-16 bg-gradient-to-r from-yellow-500/30 to-orange-500/30 rounded-lg blur-sm"></div>
        <div id="particles-container" className="absolute inset-0"></div>
      </div>

      <div>
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="max-w-[480px] w-full">
            <img
              src={logo}
              alt="logo"
              className="w-24 mb-8 mx-auto block rounded-full"
            />
            <div className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-gray-200 shadow-sm backdrop-blur-lg">
              <h1 className="text-slate-900 text-center text-3xl font-semibold">
                Sign in
              </h1>

              <form
                className="mt-12 space-y-6"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    User name
                  </label>
                  <input
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter user name or email"
                  />
                </div>
                <div>
                  <label className="text-slate-900 text-sm font-medium mb-2 block">
                    Password
                  </label>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full text-slate-900 text-sm border border-slate-300 px-4 py-3 rounded-md outline-blue-600"
                    placeholder="Enter password"
                  />
                </div>

                <div className="!mt-12">
                  <button
                    type="button"
                    onClick={handleLogin}
                    disabled={loading}
                    className={`w-full flex items-center justify-center gap-2 py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white ${
                      loading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={20} color="inherit" />
                        Validating... Please wait
                      </>
                    ) : (
                      "Sign in"
                    )}
                  </button>
                </div>

                <p className="text-slate-900 text-sm !mt-6 text-center">
                  Don't have an account?{" "}
                  <Link
                    to={"/register"}
                    className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
