import { Route, Routes } from "react-router-dom"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"
import { DashBoard } from "../pages/DashBoard"
import { PrivateRoute } from "./PrivateRoute"
import { Schedules } from "../pages/Schedules"
import { EditProfile } from "../pages/EditProfile"

export const RouteApp = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Login />
                }
            />
            <Route
                path="/register"
                element={
                    <Register />
                }
            />
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute>
                        <DashBoard />
                    </PrivateRoute>
                }
            />
            <Route
                path="/schedules"
                element={
                    <PrivateRoute>
                        <Schedules />
                    </PrivateRoute>
                }
            />
            <Route
                path="/edit-profile"
                element={
                    <PrivateRoute>
                        <EditProfile />
                    </PrivateRoute>
                }
            />
        </Routes>
    )
}