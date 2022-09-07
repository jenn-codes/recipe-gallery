import React from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './Card';
import Comments from './Comments';


const Post = ({ posts, likePost, dislikePost }) => {
    
    const params = useParams();
    const postId = params.id;
    let currPost = posts.filter((item) => item.id === parseInt(postId))
    currPost = currPost[0]


    return ( 
        <div>
           <PostCard 
                    board={currPost.board}
                    likes={currPost.likes}
                    time={currPost.time.seconds}
                    body={currPost.body}
                    image={currPost.image}
                    title={currPost.title}
                    user={currPost.user}
                    likePost={likePost}
                    dislikePost={dislikePost}
                    comments={currPost.comments.length}
                    id={currPost.id}
                    url={currPost.url}
            />
            <Comments 
                    comments={currPost.comments}
            />

           


        </div>
    )
}

export default Post;