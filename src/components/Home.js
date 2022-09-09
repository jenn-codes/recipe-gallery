import React, { useEffect, useState } from 'react';
import PostCard from './Card';
import Filters from './Filters';
import Typography from '@mui/material/Typography';

const Home = ({posts, likePost, dislikePost}) => {

    const [sortedPosts, setSortedPosts] = useState([]);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        setSortedPosts(posts)
        const trendingPosts = [...posts].sort((a,b) => (b.comments.length - a.comments.length));
        const newPosts = [...posts].sort((a,b) => (b.time.seconds - a.time.seconds));  
        const hotPosts = [...posts].sort((a,b) => (b.likes - a.likes));
        document.querySelector('.sortTrending').addEventListener('click', () => {
            setFilter('Trending');
            setSortedPosts(trendingPosts) 
        })
        document.querySelector('.sortNew').addEventListener('click', () => {
            setFilter('New');
            setSortedPosts(newPosts); 
        })
        document.querySelector('.sortHot').addEventListener('click', () => {
            setFilter('Hot');
            setSortedPosts(hotPosts);
        })   
    }, [posts, filter])

   
    return ( 
        <div className='home'>

            <Filters />
            {sortedPosts.length !== 0 ?
            sortedPosts.map(item => {
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
            <div>There are no posts.</div>
            }
        </div>
    )
}

export default Home;