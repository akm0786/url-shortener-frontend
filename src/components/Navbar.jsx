import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <nav className="flex justify-between p-4 border-b">
      <h1 className="font-bold">URL Shortener</h1>

      <div className="flex gap-4">
        {isAuthenticated ? (
          <button
            onClick={() => dispatch(logoutUser())}
            className="text-red-600"
          >
            Logout
          </button>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
