import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAuthError, loginUser } from "../features/auth/authSlice";
import { useEffect, useState } from "react";


const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, loading, error } = useSelector(state => state.auth)


    const handleChange = (e) => {
        dispatch(clearAuthError())
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser(formData));
    }

    useEffect(() => {
        if (isAuthenticated) navigate("/dashboard");

    }, [navigate, isAuthenticated])


    return (
        <>
            <form onSubmit={handleSubmit} >

                <h2>Login</h2>

                <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                
                {error && <p>{error}</p>}


                <button type="submit" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>

            </form>
        </>
    )
}

export default Login