import React from 'react';
import "../styles/Card.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';
import { Link } from 'react-router-dom';


const PostCard = ({ board, likes, comments, title, time, image, user, body, id, likePost }) => {

    console.log(comments);
    let date = new Date(time*1000).toISOString().toLocaleString("en-US").slice(5,10)

    const handleLike = (id) => {
        likePost(id);
    }

    return (
        <div className='card'>
            <Card sx={{ maxWidth: 555 }}>
                <CardContent>
                    <Typography variant="caption" align="right" component="div">
                        Posted in <Link to={`/board/${board}/`}>{board}</Link>
                    </Typography>
                    <Typography variant="caption" align="left" component="div">
                        Posted by <Link to={`/user/${user}/`}>{user}</Link>
                    </Typography>
                    <Link to={`/post/${id}/`} style={{ textDecoration: 'none' }}>
                    <Typography variant="h4" align="left" color="black" component="div">
                        {title}
                    </Typography>

                    <CardMedia
                        component="img"
                        height="200"
                        image={image}
                        alt={board}
                    />
                    </Link>
                    <Typography variant="body2" align="left" color="text.secondary">
                        {body}
                    </Typography>
                    <CardActions>
                        <Button size="small" onClick={() => handleLike(id)}><ArrowCircleUpOutlinedIcon /> {likes} likes </Button>
                        <Button size="small"><ChatBubbleOutlineIcon />{comments} comments</Button>
                    </CardActions>
                </CardContent>
            </Card>
        </div>
    )
}

export default PostCard