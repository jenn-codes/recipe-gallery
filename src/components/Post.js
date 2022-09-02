import React from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
    
    const params = useParams();
    const post = params.id;
    console.log(post);

    return ( 
        <div>
            <span>Post</span>
        </div>
    )
}

export default Post;