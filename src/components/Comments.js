import React, { useState } from "react";
import uniqid from 'uniqid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { db } from '../firebase';
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography';



const Comments = ({ comments, postId }) => {

    
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [postComments, setPostComments] = useState(comments)    

    const saveName = (e) => {
        setName(e.target.value);
    }
    
    const saveComment = (e) => {
        setComment(e.target.value)
    }

    const submitForm = async () => {
        const ref = await db.collection('posts').where('id', '==', postId).get();
        const docRefId = ref.docs[0].id;
        const post = doc(db, "posts", docRefId);
        
        await updateDoc(post, {
            comments: arrayUnion(
                {
                    'user': name,
                    'comment': comment
                }
            )
        });
        setPostComments([
            ...postComments,
            {
                'user': name,
                'comment': comment
            }
        ]
        )
        setShowForm(false);

    }

    return (
        <div className="comments">
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {postComments.map(item => {
                    return (     
                        <div key={uniqid()}>
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: 'darkorange'}}>{item.user}</Avatar>
                                </ListItemAvatar>

                                <ListItemText
                                primary={item.comment}
                                secondary={
                                    <React.Fragment>
                                        {item.user}
                                    </React.Fragment>
                                }
                                />
                            </ListItem>
                            <Divider  />

                        </div>         
                    )
                })
                }
            </List>
                
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

        </div>

    )
}

export default Comments;