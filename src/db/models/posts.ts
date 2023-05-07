import { Schema, model, models } from "mongoose";

const PostSchema = new Schema({
    username: { type: String, required: true },
    content: { type: String, required: true },
    topicId: { type: Schema.Types.ObjectId, ref: 'Topic' },

}, {
    timestamps: true,
    versionKey: false
});

PostSchema.index({ content: "text" })

export default models.Post || model('Post', PostSchema);