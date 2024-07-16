"use client"   // use client because form is browser event

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
//shadcn & zod
import * as z from 'zod';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"; // from shadcn

import { zodResolver } from '@hookform/resolvers/zod';   // for validation
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";

import { CommentValidation } from "@/lib/validations/thread";
import { addCommentToThread } from "@/lib/actions/thread.actions";
// import { createThread } from "@/lib/actions/thread.actions";

interface Props {
    threadId: string;
    currentUserImg: string;
    currentUserId: string;
}

const Comment = ({ threadId, currentUserImg, currentUserId }: Props) => {

    const router = useRouter();
    const pathname = usePathname();
    
    // 1. Define the form, and to save user data
    const form = useForm({
        resolver: zodResolver(CommentValidation),  
        defaultValues: {
            thread: ''
        }
    })

    // backend CRUD
    const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
        await addCommentToThread(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathname
        );

        form.reset(); // once craeting a comment, reset the form waiting for another comment.

    }

    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="comment-form"
            >

                <FormField      
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                    <FormItem className="flex w-full items-center gap-3">
                        <FormLabel>
                            <Image 
                                src={currentUserImg}
                                alt="Profile image"
                                width={48}
                                height={48}
                                className="rounded-full object-cover"
                            />
                        </FormLabel>
                        <FormControl className="border-none bg-transparent">
                            <Input 
                                type="text"
                                placeholder="Comment..."
                                className="no-focus text-light-1 outline-none"
                                {...field 
                                    // Input has all field props, hooks the Input into the form state managed by react-hook-form, enable it to use the provided onChange, onBlur, and value properties. This setup allows react-hook-form to automatically handle state updates, validation, and errors based on user interactions and the validation criteria you've set up.
                                }
                            />  
                        </FormControl>
                    </FormItem>
                    )}
                />

                <Button type="submit" className="comment-form_btn">
                    Reply
                </Button>
                
            </form>
        </Form>
    )
}

export default Comment;