#!/usr/bin/nodejs

import express from "express";
import cors from "cors";
import { 
  login, 
  register, 
  getHeroes, 
  getMonsters,
  saveStatus
} from './controller.mjs';

const app = express();

app.use(cors());

app.use(express.json());

app.get("/api/login", login);

app.post("/api/register", register);

app.get("/api/heroes", getHeroes);

app.get("/api/monsters", getMonsters);

app.get("/api/save", saveStatus);

const port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});