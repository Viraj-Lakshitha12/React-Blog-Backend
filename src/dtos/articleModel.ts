import mongoose, {ObjectId, Schema, Types} from "mongoose";


interface IArticles extends mongoose.Document {
    title: string,
    description: string,
    publishedDate: Date,
    user: ObjectId
}


let articleSchema = new mongoose.Schema<IArticles>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    publishedDate: {type: Date, required: true, default: Date.now()},
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},

});
const ArticleModel = mongoose.model('Articles', articleSchema)

export default ArticleModel;

