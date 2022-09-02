import React from 'react';
import { useParams } from 'react-router-dom';

const Posts = () => {
    
    const params = useParams();
    const posts = params.id;
    console.log(posts);

    return ( 
        <div>
            <span>Posts</span>
        </div>
    )
}

export default Posts;



