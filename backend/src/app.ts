import express, { Application } from "express";
import usersRouter from "./presentation/routes/users_routes";
import animaisRouter from "./presentation/routes/animais_routes";
import tutoresRouter from "./presentation/routes/tutores_routes";


const app: Application = express();

// Middlewares
app.use(express.json());

// Rotas
app.use("/users", usersRouter);
app.use("/animais", animaisRouter);
app.use("/tutores", tutoresRouter);


// Rota raiz
app.get("/", (req, res) => {
  res.send("Ok!");
});

export default app;
