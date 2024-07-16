"use client"   // use client because form is browser event

import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
//shadcn & zod
import { zodResolver } from '@hookform/resolvers/zod';   // for validation
import { UserValidation } from "@/lib/validations/user";
import * as z from 'zod';

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"; // from shadcn
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";

interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    },
    btnTitle: string;
}

const AccountProfile = ({ user, btnTitle }: Props) => {
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing("media");
    const router = useRouter();
    const pathname = usePathname();
    
    // 1. Define the form, and to save user data
    const form = useForm<z.infer<typeof UserValidation>>({
        resolver: zodResolver(UserValidation),  
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || "",
        }
    })

    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void ) => { // fieldChange is a callback function receive value return nothing
        e.preventDefault(); // prevent the browser from reloading 

        const fileReader = new FileReader();
        if(e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          setFiles(Array.from(e.target.files));
          // if no image file, return 
          if(!file.type.includes('image')) return; 
          // else, receive the event and read the image url
          // fileReader.onload = async(event) => {...} function sets up an event handler that waits for the fileReader.readAsDataURL(file) to finish reading the file. Once the reading is complete, the onload event is triggered
          fileReader.onload = async(event) => { // On file read completion, get the result as a string, or empty if undefined.
            const imageDataUrl = event.target?.result?.toString() || ""; 
            fieldChange(imageDataUrl); // to update the image by pass in the image url (this is how react hook form update the field)
          }
          fileReader.readAsDataURL(file); // Starts reading the file's contents, when done reading, triggers onload 
        }
    }

    // 2. Define a submit handler to update user data in the database
    const onSubmit = async (values: z.infer<typeof UserValidation>) => {
        const blob = values.profile_photo; // blob is value from image, profile_photo is defined in FormField
        const hasImageChanged = isBase64Image(blob); // know if user has changed image 
        if(hasImageChanged) {
          const imgRes = await startUpload(files) // image response
          // if image response exist, update the values
          if (imgRes && imgRes[0].fileUrl) {
            values.profile_photo = imgRes[0].fileUrl;
          }
        }

        // Update user profile
        await updateUser({
          userId: user.id,
          username: values.username,
          name: values.name,
          bio: values.bio,
          image: values.profile_photo,
          path: pathname
        });
        
        // after update redirect 
        if(pathname === '/profile/edit') {
          router.back();
        } else {
          router.push('/');
        }

    }

    return (
        <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex flex-col justify-start gap-10"
        >
          <FormField
            control={form.control}
            name="profile_photo"
            render={({ field }) => (
              <FormItem className="flex item-center gap-4">
                <FormLabel className="account-form_image-label">
                    {field.value ? (
                        <Image 
                            src={field.value}
                            alt="profile photo"
                            width={96}
                            height={96}
                            priority
                            className="rounded-full object-contain"
                        />
                    ) : (
                        <Image 
                            src="/assets/profile.svg"
                            alt="profile photo"
                            width={24}
                            height={24}
                            className="object-contain"
                        />
                    )}
                </FormLabel>
                <FormControl className="flex-1 text-base-semibold text-gray-200">
                    <Input 
                        type="file"
                        accept="image/*"
                        placeholder="Upload a photo"
                        className="account-form_image-input"
                        onChange={(e) => handleImage(e, field.onChange)}
                    />
                </FormControl>
                <FormMessage /> {/* error message */}  
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                    Name
                </FormLabel>
                <FormControl>
                    <Input 
                        type="text"
                        className="account-form_input no-focus"
                        {...field}  // spread the default field properties
                    />
                </FormControl>
                <FormMessage /> {/* error message */}  
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-2">
                    Username
                </FormLabel>
                <FormControl>
                    <Input 
                        type="text"
                        className="account-form_input no-focus"
                        {...field}  // spread the default field properties, by spreading field into the Input component, you pass all the handlers and values in field object as props to the Input. This enables the Input to interact directly with the form state managed by form.control.
                    />
                </FormControl>
                <FormMessage /> {/* error message */}  
              </FormItem>
            )}
          />

        <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem className="flex flex-col w-full gap-3">
                <FormLabel className="text-base-semibold text-light-2">
                    Bio
                </FormLabel>
                <FormControl>
                    <Textarea 
                        rows={10}
                        className="account-form_input no-focus"
                        {...field}  // spread the default field properties
                    />
                </FormControl>
                <FormMessage /> {/* error message */}  
              </FormItem>
            )}
          />


          <Button type="submit" className="bg-primary-500">Submit</Button>
        </form>
      </Form>
    )
}

export default AccountProfile;

