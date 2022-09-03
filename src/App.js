import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from './components/Post';
import User from './components/User';
import Home from './components/Home';
import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import { db } from './firebase';
import { doc, updateDoc } from "firebase/firestore";


function App() {
  const [posts, setPosts] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    let newArr = [];
    const getData = async () => {
      const initialPosts = await db.collection('posts').get();
      initialPosts.forEach((post) => {
        newArr.push(post.data());
      })
      setPosts(newArr)
      // if (isMounted.current) {
      //   setPosts(newArr)}
    }
    getData();
    return () => {
      isMounted.current = false;
    }
  }, [])

  const likePost = async (id) => {
  console.log(id)
  let postIndex = posts.findIndex((item) => item.id === id)
  if (postIndex !== -1) {
    const newArr = posts.slice();
    let newLikes = newArr[postIndex].likes + 1
    newArr[postIndex].likes++
    setPosts(newArr);

    const ref = await db.collection('posts').where('id', '==', id).get();
    console.log(ref)
    const docRefId = ref.docs[0].id;
    const post = doc(db, "posts", docRefId);

    await updateDoc(post, {
      likes: newLikes
    })
  }}


  return (
    <div className="App">
      <BrowserRouter basename= {process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/board/:id" element={<Board posts={posts}  likePost={likePost} />} />
          <Route exact path="/" element={<Home posts={posts} likePost={likePost} />} /> 
        </Routes>
      </BrowserRouter>      
    </div>
  )
}

export default App;