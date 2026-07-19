import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.routes.js';
import vehicleRouter from './routes/vehicle.routes.js';

import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

const allowedOrigins = [
    'http://localhost:5173',
    'https://car-dealership-inventory-system-37t.vercel.app',
];

app.use(
    cors({
        origin(origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }

            return callback(new Error('Not allowed by CORS'));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    }),
);

app.options('*', cors());

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/vehicles', vehicleRouter);

app.use(errorMiddleware);

export default app;