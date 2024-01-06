import express, {Router} from "express";
import {verifyToken} from "../middlewares";
import * as ArticleController from "../controllers/articleController";


let router: Router = express.Router();

//get my articles by userId
router.get('/get/my', verifyToken, ArticleController.getMyArticles);

// save articles
router.post('/', verifyToken, ArticleController.createArticle);

//get all of articles
router.get('/', ArticleController.getAllArticles);

//get all articles by username
router.get('/:username', ArticleController.getArticleByUserName);

// update articles by user id
router.put('/', verifyToken, ArticleController.updateArticle);

// delete article
router.delete('/:id', verifyToken, ArticleController.deleteArticle);

export default router;