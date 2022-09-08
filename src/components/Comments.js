import React, { useEffect } from "react";
import uniqid from 'uniqid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';



const Comments = ({ comments }) => {

    useEffect(() => {
        
    }, [comments])
   

    console.log(comments)

    return (
        <div className="comments">
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                {comments.map(item => {
                    return (     
                        <div key={uniqid()}>
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
                            <Divider  />

                        </div>         
                    )
                })
                }
            </List>

        </div>

    )
}

export default Comments;