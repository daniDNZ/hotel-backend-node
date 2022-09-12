import express from 'express';
import roomsController from '../controllers/roomsController'
const router = express.Router();
/* GET rooms listing. */
router.route('/')
  .get(roomsController.index)
  .post(roomsController.store);


router.route('/:id')
  .get(roomsController.show)
  .patch(roomsController.update)
  .delete(roomsController.destroy);


export default router;
