// Application router configuration will be defined here.


import {
    Routes,
    Route,
} from 'react-router-dom';

import LandingPage from './LandingPage';


export default function AppRouter() {

    return (

        <Routes>

            <Route
                path="/"
                element={<LandingPage />}
            />

        </Routes>

    );

}