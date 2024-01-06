import express from "express";
import userModel from "../models/userModel";
import CustomResponse from "../dtos/customResponse";
import UserModel from "../models/userModel";
import jwt, {Secret} from "jsonwebtoken";
import process from "process";
import bcrypt from "bcryptjs";

// get all users
export const getAllUsers = async (req: express.Request, res: express.Response) => {
    try {
        let users = await userModel.find();
        res.status(200).send(new CustomResponse(
            200, "find all users", users
        ));
    } catch (error) {
        res.status(100).send("error");
    }

};

// save user
export const saveUser = async (req: express.Request, res: express.Response) => {
    try {
        const req_body: any = req.body;

        bcrypt.hash(req_body.password, 8, async function (err, hash) {
            if (err) {
                res.status(100).send(new CustomResponse(100, "something went wrong"));
            }
            const userModel = new UserModel({
                username: req_body.username,
                f_name: req_body.f_name,
                l_name: req_body.l_name,
                email: req_body.email,
                password: hash
            });
            let saveUser = await userModel.save();
            saveUser.password = "";
            res.status(200).send(new CustomResponse(
                200, "user saved successfully", saveUser
            ));
        })

    } catch (error) {
        console.error(error);
        res.status(500).send('Error: Unable to save user');
    }
};

//auth
export const userAuth = async (req: express.Request, res: express.Response) => {

    try {
        const req_body = req.body;
        let user = await UserModel.findOne({email: req_body.email});
        if (user) {
            let isMatch:boolean = await bcrypt.compare(req_body.password, user.password);

            if (isMatch) {
                const expiresIn = '1w'

                jwt.sign({user}, process.env.SECRET_KEY as Secret, {expiresIn}, (error: any, token: any) => {
                    if (error) {
                        res.status(100).send(new CustomResponse(
                            100, "error"
                        ));
                    } else {
                        let res_body = {
                            user: user,
                            accessToken: token
                        }

                        res.status(200).send(new CustomResponse(
                            200, "Access", res_body
                        ));
                    }
                })


            } else {
                res.status(401).send(new CustomResponse(401, "Invalid"));
            }
        } else {
            res.status(401404).send(new CustomResponse(404, "user not found"));
        }

    } catch (error) {
        res.status(100).send(error);
    }
};