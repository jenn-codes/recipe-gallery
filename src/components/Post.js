import React from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './Card';
import Comments from './Comments';


const Post = ({ posts, likePost }) => {
    
    const params = useParams();
    const postId = params.id;
    const currPost = posts.filter((item) => item.id === parseInt(postId))
    console.log(currPost);


    return ( 
        <div>
           <PostCard 
                    board={currPost[0].board}
                    likes={currPost[0].likes}
                    time={currPost[0].time.seconds}
                    body={currPost[0].body}
                    image={currPost[0].image}
                    title={currPost[0].title}
                    user={currPost[0].user}
                    likePost={likePost}
                    comments={currPost[0].comments.length}
                    id={currPost[0].id}
                    url={currPost[0].url}
            />

            <Comments 
                    comments={currPost[0].comments}
            />

           


        </div>
    )
}

export default Post;