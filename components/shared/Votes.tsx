"use client";
import React, { useEffect, useRef, useState } from "react";
import { downvoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import {
    downvoteQuestion,
    upvoteQuestion,
} from "@/lib/actions/question.action";
import { toggleSaveQuestion } from "@/lib/actions/user.action";
import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { viewQuestion } from "@/lib/actions/interaction.action";
import { toast } from "../ui/use-toast";

interface Props {
    type: string;
    itemId: string;
    userId: string;
    upvotes: number;
    hasupVoted: boolean;
    downvotes: number;
    hasdownVoted: boolean;
    hasSaved?: boolean;
}

const Votes = ({
    type,
    itemId,
    userId,
    upvotes,
    hasupVoted,
    downvotes,
    hasdownVoted,
    hasSaved,
}: Props) => {
    const pathname = usePathname();
    const router = useRouter();
    const hasViewed = useRef(false);
    const [localUpvotes, setLocalUpvotes] = useState(upvotes);
    const [localDownvotes, setLocalDownvotes] = useState(downvotes);
    const [localHasUpvoted, setLocalHasUpvoted] = useState(hasupVoted);
    const [localHasDownvoted, setLocalHasDownvoted] = useState(hasdownVoted);
    const [localHasSaved, setLocalHasSaved] = useState(hasSaved);

    const handleSave = async () => {
        // OPTIMISTIC UI
        if (!localHasSaved) {
            setLocalHasSaved(true);
        } else {
            setLocalHasSaved(false);
        }
        try {
            if (!userId) {
                return toast({
                    title: "Please log in",
                    description: "You must be logged in to perform this action",
                });
            }

            await toggleSaveQuestion({
                userId: JSON.parse(userId),
                questionId: JSON.parse(itemId),
                path: pathname,
            });
        } catch (error) {
            // REVIERTE UI EN CASO DE ERROR
            setLocalHasSaved(!localHasSaved);
        }

        return toast({
            title: `Question ${!hasSaved ? "Saved in" : "Removed from"} your collection`,
            variant: !hasSaved ? "default" : "destructive",
        });
    };

    const handleVote = async (action: string) => {
        if (!userId) {
            return toast({
                title: "Please log in",
                description: "You must be logged in to perform this action",
            });
        }

        if (action === "upvote") {
            // OPTIMISTIC UI
            setLocalUpvotes(localUpvotes + (localHasUpvoted ? -1 : 1));
            setLocalHasUpvoted(!localHasUpvoted);
            if (localHasDownvoted) {
                setLocalDownvotes(localDownvotes - 1);
                setLocalHasDownvoted(false);
            }

            try {
                if (type === "Question") {
                    await upvoteQuestion({
                        questionId: JSON.parse(itemId),
                        userId: JSON.parse(userId),
                        hasupVoted: localHasUpvoted,
                        hasdownVoted: localHasDownvoted,
                        path: pathname,
                    });
                } else if (type === "Answer") {
                    await upvoteAnswer({
                        answerId: JSON.parse(itemId),
                        userId: JSON.parse(userId),
                        hasupVoted: localHasUpvoted,
                        hasdownVoted: localHasDownvoted,
                        path: pathname,
                    });
                }
            } catch (error) {
                // REVIERTE UI EN CASO DE ERROR
                setLocalUpvotes(localUpvotes - (localHasUpvoted ? -1 : 1));
                setLocalHasUpvoted(localHasUpvoted);
                if (localHasDownvoted) {
                    setLocalDownvotes(localDownvotes + 1);
                    setLocalHasDownvoted(true);
                }
            }

            return toast({
                title: `Upvote ${!localHasUpvoted ? "Successful" : "Removed"}`,
                variant: !localHasUpvoted ? "default" : "destructive",
            });
        }

        if (action === "downvote") {
            // OPTIMISTIC UI
            setLocalDownvotes(localDownvotes + (localHasDownvoted ? -1 : 1));
            setLocalHasDownvoted(!localHasDownvoted);
            if (localHasUpvoted) {
                setLocalUpvotes(localUpvotes - 1);
                setLocalHasUpvoted(false);
            }

            try {
                if (type === "Question") {
                    await downvoteQuestion({
                        questionId: JSON.parse(itemId),
                        userId: JSON.parse(userId),
                        hasupVoted: localHasUpvoted,
                        hasdownVoted: localHasDownvoted,
                        path: pathname,
                    });
                } else if (type === "Answer") {
                    await downvoteAnswer({
                        answerId: JSON.parse(itemId),
                        userId: JSON.parse(userId),
                        hasupVoted: localHasUpvoted,
                        hasdownVoted: localHasDownvoted,
                        path: pathname,
                    });
                }
            } catch (error) {
                // REVIERTE UI EN CASO DE ERROR
                setLocalDownvotes(
                    localDownvotes - (localHasDownvoted ? -1 : 1)
                );
                setLocalHasDownvoted(localHasDownvoted);
                if (localHasUpvoted) {
                    setLocalUpvotes(localUpvotes + 1);
                    setLocalHasUpvoted(true);
                }
            }

            return toast({
                title: `Downvote ${!localHasDownvoted ? "Successful" : "Removed"}`,
                variant: !localHasDownvoted ? "default" : "destructive",
            });
        }
    };

    useEffect(() => {
        if (!hasViewed.current) {
            viewQuestion({
                questionId: JSON.parse(itemId),
                userId: userId ? JSON.parse(userId) : undefined,
            });
            hasViewed.current = true;
        }
    }, [itemId, userId, pathname, router]);

    return (
        <div className="flex gap-5">
            <div className="flex-center gap-2.5">
                <div className="flex-center gap-1.5">
                    <Image
                        src={
                            localHasUpvoted
                                ? "/assets/icons/upvoted.svg"
                                : "/assets/icons/upvote.svg"
                        }
                        width={18}
                        height={18}
                        alt="upvote"
                        className="cursor-pointer"
                        onClick={() => handleVote("upvote")}
                    />
                    <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                        <p className="subtle-medium text-dark400_light900">
                            {formatAndDivideNumber(localUpvotes)}
                        </p>
                    </div>
                </div>

                <div className="flex-center gap-1.5">
                    <Image
                        src={
                            localHasDownvoted
                                ? "/assets/icons/downvoted.svg"
                                : "/assets/icons/downvote.svg"
                        }
                        width={18}
                        height={18}
                        alt="downvote"
                        className="cursor-pointer"
                        onClick={() => handleVote("downvote")}
                    />
                    <div className="flex-center background-light700_dark400 min-w-[18px] rounded-sm p-1">
                        <p className="subtle-medium text-dark400_light900">
                            {formatAndDivideNumber(localDownvotes)}
                        </p>
                    </div>
                </div>
            </div>
            {type === "Question" && (
                <Image
                    src={
                        localHasSaved
                            ? "/assets/icons/star-filled.svg"
                            : "/assets/icons/star-red.svg"
                    }
                    width={18}
                    height={18}
                    alt="star"
                    className="cursor-pointer"
                    onClick={handleSave}
                />
            )}
        </div>
    );
};

export default Votes;
