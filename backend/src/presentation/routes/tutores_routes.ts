import { Router } from "express";
import { getTutores, getTutorById, getTutorByName, newTutor, putTutores, deleteTutor } from "../controllers/tutores_controller";

const tutoresRouter = Router();

// CRUD Tutores
tutoresRouter.get("/", getTutores);
tutoresRouter.get("/name/:name", getTutorByName);
tutoresRouter.get("/:id", getTutorById);
tutoresRouter.post("/", newTutor);
tutoresRouter.put("/:id", putTutores);
tutoresRouter.delete("/:id", deleteTutor);

export default tutoresRouter;
