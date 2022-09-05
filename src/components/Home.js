import React from 'react';
import PostCard from './Card';

const Home = ({posts, likePost}) => {

    // useEffect(() => {
    //     console.log(posts)
    // }, [posts])


    return ( 
        <div>
            {posts.map(item => {
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

export default Home;