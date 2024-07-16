import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { fetchUser } from "@/lib/actions/user.actions";
import PostThread from "@/components/forms/PostThread";

async function Page() {
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(user.id);    // userInfo is a User model object, with key _id created by mongoDB 
    if(!userInfo?.onboarded) redirect('/onboarding');  // bring the user back to onboarding page if they are not onboarded yet

    return (
        <> 
            <h1 className="head-text">Create Post</h1>
            <PostThread userId={userInfo._id} />
        </>
    )
}

export default Page;