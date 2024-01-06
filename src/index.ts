import express from 'express'
import bodyParser from "body-parser";
import mongoose, {Schema, Types} from "mongoose";
import dotenv from 'dotenv';
import * as process from "process";
import UserRoutes from "./routes/userRoutes";
import ArticlesRoutes from "./routes/articlesRoutes";
import cors from "cors";

dotenv.config();

let app = express();
app.use(bodyParser.json());

interface user {
    id: string,
    name: string,
    salary: string
}

mongoose.connect(process.env.MONGO_URL as string);
const db = mongoose.connection

db.on('error', (error) => {
    console.log("DB error : " + error);
});

db.on('open', () => {
    console.log("DB OK");
})
app.listen(8080, () => {
    console.log("Server started 8081");
});
app.use(cors({origin:'*'}))

// ------------------------------------ user ------------------------------
app.use('/user', UserRoutes);

// ----------------------------------- articles------------------------------------
app.use('/article', ArticlesRoutes);