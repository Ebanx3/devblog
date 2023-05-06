import { Schema, model, models } from "mongoose";

const ReplySchema = new Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic' },
}, {
    timestamps: true,
    versionKey: false
});


export default models.Reply || model('Reply', ReplySchema);