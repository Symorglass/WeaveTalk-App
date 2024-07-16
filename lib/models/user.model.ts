import mongoose from "mongoose";

// defind data model 

const userSchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    //one user can have multiple references to specific thread stored in the database
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'    // referecne to a Thread instance stored in the database
        }
    ],
    onboarded: {
        type: Boolean,
        default: false,
    },
    communities: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Community'
        }
    ]
});

const User = mongoose.models.User || mongoose.model('User', userSchema);  // the first time there is no mongoose Model, so call mongoose.model to create the data model based on the schema 

export default User;