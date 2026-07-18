import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { VehicleController } from '../controllers/vehicle.controller.js';

const router = Router();

const authMiddleware = new AuthMiddleware();
const vehicleController = new VehicleController();

router.post(
  '/',
  authMiddleware.handle.bind(authMiddleware),
  vehicleController.create.bind(vehicleController),
);

router.get(
  '/',
  authMiddleware.handle.bind(authMiddleware),
  vehicleController.findAll.bind(vehicleController),
);
export default router;
