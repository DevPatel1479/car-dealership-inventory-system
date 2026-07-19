import { Navigate } from "react-router-dom";

import { getToken } from "../features/auth/services/auth.storage";


interface PublicRouteProps {
    children: React.ReactNode;
}


export default function PublicRoute({
    children,
}: PublicRouteProps) {

    const token = getToken();


    if (token) {

        return (
            <Navigate
                to="/vehicles"
                replace
            />
        );

    }


    return children;

}