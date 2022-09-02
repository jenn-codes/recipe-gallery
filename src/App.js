import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from './components/Post';
import User from './components/User';
import Keyword from './components/Keyword';
import Home from './components/Home';
import React, { useEffect } from 'react';
import Header from './components/Header';
import Board from './components/Board';
import app from './firebase';
import Posts from './components/Posts';
import { collection, getDoc, getDocs } from "firebase/firestore";
import {db} from './firebase';

function App() {

  
  useEffect(() => {
    const getData = async () => {
        const firestoreData = await db.collection('posts').get();
        firestoreData.forEach((doc) => {
            console.log(doc.data())
        })}
    getData();
    })




  return (
    <div className="App">
      <BrowserRouter basename= {process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/post/:id" element={<Post />} />
          <Route path="/user/:id" element={<User />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/keyword/:id" element={<Keyword />} />
          <Route exact path="/" element={<Home />} /> 
        </Routes>
      </BrowserRouter>      
    </div>
  )
}

export default App;
