import React from 'react';
import "../styles/Card.css"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowCircleUpOutlinedIcon from '@mui/icons-material/ArrowCircleUpOutlined';

const PostCard = ({ board, likes, comments, title, time, image, user, body }) => {

    console.log(comments);
    let date = new Date(time*1000).toISOString().toLocaleString("en-US").slice(5,10)



    return (
        <div className='card'>
            <Card sx={{ maxWidth: 555 }}>
                <CardContent>
                <Typography gutterBottom variant="caption" align="left" component="div">
                    Posted by {user} on {date}
                </Typography>
                <Typography variant="h5" align="left" component="div">
                    {title}
                </Typography>
                <CardMedia
                    component="img"
                    height="200"
                    image={image}
                    alt={board}
                />
                <Typography variant="body2" align="left" color="text.secondary">
                    {body}
                </Typography>
                <CardActions>
                    <Button size="small"><ArrowCircleUpOutlinedIcon  /> {likes} likes </Button>
                    <Button size="small"><ChatBubbleOutlineIcon />{comments} comments</Button>
                </CardActions>
                </CardContent>
            </Card>

            {/* <img src={image} alt='food' />
            <span>Posted in {board}</span>
            <span>{likes} Likes</span>
            <span>{comments} Comments</span>
            <span>Posted by {user}</span>
            <span>{date}</span>
            <span>{body}</span> */}
        </div>
    )
}

export default PostCard;
