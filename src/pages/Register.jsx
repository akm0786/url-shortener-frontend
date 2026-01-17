import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearAuthError } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleChange = (e) => {
    dispatch(clearAuthError());
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(registerUser(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>

      <input
        name="fullName"
        placeholder="Full Name"
        onChange={handleChange}
        required
      />
      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
        required
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
      />

      {error && <p>{error}</p>}

      <button disabled={loading}>
        {loading ? "Creating..." : "Register"}
      </button>
    </form>
  );
};

export default Register;
