"use client"   // use client because form is browser event

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { usePathname, useRouter } from "next/navigation";
import { useOrganization } from "@clerk/nextjs";

// import { updateUser } from "@/lib/actions/user.actions";
import { ThreadValidation, CommentValidation } from "@/lib/validations/thread";
import { createThread } from "@/lib/actions/thread.actions";

interface Props {
    userId: string;
}

function PostThread({ userId }: Props) {

    const router = useRouter();
    const pathname = usePathname();
    const { organization } = useOrganization();

    console.log(`ORG!!!!!!!!!! ${organization.id}`);
    
    // 1. Define the form, and to save user data
    const form = useForm({
        resolver: zodResolver(ThreadValidation),  
        defaultValues: {
            thread: '',
            accountId: userId
        }
    })

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread,
            author: userId,
            communityId: organization ? organization.id : null,
            path: pathname
        });

        router.push("/"); // once craeting thread, route to the home page, to see newly craeted post

    }

    return (
        <Form {...form}>
            <form 
            onSubmit={form.handleSubmit(onSubmit)} 
            className="mt-10 flex flex-col justify-start gap-10"
            >

                <FormField      
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                    <FormItem className="flex flex-col w-full gap-3">
                        <FormLabel className="text-base-semibold text-light-2">
                            Content
                        </FormLabel>
                        <FormControl className="no-focus border border-dark-4 bg-dark-3 text-light-1">
                            <Textarea 
                                rows={15} 
                                {...field 
                                    // Textarea has all field props, hooks the Textarea into the form state managed by react-hook-form, enable it to use the provided onChange, onBlur, and value properties. This setup allows react-hook-form to automatically handle state updates, validation, and errors based on user interactions and the validation criteria you've set up.
                                }
                            />  
                        </FormControl>
                        <FormMessage /> {/* error message */}  
                    </FormItem>
                    )}
                />

                <Button type="submit" className="bg-primary-500">
                    Post Thread
                </Button>

            </form>
        </Form>
    )
}

export default PostThread;
