// user validation 
import * as z from 'zod';

export const UserValidation = z.object({
    profile_photo: z.string().url().nonempty(), // call validation function in z to ensure profile photo is string and url and nonempty
    name: z.string().min(3, { message:"MINIMUM 3 CHARACTERS." }).max(30),
    username: z.string().min(3).max(30),
    bio: z.string().min(3).max(1000),
})