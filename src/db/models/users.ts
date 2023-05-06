import { Schema, model, models, CallbackWithoutResultAndOptionalError } from "mongoose";
import { hash, compare } from "bcrypt"

const Fav = new Schema({
    author: { type: String },
    date: { type: String },
    title: { type: String },
    topicId: { type: String },
})

const UserSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    messages: { type: [Schema.Types.ObjectId], ref: 'message' },
    rol: { type: String, default: 'user' },
    favs: [Fav]
},
    {
        timestamps: true,
        versionKey: false
    })

UserSchema.pre("save", async function (next: CallbackWithoutResultAndOptionalError) {
    this.password = await hash(this.password, 10);
    next();
});

UserSchema.methods.isValidPassword = async function (password: string) {
    const comp = await compare(password, this.password);
    return comp;
}

export default models.User || model('User', UserSchema);