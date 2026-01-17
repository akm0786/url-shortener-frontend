import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
      <Link to="/">Home</Link> |{" "}
      <Link to="/dashboard">Dashboard</Link> |{" "}
      <Link to="/login">Login</Link>
    </nav>
  );
};

export default Navbar;
