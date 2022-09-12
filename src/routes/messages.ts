import express from 'express';
import messagesController from '../controllers/messagesController'
const router = express.Router();

router.route('/')
  .get(messagesController.index)
  .post(messagesController.store);


router.route('/:id')
  .get(messagesController.show)
  .patch(messagesController.update)
  .delete(messagesController.destroy);


export default router;
