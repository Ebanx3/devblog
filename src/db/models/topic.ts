import { Schema, model, models } from "mongoose";

const TopicSchema = new Schema({
    username: { type: Object, required: true },
    title: { type: String, required: true },
    postId: { type: String, required: true },
    replies: { type: [Schema.Types.ObjectId], ref: "Reply" },
    status: { type: String, default: "public" }, //public or hidden
    likes: [String],
    dislikes: [String],
}, {
    versionKey: false,
    timestamps: true
})

TopicSchema.index({ title: "text" });

export default models.Topic || model('Topic', TopicSchema);