import React from "react";
import { useParams } from "react-router-dom";
import PostCard from "./Card";
import uniqid from 'uniqid'

const Search = ({posts, likePost, dislikePost}) => {

    
    const params = useParams();
    const searchTerm = params.id;    
    const searchedPosts = posts.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));

    const searchResults = searchedPosts.length !== 0 ?
                        searchedPosts.map(item => {
                            return (
                                <PostCard key={uniqid()}
                                board={item.board}
                                likes={item.likes}
                                comments={item.comments.length}
                                time={item.time}
                                body={item.body}
                                image={item.image}
                                title={item.title}
                                id={item.id}
                                user={item.user}
                                likePost={likePost}
                                dislikePost={dislikePost}
                
                
                                />
                            )
                        }) : 
                        <span>There are no posts found.</span>


    return (
        <div>
            <span>Search Results for: "{searchTerm}"</span>
            {searchResults}
        </div>
    )
}

export default Search;
