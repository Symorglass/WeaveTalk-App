import mongoose from "mongoose";

// defind data model 

const threadSchema = new mongoose.Schema({

    text: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    community: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Community',
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    parentId: {
        type: String
    }, 
    children: [  // one thread can have multiple threads as chldren (comment), children comment can have children comments, so it is recursive structure here like a tree of comment
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Thread'
        }
    ]
});

const Thread = mongoose.models.Thread || mongoose.model('Thread', threadSchema);  // the first time there is no mongoose Model, so call mongoose.model to create the data model based on the schema 

export default Thread;