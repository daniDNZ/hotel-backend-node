import express from 'express';
import usersController from '../controllers/usersController'
const router = express.Router();

router.route('/')
  .get(usersController.index)
  .post(usersController.store);


router.route('/:id')
  .get(usersController.show)
  .patch(usersController.update)
  .delete(usersController.destroy);


export default router;
