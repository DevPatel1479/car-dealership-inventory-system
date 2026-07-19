// Application router configuration will be defined here.

 
import {
    Route,
    Routes,
} from 'react-router-dom';

import LandingPage from './LandingPage';

import LoginPage from '../features/auth/pages/LoginPage';


export default function AppRouter() {

    return (

        <Routes>

            <Route
                path="/"
                element={<LandingPage />}
            />

            <Route
                path="/login"
                element={<LoginPage />}
            />

        </Routes>

    );

}