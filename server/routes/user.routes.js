import express from 'express';

import { getAllUsers,createUser,getUserById,deleteUser,updateUser } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/').get(getUserById);
router.route('/:id').post(createUser);
router.route("/:id").patch(updateUser);
router.route("/:id").delete(deleteUser);

export default router;
