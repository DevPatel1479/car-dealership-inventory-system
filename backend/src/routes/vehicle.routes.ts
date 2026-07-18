import { Router } from 'express';

import { AuthMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

const authMiddleware = new AuthMiddleware();

router.post(
  '/',
  (req, res, next) => authMiddleware.handle(req, res, next),
  (_req, res) => {
    res.status(201).json({
      message: 'Vehicle created',
    });
  },
);

export default router;