import express from "express";
import {  readAllUsers } from "./controllers/UserController";
import { readAllCalcados, registerCalcado, updateCalcado, deleteCalcado, findCalcadosPorTamanho, findCalcadosPorMarca, countCalcados } from "./controllers/CalcadosController";


const routes = express.Router();

routes.get("/users", readAllUsers);

// CRUD obrigatório

routes.get("/calcados", readAllCalcados);

routes.post("/calcados", registerCalcado);

routes.patch("/calcados/:idCalcado", updateCalcado);

routes.delete("/calcados/:idCalcado", deleteCalcado);

// extras:

routes.get("/calcados/tamanho/:tamanho", findCalcadosPorTamanho);

routes.get("/calcados/marca/:marca", findCalcadosPorMarca);

routes.get("/calcados/total", countCalcados);


export default routes;
