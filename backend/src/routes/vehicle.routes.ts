import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import { VehicleController } from '../controllers/vehicle.controller.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';

const router = Router();

const authMiddleware = new AuthMiddleware();
const vehicleController = new VehicleController();

router.post(
  '/',
  authMiddleware.handle.bind(authMiddleware),
  adminMiddleware,
  vehicleController.create.bind(vehicleController),
);

router.get(
  '/',
  authMiddleware.handle.bind(authMiddleware),
  vehicleController.findAll.bind(vehicleController),
);

router.get(
  '/search',
  authMiddleware.handle.bind(authMiddleware),
  vehicleController.search.bind(vehicleController),
);

router.get(
  '/:id',
  authMiddleware.handle.bind(authMiddleware),
  vehicleController.findById.bind(vehicleController),
);

router.put(
  '/:id',
  authMiddleware.handle.bind(authMiddleware),
  adminMiddleware,
  vehicleController.update.bind(vehicleController),
);

router.delete(
  '/:id',
  authMiddleware.handle.bind(authMiddleware),
  adminMiddleware,
  vehicleController.delete.bind(vehicleController),
);

router.post(
  '/:id/purchase',
  authMiddleware.handle.bind(authMiddleware),
  vehicleController.purchase.bind(vehicleController),
);

router.post(
  '/:id/restock',
  authMiddleware.handle.bind(authMiddleware),
  adminMiddleware,
  vehicleController.restock.bind(vehicleController),
);
export default router;
