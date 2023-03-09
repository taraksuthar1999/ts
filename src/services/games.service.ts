import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Game from "../models/game";

export default class GamesService {
    async add(req: Request, res: Response){
        try {
            const newGame = req.body as Game
            const result = await collections.games?.insertOne(newGame)
            return result ? res.status(200).jsonp({message:'success'}) : res.status(500).jsonp({message:'failed to create new Game.'})
        } catch (error: any) {
            return res.status(400).jsonp({message: error.message})
        }
    }

    async getAllGames(req:Request, res: Response){
        try {
            const games = (await collections.games?.find({}).toArray()) as unknown as Game[]
            return res.status(200).jsonp({data:games})
        } catch (error: any) {
            return res.status(400).jsonp({message:error.message})
        }
    }
}