import mongoose from "mongoose";

// defind data model 

const communitySchema = new mongoose.Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //one community can have multiple references to thread stored in the database
    threads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'    // referecne to a Thread instance stored in the database
        }
    ],
    // one community can have multiple members
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
});

const Community = mongoose.models.Community || mongoose.model('Community', communitySchema);  // the first time there is no mongoose Model, so call mongoose.model to create the data model based on the schema 

export default Community;