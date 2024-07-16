import ThreadCard from "@/components/cards/ThreadCard";
import Comment from "@/components/forms/Comment";

import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";

import { fetchUser } from "@/lib/actions/user.actions";
import { fetchThreadById } from "@/lib/actions/thread.actions";

// get routing parameters from url
const Page = async ({ params }: { params: { id: string }}) => { // The function expects an object that contains a params property. The params property itself is an object that should have an id property, which is of type string.
   if(!params.id) return null;

   // check if user 
   const user = await currentUser();  // fetch details about the currently logged-in user.
   if(!user) return null;

   // if can't find user info, rediect to onboarding page to create profile
   const userInfo = await fetchUser(user.id);
   if(!userInfo?.onboarded) redirect('/onboarding');

   const thread = await fetchThreadById(params.id);    // params.id is from url, e.g. /thread/668caa06bace7355bb38
   
   return (
        <section className="relative">
            <div>
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={user?.id || ""}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={thread.author}
                    community={thread.community}
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            </div>

            <div className="mt-7">
                <Comment
                    threadId={thread.id}
                    currentUserImg={userInfo.image}
                    currentUserId={JSON.stringify(userInfo._id)}
                />
            </div>

            <div className="mt-10">
                {thread.children.map((childItem: any) => (
                <ThreadCard
                    key={childItem._id}
                    id={childItem._id}
                    currentUserId={user?.id || ""}
                    parentId={childItem.parentId}
                    content={childItem.text}
                    author={childItem.author}
                    community={childItem.community}
                    createdAt={childItem.createdAt}
                    comments={childItem.children}
                    isComment
                />
                ))}
            </div>
        </section>
   )
   
}

export default Page;