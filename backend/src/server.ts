import "reflect-metadata";
import { AppDataSource } from "./application/data-source";
import app from "./app";

const PORT = process.env.PORT || 8080;

AppDataSource.initialize()
  .then(() => {
    console.log("Banco de dados conectado com sucesso!");
    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco de dados:", error);
  });
