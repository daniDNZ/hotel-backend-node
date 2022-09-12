import express from 'express';
import bookingsController from '../controllers/bookingsController'
const router = express.Router();

router.route('/')
  .get(bookingsController.index)
  .post(bookingsController.store);


router.route('/:id')
  .get(bookingsController.show)
  .patch(bookingsController.update)
  .delete(bookingsController.destroy);


export default router;
