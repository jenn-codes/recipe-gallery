import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostCard from './Card';
import Typography from '@mui/material/Typography';
import Desserts from "../assets/desserts.jpg";
import Mains from "../assets/mains.jpg";
import Drinks from "../assets/drinks.jpg";
import Box from '@mui/material/Box';
import Filters from './Filters';



const Board = ({ posts, likePost, dislikePost }) => {
    
    const params = useParams();
    const board = params.id;
    const filteredPosts = posts.filter(item => item.board === board);

    let photo = '';

    if (board === "desserts") {
        photo = Desserts;
    } else if (board === "mains") {
        photo = Mains;
    } else if (board === "drinks") {
        photo = Drinks;
    }
        



    return ( 
        <div>

            <Box 
                sx={{
                    height: 233,
                    width: 1,
                    backgroundImage: `url(${photo})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    
                }}
            >
                <Typography variant="h3" sx={{backgroundColor: 'white', opacity: '0.75', color: 'gray'}}>
                    {board[0].toUpperCase()+board.slice(1,)}
                </Typography>   
            </Box>

            <Filters />



            {filteredPosts.length !== 0 ?
            filteredPosts.map(item => {
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
                    dislikePost={dislikePost}


                    />
                )
            }) : 
            <span>There are no posts.</span>}
        </div>
    )
}

export default Board;