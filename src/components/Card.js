import React from 'react';

const Card = ({ board, likes, comments, time, image, user, body }) => {

    console.log(comments)


    const date = new Date(time*1000).toLocaleDateString("en-US")

    return (
        <div>
            <span>{board}</span>
            <span>{likes} Likes</span>
            <span>{comments} Comments</span>
            <span>By: {user}</span>
            <span>{date}</span>
            <span>{body}</span>
            <img src={image} alt='food' />
        </div>

    )
}

export default Card;
