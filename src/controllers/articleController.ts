import express from "express";
import articleModel from "../dtos/articleModel";
import CustomResponse from "../dtos/customResponse";
import ArticleModel from "../dtos/articleModel";
import UserModel from "../models/userModel";

// create articles
export const createArticle = async (req: express.Request, res: express.Response) => {
    try {
        let req_body = req.body;
        const articleModel = new ArticleModel({
            title: req_body.title,
            description: req_body.description,
            user: req_body.user
        });
        const saveArticles = await articleModel.save();

        // Send a response back to the client
        res.status(200).send(new CustomResponse(
            200, "article saved successfully", saveArticles
        ));
    } catch (error) {
        // Send an error response back to the client
        res.status(500).send(new CustomResponse(100, "error"));
    }
};

// get all articles
export const getAllArticles = async (req: express.Request, res: express.Response) => {
    try {
        let req_query: any = req.query;
        let size: number = req_query.size;
        let page: number = req_query.page;


        let allArticles = await articleModel.find().limit(size).skip(size * (page - 1));
        let DocumentCount = await articleModel.countDocuments();
        let pageCount = Math.ceil(DocumentCount / size);

        res.status(200).send(new CustomResponse(200, "find all articles", allArticles, pageCount))

    } catch (error) {
        console.error(error);
        res.status(500).send(new CustomResponse(500, "Internal server error", null));
    }
};

// get my articles
export const getMyArticles = async (req: express.Request, res: any) => {
    try {
        let req_query: any = req.query;
        let size: number = req_query.size;
        let page: number = req_query.page;

        let user_id = res.tokenData.user._id;

        let countDocument: number = await articleModel.countDocuments();
        let pageCount: number = Math.ceil(countDocument / size);

        let userArticles: any = await articleModel.find({user: user_id}).limit(size).skip(size * (page - 1));
        res.status(200).send(new CustomResponse(200, "find articles", userArticles, pageCount));
    } catch (error) {
        res.status(100).send("error");
    }
};

// get all articles by userName
export const getArticleByUserName = async (req: express.Request, res: express.Response) => {
    let username: string = req.params.username
    let req_query: any = req.query;

    let user = await UserModel.findOne({username: username});
    let size: number = req_query.size;
    let page: number = req_query.page;

    let countDocument: number = await articleModel.countDocuments();
    let pageCount: number = Math.ceil(countDocument / size);
    if (!user) {
        res.status(404).send(new CustomResponse(404, 'user not found'))
    } else {
        let articles = await articleModel.find({user: user.id}).limit(size).skip(size * (pageCount - 1));
        res.status(200).send(new CustomResponse(200, 'articles are found', articles, pageCount))

    }
};

//update article
export const updateArticle = async (req: express.Request, res: any) => {
    try {
        let req_body = req.body;
        let user_id = res.tokenData.user._id;
        let article: any = await articleModel.find({_id: req_body.id, user: user_id})

        if (article) {
            await articleModel.findOneAndUpdate({_id: req_body.id}, {
                title: req_body.title,
                description: req_body.description
            }).then(r => {
                res.status(200).send(new CustomResponse(200, "update article"));
            }).catch(e => {
                res.status(100).send("error");
            })
        } else {
            console.log("error");
        }

    } catch (error) {
        res.status(100).send("error");
    }
};

// delete articles
export const deleteArticle = async (req: express.Request, res: any) => {
    try {
        let articleId: any = req.params.id;
        let user_id: any = res.tokenData.user._id;

        let article = await articleModel.find({_id: articleId, user: user_id});
        if (article) {
            res.status(200).send(new CustomResponse(200, "article is delete Successfully"));
            await articleModel.deleteOne({_id: articleId}).then(r => {
            }).catch(e => {
                res.status(401).send(new CustomResponse(401, "cant access"));
            })
        } else {
            res.status(404).send(new CustomResponse(404, "article not found"));
        }
    } catch (error) {
        res.status(100).send("error");
    }
};