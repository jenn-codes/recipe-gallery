import React from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './Card';
import Typography from '@mui/material/Typography';


const Board = ({ posts, likePost }) => {
    
    const params = useParams();
    const board = params.id;
    const filteredPosts = posts.filter(item => item.board === board)

    return ( 
        <div>

            <Typography variant="h6">
            {board}
            </Typography>

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