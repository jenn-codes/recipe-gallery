import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from './components/Post';
import User from './components/User';
import Home from './components/Home';
import React, { useEffect, useState, useRef } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import { db } from './firebase';

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


  return (
    <div className="App">
      <BrowserRouter basename= {process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/board/:id" element={<Board />} />
          <Route exact path="/" element={<Home posts={posts} />} /> 
        </Routes>
      </BrowserRouter>      
    </div>
  )
}

export default App;
