import * as dotenv from "dotenv";
import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import axios from "axios";
import cors from "cors";
import removeAccents from "remove-accents";

dotenv.config();

const uri = process.env.CONNECTION_STRING;

const apiUrls = {
  en: "https://random-word-api.herokuapp.com/word?number=1",
  ro: "https://dexonline.ro/static/download/word-list-hangman-1.txt"
}

const getEnglishWord = async (): Promise<string> => {
  const response = await axios.get(apiUrls.en);
  return response.data[0];
};

const getRomanianWord = async (): Promise<string> => {
  const response = await axios.get(apiUrls.ro);
  const words = response.data.split("\n");

  return words[Math.floor(Math.random() * words.length)];
}; 

const getWord = async (language?: string): Promise<string> => {
  switch (language) {
    case "en":
      return await getEnglishWord();
    case "ro":
      return await getRomanianWord();
    default:
      return await getEnglishWord();
  }
}

main().catch((err) => console.log(err));

async function main() {
  if (!uri) {
    throw new Error("No connection string found");
  }
  await mongoose.connect(uri);

  const highScoreSchema = new mongoose.Schema({
    name: String,
    score: Number,
  });

  const HighScore = mongoose.model("HighScore", highScoreSchema);

  const app = express();
  const port = 5000;

  app.use(
    cors({
      origin: "*",
    })
  );

  app.use(express.json());

  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    next();
    const ms = Date.now() - start;
    console.log(`${req.method} ${req.path} - ${ms}ms`);
  });
  
  app.post("/highscore", async (req: Request, res: Response) => {
    if (!req.body.name || !req.body.score) {
      res.status(400).json({ message: "Missing name or score" });
      return;
    }

    const highScore = new HighScore({ name: req.body.name, score: req.body.score });
    
    await highScore.save();

    res.json(highScore);
  });

  app.get("/highscore", async (req: Request, res: Response) => {
    const highScores = await HighScore.find();

    const response = highScores.map((highScore) => {
      return {
        name: highScore.name,
        score: highScore.score,
      };
    });
    res.json(response);
  });

  app.get("/word", async (req: Request, res: Response) => {
    const language = req.query.language as string;
    const word = await getWord(language);

    const cleanWord = removeAccents(word);
    console.log(cleanWord);
    res.json({ word: cleanWord });
  });

  app.listen(port, () => {
    console.log(`Highscore tracking app listening on port ${port}`);
  });
}