// Protects authenticated routes.



import {
    Navigate,
    Outlet,
} from 'react-router-dom';

import {
    getToken,
} from '../features/auth/services/auth.storage';


export default function ProtectedRoute() {

    const token =
        getToken();


    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    return (
        <Outlet />
    );

}