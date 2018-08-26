import {Request, Response} from "express";

export function  apiGetAllSongs(req:Request, res:Response) {
    res.status(200).json({message: 'Hello Worldssss'});
}