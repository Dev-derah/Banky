import express from 'express';

import { getAllUsers,createUser,getUserById,deleteUser,updateUser,loginUser,logout } from '../controllers/user.controller.js';

const router = express.Router();

router.route('/').get(getAllUsers);
router.route("/logout").get(logout);
router.route('/:id').get(getUserById);
router.route('/register').post(createUser);
router.route("/login").post(loginUser);
router.route("/:id").patch(updateUser);
router.route("/:id").delete(deleteUser);

export default router;
