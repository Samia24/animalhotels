import { Router } from "express";
import { getAnimals, getAnimalById, getAnimalByName, newAnimal, putAnimal, deleteAnimal } from "../controllers/animais_controller";

const animaisRouter = Router();

// CRUD Animais
animaisRouter.get("/", getAnimals);
animaisRouter.get("/name/:name", getAnimalByName);
animaisRouter.get("/:id", getAnimalById);
animaisRouter.post("/", newAnimal);
animaisRouter.put("/:id", putAnimal);
animaisRouter.delete("/:id", deleteAnimal);

export default animaisRouter;
