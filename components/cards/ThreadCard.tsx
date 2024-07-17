// Displays Threads

import Link from "next/link";
import Image from "next/image";
import { formatDateString } from "@/lib/utils";

interface Props {
    id: string;
    currentUserId: string;
    parentId: string | null;
    content: string;
    author: {
        name: string;
        image: string;
        id: string;
    }
    community: {
        id: string;
        name: string;
        image: string;
    } | null;
    createdAt: string;
    comments: {
        author: {
            image: string;  // in ThreadCard, we don't show actual comment here, when click into thread detail page, we can see all comments
        }
    }[]  // comments is an array with multiple comments 
    isComment?: boolean; // not required 
}

const ThreadCard = ({
    id,
    currentUserId,
    parentId,
    content,
    author,
    community,
    createdAt,
    comments,
    isComment,
}: Props) => {

    return (
        <article className={`flex w-full flex-col rounded-lg ${isComment ? 'px-0 xs:px-7' : 'bg-dark-2 p-7'}`}>
            <div className="flex items-start justify-between">
                <div className="flex w-full flex-1 flex-row gap-4">

                    {/* author image with image linked to author page */}
                    <div className="flex flex-col items-center">
                        <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
                            <Image 
                                src={author.image}
                                alt='Profile image'
                                fill
                                className="cursor-pointer rounded-full"
                            />
                        </Link>
                        <div className="thread-card_bar" /> 
                    </div>

                    
                    <div className="flex w-full flex-col">

                        <div className="flex gap-3.5">
                            {/* author linked to author page */}
                            <Link href={`/profile/${author.id}`} className="w-fit">
                                <h4 className="cursor-pointer text-base-semibold text-light-1">
                                    {author.name}
                                </h4>
                            </Link>

                            {/* post created datetime */}
                            <p className={'mt-1 text-subtle-medium text-gray-600'}>
                                {formatDateString(createdAt)}
                            </p>
                        </div>

                        {/* content of the thread */}
                        <p className="mt-2 text-small-regular text-light-2">
                            {content}
                        </p>

                        {/* social media functional icons */}
                        <div className={`${isComment && 'mb-8'} mt-5 flex flex-col gap-3`}>
                            <div className="flex gap-3.5">
                                <Image 
                                    src="/assets/heart-gray.svg"
                                    alt="heart"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                />
                                <Link href={`/thread/${id}`}>
                                    <Image 
                                        src="/assets/reply.svg"
                                        alt="reply"
                                        width={24}
                                        height={24}
                                        className="cursor-pointer object-contain"
                                    />
                                </Link>
                                <Image 
                                    src="/assets/repost.svg"
                                    alt="repost"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                />
                                <Image 
                                    src="/assets/share.svg"
                                    alt="share"
                                    width={24}
                                    height={24}
                                    className="cursor-pointer object-contain"
                                />


                            </div>
                            
                            <div>
                                {comments && comments.length > 0 && (
                                    <Link href={`/thread/${id}`}> 
                                        <p className="mt-1 text-subtle-medium text-gray-1">
                                            {comments.length} repl{comments.length > 1 ? "ies" : "y"}
                                        </p>
                                    </Link>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>


                {!isComment && community && (
                    <Link 
                    href={`/communities/${community.id}`} 
                    className="mt-5 flex items-center">
                        <p className="text-subtle-medium text-gray-1">
                            {formatDateString(createdAt)}
                            {community && ` -${community.name} Community`}
                        </p>
                        <Image 
                            src={community.image}
                            alt={community.name}
                            width={14}
                            height={14}
                            className="ml-1 rounded-full object-cover"
                            />
                    </Link>
                )}

                {/* TODO: Delete thread */}
                {/* TODO: Show comment logos */}
                

        </article>
    )
}

export default ThreadCard;