import React, { useEffect, useState } from 'react';
import PostCard from './Card';
import Filters from './Filters';
import uniqid from 'uniqid'


const Home = ({posts, likePost, dislikePost}) => {


    const [sortedPosts, setSortedPosts] = useState(posts);
    const [filter, setFilter] = useState('');


    useEffect(() => {
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
    }, [filter, posts])

   
    return ( 
        <div className='home'>

            <Filters />
            {sortedPosts.length !== 0 ?
            sortedPosts.map(item => {
                return (
                    <PostCard key={uniqid()}
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