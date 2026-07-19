// Protects admin-only routes.

import {
    Navigate,
    Outlet,
} from "react-router-dom";

import {
    isAdmin,
} from "../features/auth/services/auth.role";


export default function AdminRoute() {


    const admin = isAdmin();


    if (!admin) {

        return (
            <Navigate
                to="/vehicles"
                replace
            />
        );

    }


    return <Outlet />;

}