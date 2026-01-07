/* eslint-disable react/react-in-jsx-scope */
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.scss";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const { loading, error, dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get the redirect path from location state (if coming from Book Now)
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    const img = new Image();
    img.src = './car3.png';
    img.onload = () => setImageLoaded(true);
  }, []);

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
    // For demo purposes - replace with actual API call
    // Set login status in localStorage
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("user", JSON.stringify({
      username: credentials.username || "demo_user",
      isAdmin: true
    }));
    
    // Dispatch login success if using context
    dispatch({ type: "LOGIN_SUCCESS", payload: {
      username: credentials.username || "demo_user",
      isAdmin: true
    }});
    
    // Redirect to the intended page or home
    navigate(from, { replace: true });
    
    // Remove the alert since we're redirecting
    // alert("Login Successfully.") // Commented out
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <div
        className="flex justify-center items-center font-[sans-serif] h-full min-h-screen p-4"
        style={{
          backgroundImage: imageLoaded ? 'url(./slider.png)' : 'none',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          transition: 'background-image 0.5s ease-in-out',
        }}
      >
        <div className="max-w-md w-full mx-auto">
          <form className="bg-opacity-60 bg-white rounded-2xl p-6 
          shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)]" onSubmit={handleClick}>
            <div className="mb-10">
              <h3 className="text-gray-800 text-3xl font-extrabold">Login</h3>
              {from !== "/" && (
                <p className="text-blue-600 text-sm mt-2">
                  Please login to book the car
                </p>
              )}
            </div>

            {/* Username Field */}
            <div>
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="username"
                  id="username"
                  onChange={handleChange}
                  required
                  className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#333"
                  stroke="#333"
                  className="w-[18px] h-[18px] absolute right-2"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-3.314 0-9 1.657-9 5v1h18v-1c0-3.343-5.686-5-9-5z"
                  />
                </svg>
              </div>
            </div>

            {/* Password Field */}
            <div className="mt-6">
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  id="password"
                  onChange={handleChange}
                  required
                  className="bg-transparent w-full text-sm text-gray-800 border-b border-gray-400 focus:border-gray-800 px-2 py-3 outline-none placeholder:text-gray-800"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#333"
                  stroke="#333"
                  className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                  onClick={togglePasswordVisibility}
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                  ></path>
                </svg>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mt-2 text-red-500 text-sm">
                {error.message}
              </div>
            )}

            {/* Login Button */}
            <div className="mt-10 mb-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 text-sm font-semibold tracking-wider 
                rounded-full text-white bg-[#0071c2] hover:bg-[#3a90f3] focus:outline-none
                disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
            <div className="flex justify-center text-gray-900 font-bold">
              <a href="http://www.afaqtechnologies.com.pk" target="blank" rel="noopener noreferrer">
                Designed by AfaqTechnologies.
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;