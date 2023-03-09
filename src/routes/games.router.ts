import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Game from "../models/game";
import GamesService from "../services/games.service";

export const gamesRouter = express.Router()
const gameService = new GamesService()

gamesRouter.post('/add',gameService.add)
gamesRouter.get('/list',gameService.getAllGames)