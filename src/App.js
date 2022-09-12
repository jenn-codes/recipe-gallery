import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from './components/Post';
import User from './components/User';
import Home from './components/Home';
import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import { db } from './firebase';
import { doc, updateDoc } from "firebase/firestore";
import Sidebar from './components/Sidebar';
import AddPost from './components/AddPost';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let newArr = [];
    const getData = async () => {
      const initialPosts = await db.collection('posts').get();
      initialPosts.forEach((post) => {
          newArr.push(post.data());
        })
      setPosts(newArr);
      // window.localStorage.setItem('savedPosts', JSON.stringify(newArr))
      }
    getData();

  }, [])



  const likePost = async (id) => {
    let postIndex = posts.findIndex((item) => item.id === id)
    if (postIndex !== -1) {
      const newArr = posts.slice();
      let newLikes = newArr[postIndex].likes + 1;
      newArr[postIndex].likes++
      setPosts(newArr);
      const ref = await db.collection('posts').where('id', '==', id).get();
      const docRefId = ref.docs[0].id;
      const post = doc(db, "posts", docRefId);
      await updateDoc(post, {
        likes: newLikes
      })
  }}


  const dislikePost = async (id) => {
    let postIndex = posts.findIndex((item) => item.id === id)
    if (postIndex !== -1) {
      const newArr = posts.slice();
      let newLikes = newArr[postIndex].likes - 1;
      newArr[postIndex].likes--
      setPosts(newArr);
      const ref = await db.collection('posts').where('id', '==', id).get();
      const docRefId = ref.docs[0].id;
      const post = doc(db, "posts", docRefId);
      await updateDoc(post, {
        likes: newLikes
      })
  }}


  return (
    <div>
      <Header />
      <div className="App">

      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/post/:id" element={<Post posts={posts}  likePost={likePost} dislikePost={dislikePost} />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/board/:id" element={<Board posts={posts}  likePost={likePost} dislikePost={dislikePost} />} />
          <Route exact path="/" element={<Home posts={posts} likePost={likePost} dislikePost={dislikePost} />} /> 
          <Route exact path="/hot" element={<Home posts={posts} likePost={likePost} dislikePost={dislikePost} />} /> 
          <Route exact path="/new" element={<Home posts={posts} likePost={likePost} dislikePost={dislikePost} />} /> 
          <Route exact path="/trending" element={<Home posts={posts} likePost={likePost} dislikePost={dislikePost} />} /> 
          <Route exact path="/add" element={< AddPost posts={posts}/>} /> 

        </Routes>
        <Sidebar posts={posts}/>

      </BrowserRouter>      
      </div>
    </div>
  )
}

export default App;