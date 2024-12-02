import { Router } from "express";
import UserController from "../controllers/user-controller";

const userController = new UserController;
const userRouter = Router();

userRouter.get('/users', userController.getAllUsers.bind(userController));
userRouter.post('/users', userController.createUser.bind(userController));
userRouter.get('/users/:userId', userController.getUserById.bind(userController));
userRouter.put('/users/:userId', userController.updateUser.bind(userController));
userRouter.delete('/users/:userId', userController.deleteUser.bind(userController));

export default userRouter;