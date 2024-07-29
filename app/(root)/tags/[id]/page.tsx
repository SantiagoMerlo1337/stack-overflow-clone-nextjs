import QuestionCard from "@/components/cards/QuestionCard";
import NoResult from "@/components/shared/NoResult";
import Pagination from "@/components/shared/Pagination";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { getQuestionsByTagId, getTagById } from "@/lib/actions/tag.actions";
import { URLProps } from "@/types";
import { Metadata } from "next";
import React from "react";

export async function generateMetadata({
    params,
}: URLProps): Promise<Metadata> {
    const { id: tagId } = params;

    try {
        const tag = await getTagById({ tagId });
        if (!tag) {
            return {
                title: "Tag not found | Dev Overflow",
            };
        }
        return {
            title: `${tag.name} | Dev Overflow`,
        };
    } catch (error) {
        console.error("Error fetching tag data:", error);
        return {
            title: "Error | Dev Overflow",
        };
    }
}

const Page = async ({ params, searchParams }: URLProps) => {
    const result = await getQuestionsByTagId({
        tagId: params.id,
        page: searchParams.page ? +searchParams.page : 1,
        searchQuery: searchParams.q,
    });
    return (
        <>
            <h1 className="h1-bold text-dark100_light900">
                {result?.tagTitle}
            </h1>
            <div className="mt-11 w-full">
                <LocalSearchbar
                    route={`/tags/${params.id}`}
                    iconPosition="left"
                    imgSrc="/assets/icons/search.svg"
                    placeholder="Search tag questions"
                    otherClasses="flex-1"
                />
            </div>

            <div className="mt-10 flex w-full flex-col gap-6">
                {result && result.questions.length > 0 ? (
                    result.questions.map((question: any) => (
                        <QuestionCard
                            key={question._id}
                            _id={question._id}
                            title={question.title}
                            tags={question.tags}
                            author={question.author}
                            upvotes={question.upvotes}
                            views={question.views}
                            answers={question.answers}
                            createdAt={question.createdAt}
                        />
                    ))
                ) : (
                    <NoResult
                        title="There´s no tag question to show"
                        description="Be the first to break the silence! 🚀 Ask a Question and
                kickstart the discussion. Our query could be the next thing
                others learn from. Get involved! 💡"
                        link="/ask-question"
                        linkTitle="Ask a Question"
                    />
                )}
            </div>
            <div className="mt-10">
                {result && (
                    <Pagination
                        pageNumber={searchParams?.page ? +searchParams.page : 1}
                        isNext={result.isNext}
                    />
                )}
            </div>
        </>
    );
};

export default Page;
