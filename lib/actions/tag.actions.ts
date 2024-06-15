"use server";

import Tag, { ITag } from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
    GetAllTagsParams,
    GetQuestionsByTagIdParams,
    GetTopInteractedTagsParams,
} from "./shared.types";
import User from "@/database/user.model";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getAllTags(params: GetAllTagsParams) {
    try {
        connectToDatabase();

        const tags = await Tag.find({}).sort({ createdAt: -1 });

        return { tags };
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
    try {
        connectToDatabase();

        const { userId } = params;
        const user = await User.findById(userId);

        if (!user) throw new Error("User not found");

        // Encontrar interaccones por el usuario y grupo por tags
        // Interaccion

        return [
            { _id: "1", name: "tag1" },
            { _id: "2", name: "tag2" },
            { _id: "3", name: "tag3" },
        ];
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
    try {
        connectToDatabase();

        const { tagId, page = 1, pageSize = 10, searchQuery } = params;

        const tagFilter: FilterQuery<ITag> = { _id: tagId };

        const tag = await Tag.findOne(tagFilter).populate({
            path: "questions",
            model: Question,
            match: searchQuery
                ? { title: { $regex: searchQuery, $options: "i" } }
                : {},
            options: {
                sort: { createdAt: -1 },
            },
            populate: [
                { path: "tags", model: Tag, select: "_id name" },
                {
                    path: "author",
                    model: User,
                    select: "_id clerkId name picture",
                },
            ],
        });

        if (!tag) {
            throw new Error("Tag not found");
        }

        return { tagTitle: tag.name, questions: tag.questions };
    } catch (error) {
        console.log(error);
    }
}