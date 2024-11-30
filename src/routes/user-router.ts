import { Router } from "express";
import UserController from "../controllers/user-controller";

const userController = new UserController;
const userRouter = Router();

userRouter.get('/users', userController.getAllUsers.bind(userController));
userRouter.post('/users', userController.createUser.bind(userController));
userRouter.get('/users/:id', userController.getUserById.bind(userController));
userRouter.put('/users/:id', userController.updateUser.bind(userController));
userRouter.delete('/users/:id', userController.deleteUser.bind(userController));

export default userRouter;