import {
    Route,
    Routes,
} from "react-router-dom";


import PublicRoute from "./PublicRoute";
import ProtectedRoute from "../guards/ProtectedRoute";
import AdminRoute from "../guards/AdminRoute";


import LandingPage from "./LandingPage";

import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";

import VehiclesPage from "../features/vehicles/pages/VehiclesPage";

import VehicleEditPage from "../features/vehicles/pages/VehicleEditPage";

import VehicleRestockPage from "../features/vehicles/pages/VehicleRestockPage";

import NotFoundPage from "./NotFoundPage";
import VehicleCreatePage from "../features/vehicles/pages/VehicleCreatePage";



export default function AppRouter() {


    return (

        <Routes>


            {/* PUBLIC ROUTES */}


            <Route
                path="/"
                element={
                    <PublicRoute>
                        <LandingPage />
                    </PublicRoute>
                }
            />


            <Route
                path="/login"
                element={
                    <PublicRoute>
                        <LoginPage />
                    </PublicRoute>
                }
            />


            <Route
                path="/register"
                element={
                    <PublicRoute>
                        <RegisterPage />
                    </PublicRoute>
                }
            />



            {/* USER + ADMIN ROUTES */}


            <Route element={<ProtectedRoute />}>

                <Route
                    path="/vehicles"
                    element={<VehiclesPage />}
                />



                {/* ADMIN ONLY */}


                <Route element={<AdminRoute />}>

                    <Route
                        path="/vehicles/create"
                        element={<VehicleCreatePage />}
                    />


                    <Route
                        path="/vehicles/:id/edit"
                        element={<VehicleEditPage />}
                    />


                    <Route
                        path="/vehicles/:id/restock"
                        element={<VehicleRestockPage />}
                    />
                </Route>

            </Route>



            <Route
                path="*"
                element={<NotFoundPage />}
            />


        </Routes>

    );

}