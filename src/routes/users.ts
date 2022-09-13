import usersController from '../controllers/usersController'
import { Router } from 'express';
const router = Router();

router.route('/')
  .get(usersController.index)
  .post(usersController.store);


router.route('/:id')
  .get(usersController.show)
  .patch(usersController.update)
  .delete(usersController.destroy);


export default router;
