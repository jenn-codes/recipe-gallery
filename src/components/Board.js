import React from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './Card';


const Board = ({ posts, likePost }) => {
    
    const params = useParams();
    const board = params.id;
    const filteredPosts = posts.filter(item => item.board === board)

    return ( 
        <div>
            <span>Board</span>
            {filteredPosts.map(item => {
                return (
                    <PostCard key={item.id}
                    board={item.board}
                    likes={item.likes}
                    comments={item.comments.length}
                    time={item.time}
                    body={item.body}
                    image={item.image}
                    title={item.title}
                    user={item.user}
                    id={item.id}                            
                    likePost={likePost}

                    />
                )
            })}
        </div>
    )
}

export default Board;