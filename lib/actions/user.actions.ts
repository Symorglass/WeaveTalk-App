"use server"    // Directs that this module runs on the server side in a Next.js environment.

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose"
import { FilterQuery, SortOrder } from "mongoose";

import User from "../models/user.model";
import Thread from "../models/thread.model";
import Community from "../models/community.model";

interface Params {
    userId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
    path: string;
}

// update a user's detail 
export async function updateUser({
    userId,
    username,
    name,
    bio, 
    image,
    path, 
}: Params): Promise<void> {

    connectToDB();

    try {
        await User.findOneAndUpdate(
            { id: userId },    // finds a single document that matches this user id  
            {                                           // provide update info
                username: username.toLowerCase(),
                name,
                bio,
                image,
                onboarded: true,
            },
            { upsert: true }, // upsert is a database operation that will update if row exist else insert a new row if the value not exist
        );

        // If the update occurs on the profile edit path, revalidate that path to update cached data
        if(path === '/profile/edit') {
            revalidatePath(path);    // Calling revalidatePath triggers the server to regenerate the page at the specified path, ensuring that the next time someone accesses this page, they receive the most updated content.
        }
    } catch (error: any) {
        throw new Error(`Failed to create/update user: ${error.message}`)
    }
}

// fetch user's details from the DB 
export async function fetchUser(userId: string) {
    try {
        connectToDB();

        // Return the user details while populating related community data
        return await User.findOne({ id: userId })
            .populate({
                path: 'communities', // Populate the communities associated with the user
                model: Community  // Specify the model to use for population
            })
    } catch (error: any) {
        throw new Error(`Failed to fetch user: ${error.message}`);
    }
}

// fetch user's posts
export async function fetchUserPosts(userId: string) {
    try {
        connectToDB();

        // Find all posts authored by the user with the given userId
        const threads = await User.findOne({ id: userId })
            .populate({
                path: "threads",
                model: Thread,
                populate: [
                    {
                        path: "community",
                        model: Community,
                        options: { sort: { 'createdAt': -1 } },  // Sort threads in descending order by createdAt
                        select: "name id image _id", 
                    },
                    {
                        path: "children",
                        model: Thread,
                        options: { sort: { 'createdAt': -1 } },  // children also sorted
                        populate: {
                            path: "author",
                            model: User,
                            select: "name image id", 
                        },
                    },
                ],
            });

        return threads;

    } catch (error: any) {
        throw new Error(`Failed to fetch user's post: ${error.message}`);        
    }
}

// fetch searched users
export async function fetchUsers({ 
    userId,
    searchString = "",
    pageNumber = 1, 
    pageSize = 20, 
    sortBy = "desc"
} : {
    userId: string; 
    searchString?: string; // optional
    pageNumber?: number; // optional
    pageSize?: number; // optional
    sortBy?: SortOrder // optional
}) {
    try {
        connectToDB();

        const skipAmount = (pageNumber - 1) * pageSize;

        const regex = new RegExp(searchString, 'i'); // 'i' case insensitive

        // initialize a query
        const query: FilterQuery<typeof User> = {
            id: { $ne: userId } // filter out current user, $ne is not equal
        }
        if(searchString.trim() !== '') {  // if searchString is not empty, append logic to the query
            query.$or = [
                { username: {$regex: regex}},
                { name: {$regex: regex }}
            ]
        }
        // initialize sort logic
        const sortOptions = { createdAt: sortBy };
        
        // Main query
        const userQuery = User.find(query)
            .sort(sortOptions)
            .skip(skipAmount)
            .limit(pageSize);
        
        // Count query result
        const totalUsersCount = await User.countDocuments(query);
        
        // Execute query
        const fetchedUsers = await userQuery.exec();

        // check if there are more posts to populate 
        const isNext = totalUsersCount > skipAmount + fetchedUsers.length;

        return { fetchedUsers, isNext };

    } catch (error: any) {
        throw new Error(`Failed to fetch users: ${error.message}`);
    }
}

// fetch all comments current user received on their posts from other users
export async function getActivity(userId: string) {
    try {
        connectToDB();

        // find all threads by current user
        const userThreads = await Thread.find({ author: userId })

        // Collect all the child thread ids (comments) from the 'children' field of the threads
        const childThreadIds = userThreads.reduce((acc, userThread) => {
            return acc.concat(userThread.children)
        }, []);  // [] is default value to add to the accumulator to start the reduce

        // get all the replies, excluding the replies created by current user
        const replies = await Thread.find({
            _id: { $in: childThreadIds },  
            author: { $ne: userId }
        }).populate({
            path: 'author', // The populate method is used to replace the author field in each retrieved thread with detailed information about the author (from the User collection). Only the author’s name, image, and _id are selected to be returned.
            model: User,
            select: 'name image _id'
        })
        .sort({ createdAt: -1 });  // Adding a sort method to order by createdAt in descending order

        return replies;

    } catch (error: any) {
        throw new Error(`Failed to fetch activities: ${error.message}`);
    }
}