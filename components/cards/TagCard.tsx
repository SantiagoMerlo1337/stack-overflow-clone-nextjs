import React from "react";
interface Props {
    tag: {
        _id: string;
        name: string;
        description: string;
    };
}

const TagCard = ({ tag }: Props) => {
    return (
        <>
            <p>{tag._id}</p>
            <p>{tag.name}</p>
            <p>{tag.description}</p>
        </>
    );
};

export default TagCard;
