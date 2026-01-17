import { Routes, Route } from "react-router-dom"
import Navbar from "../components/Navbar";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";

const AppRoutes = () => {

    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />

                <Route
                    path="/dashboard"
                    element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}
                >
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>


        </>
    );

}

export default AppRoutes