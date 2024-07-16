"use server"    // Directs that this module runs on the server side in a Next.js environment.

import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";

import Thread from "../models/thread.model";
import User from "../models/user.model";
import Community from "../models/community.model";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}

export async function createThread({
    text,
    author,
    communityId,
    path
}: Params) {
    try {
        connectToDB();

        const communityIdObject = await Community.findOne(
            { id: communityId },
            { _id: 1 }
          );
        
        // 1. instantiates a new thread document with the properties passed to it, saved to the MongoDB database
        const createdThread = await Thread.create({
            text,
            author, // ObjectId
            community: communityIdObject,
        });
    
        // 2. Update user model
        await User.findByIdAndUpdate(author, {
            $push: { threads: createdThread._id }  // puah ObjectId into therads array 
        });

        // 3. Update community model
        if (communityIdObject) {
            await Community.findByIdAndUpdate(communityIdObject, {
              $push: { threads: createdThread._id },
            });
          }
    
        // revalidate path
        revalidatePath(path);     // Calling revalidatePath triggers the server to regenerate the page at the specified path, ensuring that the next time someone accesses this page, they receive the most updated content.
    
    } catch (error: any) {
        throw new Error(`Error creating thread: ${error.message}`)
    }
}


export async function fetchPosts(pageNumber = 1, pageSize = 20) {
    connectToDB();

    // calculate pagination, i.e. the number of posts to skip 
    const skipAmount = (pageNumber - 1) * pageSize;

    // Fecth posts that have no parents i.e. first level threads, exclude comments
    const postsQuery = Thread.find({ parentId : { $in : [null, undefined] } })
        .sort({ createdAt: 'desc' })
        .skip(skipAmount)
        .limit(pageSize)
        .populate({ 
            path: 'author', 
            model: User 
        })
        .populate({
            path: "community",
            model: Community,
        })
        .populate({  
            path: 'children',
            populate: {    // resursively populate the children thread (comments)
                path: 'author',
                model: User,
                select: '_id name parentId image'  // choose specific properties from User to populate 
            }
        })

    // total post counts, only count threads exclude comments
    const totalPostsCount = await Thread.countDocuments({ parentId : { $in : [null, undefined] } });

    const posts = await postsQuery.exec();

    // check if there are more posts to populate 
    const isNext = totalPostsCount > skipAmount + posts.length;
    
    // return object with all posts for that page and isNext 
    return { posts, isNext };
}


export async function fetchThreadById(id: string) {
    connectToDB();

    try {
        const thread = await Thread.findById(id)
            .populate({ // populate current thread
                path: 'author',
                model: User,
                select: '_id id name image'  // choose specific properties from User to populate 
            })
            .populate({
                path: "community",
                model: Community,
                select: "_id id name image",
            }) // Populate the community field with _id and name
            .populate({  // populate the list of children i.e. comment of the thread 
                path: 'children',
                populate: [   // it's a list of comment
                    {
                        path: 'author',
                        model: User,
                        select: "_id id name parentId image"
                    },
                    {  // populate the children comments of comments
                        path: 'children',
                        model: Thread,
                        populate: {
                            path: 'author',
                            model: User,
                            select:  "_id id name parentId image"
                        }
                    }
                ]
            }).exec();

        return thread;

    } catch (error: any) {
        throw new Error(`Error fetching thread: ${error.message}`);
    }
}


export async function addCommentToThread(
    threadId: string,
    commentText: string,
    userId: string,
    path: string,
) {
    connectToDB();
    try {
        // add new comment
        // 1. Find the original thread by its ID
        const originalThread = await Thread.findById(threadId);
        if(!originalThread) {
            throw new Error("Thread not found");
        }
        
        // 2. Craete a new thread as a comment
        const commentThread = new Thread({
            text: commentText,
            author: userId,
            parentId: threadId, 
        })
        
        // 3. Save the new Thread
        const savedCommentThread = await commentThread.save();

        // 4. Update the original thread to include the new comment
        originalThread.children.push(savedCommentThread._id);
        // Save the original thread
        await originalThread.save();

        revalidatePath(path);
        
    } catch (error: any) {
        throw new Error(`Error adding comment to thread: ${error.message}`);
    }
}