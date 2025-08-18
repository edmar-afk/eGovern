import React, { useEffect, useState, useRef } from "react";
import logo from "../assets/images/logo.jpg";
import api from "../assets/api";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CircularProgress from "@mui/material/CircularProgress";
import Swal from "sweetalert2";
const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    profile_picture: null,
  });
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileError, setFileError] = useState("");

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileError("");

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setFileError("Please upload an image file only.");
      e.target.value = "";
      setFormData({ ...formData, profile_picture: null });
      setFileName("");
      return;
    }

    setFormData({ ...formData, profile_picture: file });
    setFileName(file.name);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const payload = new FormData();
    payload.append("username", formData.email);
    payload.append("first_name", formData.first_name);
    payload.append("last_name", formData.last_name);
    payload.append("email", formData.email);
    payload.append("address", formData.address);
    payload.append("password", formData.password);
    if (formData.profile_picture) {
      payload.append("profile_picture", formData.profile_picture);
    }

    try {
      await api.post("/api/register/", payload, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "You will be redirected shortly...",
        timer: 5000,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        didClose: () => {
          navigate("/");
        },
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text:
          err.response?.data?.error || "An error occurred. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordsMatch =
    formData.password &&
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 min-h-screen overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div id="particles-container" className="absolute inset-0"></div>
      </div>

      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-[480px] w-full">
          <img
            src={logo}
            alt="logo"
            className="w-24 mb-8 mx-auto block rounded-full"
          />
          <div className="p-6 sm:p-8 rounded-2xl bg-white/90 border border-gray-200 shadow-sm backdrop-blur-lg">
            <h1 className="text-slate-900 text-center text-3xl font-semibold">
              Register
            </h1>

            {error && (
              <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
            )}

            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <input
                name="first_name"
                type="text"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleChange}
                className="w-full border border-slate-300 px-4 py-3 rounded-md"
                required
              />
              <input
                name="last_name"
                type="text"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleChange}
                className="w-full border border-slate-300 px-4 py-3 rounded-md"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-slate-300 px-4 py-3 rounded-md"
                required
              />
              <input
                name="address"
                type="text"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-slate-300 px-4 py-3 rounded-md"
              />
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-slate-300 px-4 py-3 rounded-md"
                required
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Retype Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-slate-300 px-4 py-3 rounded-md"
                required
              />
              {!passwordsMatch && formData.confirmPassword && (
                <p className="text-red-600 text-sm">Passwords do not match</p>
              )}

              {/* <div className="flex flex-col gap-1">
                <Button
                  variant="contained"
                  startIcon={<ImageIcon />}
                  onClick={() => fileInputRef.current.click()}
                >
                  {fileName || "Upload Profile Picture"}
                </Button>
                <input
                  type="file"
                  name="profile_picture"
                  ref={fileInputRef}
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                {fileError && (
                  <p className="text-red-600 text-sm">{fileError}</p>
                )}
              </div> */}

              <button
                type="submit"
                disabled={!passwordsMatch || loading}
                className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-white font-medium transition-colors ${
                  !passwordsMatch || loading
                    ? "bg-red-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <>
                    <CircularProgress size={20} color="inherit" />
                    Registering... Please wait
                  </>
                ) : !passwordsMatch ? (
                  "Password not match"
                ) : (
                  "Register"
                )}
              </button>
              <p className="text-slate-900 text-sm !mt-6 text-center">
                Already have an account?{" "}
                <Link
                  to={"/"}
                  className="text-blue-600 hover:underline ml-1 whitespace-nowrap font-semibold"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
