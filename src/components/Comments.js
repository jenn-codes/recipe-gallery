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
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import ArrowCircleDownOutlinedIcon from '@mui/icons-material/ArrowCircleDownOutlined';



const Comments = ({ comments, postId }) => {

    
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [showForm, setShowForm] = useState(true);
    const [postComments, setPostComments] = useState(comments);
    const [replyStatus, setReplyStatus] = useState(false);
    const [replyComment, setReplyComment] = useState(null)

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
                    'comment': comment,
                    'likes': 0
                }
            )});
        setPostComments([
            ...postComments,
            {
                'user': name,
                'comment': comment,
                'likes': 0
            }])
        setShowForm(false);
    }

    const likeComment = async (item) => {

        const commentIndex = postComments.indexOf(item)
        let newComments = postComments.slice();
        newComments[commentIndex].likes += 1;
        setPostComments(newComments);
            
        const ref = await db.collection('posts').where('id', '==', postId).get();
        const docRefId = ref.docs[0].id;
        const post = doc(db, "posts", docRefId);
        await updateDoc(post, {
            comments: newComments,
        })
    }

    
    const dislikeComment = async (item) => {
        const commentIndex = postComments.indexOf(item)
        console.log(commentIndex)
        let newComments = postComments.slice();
        newComments[commentIndex].likes -= 1;
        setPostComments(newComments);
            
        const ref = await db.collection('posts').where('id', '==', postId).get();
        const docRefId = ref.docs[0].id;
        const post = doc(db, "posts", docRefId);
        await updateDoc(post, {
            comments: newComments,
        })
    }

    const reply = async (item) => {
        setReplyComment(item);
        console.log(replyComment);
        setShowForm(true);
        setReplyStatus(true);        

    }

    const submitReply = async () => {
        const commentIndex = postComments.indexOf(replyComment)
        let newComments = postComments.slice();
        newComments[commentIndex]['children'] = [{
            'user': name,
            'comment': comment,
            'likes': 0
        }]
        setPostComments(newComments);
            
        const ref = await db.collection('posts').where('id', '==', postId).get();
        const docRefId = ref.docs[0].id;
        const post = doc(db, "posts", docRefId);
        await updateDoc(post, {
            comments: newComments,
        })
    }



    const share = (item) => {
        console.log(item)
    }
    

    return (
        <div className="comments">
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {postComments.map(item => {

                    return (     
                        <div key={uniqid()}>
                            {console.log(item.children)}
                            <ListItem alignItems="flex-start">
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: 'darkorange'}}>{item.user[0]}</Avatar>
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
                            {item.children !== undefined ?
                            <ListItem sx={{paddingLeft: 10}}>
                                
                                <ListItemAvatar>
                                    <Avatar sx={{bgcolor: 'darkorange'}}>{item.children[0].user[0]}</Avatar>
                                </ListItemAvatar>

                                <ListItemText
                                primary={item.children[0].comment}
                                secondary={
                                    <React.Fragment>
                                        {item.children[0].user}
                                    </React.Fragment>
                                }
                                />                            
                            </ListItem> :
                            ' '}

                            <ListItem alignItems="flex-start">
                            <Button size="small" onClick={() => likeComment(item)} ><ArrowCircleUpOutlinedIcon /></Button>
                            {item.likes ? 
                            item.likes :
                            0
                            }
                            <Button size="small" onClick={() => dislikeComment(item)}><ArrowCircleDownOutlinedIcon /></Button>
                            <Button size="small" onClick={() => reply(item)}>REPLY</Button>
                            <Button size="small" onClick={() => share(item)}>SHARE</Button>

                            
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
                    <Box
                        className="form"
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
                        <Typography variant="h6" align="center" >Add a comment</Typography>

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

                        <Button variant="outlined" onClick={() => {
                            replyStatus ? 
                            submitReply() :
                            submitForm()}} >Submit</Button>

                    </Box>
                </div>
                : ' '
                }


            </div>

        </div>

    )
}

export default Comments;