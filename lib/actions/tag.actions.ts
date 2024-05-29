"use server";

import Tag from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { GetAllTagsParams, GetTopInteractedTagsParams } from "./shared.types";
import User from "@/database/user.model";

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
