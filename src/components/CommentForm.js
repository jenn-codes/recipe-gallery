import React, { useEffect, useState } from "react";
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';



const CommentForm = ({postId}) => {
    
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [showForm, setShowForm] = useState(true);

    


    const saveName = (e) => {
        setName(e.target.value);
    }
    
    const saveComment = (e) => {
        setComment(e.target.value)
    }

    const submitForm = async () => {
        const ref = await db.collection('posts').where('id', '==', postId).get();
        console.log(ref)

        const docRefId = ref.docs[0].id;
        const post = doc(db, "posts", docRefId);
        
        await updateDoc(post, {
            comments: arrayUnion(
                {
                    'name': name,
                    'comment': comment
                }
            )
        });

        // setShowForm(false);
    }



    return (
        <div>
            {showForm ?
            <div>
                <Typography variant="p" align="center" component="div">Add a comment</Typography>
                <Box
                    component="form"
                    sx={{
                        backgroundColor: "white",
                        width: 600,
                        margin: "auto",
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        id="outlined-name"
                        label="Name"
                        size="small"
                        onChange={saveName}
                    />

                    <TextField
                        id="outlined-name"
                        label="Comment"
                        size="small"
                        onChange={saveComment}
                    />      

                    <Button variant="outlined" onClick={submitForm} >Submit</Button>

                </Box>
            </div>
            : ' '
            }


        </div>
    )
}

export default CommentForm;