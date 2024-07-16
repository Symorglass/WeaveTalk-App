import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import { fetchUser } from "@/lib/actions/user.actions";
import ProfileHeader from "@/components/shared/ProfileHeader";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { profileTabs } from "@/constants";

import ThreadsTab from "@/components/shared/ThreadsTab";


async function Page({ params } : { params: { id: string } }) {    // The function expects an object that contains a params property. The params property itself is an object that should have an id property, which is of type string.
    const user = await currentUser();
    if(!user) return null;

    const userInfo = await fetchUser(params.id);    // when click on avatar or click on profile, fetch that user
    if(!userInfo?.onboarded) redirect('/onboarding');  // bring the user back to onboarding page if they are not onboarded yet

    return (
        <section>
            <ProfileHeader
                accountId={userInfo.id} // the user that current user is looking at 
                authUserId={user.id}    // current user
                name={userInfo.name}
                username={userInfo.username}
                imgUrl={userInfo.image}
                bio={userInfo.bio}
            />

            <div className="mt-9">
                <Tabs defaultValue="posts" className="w-full">
                    <TabsList className="tab">
                        {profileTabs.map((tab) => (
                            // populate different tabs
                            <TabsTrigger key={tab.label} value={tab.value} className="tab">
                                <Image 
                                    src={tab.icon}
                                    alt={tab.label}
                                    width={24}
                                    height={24}
                                    className="object-contain"
                                />
                                <p className="max-sm:hidden">{tab.label}</p> 
                                {tab.label === "Posts" && (
                                    <p className="ml-1 rounded-sm bg-light-4 px-2 py-1 text-tiny-medium text-light-2">
                                        {userInfo?.threads?.length}
                                    </p>
                                )}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {profileTabs.map((tab) => (
                        <TabsContent key={`content-${tab.label}`} value={tab.value} className="w-full text-light-1">
                            <ThreadsTab 
                                currentUserId={user.id}
                                accountId={userInfo.id}
                                accountType="User"
                            />
                        </TabsContent>
                    ))}
                    
                </Tabs>
            </div>
        </section>
    )
}

export default Page;