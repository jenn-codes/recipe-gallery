import React, { useState } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import '../App.css'
import uniqid from 'uniqid'
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../firebase';
import { useNavigate } from "react-router-dom";


const AddPost = ({posts, refresh}) => {

    let boards = [];
    posts.forEach(post => {
        if (boards.indexOf(post.board) === -1) {
            boards.push(post.board);
        }
    })

    const [title, setTitle] = useState('')
    const [board, setBoard] = useState('')
    const [body, setBody] = useState('')
    const [url, setUrl] = useState('')
    const [image, setImage] = useState('')

    const handleTitle = (e) => {
        setTitle(e.target.value);
    }

    const handleBoard = (e) => {
        setBoard(e.target.value);
    }

    const handleBody = (e) => {
        setBody(e.target.value);
    }

    const handleUrl = (e) => {
        setUrl(e.target.value);
    }

    const handleImage = (e) => {
        setImage(e.target.value);
    }

    let navigate = useNavigate()

    const submitPost = async () => {
        const id = new Date().valueOf();
        const currentDate = new Date();
        const docRef = await addDoc(collection(db, "posts"), {
            'title': title,
            'board': board,
            'body': body,
            'comments': [],
            'url': url,
            'image': image,
            'likes': 0,
            'user': 'jenntest',
            'id': id,         
            'time': currentDate
        });
        console.log("Document written with ID: ", docRef.id, "id: ", id);
        refresh();
        navigate('../');
    }

    const allBoards = boards.map(item => {
        return (
            <MenuItem key={uniqid()} value={item} label={item}>
                {item}
            </MenuItem>      
        )
    })

    return (
        <div>


            <Box
                component="form"
                className="add-post"
                sx={{
                    backgroundColor: 'white', borderRadius: 2, margin: 'auto',  
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                <Typography variant="h4" sx={{color: 'gray', textAlign: 'center', margin: 'auto'}} >
                    Submit a Post
                </Typography>
                
                <TextField id="title" label="Enter a title for your post" onChange={handleTitle} variant="standard" style = {{width: '80%'}}/>
                
                <FormControl size="small"  style = {{width: '80%'}}     >
                        <InputLabel >Choose a board</InputLabel>
                        <Select
                        onChange={handleBoard} 
                        labelId="board-selection"
                        id="board-selection"
                        label="Board"
                        value={board}
                        style={{textAlign: 'left'}}
                        >
                            {allBoards}

                        </Select>
                    </FormControl>

                <TextField
                id="outlined-multiline-static"
                label="Share some details about this recipe."
                style = {{width: '80%'}}
                multiline
                rows={6}
                onChange={handleBody}
                />
                <TextField id="standard-basic" label="Enter the URL for the image" onChange={handleImage} variant="standard" style = {{width: '80%'}}/>
                <TextField id="standard-basic" label="Enter the URL for the post" onChange={handleUrl} variant="standard" style = {{width: '80%'}} />


                <Button size="small" variant="contained" sx={{backgroundColor: 'darkorange'}} onClick={submitPost}>Submit</Button>




            </Box>



        </div>
    )
}

export default AddPost;