import { Router } from "express";
import { getUserById, getUserByName, getUsers, newUser, putUsers, deleteUser } from "../controllers/usuarios_controller";

const usersRouter = Router();

// CRUD Users
usersRouter.get("/", getUsers);
usersRouter.get("/name/:name", getUserByName);
usersRouter.get("/:id", getUserById);
usersRouter.post("/", newUser);
usersRouter.put("/:id", putUsers);
usersRouter.delete("/:id", deleteUser);


export default usersRouter;