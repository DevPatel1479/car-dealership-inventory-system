import express from 'express';
import cors from 'cors';

import authRouter from './routes/auth.routes.js';
import vehicleRouter from './routes/vehicle.routes.js';

import { errorMiddleware } from './middlewares/error.middleware.js';

const app = express();

app.use(
    cors({
        origin: [
            'http://localhost:5173',
            process.env.FRONTEND_URL!,
        ],
        credentials: true,
    }),
);

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/vehicles', vehicleRouter);

app.use(errorMiddleware);

export default app;