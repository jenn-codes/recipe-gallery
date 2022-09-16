import React, { useState } from "react";
import uniqid from 'uniqid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { db } from '../firebase';
import { doc, updateDoc } from "firebase/firestore";
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

    const submitForm = () => {
        setShowForm(false);
        let newComments = postComments.slice();
        newComments.push({
            'user': name,
            'comment': comment,
            'likes': 0
        })
        setPostComments(newComments);
        updateDB(newComments);
    }

    const updateDB = async (newComments) => {
        const ref = await db.collection('posts').where('id', '==', postId).get();
        const docRefId = ref.docs[0].id;
        const post = doc(db, "posts", docRefId);
        await updateDoc(post, {
            comments: newComments,
        }) 
    }

    // calculate parent & child indices of nested comments
    const findCommentIndexes = (item) => {
        let parentIndex, childIndex
        let parentComments = postComments.filter(el => 'children' in el)
            parentComments.forEach(element => {
                (element.children.forEach(i => {
                    if (i.comment.includes(item.comment)) {
                        const parentComment = element
                        parentIndex = parentComments.indexOf(parentComment);
                        childIndex = parentComment.children.indexOf(i);
    }}))})
    return [parentIndex, childIndex]
    }

    const likeComment = async (item) => {
        const commentIndex = postComments.indexOf(item) 
        // check for nested comment
        if (commentIndex === -1) {
            const [parentIndex, childIndex] = findCommentIndexes(item)
            let newComments = postComments.slice()
            newComments[parentIndex]['children'][childIndex].likes += 1
            setPostComments(newComments);
            updateDB(newComments)
        } else {
            let newComments = postComments.slice()
            newComments[commentIndex].likes += 1;
            setPostComments(newComments);
            updateDB(newComments)
    }}

    
    const dislikeComment = async (item) => {
        const commentIndex = postComments.indexOf(item)
        // check for nested comment
        if (commentIndex === -1) {
            const [parentIndex, childIndex] = findCommentIndexes(item)
            let newComments = postComments.slice()
            newComments[parentIndex]['children'][childIndex].likes -= 1
            setPostComments(newComments);
            updateDB(newComments)
        } else {
            let newComments = postComments.slice();
            newComments[commentIndex].likes -= 1;
            setPostComments(newComments);
            updateDB(newComments)
    }}

    const reply = async (item) => {
        setReplyComment(item);
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
        updateDB(newComments);
        setShowForm(false);

    }

    const share = (item) => {
        console.log(item)
    }

    const displayComment = (item) => {
        return (
            <div>
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
            </div>)
        }

    const displayForm = () => {
        return (
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
        )
    }

    return (
        <div className="comments">
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {postComments.map(item => {
                    return (     
                        <div key={uniqid()}>
                            {displayComment(item)}
                            {item.children !== undefined ?
                            item.children.map(item => {
                                return (     
                                    <div key={uniqid()} style={{paddingLeft: 20}}>
                                        {displayComment(item)}
                                    </div>
                                )
                            }) : ' '
                            }
                        </div>
                    )}
                )}
            </List>
            {displayForm()}

        </div> 
    )
}

export default Comments;
