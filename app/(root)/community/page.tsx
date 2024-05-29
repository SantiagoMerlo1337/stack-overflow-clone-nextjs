import React from "react";
import Link from "next/link";
import { UserFilters } from "@/components/constants/filters";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import Filter from "@/components/shared/Filter";
import { getAllUsers } from "@/lib/actions/user.action";
import UserCard from "@/components/cards/UserCard";

// import { getUsers } from "@/lib/actions/user.action";

const Page = async () => {
    const result = await getAllUsers({});
    return (
        <>
            <div>
                <h1 className="h1-bold text-dark100_light900">All Users</h1>
                <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
                    <LocalSearchbar
                        route="/community"
                        iconPosition="left"
                        imgSrc="/assets/icons/search.svg"
                        placeholder="Search for users"
                        otherClasses="flex-1"
                    />
                    <Filter
                        filters={UserFilters}
                        otherClasses="min-h-[56px] sm:min-w[170px]"
                    />
                </div>
            </div>
            <section className="mt-12 flex flex-wrap gap-4">
                {result.users.length > 0 ? (
                    result.users.map((user) => (
                        <UserCard key={user._id} user={user} />
                    ))
                ) : (
                    <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
                        <p>No users yet</p>
                        <Link
                            href="/sign-up"
                            className="mt-2 font-bold text-accent-blue"
                        >
                            Join to be the first!
                        </Link>
                    </div>
                )}
            </section>
        </>
    );
};

export default Page;
