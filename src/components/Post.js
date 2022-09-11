import React from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './Card';
import Comments from './Comments';



const Post = ({ posts, likePost, dislikePost }) => {
    
    const params = useParams();
    const postId = params.id
    console.log(postId)
    let currPost = posts.filter((item) => item.id.toString() === (postId))
    console.log(currPost)

    currPost = currPost[0];

    return ( 
        <div className='post'>
           <PostCard 
                    board={currPost.board}
                    likes={currPost.likes}
                    time={currPost.time.seconds}
                    body={currPost.body}
                    image={currPost.image}
                    title={currPost.title}
                    user={currPost.user}
                    id={currPost.id}
                    likePost={likePost}
                    dislikePost={dislikePost}
                    comments={currPost.comments.length}
                    url={currPost.url}
            />
            <Comments 
                    comments={currPost.comments}
                    postId={currPost.id}
            />

           


        </div>
    )
}

export default Post;