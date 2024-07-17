import { redirect } from "next/navigation";
import ThreadCard from "../cards/ThreadCard";

import { fetchUserPosts } from "@/lib/actions/user.actions";
import { fetchCommunityDetails, fetchCommunityPosts } from "@/lib/actions/community.actions";
import { fetchRepliesById } from "@/lib/actions/thread.actions";

interface Props {
    currentUserId: string;
    accountId: string;
    accountType: string;
    tabType: string;
}

const ThreadsTab = async ({
    currentUserId,
    accountId,
    accountType,
    tabType
}: Props) => {

    // Fetch profile or community threads
    let result: any;

    if(accountType === 'Community') {
        result = await fetchCommunityPosts(accountId);
    } else {
        if(tabType === 'Replies') {
            result = await fetchRepliesById(accountId);
        } else {
            result = await fetchUserPosts(accountId);
        }
    }

    if(!result) redirect('/');

    return (
        <section className="mt-9 flex flex-col gap-10">
            {result.threads.map((thread: any) => (
                <ThreadCard
                    key={thread._id}
                    id={thread._id}
                    currentUserId={currentUserId}
                    parentId={thread.parentId}
                    content={thread.text}
                    author={
                        (accountType === "User" && tabType !== 'Replies') ? {
                            name: result.name,
                            image: result.image,
                            id: result.id
                        } : {
                            name: thread.author.name,
                            image: thread.author.image,
                            id: thread.author.id
                        }
                    } 
                    community={thread.community} 
                    createdAt={thread.createdAt}
                    comments={thread.children}
                />
            ))}
        </section>
    )
}

export default ThreadsTab;