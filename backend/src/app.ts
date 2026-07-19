import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.routes.js';
import vehicleRouter from './routes/vehicle.routes.js';

import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://car-dealership-inventory-system-hfih.onrender.com/',
];

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
                return;
            }

            callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
    }),
);

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/vehicles', vehicleRouter);

app.use(errorMiddleware);

export default app;